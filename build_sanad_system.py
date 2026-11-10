# -*- coding: utf-8 -*-
"""
Builder Sanad & Rawi Hadits Shahih Al-Bukhari
Dari Imam Al-Bukhari hingga Nabi Muhammad SAW
Project Shahih Bukhari - Digitab Team
"""
import os
import re
import json

# Database Biografi & Thabaqat Tokoh Perawi Terkenal
RAWIS_DB = {
    # Guru-Guru Bukhari
    "Al Humaidi Abdullah bin Az Zubair": {
        "nama_lengkap": "Abdullah bin Az-Zubair bin Isa Al-Humaidi Al-Qurasyi",
        "kunyah": "Abu Bakr",
        "negeri": "Makkah Al-Mukarramah",
        "wafat": "219 H",
        "thabaqah": "Thabaqah ke-10 (Kibar Tabi'ut Tabi'in)",
        "jarh_tadil": "Tsiqah Hafizh Faqih, Murid Utama Sufyan bin 'Uyainah"
    },
    "Abdullah bin Yusuf": {
        "nama_lengkap": "Abdullah bin Yusuf At-Tinnisi Al-Kala'i",
        "kunyah": "Abu Muhammad",
        "negeri": "Dimasyq / Tinnis (Mesir)",
        "wafat": "218 H",
        "thabaqah": "Thabaqah ke-10",
        "jarh_tadil": "Tsiqah Mutqin, Perawi Kitab Al-Muwaththa' dari Imam Malik"
    },
    "Yahya bin Bukair": {
        "nama_lengkap": "Yahya bin Abdullah bin Bukair Al-Makhzumi",
        "kunyah": "Abu Zakariyya",
        "negeri": "Mesir",
        "wafat": "231 H",
        "thabaqah": "Thabaqah ke-10",
        "jarh_tadil": "Tsiqah Tsabat dalam periwayatan dari Al-Laits bin Sa'ad"
    },
    "Musa bin Isma'il": {
        "nama_lengkap": "Musa bin Isma'il Al-Minqari Al-Bashri (At-Tabudzaki)",
        "kunyah": "Abu Salamah",
        "negeri": "Bashrah",
        "wafat": "223 H",
        "thabaqah": "Thabaqah ke-10",
        "jarh_tadil": "Tsiqah Tsabat, Rujukan Utama Hadits-Hadits Bashrah"
    },
    "Abdan": {
        "nama_lengkap": "Abdullah bin Utsman bin Jabalah Al-Marwazi (Abdan)",
        "kunyah": "Abu Abdirrahman",
        "negeri": "Marwa",
        "wafat": "221 H",
        "thabaqah": "Thabaqah ke-10",
        "jarh_tadil": "Tsiqah Hafizh Imam"
    },
    "Ali bin Al Madini": {
        "nama_lengkap": "Ali bin Abdullah bin Ja'far Al-Madini",
        "kunyah": "Abu Al-Hasan",
        "negeri": "Bashrah",
        "wafat": "234 H",
        "thabaqah": "Thabaqah ke-10",
        "jarh_tadil": "Amirul Mukminin fi 'Ilalil Hadits, Guru Utama Bukhari"
    },
    "Musaddad": {
        "nama_lengkap": "Musaddad bin Musarhad Al-Asadi Al-Bashri",
        "kunyah": "Abu Al-Hasan",
        "negeri": "Bashrah",
        "wafat": "228 H",
        "thabaqah": "Thabaqah ke-10",
        "jarh_tadil": "Tsiqah Hafizh Hujjah"
    },

    # Perawi Thabaqat 9 & 8 (Tabi'ut Tabi'in)
    "Sufyan": {
        "nama_lengkap": "Sufyan bin 'Uyainah bin Maimun Al-Hilali",
        "kunyah": "Abu Muhammad",
        "negeri": "Kufah / Makkah",
        "wafat": "198 H",
        "thabaqah": "Thabaqah ke-8 (Kibar Tabi'ut Tabi'in)",
        "jarh_tadil": "Tsiqah Hafizh Imam Hujjah Faqih"
    },
    "Malik": {
        "nama_lengkap": "Malik bin Anas bin Malik Al-Ashbahi (Imam Daril Hijrah)",
        "kunyah": "Abu Abdillah",
        "negeri": "Madinah Al-Munawwarah",
        "wafat": "179 H",
        "thabaqah": "Thabaqah ke-7 (Imam Mazhab Maliki)",
        "jarh_tadil": "Imam Daril Hijrah, Amirul Mukminin fil Hadits"
    },
    "Al Laits": {
        "nama_lengkap": "Al-Laits bin Sa'ad bin Abdurrahman Al-Fahmi",
        "kunyah": "Abu Al-Harits",
        "negeri": "Mesir",
        "wafat": "175 H",
        "thabaqah": "Thabaqah ke-7",
        "jarh_tadil": "Imam Faqih Mesir, Tsiqah Tsabat Hujjah"
    },
    "Syu'bah": {
        "nama_lengkap": "Syu'bah bin Al-Hajjaj Al-Ataki Al-Bashri",
        "kunyah": "Abu Bistham",
        "negeri": "Bashrah",
        "wafat": "160 H",
        "thabaqah": "Thabaqah ke-7",
        "jarh_tadil": "Amirul Mukminin fil Hadits, Pelopor Kritik Sanad"
    },
    "Abu 'Awanah": {
        "nama_lengkap": "Al-Wadh-dhah bin Abdullah Al-Yasykuri (Abu 'Awanah)",
        "kunyah": "Abu 'Awanah",
        "negeri": "Wasith / Bashrah",
        "wafat": "176 H",
        "thabaqah": "Thabaqah ke-7",
        "jarh_tadil": "Tsiqah Tsabat Shahihul Kitab"
    },

    # Tabi'in (Thabaqat 3, 4, 5, 6)
    "Yahya bin Sa'id Al Anshari": {
        "nama_lengkap": "Yahya bin Sa'id bin Qais Al-Anshari Al-Madani",
        "kunyah": "Abu Sa'id",
        "negeri": "Madinah / Kufah",
        "wafat": "143 H",
        "thabaqah": "Thabaqah ke-5 (Shighar Tabi'in)",
        "jarh_tadil": "Tsiqah Tsabat Imam Qadhi Madinah"
    },
    "Muhammad bin Ibrahim At Taimi": {
        "nama_lengkap": "Muhammad bin Ibrahim bin Al-Harits At-Taimi",
        "kunyah": "Abu Abdillah",
        "negeri": "Madinah",
        "wafat": "120 H",
        "thabaqah": "Thabaqah ke-4 (Ausath Tabi'in)",
        "jarh_tadil": "Tsiqah Jalil Rujukan Madinah"
    },
    "Alqamah bin Waqash Al Laitsi": {
        "nama_lengkap": "'Alqamah bin Waqqash bin Mihshan Al-Laitsi",
        "kunyah": "Abu Amr",
        "negeri": "Madinah",
        "wafat": "Sekitar 70 H",
        "thabaqah": "Thabaqah ke-3 (Ausath Tabi'in)",
        "jarh_tadil": "Tsiqah Tsabat, Menimba Ilmu dari Umar & Aisyah"
    },
    "Hisyam bin 'Urwah": {
        "nama_lengkap": "Hisyam bin 'Urwah bin Az-Zubair Al-Asadi",
        "kunyah": "Abu Al-Mundzir",
        "negeri": "Madinah",
        "wafat": "146 H",
        "thabaqah": "Thabaqah ke-5",
        "jarh_tadil": "Tsiqah Faqih Imam Hafizh"
    },
    "bapaknya": {
        "nama_lengkap": "'Urwah bin Az-Zubair bin Al-Awwam",
        "kunyah": "Abu Abdillah",
        "negeri": "Madinah",
        "wafat": "94 H",
        "thabaqah": "Thabaqah ke-2 (Kibar Tabi'in)",
        "jarh_tadil": "Salah Satu dari 7 Fuqaha Madinah yang Termasyhur"
    },
    "'Urwah bin Az Zubair": {
        "nama_lengkap": "'Urwah bin Az-Zubair bin Al-Awwam",
        "kunyah": "Abu Abdillah",
        "negeri": "Madinah",
        "wafat": "94 H",
        "thabaqah": "Thabaqah ke-2 (Kibar Tabi'in)",
        "jarh_tadil": "Salah Satu dari 7 Fuqaha Madinah yang Termasyhur"
    },
    "Az Zuhri": {
        "nama_lengkap": "Muhammad bin Muslim bin Ubaidullah bin Syihab Az-Zuhri",
        "kunyah": "Abu Bakr",
        "negeri": "Madinah / Syam",
        "wafat": "124 H",
        "thabaqah": "Thabaqah ke-4",
        "jarh_tadil": "Imamul Huffazh, Pelopor Kodifikasi Hadits Resmi"
    },
    "Ibnu Syihab": {
        "nama_lengkap": "Muhammad bin Muslim bin Ubaidullah bin Syihab Az-Zuhri",
        "kunyah": "Abu Bakr",
        "negeri": "Madinah / Syam",
        "wafat": "124 H",
        "thabaqah": "Thabaqah ke-4",
        "jarh_tadil": "Imamul Huffazh, Pelopor Kodifikasi Hadits Resmi"
    },
    "Sa'id bin Jubair": {
        "nama_lengkap": "Sa'id bin Jubair Al-Asadi Al-Kufi",
        "kunyah": "Abu Abdillah",
        "negeri": "Kufah",
        "wafat": "95 H",
        "thabaqah": "Thabaqah ke-3",
        "jarh_tadil": "Tsiqah Tsabat Faqih, Murid Utama Ibnu Abbas"
    },
    "Qatadah": {
        "nama_lengkap": "Qatadah bin Di'amah As-Sadusi Al-Bashri",
        "kunyah": "Abu Al-Khattab",
        "negeri": "Bashrah",
        "wafat": "117 H",
        "thabaqah": "Thabaqah ke-4",
        "jarh_tadil": "Tsiqah Tsabat, Hujjah Tafsir dan Hadits"
    },
    "Musa bin Abu Aisyah": {
        "nama_lengkap": "Musa bin Abu Aisyah Al-Kufi",
        "kunyah": "Abu Al-Hasan",
        "negeri": "Kufah",
        "wafat": "Sekitar 130 H",
        "thabaqah": "Thabaqah ke-5",
        "jarh_tadil": "Tsiqah Tsabat"
    },

    # Sahabat Nabi (Rodhiyallahu 'Anhum)
    "Umar bin Al Khaththab": {
        "nama_lengkap": "Umar bin Al-Khaththab bin Nufail Al-Qurasyi (Al-Faruq)",
        "kunyah": "Abu Hafsh",
        "negeri": "Makkah / Madinah",
        "wafat": "23 H (Syahid)",
        "thabaqah": "Khulafaur Rasyidin (Sahabat Utama)",
        "jarh_tadil": "Kulluhum 'Udul (Seluruh Sahabat Adil & Terpercaya)"
    },
    "Aisyah": {
        "nama_lengkap": "Aisyah binti Abi Bakr Ash-Shiddiq (Ummul Mukminin)",
        "kunyah": "Ummu Abdillah",
        "gelar": "Ash-Shiddiqah binti Ash-Shiddiq",
        "negeri": "Madinah Al-Munawwarah",
        "wafat": "57 / 58 H",
        "thabaqah": "Istri Tercinta Rasulullah ﷺ & Faqihah Umat",
        "jarh_tadil": "Kulluhum 'Udul, Perawi Wanita Terbanyak dalam Islam"
    },
    "Ibnu 'Abbas": {
        "nama_lengkap": "Abdullah bin Abbas bin Abdul Muththalib (Turjumanul Qur'an)",
        "kunyah": "Abu Al-Abbas",
        "gelar": "Hibrul Ummah (Tinta Umat) & Turjumanul Qur'an",
        "negeri": "Makkah / Madinah / Thaif",
        "wafat": "68 H",
        "thabaqah": "Shighar Shahabah (Sahabat Muda Utama)",
        "jarh_tadil": "Kulluhum 'Udul, Didoakan Nabi Menguasai Takwil Kitab"
    },
    "Abu Hurairah": {
        "nama_lengkap": "Abdurrahman bin Shakhr Ad-Dausi (Abu Hurairah)",
        "kunyah": "Abu Hurairah",
        "negeri": "Madinah Al-Munawwarah",
        "wafat": "57 / 59 H",
        "thabaqah": "Ahlus Suffah (Sahabat Perawi Terbanyak)",
        "jarh_tadil": "Kulluhum 'Udul, Sahabat Penghafal 5.374 Hadits"
    },
    "Jabir bin Abdullah Al Anshari": {
        "nama_lengkap": "Jabir bin Abdullah bin Amr bin Haram Al-Anshari",
        "kunyah": "Abu Abdillah",
        "negeri": "Madinah Al-Munawwarah",
        "wafat": "74 / 78 H",
        "thabaqah": "Sahabat Utama Anshar (Bai'at Aqabah & Bai'at Ridwan)",
        "jarh_tadil": "Kulluhum 'Udul"
    },
    "Abu Sufyan": {
        "nama_lengkap": "Shakhr bin Harb bin Umayyah (Abu Sufyan)",
        "kunyah": "Abu Sufyan",
        "negeri": "Makkah / Madinah",
        "wafat": "31 H",
        "thabaqah": "Sahabat Nabi (Masuk Islam saat Fathu Makkah)",
        "jarh_tadil": "Kulluhum 'Udul"
    },
    "Utsman bin Affan": {
        "nama_lengkap": "Utsman bin Affan bin Abi Al-Ash (Dzun Nurain)",
        "kunyah": "Abu Abdillah / Abu Amr",
        "gelar": "Dzun Nurain (Pemilik Dua Cahaya)",
        "negeri": "Madinah Al-Munawwarah",
        "wafat": "35 H (Syahid)",
        "thabaqah": "Khulafaur Rasyidin ke-3",
        "jarh_tadil": "Kulluhum 'Udul"
    },
    "Ali bin Abi Thalib": {
        "nama_lengkap": "Ali bin Abi Thalib bin Abdul Muththalib",
        "kunyah": "Abu Al-Hasan / Abu Turab",
        "gelar": "Amirul Mukminin, Asadullah",
        "negeri": "Madinah / Kufah",
        "wafat": "40 H (Syahid)",
        "thabaqah": "Khulafaur Rasyidin ke-4",
        "jarh_tadil": "Kulluhum 'Udul"
    },
    "Anas bin Malik": {
        "nama_lengkap": "Anas bin Malik bin An-Nadhr Al-Anshari",
        "kunyah": "Abu Hamzah",
        "gelar": "Khadimu Rasulillah (Pelayan Rasulullah ﷺ selama 10 tahun)",
        "negeri": "Madinah / Bashrah",
        "wafat": "93 H",
        "thabaqah": "Sahabat Utama yang Berumur Panjang",
        "jarh_tadil": "Kulluhum 'Udul"
    },
    "Abdullah bin Umar": {
        "nama_lengkap": "Abdullah bin Umar bin Al-Khaththab (Ibnu Umar)",
        "kunyah": "Abu Abdirrahman",
        "negeri": "Madinah Al-Munawwarah",
        "wafat": "73 H",
        "thabaqah": "Sahabat Teladan dalam Mengikuti Sunnah Nabi",
        "jarh_tadil": "Kulluhum 'Udul"
    }
}

