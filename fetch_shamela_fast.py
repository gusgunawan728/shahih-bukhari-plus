"""
RESUMED Shamela Fetcher - Faster with concurrent.futures
Fetches remaining pages from shamela.ws/book/1673 with caching.
"""
import urllib.request
import ssl
import re
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

CACHE_DIR = 'public/data/shamela_cache'
START_PAGE = 494
END_PAGE = 7996
os.makedirs(CACHE_DIR, exist_ok=True)

def fetch_one_page(page_id):
    """Fetch & cache one Shamela page. Returns (page_id, char_count) or (page_id, -1) on error."""
    cache_file = os.path.join(CACHE_DIR, f'page_{page_id}.txt')
    if os.path.exists(cache_file):
        return (page_id, 0)  # already cached
    
    url = f'https://shamela.ws/book/1673/{page_id}'
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            html = resp.read().decode('utf-8')
    except Exception as e:
        return (page_id, -1)
    
    nass_starts = [m.start() for m in re.finditer(r'<div[^>]*class="nass[^"]*"', html)]
    if not nass_starts:
        return (page_id, -2)
    
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
                with open(cache_file, 'w', encoding='utf-8') as f:
                    f.write(clean)
                return (page_id, len(clean))
            pos = next_close + 6
    return (page_id, -2)

def main():
    # Count what's already cached
    already_cached = set()
    for f in os.listdir(CACHE_DIR):
        if f.startswith('page_') and f.endswith('.txt'):
            pg = int(f.replace('page_', '').replace('.txt', ''))
            already_cached.add(pg)
    
    all_pages = list(range(START_PAGE, END_PAGE + 1))
    to_fetch = [p for p in all_pages if p not in already_cached]
    
    print(f'Already cached: {len(already_cached)}')
    print(f'Need to fetch: {len(to_fetch)}')
    print(f'Starting concurrent download with 5 threads...\n')
    
    fetched = 0
    errors = 0
    start_time = time.time()
    
    # Use 5 threads to speed up - respectful but faster
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {}
        batch_size = 50
        
        for batch_start in range(0, len(to_fetch), batch_size):
            batch = to_fetch[batch_start:batch_start + batch_size]
            futures = {executor.submit(fetch_one_page, pg): pg for pg in batch}
            
            for future in as_completed(futures):
                page_id, result = future.result()
                if result > 0:
                    fetched += 1
                elif result == 0:
                    pass  # already cached
                else:
                    errors += 1
            
            total_done = batch_start + len(batch)
            elapsed = time.time() - start_time
            rate = total_done / elapsed if elapsed > 0 else 0
            eta_min = (len(to_fetch) - total_done) / rate / 60 if rate > 0 else 0
            
            if total_done % 200 == 0 or total_done == len(to_fetch):
                print(f'  Progress: {total_done}/{len(to_fetch)} ({fetched} new, {errors} errors) '
                      f'[{rate:.1f} pg/s, ETA: {eta_min:.1f} min]')
            
            # Small delay between batches
            time.sleep(0.1)
    
    total_cached = len([f for f in os.listdir(CACHE_DIR) if f.endswith('.txt')])
    print(f'\n=== DOWNLOAD COMPLETE ===')
    print(f'Total cached pages: {total_cached}')
    print(f'New pages fetched: {fetched}')
    print(f'Errors: {errors}')
    print(f'Time: {time.time() - start_time:.0f}s')

if __name__ == '__main__':
    main()
