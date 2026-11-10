import urllib.request
import re

url = "https://drive.google.com/drive/folders/110GKl6R4-wuH_luAiMiYByBLs0gEQIdr?usp=sharing"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
html = urllib.request.urlopen(req).read().decode("utf-8", errors="ignore")

# Find titles/filenames
matches = re.findall(r'aria-label="([^"]+?\.pdf)', html)
files = sorted(list(set(matches)))
print(f"Total aria-label pdf files: {len(files)}")
for f in files:
    print(f)

# Also check for other patterns
matches2 = re.findall(r'Fathul Baari Jilid \d+\.pdf', html)
print(f"Total regex matches: {len(set(matches2))}")
for f in sorted(list(set(matches2))):
    print(f)
