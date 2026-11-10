# -*- coding: utf-8 -*-
"""
Pipeline Otomatis Konversi Ebook Syarah Shahih Bukhari (Fathul Baari) ke JSON
Dibuat untuk Project Shahih Bukhari - Digitab Team
"""
import os
import json
import fitz  # PyMuPDF

INPUT_DIR = "ebooks_input"
OUTPUT_DIR = os.path.join("public", "data", "syarah")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def scan_all_volumes():
    print("=" * 60)
    print("  DIGITAB - ENSIKLOPEDIA HADITS & SYARAH SHAHIH BUKHARI")
    print("  Digitab Team")
    print("  Pemeriksaan Massal Ebook Syarah PDF di folder 'ebooks_input'")
    print("=" * 60)

    pdf_files = sorted([f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".pdf")])
    print(f"Total file terdeteksi: {len(pdf_files)} PDF Ebook Syarah\n")

    summary_list = []
    for idx, fname in enumerate(pdf_files, 1):
        fpath = os.path.join(INPUT_DIR, fname)
        size_mb = os.path.getsize(fpath) / (1024 * 1024)
        doc = fitz.open(fpath)
        pages = len(doc)
        doc.close()
        
        info = {
            "no": idx,
            "filename": fname,
            "pages": pages,
            "size_mb": round(size_mb, 2),
            "status": "Siap Diproses ke JSON"
        }
        summary_list.append(info)
        print(f"[{idx:02d}] {fname:<30} | {pages:>4} Hal | {size_mb:>6.2f} MB | {info['status']}")

    manifest_path = os.path.join(OUTPUT_DIR, "syarah_inventory.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(summary_list, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 60)
    print(f"Manifest inventaris tersimpan di: {manifest_path}")
    print("=" * 60)

if __name__ == "__main__":
    scan_all_volumes()
