import urllib.request
import json
import os
import time

print("Starting complete data preparation for Shahih Bukhari...")

os.makedirs("hadith_data_raw", exist_ok=True)
os.makedirs("public_data/books", exist_ok=True)

# 1. Download Indonesian, Arabic, English
editions = {
    'id': 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ind-bukhari.min.json',
    'ar': 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.min.json',
    'en': 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari.min.json'
}

raw_data = {}
for lang, url in editions.items():
    file_path = f"hadith_data_raw/{lang}.json"
    if os.path.exists(file_path):
        print(f"Loading cached {lang}...")
        with open(file_path, "r", encoding="utf-8") as f:
            raw_data[lang] = json.load(f)
    else:
        print(f"Downloading {lang} from {url}...")
        t0 = time.time()
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            with open(file_path, "w", encoding="utf-8") as out:
                out.write(content)
            raw_data[lang] = json.loads(content)
            print(f"Downloaded {lang} in {time.time()-t0:.2f}s ({len(content)/1024/1024:.2f} MB)")

print("Indonesian hadiths:", len(raw_data['id'].get('hadiths', [])))
print("Arabic hadiths:", len(raw_data['ar'].get('hadiths', [])))
print("English hadiths:", len(raw_data['en'].get('hadiths', [])))
