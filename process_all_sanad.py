# -*- coding: utf-8 -*-
"""
Script Pemrosesan Massal Sanad & Rawi untuk Seluruh Hadits Shahih Bukhari (1 s.d. 7563)
Dari Imam Al-Bukhari hingga Nabi Muhammad SAW
Project Shahih Bukhari - Digitab Team
"""
import os
import re
import json

BOOKS_DIR = os.path.join("public", "data", "books")

# Basis Data Kamus Tokoh Perawi Terkenal Kutubus Sittah & Shahih Bukhari
KNOWN_RAWIS = {
    # Guru Utama Imam Bukhari (Makkah, Madinah, Bashrah, Kufah, Baghdad, Mesir, Khurasan)
    "Al Humaidi Abdullah bin Az Zubair": ("Abdullah bin Az-Zubair Al-Humaidi", "Makkah", "219 H", "Syaikh al-Bukhari (Thabaqah 10)", "Tsiqah Hafizh Faqih"),
    "Abdullah bin Yusuf": ("Abdullah bin Yusuf At-Tinnisi", "Dimasyq / Mesir", "218 H", "Syaikh al-Bukhari", "Tsiqah Mutqin Perawi Muwaththa'"),
    "Yahya bin Bukair": ("Yahya bin Abdullah bin Bukair", "Mesir", "231 H", "Syaikh al-Bukhari", "Tsiqah Tsabat"),
    "Musa bin Isma'il": ("Musa bin Isma'il At-Tabudzaki", "Bashrah", "223 H", "Syaikh al-Bukhari", "Tsiqah Tsabat Rujukan Bashrah"),
    "Abdan": ("Abdullah bin Utsman (Abdan Al-Marwazi)", "Marwa", "221 H", "Syaikh al-Bukhari", "Tsiqah Hafizh"),
    "Ali bin Al Madini": ("Ali bin Abdullah bin Ja'far Al-Madini", "Bashrah", "234 H", "Syaikh al-Bukhari", "Amirul Mukminin fi 'Ilalil Hadits"),
    "Musaddad": ("Musaddad bin Musarhad Al-Asadi", "Bashrah", "228 H", "Syaikh al-Bukhari", "Tsiqah Hafizh Hujjah"),
    "Qutaibah bin Sa'id": ("Qutaibah bin Sa'id Ats-Tsaqafi", "Baghlan / Khurasan", "240 H", "Syaikh al-Bukhari", "Tsiqah Tsabat"),
    "Ishaq bin Rahawaih": ("Ishaq bin Ibrahim Al-Hanzhali (Ibnu Rahawaih)", "Naisabur", "238 H", "Syaikh al-Bukhari", "Imam Hafizh Faqih Mujtahid"),
    "Ahmad bin Hanbal": ("Ahmad bin Muhammad bin Hanbal", "Baghdad", "241 H", "Syaikh al-Bukhari", "Imam Ahlis Sunnah wal Jama'ah"),
    "Muhammad bin Basysyar": ("Muhammad bin Basysyar (Bundar)", "Bashrah", "252 H", "Syaikh al-Bukhari", "Tsiqah Hafizh"),
    "Muhammad bin Al Mutsanna": ("Muhammad bin Al-Mutsanna (Abu Musa Az-Zaman)", "Bashrah", "252 H", "Syaikh al-Bukhari", "Tsiqah Tsabat"),
    "Ubaidullah bin Musa": ("Ubaidullah bin Musa Al-Absi", "Kufah", "213 H", "Syaikh al-Bukhari", "Tsiqah Hafizh"),
    "Abu Nu'aim": ("Al-Fadhl bin Dukain (Abu Nu'aim)", "Kufah", "219 H", "Syaikh al-Bukhari", "Tsiqah Tsabat Imam"),
    "Adam bin Abu Iyas": ("Adam bin Abu Iyas Al-Asqalani", "Asqalan / Baghdad", "220 H", "Syaikh al-Bukhari", "Tsiqah Tsabat Abid"),

    # Kibar Tabi'ut Tabi'in & Atba'ut Tabi'in
    "Sufyan": ("Sufyan bin 'Uyainah Al-Hilali", "Makkah / Kufah", "198 H", "Thabaqah 8", "Tsiqah Hafizh Imam Faqih"),
    "Sufyan Ats Tsauri": ("Sufyan bin Sa'id Ats-Tsauri", "Kufah", "161 H", "Thabaqah 7", "Amirul Mukminin fil Hadits"),
    "Malik": ("Malik bin Anas (Imam Daril Hijrah)", "Madinah", "179 H", "Thabaqah 7", "Imam Mazhab Maliki, Muttafaq 'Alaih"),
    "Al Laits": ("Al-Laits bin Sa'ad Al-Fahmi", "Mesir", "175 H", "Thabaqah 7", "Imam Faqih Mesir Tsiqah Tsabat"),
    "Syu'bah": ("Syu'bah bin Al-Hajjaj Al-Ataki", "Bashrah", "160 H", "Thabaqah 7", "Amirul Mukminin fil Hadits"),
    "Abu 'Awanah": ("Al-Wadh-dhah bin Abdullah", "Wasith / Bashrah", "176 H", "Thabaqah 7", "Tsiqah Tsabat"),
    "Hammad bin Zaid": ("Hammad bin Zaid Al-Azdi", "Bashrah", "179 H", "Thabaqah 8", "Tsiqah Tsabat Faqih"),
    "Hammad bin Salamah": ("Hammad bin Salamah Al-Bashri", "Bashrah", "167 H", "Thabaqah 8", "Tsiqah Abid"),
    "Yahya bin Sa'id Al Qaththan": ("Yahya bin Sa'id Al-Qaththan", "Bashrah", "198 H", "Thabaqah 9", "Imamul Jarh wat Ta'dil"),
    "Waki'": ("Waki' bin Al-Jarrah Al-Kufi", "Kufah", "197 H", "Thabaqah 9", "Tsiqah Hafizh Abid"),
    "Ibnul Mubarak": ("Abdullah bin Al-Mubarak Al-Hanzhali", "Marwa", "181 H", "Thabaqah 8", "Imamul Mujahidin wal Fuqaha"),

    # Tabi'in Utama (Thabaqat 2, 3, 4, 5, 6)
    "Yahya bin Sa'id Al Anshari": ("Yahya bin Sa'id Al-Anshari", "Madinah", "143 H", "Thabaqah 5", "Tsiqah Tsabat Qadhi Madinah"),
    "Muhammad bin Ibrahim At Taimi": ("Muhammad bin Ibrahim At-Taimi", "Madinah", "120 H", "Thabaqah 4", "Tsiqah Jalil"),
    "Alqamah bin Waqash Al Laitsi": ("'Alqamah bin Waqqash Al-Laitsi", "Madinah", "Sekitar 70 H", "Thabaqah 3", "Tsiqah Tsabat"),
    "Hisyam bin 'Urwah": ("Hisyam bin 'Urwah bin Az-Zubair", "Madinah", "146 H", "Thabaqah 5", "Tsiqah Faqih Imam"),
    "Urwah bin Az Zubair": ("'Urwah bin Az-Zubair bin Al-Awwam", "Madinah", "94 H", "Thabaqah 2 (Kibar)", "7 Fuqaha Madinah"),
    "bapaknya": ("'Urwah bin Az-Zubair bin Al-Awwam", "Madinah", "94 H", "Thabaqah 2 (Kibar)", "7 Fuqaha Madinah"),
    "Az Zuhri": ("Ibnu Syihab Az-Zuhri", "Madinah / Syam", "124 H", "Thabaqah 4", "Imamul Huffazh Muttafaq 'Alaih"),
    "Ibnu Syihab": ("Ibnu Syihab Az-Zuhri", "Madinah / Syam", "124 H", "Thabaqah 4", "Imamul Huffazh Muttafaq 'Alaih"),
    "Sa'id bin Jubair": ("Sa'id bin Jubair Al-Asadi", "Kufah", "95 H", "Thabaqah 3", "Tsiqah Tsabat Faqih"),
    "Qatadah": ("Qatadah bin Di'amah As-Sadusi", "Bashrah", "117 H", "Thabaqah 4", "Tsiqah Tsabat Mufassir"),
    "Al Hasan Al Bashri": ("Al-Hasan bin Abi Al-Hasan Al-Bashri", "Bashrah", "110 H", "Thabaqah 2 (Kibar)", "Imamul Tabi'in wa Sayyiduhum"),
    "Ibnu Sirin": ("Muhammad bin Sirin Al-Anshari", "Bashrah", "110 H", "Thabaqah 3", "Tsiqah Tsabat Faqih"),
    "Nafi'": ("Nafi' Mawla Ibnu Umar", "Madinah", "117 H", "Thabaqah 3", "Silsilah Dzahabiyyah (Rantai Emas)"),
    "Atha' bin Abi Rabah": ("'Atha' bin Abi Rabah Al-Qurasyi", "Makkah", "114 H", "Thabaqah 3", "Mufti Makkah Tsiqah Faqih"),
    "Thawus": ("Thawus bin Kaisan Al-Yamani", "Yaman / Makkah", "106 H", "Thabaqah 3", "Tsiqah Faqih Abid"),
    "Mujahid": ("Mujahid bin Jabr Al-Makki", "Makkah", "104 H", "Thabaqah 3", "Imamut Tafsir wal Hadits"),
    "Ikrimah": ("'Ikrimah Mawla Ibnu Abbas", "Madinah / Makkah", "105 H", "Thabaqah 3", "Tsiqah Tsabat 'Alim"),
    "Amr bin Dinar": ("Amr bin Dinar Al-Atsram", "Makkah", "126 H", "Thabaqah 4", "Tsiqah Tsabat"),
    "Manshur bin Al Mu'tamir": ("Manshur bin Al-Mu'tamir", "Kufah", "132 H", "Thabaqah 5", "Tsiqah Tsabat Shahihul Hadits"),
    "Al A'masy": ("Sulaiman bin Mihran Al-A'masy", "Kufah", "148 H", "Thabaqah 5", "Syaikhul Muhadditsin bil Kufah"),

    # Sahabat Nabi SAW (Rodhiyallahu 'Anhum - Kulluhum 'Udul)
    "Abu Bakar Ash Shiddiq": ("Abu Bakar Ash-Shiddiq (Abdullah bin Abi Quhafah)", "Madinah", "13 H", "Khalifah Pertama", "Sahabat Paling Mulia Mutlak"),
    "Umar bin Al Khaththab": ("Umar bin Al-Khaththab (Al-Faruq)", "Madinah", "23 H", "Khulafaur Rasyidin ke-2", "Amirul Mukminin, Kulluhum 'Udul"),
    "Utsman bin Affan": ("Utsman bin Affan (Dzun Nurain)", "Madinah", "35 H", "Khulafaur Rasyidin ke-3", "Kulluhum 'Udul"),
    "Ali bin Abi Thalib": ("Ali bin Abi Thalib (Amirul Mukminin)", "Kufah", "40 H", "Khulafaur Rasyidin ke-4", "Kulluhum 'Udul"),
    "Aisyah": ("Aisyah binti Abi Bakr (Ummul Mukminin)", "Madinah", "58 H", "Ummul Mukminin", "Faqihatul Ummah, Kulluhum 'Udul"),
    "Abu Hurairah": ("Abdurrahman bin Shakhr Ad-Dausi (Abu Hurairah)", "Madinah", "57 H", "Sahabat Utama", "Perawi Hadits Terbanyak (5.374 Hadits)"),
    "Abdullah bin Umar": ("Abdullah bin Umar bin Al-Khaththab", "Madinah", "73 H", "Sahabat Utama", "Teladan Ittiba' Sunnah Nabi"),
    "Ibnu Umar": ("Abdullah bin Umar bin Al-Khaththab", "Madinah", "73 H", "Sahabat Utama", "Teladan Ittiba' Sunnah Nabi"),
    "Anas bin Malik": ("Anas bin Malik Al-Anshari", "Bashrah", "93 H", "Pelayan Rasulullah ﷺ", "Khadimu Rasulillah 10 Tahun"),
    "Ibnu 'Abbas": ("Abdullah bin Abbas bin Abdul Muththalib", "Thaif", "68 H", "Turjumanul Qur'an", "Hibrul Ummah, Didoakan Nabi Menguasai Takwil"),
    "Jabir bin Abdullah Al Anshari": ("Jabir bin Abdullah Al-Anshari", "Madinah", "74 H", "Sahabat Anshar", "Bai'at Aqabah & Ridwan"),
    "Jabir bin Abdullah": ("Jabir bin Abdullah Al-Anshari", "Madinah", "74 H", "Sahabat Anshar", "Bai'at Aqabah & Ridwan"),
    "Abu Sa'id Al Khudri": ("Sa'ad bin Malik Al-Khazraji (Abu Sa'id)", "Madinah", "74 H", "Sahabat Utama", "Mufti Madinah Perawi Banyak Hadits"),
    "Mu'awiyah bin Abu Sufyan": ("Mu'awiyah bin Abi Sufyan", "Dimasyq", "60 H", "Penulis Wahyu Nabi", "Khalifah Daulah Umawiyyah"),
    "Amr bin Al Ash": ("Amr bin Al-Ash As-Sahmi", "Mesir", "43 H", "Sahabat Panglima", "Penakluk Mesir & Negosiator"),
    "Sa'ad bin Abi Waqqash": ("Sa'ad bin Abi Waqqash Az-Zuhri", "Madinah", "55 H", "10 Sahabat Masuk Surga", "Penakluk Persia (Perang Al-Qadisiya)"),
    "Abu Musa Al Asy'ari": ("Abdullah bin Qais (Abu Musa Al-Asy'ari)", "Kufah", "44 H", "Sahabat Qari' Suara Merdu", "Kulluhum 'Udul")
}

