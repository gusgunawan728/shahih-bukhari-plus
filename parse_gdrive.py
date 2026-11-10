import urllib.request, re, json

url = 'https://drive.google.com/drive/folders/110GKl6R4-wuH_luAiMiYByBLs0gEQIdr?usp=sharing'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

matches = re.findall(r'data-id="([a-zA-Z0-9_-]{20,})"[^>]*?data-tooltip="([^"]+?\.pdf)', html)
print('Matches found:', len(matches))

mapping = {}
for fid, name in matches:
    clean_name = name.strip()
    mapping[clean_name] = fid
    print(f"{clean_name} -> {fid}")

# Also check for data-id in parent or child
if len(mapping) < 20:
    blocks = re.findall(r'data-id="([a-zA-Z0-9_-]{20,})".{1,300}?<strong[^>]*>([^<]+?\.pdf)</strong>', html, re.DOTALL)
    print('Blocks found:', len(blocks))
    for fid, name in blocks:
        mapping[name.strip()] = fid

with open('gdrive_catalog.json', 'w', encoding='utf-8') as f:
    json.dump(mapping, f, indent=2, ensure_ascii=False)

print(f"Total cataloged files: {len(mapping)}")
