"""
PHASE 2: Map Shamela pages to hadiths and enrich JSON files
============================================================
This runs AFTER all pages are cached.
It scans the cached pages sequentially to detect hadith boundaries
and assigns the full Arabic syarah text to each hadith.
"""
import os
import re
import json
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

CACHE_DIR = 'public/data/shamela_cache'
DATA_DIR = 'public/data/books'
START_PAGE = 494
END_PAGE = 7996

def load_all_cached_pages():
    """Load all cached Shamela pages into memory."""
    pages = {}
    for pg in range(START_PAGE, END_PAGE + 1):
        cache_file = os.path.join(CACHE_DIR, f'page_{pg}.txt')
        if os.path.exists(cache_file):
            with open(cache_file, 'r', encoding='utf-8') as f:
                pages[pg] = f.read()
    return pages

def get_existing_shamela_refs():
    """Get all known hadith -> shamela page_id mappings from existing JSON."""
    refs = {}
    for book_id in range(1, 98):
        path = os.path.join(DATA_DIR, f'book_{book_id}.json')
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        for h in data['hadiths']:
            ref = h.get('fathul_bari', {}).get('shamela_ref', {})
            if ref and ref.get('page_id'):
                refs[h['number']] = ref['page_id']
    return refs

def detect_hadith_boundaries(pages):
    """
    Scan all pages sequentially and detect where each hadith's syarah begins.
    We look for patterns like:
    - "حَدِيثُ" followed by a number
    - Hadith number markers
    - "بَابُ" (new chapter markers)
    - "قَوْلُهُ" (commentary markers like "his saying")
    Returns dict of hadith_number -> start_page
    """
    boundaries = {}
    
    for pg in sorted(pages.keys()):
        text = pages[pg]
        
        # Pattern 1: Explicit hadith numbers like "٢ - حَدَّثَنَا" or "2 - حَدَّثَنَا" 
        # Arabic numerals
        for m in re.finditer(r'(\d+)\s*[-–—]\s*(?:حَدَّثَنَا|حَدَّثَنِي|وَحَدَّثَنَا|أَخْبَرَنَا)', text):
            num = int(m.group(1))
            if 1 <= num <= 7563 and num not in boundaries:
                boundaries[num] = pg
        
        # Pattern 2: كتاب / باب markers with numbers
        for m in re.finditer(r'(\d+)\s*[-–—]\s*(?:كِتَاب|كتاب|بَابُ|بَابٌ|باب)', text):
            pass  # These are chapter markers, not hadith numbers
        
        # Pattern 3: Eastern Arabic numerals ١٢٣ 
        eastern_map = {'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'}
        for m in re.finditer(r'([٠-٩]+)\s*[-–—]\s*(?:حَدَّثَنَا|حَدَّثَنِي)', text):
            eastern = m.group(1)
            western = ''.join(eastern_map.get(c, c) for c in eastern)
            try:
                num = int(western)
                if 1 <= num <= 7563 and num not in boundaries:
                    boundaries[num] = pg
            except ValueError:
                pass
    
    return boundaries

def build_page_ranges(boundaries, known_refs, total_hadiths=7563):
    """
    Build page ranges for each hadith.
    Merges detected boundaries with known references.
    For hadiths without any mapping, interpolate from neighbors.
    """
    # Merge: known_refs take priority
    all_refs = {}
    all_refs.update(boundaries)
    all_refs.update(known_refs)  # overwrite with known
    
    # Sort by hadith number
    sorted_items = sorted(all_refs.items(), key=lambda x: x[0])
    
    # Build ranges
    ranges = {}
    for i, (hadith_num, start_page) in enumerate(sorted_items):
        if i + 1 < len(sorted_items):
            next_start = sorted_items[i + 1][1]
            end_page = next_start - 1
        else:
            end_page = min(start_page + 15, END_PAGE)
        
        # Sanity check: cap at 50 pages per hadith (very long commentary)
        if end_page - start_page > 50:
            end_page = start_page + 50
        
        ranges[hadith_num] = (start_page, end_page)
    
    # For hadiths not in ranges, interpolate from nearest neighbors
    all_hadith_nums = set()
    for book_id in range(1, 98):
        path = os.path.join(DATA_DIR, f'book_{book_id}.json')
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            for h in data['hadiths']:
                all_hadith_nums.add(h['number'])
    
    # For unmapped hadiths, find nearest mapped neighbors and interpolate
    mapped_nums = sorted(ranges.keys())
    for h_num in sorted(all_hadith_nums):
        if h_num in ranges:
            continue
        
        # Find nearest lower and upper mapped hadith
        lower = None
        upper = None
        for mn in mapped_nums:
            if mn <= h_num:
                lower = mn
            if mn > h_num and upper is None:
                upper = mn
                break
        
        if lower and upper:
            # Interpolate: distribute pages proportionally
            lower_start = ranges[lower][0]
            upper_start = ranges[upper][0]
            total_pages = upper_start - lower_start
            hadiths_between = upper - lower
            if hadiths_between > 0:
                pages_per_hadith = total_pages / hadiths_between
                offset = h_num - lower
                est_start = int(lower_start + offset * pages_per_hadith)
                est_end = int(est_start + pages_per_hadith) - 1
                ranges[h_num] = (int(est_start), int(max(est_start, est_end)))
        elif lower:
            # After last mapped hadith
            lower_start, lower_end = ranges[lower]
            avg_span = 3  # estimate 3 pages per hadith
            offset = h_num - lower
            est_start = int(lower_end + 1 + (offset - 1) * avg_span)
            ranges[h_num] = (int(est_start), int(est_start + avg_span - 1))
    
    return ranges