def generate_sanad_chain(hadith):
    text_id = hadith.get('text_id', '')
    rawi_names = re.findall(r'\[([^\]]+)\]', text_id)
    
    # Clean narrator names (strip trailing punctuation or common words)
    clean_rawis = []
    for r in rawi_names:
        r_clean = r.strip()
        if r_clean.lower() in ["dia berkata", "ia berkata", "berkata", "bahwa dia"]:
            continue
        clean_rawis.append(r_clean)

    chain = []
    
    # 1. Base Node: Imam Al-Bukhari
    chain.append({
        "urutan": 1,
        "peran": "Mukharrij (Penyusun Kitab Shahih)",
        "nama": "Imam Al-Bukhari (Muhammad bin Ismail)",
        "kunyah": "Abu Abdillah",
        "negeri": "Bukhara (Uzbekistan) / Khartank",
        "wafat": "256 H (194 - 256 H)",
        "thabaqah": "Amirul Mukminin fil Hadits",
        "status_tadil": "Imamul Huffazh Muttafaq 'Alaih"
    })

    total_intermediate = len(clean_rawis)
    
    for idx, rname in enumerate(clean_rawis):
        node_order = idx + 2
        meta = RAWIS_DB.get(rname, {})
        
        # Tentukan posisi dan peran
        if idx == 0:
            peran = "Guru Langsung Imam Al-Bukhari (Syaikh al-Bukhari)"
        elif idx == total_intermediate - 1:
            peran = "Sahabat Nabi (Perawi Pertama yang Mendengar/Melihat)"
        elif idx == total_intermediate - 2:
            peran = "Tabi'in Senior (Kibar Tabi'in)"
        else:
            peran = f"Perawi Sanad Jalur Perantara (Thabaqah ke-{max(3, 10 - idx)})"

        thabaqah = meta.get("thabaqah", f"Perawi Thabaqah Rantai Hadits")
        if "Umar" in rname or "Aisyah" in rname or "Hurairah" in rname or "Abbas" in rname or "Anas" in rname or "Jabir" in rname:
            peran = "Sahabat Nabi (Rodhiyallahu 'Anhu)"
            thabaqah = "Sahabat Mulia Rasulullah ﷺ"

        chain.append({
            "urutan": node_order,
            "peran": peran,
            "nama": meta.get("nama_lengkap", rname),
            "kunyah": meta.get("kunyah", "-"),
            "negeri": meta.get("negeri", "Hijaz / Iraq"),
            "wafat": meta.get("wafat", "-"),
            "thabaqah": thabaqah,
            "status_tadil": meta.get("jarh_tadil", "Tsiqah / Adil (Diterima Imam Bukhari)")
        })

    # Pinnacle Node: Rasulullah Muhammad ﷺ
    chain.append({
        "urutan": len(chain) + 1,
        "peran": "Sumber Wahyu & Risalah Kenabian",
        "nama": "Nabi Muhammad Rasulullah ﷺ",
        "gelar": "Sayyidul Anbiya' wal Mursalin, Rahmatan lil 'Alamin",
        "negeri": "Makkah Al-Mukarramah & Madinah Al-Munawwarah",
        "thabaqah": "Nabi & Utusan Allah Terakhir",
        "status_tadil": "Ma'shum (Terpelihara dari Kesalahan dalam Risalah)"
    })

    return chain

print("Sanad generator test ready!")
