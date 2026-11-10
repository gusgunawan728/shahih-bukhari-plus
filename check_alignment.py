import json

for lang in ['id', 'ar', 'en', 'urd', 'fra']:
    with open(f'hadith_data_raw/{lang}.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
        h0 = d['hadiths'][0]
        h_last = d['hadiths'][-1]
        print(f"{lang}: count={len(d['hadiths'])}, first={h0['hadithnumber']}, last={h_last['hadithnumber']}")
