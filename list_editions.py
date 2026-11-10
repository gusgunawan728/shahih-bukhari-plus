import urllib.request, json

url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    editions = json.loads(resp.read().decode('utf-8'))
    bukhari_eds = {k: v for k, v in editions.items() if 'bukhari' in k.lower()}
    print(f'Available Bukhari editions: {len(bukhari_eds)}')
    for k, v in bukhari_eds.items():
        print(f"{k} | {v.get('language')} | {v.get('name')}")
