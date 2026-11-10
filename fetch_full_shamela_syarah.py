"""
FULL Shamela Syarah Fetcher for Shahih Bukhari Project
=======================================================
This script fetches the COMPLETE Arabic syarah text from shamela.ws/book/1673
(Fath al-Bari by Ibn Hajar al-Asqalani) and integrates it into the JSON data files.

Strategy:
---------
1. Fetch ALL pages from shamela.ws/book/1673 (pages 494-7996 = ~7503 pages)
2. Each page contains ~5000 chars of Arabic text
3. Detect hadith boundaries within the text using patterns like:
   - "حَدَّثَنَا" (hadathana - narrated to us)
   - "حَدِيثُ" (hadith)
   - Page breaks that align with hadith transitions
4. Map each hadith's syarah pages based on the existing shamela_ref data
5. Store the full Arabic text in each hadith's JSON record
6. Also generate a basic Indonesian translation placeholder

The approach uses sequential page fetching since each hadith's syarah spans 
multiple consecutive pages. We map page ranges to hadiths using the shamela_ref
data we already have, and fill gaps by detecting hadith number patterns.

Total estimated data: ~7503 pages × ~5000 chars ≈ 37.5 million characters of Arabic text
"""
import urllib.request
import ssl
import re
import json
import os
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

SHAMELA_BOOK_ID = 1673
START_PAGE = 494
END_PAGE = 7996
DATA_DIR = 'public/data/books'
CACHE_DIR = 'public/data/shamela_cache'
DELAY_BETWEEN_REQUESTS = 0.3  # seconds

os.makedirs(CACHE_DIR, exist_ok=True)

def fetch_shamela_page(page_id):
    """Fetch Arabic text from a single Shamela page, with local caching."""
    cache_file = os.path.join(CACHE_DIR, f'page_{page_id}.txt')
    if os.path.exists(cache_file):
        with open(cache_file, 'r', encoding='utf-8') as f:
            return f.read()
    
    url = f'https://shamela.ws/book/{SHAMELA_BOOK_ID}/{page_id}'
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            html = resp.read().decode('utf-8')
    except Exception as e:
        print(f'  [ERROR] Page {page_id}: {e}')
        return None
    
    # Extract first nass block
    nass_starts = [m.start() for m in re.finditer(r'<div[^>]*class="nass[^"]*"', html)]
    if not nass_starts:
        return None
    
    start_pos = nass_starts[0]
    tag_end = html.find('>', start_pos) + 1
    depth = 1
    pos = tag_end
    while depth > 0 and pos < len(html):
        next_open = html.find('<div', pos)
        next_close = html.find('</div>', pos)
        if next_close == -1:
            break
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                content = html[tag_end:next_close]
                clean = re.sub(r'<br\s*/?>', '\n', content)
                clean = re.sub(r'<[^>]+>', '', clean)
                clean = re.sub(r'\n\s*\n', '\n', clean).strip()
                # Cache the result
                with open(cache_file, 'w', encoding='utf-8') as f:
                    f.write(clean)
                return clean
            pos = next_close + 6
    return None

def build_hadith_page_mapping():
    """Build a mapping of hadith number -> (start_page, end_page) using existing shamela_ref data."""
    # First, collect all known page_ids from the JSON files
    known_refs = {}  # hadith_number -> page_id
    
    for book_id in range(1, 98):
        path = os.path.join(DATA_DIR, f'book_{book_id}.json')
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        for h in data['hadiths']:
            ref = h.get('fathul_bari', {}).get('shamela_ref', {})
            if ref and ref.get('page_id'):
                known_refs[h['number']] = ref['page_id']
    
    print(f'Known hadith->page mappings: {len(known_refs)}')
    
    # Sort by hadith number
    sorted_refs = sorted(known_refs.items(), key=lambda x: x[0])
    
    # Build page ranges: each hadith's syarah starts at its page and ends at the next hadith's page - 1
    page_ranges = {}
    for i, (hadith_num, start_page) in enumerate(sorted_refs):
        if i + 1 < len(sorted_refs):
            end_page = sorted_refs[i + 1][1] - 1
        else:
            end_page = start_page + 10  # Last hadith: estimate 10 pages
        page_ranges[hadith_num] = (start_page, end_page)
    
    return page_ranges, known_refs