def enrich_json_files(page_ranges, pages):
    """Write full syarah text into each book's JSON file."""
    total_enriched = 0
    
    for book_id in range(1, 98):
        path = os.path.join(DATA_DIR, f'book_{book_id}.json')
        if not os.path.exists(path):
            continue
        
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        modified = False
        book_enriched = 0
        
        for h in data['hadiths']:
            hadith_num = h['number']
            
            if hadith_num in page_ranges:
                start_pg, end_pg = page_ranges[hadith_num]
                start_pg, end_pg = int(start_pg), int(end_pg)
                
                # Combine all page texts for this hadith
                parts = []
                for pg in range(start_pg, end_pg + 1):
                    if pg in pages:
                        parts.append(pages[pg])
                
                full_ar = '\n\n'.join(parts)
                
                if full_ar and len(full_ar) > 50:
                    if 'fathul_bari' not in h:
                        h['fathul_bari'] = {}
                    
                    # Store the FULL Arabic syarah from Shamela
                    h['fathul_bari']['syarah_lengkap_ar'] = full_ar
                    h['fathul_bari']['shamela_pages'] = f'{start_pg}-{end_pg}'
                    h['fathul_bari']['syarah_char_count'] = len(full_ar)
                    
                    # Also update ringkasan_syarah_ar to be the full text
                    h['fathul_bari']['ringkasan_syarah_ar'] = full_ar
                    
                    modified = True
                    book_enriched += 1
        
        if modified:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            book_name = data['book'].get('name_id', f'Book {book_id}')
            print(f'  ✓ Kitab {book_id}: {book_name} — {book_enriched} hadits diperkaya dengan syarah lengkap')
            total_enriched += book_enriched
    
    return total_enriched

def main():
    print('=' * 70)
    print('PHASE 2: Mapping & Enriching JSON with Full Shamela Syarah')
    print('=' * 70)
    
    # Step 1: Load cached pages
    print('\n[1] Loading cached Shamela pages...')
    pages = load_all_cached_pages()
    print(f'    Loaded {len(pages)} pages')
    
    if len(pages) < 1000:
        print(f'    WARNING: Only {len(pages)} pages cached. Ideally need ~7503.')
        print(f'    Will proceed with what we have.')
    
    # Step 2: Get known references
    print('\n[2] Loading existing shamela_ref data...')
    known_refs = get_existing_shamela_refs()
    print(f'    Known hadith->page mappings: {len(known_refs)}')
    
    # Step 3: Detect hadith boundaries
    print('\n[3] Scanning pages for hadith boundaries...')
    boundaries = detect_hadith_boundaries(pages)
    print(f'    Detected {len(boundaries)} hadith boundaries')
    
    # Step 4: Build page ranges
    print('\n[4] Building comprehensive page ranges...')
    page_ranges = build_page_ranges(boundaries, known_refs)
    print(f'    Total hadiths mapped: {len(page_ranges)}')
    
    # Show some stats
    mapped_with_pages = sum(1 for h, (s, e) in page_ranges.items() if s in pages)
    print(f'    Hadiths with actual cached pages: {mapped_with_pages}')
    
    # Step 5: Enrich JSON files
    print('\n[5] Enriching book JSON files with full Arabic syarah...')
    total = enrich_json_files(page_ranges, pages)
    
    print(f'\n{"=" * 70}')
    print(f'COMPLETE: {total} hadiths enriched with full Arabic syarah from Shamela')
    print(f'{"=" * 70}')

if __name__ == '__main__':
    main()
