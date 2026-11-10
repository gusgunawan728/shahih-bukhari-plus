import json

with open("gdrive_catalog.json", "r", encoding="utf-8") as f:
    catalog = json.load(f)

print("Files in Google Drive Catalog:")
for k, v in catalog.items():
    print(f"- {k}: {v}")