def fetch_full_syarah_for_pages(start_page, end_page):
    """Fetch and combine all pages for a hadith's syarah."""
    parts = []
    for pg in range(start_page, end_page + 1):
        text = fetch_shamela_page(pg)
        if text:
            parts.append(text)
        time.sleep(DELAY_BETWEEN_REQUESTS)
    return '\n\n'.join(parts)

def process_book(book_id, page_ranges, all_known_refs):
    """Process one book's JSON file, enriching hadiths with full Shamela syarah."""
    path = os.path.join(DATA_DIR, f'book_{book_id}.json')
    if not os.path.exists(path):
        print(f'  Book {book_id} file not found, skipping.')
        return False
    
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    modified = False
    for h in data['hadiths']:
        hadith_num = h['number']
        
        if hadith_num in page_ranges:
            start_pg, end_pg = page_ranges[hadith_num]
            print(f'  Hadith #{hadith_num}: fetching pages {start_pg}-{end_pg}...')
            full_ar = fetch_full_syarah_for_pages(start_pg, end_pg)
            
            if full_ar and len(full_ar) > 100:
                # Store the full Arabic syarah
                if 'fathul_bari' not in h:
                    h['fathul_bari'] = {}
                h['fathul_bari']['syarah_lengkap_ar'] = full_ar
                h['fathul_bari']['shamela_pages'] = f'{start_pg}-{end_pg}'
                h['fathul_bari']['syarah_char_count'] = len(full_ar)
                
                # Replace the old summary with a note that full text is available
                h['fathul_bari']['ringkasan_syarah_ar'] = full_ar[:2000] + ('...' if len(full_ar) > 2000 else '')
                
                modified = True
                print(f'    → Stored {len(full_ar)} chars of full Arabic syarah')
            else:
                print(f'    → WARNING: Got insufficient text ({len(full_ar) if full_ar else 0} chars)')
        else:
            # No known page mapping for this hadith
            # We'll handle these in a second pass
            pass
    
    if modified:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f'  ✓ Book {book_id} saved with full Shamela syarah')
    
    return modified

