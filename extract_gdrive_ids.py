import urllib.request, re, json

url = "https://drive.google.com/drive/folders/110GKl6R4-wuH_luAiMiYByBLs0gEQIdr?usp=sharing"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
html = urllib.request.urlopen(req).read().decode("utf-8", errors="ignore")

# Find patterns like data-id="..." or ssk="..." with filename
items = []
# Find all occurrences of filename with nearby data-id
file_matches = re.finditer(r'aria-label="([^"]+?\.pdf)[^"]*"[^>]*data-id="([^"]+)"', html)
for m in file_matches:
    items.append({"title": m.group(1), "id": m.group(2)})

# Also check reverse pattern
file_matches2 = re.finditer(r'data-id="([a-zA-Z0-9_-]{25,})"[^>]*aria-label="([^"]+?\.pdf)', html)
for m in file_matches2:
    items.append({"title": m.group(2), "id": m.group(1)})

# Also check for jsname or ssk pattern
file_matches3 = re.findall(r'\["([a-zA-Z0-9_-]{25,})",\["([^"]+?\.pdf)"', html)
for m in file_matches3:
    items.append({"title": m.group(1), "id": m.group(0)})

# Deduplicate
unique_items = {}
for it in items:
    if it["title"] not in unique_items:
        unique_items[it["title"]] = it["id"]

print(f"Extracted {len(unique_items)} files with IDs:")
for k in sorted(unique_items.keys()):
    print(f"{k} => https://drive.google.com/file/d/{unique_items[k]}/view?usp=sharing")

with open("gdrive_files.json", "w", encoding="utf-8") as f:
    json.dump(unique_items, f, indent=2, ensure_ascii=False)
