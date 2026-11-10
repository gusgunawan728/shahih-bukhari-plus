"""
Script Pengolah PDF Ebook Syarah Shahih Bukhari ke JSON
Dibuat untuk Project Shahih Bukhari - Digitab Team
"""
import os
import json
import fitz  # PyMuPDF

INPUT_DIR = "ebooks_input"
OUTPUT_DIR = "syarah_json_output"

os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

def inspect_pdf(pdf_path):
    print(f"\n==========================================")
    print(f"Memeriksa File: {os.path.basename(pdf_path)}")
    print(f"Ukuran File: {os.path.getsize(pdf_path) / (1024*1024):.2f} MB")
    print(f"==========================================")
    
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"Total Halaman: {total_pages}")
    
    # Periksa 5 halaman pertama untuk melihat ketersediaan teks layer
    has_text_layer = False
    sample_text = ""
    for page_idx in range(min(5, total_pages)):
        page = doc[page_idx]
        text = page.get_text()
        if len(text.strip()) > 50:
            has_text_layer = True
            sample_text = text[:300]
            break
            
    if has_text_layer:
        print("[STATUS]: PDF MEMILIKI TEKS LAYER (Bisa langsung diekstrak sangat cepat!)")
        print("\nContoh Teks yang Terbaca:")
        print("------------------------------------------")
        print(sample_text)
        print("------------------------------------------")
    else:
        print("[STATUS]: PDF MURNI GAMBAR / FOTO SCAN (Membutuhkan pipeline OCR)")
        
    doc.close()
    return has_text_layer

if __name__ == "__main__":
    pdf_files = [f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".pdf")]
    if not pdf_files:
        print(f"Folder '{INPUT_DIR}' masih kosong. Silakan salin file PDF ke dalam folder ini.")
    else:
        for f in pdf_files:
            pdf_path = os.path.join(INPUT_DIR, f)
            inspect_pdf(pdf_path)
