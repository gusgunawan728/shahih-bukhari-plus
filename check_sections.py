import json

with open("hadith_data_raw/id.json", "r", encoding="utf-8") as f:
    id_data = json.load(f)

with open("hadith_data_raw/ar.json", "r", encoding="utf-8") as f:
    ar_data = json.load(f)

with open("hadith_data_raw/en.json", "r", encoding="utf-8") as f:
    en_data = json.load(f)

metadata = id_data.get("metadata", {})
sections = metadata.get("sections", {})
section_details = metadata.get("section_details", {})

print(f"Total sections: {len(sections)}")
for k in range(1, 10):
    k_str = str(k)
    print(f"Section {k}: {sections.get(k_str)} | Details: {section_details.get(k_str)}")
