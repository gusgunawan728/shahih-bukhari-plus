# -*- coding: utf-8 -*-
"""
Enricher Otomatis Syarah Fathul Baari (Shamela #1673 + PDF 36 Jilid + English)
Untuk Seluruh 97 Kitab Shahih Bukhari
Project Shahih Bukhari - Digitab Team
"""
import os
import json

BOOKS_DIR = os.path.join("public", "data", "books")
META_PATH = os.path.join("public", "data", "books_metadata.json")
GDRIVE_PATH = os.path.join("public", "data", "gdrive_library.json")

def enrich_all_books():
    print("=== Memulai Pengayaan Syarah Fathul Baari untuk 97 Kitab ===")
    
    with open(META_PATH, "r", encoding="utf-8") as f:
        books_meta = json.load(f)
        
    meta_dict = {b['id']: b for b in books_meta}

    total_hadiths_processed = 0

    for book_id in range(1, 98):
        file_path = os.path.join(BOOKS_DIR, f"book_{book_id}.json")
        if not os.path.exists(file_path):
            continue

        with open(file_path, "r", encoding="utf-8") as f:
            bdata = json.load(f)

        bmeta = meta_dict.get(book_id, {})
        jilid_str = bmeta.get("fathul_bari_jilid", "Jilid 1")
        filename_pdf = bmeta.get("fathul_bari_file", "Fathul Baari Jilid 1.pdf")
        preview_url = bmeta.get("fathul_bari_preview", "")
        kitab_name_id = bmeta.get("name_id", f"Kitab {book_id}")
        kitab_name_ar = bmeta.get("name_ar", "")
        kitab_name_en = bmeta.get("name_en", "")

        for h in bdata.get("hadiths", []):
            num = h["number"]
            total_hadiths_processed += 1
            
            fb = h.get("fathul_bari") or {}
            
            # Ensure base fields
            fb["jilid"] = jilid_str
            fb["filename"] = filename_pdf
            fb["view_url"] = preview_url
            fb["preview_url"] = preview_url
            fb["scope"] = f"Kitab #{book_id} ({kitab_name_id})"

            # Shamela general deep link if not specifically pinned
            if "shamela_ref" not in fb:
                fb["shamela_ref"] = {
                    "book_id": 1673,
                    "url": f"https://shamela.ws/book/1673",
                    "scope_ar": f"صحيح البخاري - {kitab_name_ar}"
                }

            # Indonesian PDF reference
            if "indonesia_ref" not in fb:
                fb["indonesia_ref"] = {
                    "jilid": jilid_str,
                    "filename": filename_pdf,
                    "preview_url": preview_url
                }

            h["fathul_bari"] = fb

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(bdata, f, ensure_ascii=False, indent=2)

    print(f"=== Berhasil Memperkaya 97 Kitab ({total_hadiths_processed} Hadits) ===")

if __name__ == "__main__":
    enrich_all_books()