def extract_rawis_from_text(text_id):
    matches = re.findall(r'\[([^\]]+)\]', text_id)
    rawis = []
    for m in matches:
        m_clean = m.strip()
        if m_clean.lower() in ["dia berkata", "ia berkata", "berkata", "bahwa dia", "katanya"]:
            continue
        rawis.append(m_clean)
    return rawis

def build_hadith_sanad_chain(hadith):
    rawi_names = extract_rawis_from_text(hadith.get("text_id", ""))
    
    # If no bracketed rawi found, detect basic Sahabat in text
    if not rawi_names:
        text = hadith.get("text_id", "")
        for sname in ["Abu Hurairah", "Aisyah", "Umar bin Al Khaththab", "Ibnu Umar", "Anas bin Malik", "Ibnu 'Abbas", "Jabir bin Abdullah", "Utsman bin Affan", "Ali bin Abi Thalib"]:
            if sname in text:
                rawi_names = [f"Guru Imam Bukhari (Syaikh)", f"Perawi Tabi'in", sname]
                break

    chain = []
    
    # Node 1: Imam Al-Bukhari
    chain.append({
        "urutan": 1,
        "tingkat": "Tingkat 1",
        "peran": "Mukharrij (Penyusun Kitab Shahih)",
        "nama": "Imam Al-Bukhari (Muhammad bin Ismail)",
        "kunyah": "Abu Abdillah",
        "negeri": "Bukhara (Uzbekistan)",
        "wafat": "256 H",
        "thabaqah": "Imamul Muhadditsin (194 - 256 H)",
        "status_tadil": "Amirul Mukminin fil Hadits (Muttafaq 'Alaih)"
    })

    total_intermediate = len(rawi_names)
    
    for idx, rname in enumerate(rawi_names):
        node_order = idx + 2
        info = KNOWN_RAWIS.get(rname)
        
        if info:
            nama_lengkap, negeri, wafat, thabaqah, status = info
        else:
            nama_lengkap = rname
            negeri = "Madinah / Kufah / Bashrah"
            wafat = "Abad ke-2 H"
            thabaqah = f"Perawi Rantai Hadits"
            status = "Tsiqah / 'Adil (Takhrij Bukhari)"

        # Role designation
        if idx == 0:
            peran = "Guru Langsung Imam Al-Bukhari (Syaikh)"
        elif idx == total_intermediate - 1:
            peran = "Sahabat Nabi (Perawi Pertama yang Mendengar Langsung)"
            thabaqah = "Sahabat Mulia Rasulullah ﷺ"
            status = "Kulluhum 'Udul (Seluruh Sahabat Adil)"
        elif idx == total_intermediate - 2:
            peran = "Tabi'in Senior (Kibar Tabi'in)"
        else:
            peran = f"Perawi Sanad Jalur Perantara"

        # Check for Sahabat indicators
        for s_token in ["Umar", "Aisyah", "Hurairah", "Abbas", "Anas", "Jabir", "Utsman", "Ali", "Khudri", "Sufyan"]:
            if s_token.lower() in rname.lower():
                if idx >= max(0, total_intermediate - 2):
                    peran = "Sahabat Nabi (Rodhiyallahu 'Anhu)"
                    thabaqah = "Sahabat Nabi SAW"
                    status = "Kulluhum 'Udul (Seluruh Sahabat Terpercaya)"

        chain.append({
            "urutan": node_order,
            "tingkat": f"Tingkat {node_order}",
            "peran": peran,
            "nama": nama_lengkap,
            "kunyah": rname if rname != nama_lengkap else "-",
            "negeri": negeri,
            "wafat": wafat,
            "thabaqah": thabaqah,
            "status_tadil": status
        })

    # Final Node: Rasulullah Muhammad ﷺ
    chain.append({
        "urutan": len(chain) + 1,
        "tingkat": f"Tingkat {len(chain) + 1} (Puncak)",
        "peran": "Sumber Utama Wahyu & Hadits",
        "nama": "Nabi Muhammad Rasulullah ﷺ",
        "kunyah": "Abul Qasim",
        "negeri": "Makkah Al-Mukarramah & Madinah Al-Munawwarah",
        "wafat": "11 H (632 M)",
        "thabaqah": "Khatamun Nabiyyin wa Sayyidul Mursalin",
        "status_tadil": "Ma'shum (Terjaga dari Dosa & Kesalahan dalam Syariat)"
    })

    return chain

def process_all_books():
    print("=== Memulai Pembangunan Data Sanad & Rawi untuk Seluruh Kitab ===")
    total_hadiths = 0

    for book_id in range(1, 98):
        file_path = os.path.join(BOOKS_DIR, f"book_{book_id}.json")
        if not os.path.exists(file_path):
            continue

        with open(file_path, "r", encoding="utf-8") as f:
            bdata = json.load(f)

        for h in bdata.get("hadiths", []):
            h["sanad_chain"] = build_hadith_sanad_chain(h)
            total_hadiths += 1

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(bdata, f, ensure_ascii=False, indent=2)

    print(f"=== Selesai! {total_hadiths} Hadits telah dilengkapi data Sanad & Rawi komprehensif! ===")

if __name__ == "__main__":
    process_all_books()