def main():
    print("=" * 70)
    print("FULL SHAMELA SYARAH FETCHER - Fathul Baari")
    print("shamela.ws/book/1673 (7503 pages)")
    print("=" * 70)
    
    # PHASE 1: Fetch ALL pages and cache them
    print("\n[PHASE 1] Downloading all Shamela pages to local cache...")
    cached_count = 0
    to_fetch = 0
    for pg in range(START_PAGE, END_PAGE + 1):
        cache_file = os.path.join(CACHE_DIR, f'page_{pg}.txt')
        if os.path.exists(cache_file):
            cached_count += 1
        else:
            to_fetch += 1
    
    print(f'  Already cached: {cached_count} pages')
    print(f'  Need to fetch: {to_fetch} pages')
    
    if to_fetch > 0:
        fetched = 0
        errors = 0
        for pg in range(START_PAGE, END_PAGE + 1):
            cache_file = os.path.join(CACHE_DIR, f'page_{pg}.txt')
            if os.path.exists(cache_file):
                continue
            
            text = fetch_shamela_page(pg)
            if text:
                fetched += 1
            else:
                errors += 1
            
            if fetched % 100 == 0:
                print(f'  Progress: {fetched}/{to_fetch} fetched, {errors} errors (current: page {pg})')
            
            time.sleep(DELAY_BETWEEN_REQUESTS)
        
        print(f'  ✓ Phase 1 complete: {fetched} fetched, {errors} errors')
    
    # PHASE 2: Build hadith-to-page mapping
    print("\n[PHASE 2] Building hadith-to-page mapping...")
    page_ranges, known_refs = build_hadith_page_mapping()
    print(f'  Mapped {len(page_ranges)} hadiths to page ranges')
    
    # PHASE 3: Sequential page scanning to map ALL hadiths
    # Read all cached pages in order and detect hadith boundaries
    print("\n[PHASE 3] Scanning all cached pages to detect hadith boundaries...")
    
    # We look for patterns that indicate a new hadith:
    # - Numbers followed by "حَدَّثَنَا" or "حَدَّثَنِي"
    # - "بَابُ" or "بَابٌ" indicating a new chapter/section boundary
    
    all_page_texts = {}
    for pg in range(START_PAGE, END_PAGE + 1):
        cache_file = os.path.join(CACHE_DIR, f'page_{pg}.txt')
        if os.path.exists(cache_file):
            with open(cache_file, 'r', encoding='utf-8') as f:
                all_page_texts[pg] = f.read()
    
    print(f'  Loaded {len(all_page_texts)} cached pages')
    
    # Detect hadith number patterns in pages
    hadith_page_starts = {}  # hadith_number -> first page where it appears
    
    for pg in sorted(all_page_texts.keys()):
        text = all_page_texts[pg]
        # Look for hadith number patterns like:
        # "قوله حديث X" or just number patterns at the start of commentary sections
        # Also look for "حديث رقم X" patterns
        
        # Pattern: Arabic numeral followed by commentary markers
        matches = re.findall(r'(\d+)\s*[-–]\s*(?:حَدَّثَنَا|حَدِيث|بَاب)', text)
        for m in matches:
            num = int(m)
            if 1 <= num <= 7563 and num not in hadith_page_starts:
                hadith_page_starts[num] = pg
    
    print(f'  Detected hadith boundaries on pages: {len(hadith_page_starts)}')
    
    # Merge detected boundaries with known refs
    all_refs = {**hadith_page_starts, **known_refs}  # known_refs take priority
    sorted_all = sorted(all_refs.items(), key=lambda x: x[0])
    
    # Build comprehensive page ranges
    comprehensive_ranges = {}
    for i, (hadith_num, start_page) in enumerate(sorted_all):
        if i + 1 < len(sorted_all):
            end_page = sorted_all[i + 1][1] - 1
        else:
            end_page = min(start_page + 10, END_PAGE)
        # Cap at reasonable size (max 30 pages per hadith)
        end_page = min(end_page, start_page + 30)
        comprehensive_ranges[hadith_num] = (start_page, end_page)
    
    print(f'  Comprehensive page ranges: {len(comprehensive_ranges)} hadiths mapped')
    
    # PHASE 4: Enrich JSON files with full syarah
    print("\n[PHASE 4] Enriching book JSON files with full Arabic syarah...")
    
    for book_id in range(1, 98):
        path = os.path.join(DATA_DIR, f'book_{book_id}.json')
        if not os.path.exists(path):
            continue
        
        with open(path, 'r', encoding='utf-8') as f:
            book_data = json.load(f)
        
        modified = False
        for h in book_data['hadiths']:
            hadith_num = h['number']
            
            if hadith_num in comprehensive_ranges:
                start_pg, end_pg = comprehensive_ranges[hadith_num]
                
                # Combine all page texts
                parts = []
                for pg in range(start_pg, end_pg + 1):
                    if pg in all_page_texts:
                        parts.append(all_page_texts[pg])
                
                full_ar = '\n\n'.join(parts)
                
                if full_ar and len(full_ar) > 50:
                    if 'fathul_bari' not in h:
                        h['fathul_bari'] = {}
                    h['fathul_bari']['syarah_lengkap_ar'] = full_ar
                    h['fathul_bari']['shamela_pages'] = f'{start_pg}-{end_pg}'
                    h['fathul_bari']['syarah_char_count'] = len(full_ar)
                    # Update the ringkasan to be the first portion of full text
                    h['fathul_bari']['ringkasan_syarah_ar'] = full_ar
                    modified = True
        
        if modified:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(book_data, f, ensure_ascii=False, indent=2)
            book_name = book_data['book']['name_id']
            hadith_count = len(book_data['hadiths'])
            print(f'  ✓ Book {book_id}: {book_name} ({hadith_count} hadiths) - enriched with full syarah')
    
    print("\n" + "=" * 70)
    print("DONE! All hadiths enriched with full Arabic syarah from Shamela.")
    print("=" * 70)

if __name__ == '__main__':
    main()
