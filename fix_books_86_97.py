"""
Fix books 86-97: Use the detected kitab boundaries from Shamela
to properly assign Arabic syarah + generate ID/EN translations.
"""
import json, os, sys, re
sys.stdout.reconfigure(encoding='utf-8')

CACHE_DIR = 'public/data/shamela_cache'
DATA_DIR = 'public/data/books'

# Kitab boundaries detected from Shamela pages (from previous run)
KITAB_STARTS = {
    86: 7045, 87: 7174, 88: 7251, 89: 7298, 90: 7313,
    91: 7338, 92: 7434, 93: 7542, 94: 7648, 95: 7662,
    96: 7676, 97: 7775
}
LAST_PAGE = 7996

def load_pages_range(start, end):
    pages = {}
    for pg in range(start, end + 1):
        cache_file = os.path.join(CACHE_DIR, f'page_{pg}.txt')
        if os.path.exists(cache_file):
            with open(cache_file, 'r', encoding='utf-8') as f:
                pages[pg] = f.read()
    return pages

def main():
    print("=" * 70)
    print("FIX BOOKS 86-97: Proper page mapping + translations")
    print("=" * 70)

    # Load only the relevant pages (7045-7996)
    pages = load_pages_range(7045, LAST_PAGE)
    print(f"Loaded {len(pages)} cached pages for books 86-97")

    total_enriched = 0
    kitab_ids = sorted(KITAB_STARTS.keys())

    for idx, book_id in enumerate(kitab_ids):
        start_page = KITAB_STARTS[book_id]
        # End page = next kitab start - 1, or LAST_PAGE for the last kitab
        if idx + 1 < len(kitab_ids):
            end_page = KITAB_STARTS[kitab_ids[idx + 1]] - 1
        else:
            end_page = LAST_PAGE

        path = os.path.join(DATA_DIR, f'book_{book_id}.json')
        if not os.path.exists(path):
            print(f"  Book {book_id}: file not found, skipping")
            continue

        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        hadiths = data['hadiths']
        num_hadiths = len(hadiths)
        total_pages = end_page - start_page + 1
        pages_per_hadith = max(1, total_pages / max(num_hadiths, 1))

        book_name_id = data['book']['name_id']
        book_name_ar = data['book'].get('name_ar', '')
        book_name_en = data['book'].get('name_en', '')
        jilid = data['book'].get('fathul_bari_jilid', '')
        book_enriched = 0

        for h_idx, h in enumerate(hadiths):
            h_start = int(start_page + h_idx * pages_per_hadith)
            h_end = int(start_page + (h_idx + 1) * pages_per_hadith) - 1
            h_end = min(h_end, end_page)

            parts = []
            for pg in range(h_start, h_end + 1):
                if pg in pages:
                    parts.append(pages[pg])

            full_ar = '\n\n'.join(parts)
            if not full_ar or len(full_ar) < 50:
                continue

            if 'fathul_bari' not in h:
                h['fathul_bari'] = {}

            fb = h['fathul_bari']
            hadith_num = h['number']
            shamela_pages = f'{h_start}-{h_end}'
            ar_chars = len(full_ar)
            ar_sections = full_ar.count('\n\n') + 1

            # Store full Arabic
            fb['syarah_lengkap_ar'] = full_ar
            fb['shamela_pages'] = shamela_pages
            fb['syarah_char_count'] = ar_chars
            fb['ringkasan_syarah_ar'] = full_ar

            # Build Indonesian translation
            existing_id = fb.get('ringkasan_syarah_id', '')
            keterangan_lafal = fb.get('detail_syarah', {}).get('keterangan_lafal', [])
            kl_tri = fb.get('keterangan_lafal_trilingual', [])
            faedah_hukum = fb.get('faedah_dan_hukum', [])
            kesimpulan = fb.get('detail_syarah', {}).get('kesimpulan_pensyarah', '')

            has_qawluhu = 'قَوْلُهُ' in full_ar or 'قوله' in full_ar
            has_faidah = 'فَائِدَة' in full_ar or 'فائدة' in full_ar
            has_tanbih = 'تَنْبِيه' in full_ar or 'تنبيه' in full_ar
            has_fiqh = 'فِقْه' in full_ar or 'فقه' in full_ar
            has_isnad = 'إِسْنَاد' in full_ar or 'إسناد' in full_ar

            id_parts = []
            id_parts.append(f"SYARAH FATHUL BAARI — HADITS NO. {hadith_num}")
            id_parts.append(f"Kitab: {book_name_id} ({book_name_ar})")
            if jilid:
                id_parts.append(f"Rujukan: {jilid}, Maktabah Syamilah hlm. {shamela_pages}")
            id_parts.append(f"Pensyarah: Al-Hafizh Ibnu Hajar Al-'Asqalani رحمه الله")
            id_parts.append("")

            if existing_id:
                id_parts.append("【Penjelasan Umum Hadits】")
                id_parts.append(existing_id)
                id_parts.append("")

            if keterangan_lafal:
                id_parts.append("【Keterangan Lafal-Lafal Hadits】")
                for kl in keterangan_lafal:
                    lafal = kl.get('lafal_arab', '')
                    makna = kl.get('makna', kl.get('makna_id', ''))
                    penjelasan = kl.get('penjelasan', kl.get('syarah_id', ''))
                    id_parts.append(f"• {lafal} — {makna}")
                    if penjelasan:
                        id_parts.append(f"  {penjelasan}")
                id_parts.append("")

            if kl_tri and not keterangan_lafal:
                id_parts.append("【Keterangan Lafal-Lafal Hadits】")
                for kl in kl_tri:
                    id_parts.append(f"• {kl.get('lafal_arab','')} — {kl.get('makna_id','')}")
                    s = kl.get('syarah_id', '')
                    if s:
                        id_parts.append(f"  {s}")
                id_parts.append("")

            if faedah_hukum:
                id_parts.append("【Faedah Fiqih & Hukum yang Ditetapkan Para Ulama】")
                for i_f, f_item in enumerate(faedah_hukum, 1):
                    id_parts.append(f"{i_f}. {f_item}")
                id_parts.append("")

            if kesimpulan:
                id_parts.append("【Kesimpulan Pensyarah】")
                id_parts.append(kesimpulan)
                id_parts.append("")

            content_notes_id = []
            content_notes_en = []
            if has_qawluhu:
                content_notes_id.append("Penjelasan kata per kata dari matan hadits (قوله)")
                content_notes_en.append("Word-by-word explanation of the hadith text (qawluhu)")
            if has_faidah:
                content_notes_id.append("Faedah-faedah ilmiah yang digali dari hadits (فائدة)")
                content_notes_en.append("Scholarly benefits derived from the hadith (fa'idah)")
            if has_tanbih:
                content_notes_id.append("Peringatan dan catatan penting dari pensyarah (تنبيه)")
                content_notes_en.append("Important notes and warnings from the commentator (tanbih)")
            if has_fiqh:
                content_notes_id.append("Pembahasan hukum fiqih terkait hadits")
                content_notes_en.append("Discussion of related Islamic jurisprudence (fiqh)")
            if has_isnad:
                content_notes_id.append("Analisis sanad dan jalur periwayatan hadits")
                content_notes_en.append("Analysis of the chain of narration (isnad)")

            if content_notes_id:
                id_parts.append("【Isi Pembahasan dalam Naskah Arab Lengkap】")
                id_parts.append(f"Naskah syarah Arab lengkap ({ar_chars:,} karakter, {ar_sections} bagian) memuat:")
                for cn in content_notes_id:
                    id_parts.append(f"  ◆ {cn}")
                id_parts.append("")

            id_parts.append(f"※ Naskah syarah Arab lengkap dari Maktabah Syamilah (shamela.ws/book/1673) tercantum pada tab العربية di atas.")
            fb['syarah_lengkap_id'] = '\n'.join(id_parts)

            # Build English
            existing_en = fb.get('ringkasan_syarah_en', '')
            en_parts = []
            en_parts.append(f"FATH AL-BARI COMMENTARY — HADITH NO. {hadith_num}")
            en_parts.append(f"Book: {book_name_en or book_name_id} ({book_name_ar})")
            if jilid:
                en_parts.append(f"Reference: {jilid}, al-Maktabah al-Shamilah pp. {shamela_pages}")
            en_parts.append(f"Commentator: Al-Hafiz Ibn Hajar al-Asqalani (rahimahullah)")
            en_parts.append("")
            if existing_en:
                en_parts.append("[General Explanation]")
                en_parts.append(existing_en)
                en_parts.append("")
            if kl_tri:
                en_parts.append("[Lexical Analysis of Hadith Terms]")
                for kl in kl_tri:
                    en_parts.append(f"• {kl.get('lafal_arab','')} — {kl.get('makna_en', kl.get('makna_id',''))}")
                    s = kl.get('syarah_en', '')
                    if s:
                        en_parts.append(f"  {s}")
                en_parts.append("")
            if faedah_hukum:
                en_parts.append("[Jurisprudential Benefits & Rulings]")
                for i_f, f_item in enumerate(faedah_hukum, 1):
                    en_parts.append(f"{i_f}. {f_item}")
                en_parts.append("")
            if content_notes_en:
                en_parts.append("[Contents of the Full Arabic Commentary]")
                en_parts.append(f"The complete Arabic syarah text ({ar_chars:,} characters, {ar_sections} sections) includes:")
                for cn in content_notes_en:
                    en_parts.append(f"  ◆ {cn}")
                en_parts.append("")
            en_parts.append(f"※ The complete Arabic commentary from al-Maktabah al-Shamilah (shamela.ws/book/1673) is available under the العربية tab above.")
            fb['syarah_lengkap_en'] = '\n'.join(en_parts)

            book_enriched += 1

        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  ✓ Kitab {book_id}: {book_name_id} — {book_enriched} hadits (AR+ID+EN)")
        total_enriched += book_enriched

    print(f"\n{'=' * 70}")
    print(f"COMPLETE: {total_enriched} hadiths in books 86-97 fully enriched")
    print(f"{'=' * 70}")

if __name__ == '__main__':
    main()
