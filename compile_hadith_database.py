import json
import os

print("=== Starting Hadith Database Compilation ===")

# Create directories
os.makedirs("public/data/books", exist_ok=True)

# Load catalog from gdrive_catalog.json
with open("gdrive_catalog.json", "r", encoding="utf-8") as f:
    gdrive_catalog = json.load(f)

# Helper function to get gdrive link and id
def get_gdrive_info(filename):
    for k, v in gdrive_catalog.items():
        if k.lower() == filename.lower():
            return {
                "filename": k,
                "drive_id": v,
                "view_url": f"https://drive.google.com/file/d/{v}/preview",
                "preview_url": f"https://drive.google.com/file/d/{v}/preview",
                "download_url": f"https://drive.google.com/uc?export=download&id={v}"
            }
    return None

# Mapping 36 Jilid Fathul Baari with Hadith Number Ranges
fathul_bari_jilid = [
    {"jilid": 1, "filename": "Fathul Baari Jilid 1.pdf", "start": 1, "end": 58, "books": "Kitab 1 - 2 (Permulaan Wahyu & Iman)"},
    {"jilid": 2, "filename": "Fathul Baari Jilid 2.pdf", "start": 59, "end": 213, "books": "Kitab 3 - 4 (Ilmu & Wudhu Bag. 1)"},
    {"jilid": 3, "filename": "Fathul Baari Jilid 3.pdf", "start": 214, "end": 348, "books": "Kitab 4 - 7 (Wudhu Bag. 2, Mandi, Haid, Tayammum)"},
    {"jilid": 4, "filename": "Fathul Baari jilid 4.pdf", "start": 349, "end": 520, "books": "Kitab 8 (Shalat)"},
    {"jilid": 5, "filename": "Fathul Baari Jilid 5.pdf", "start": 522, "end": 735, "books": "Kitab 9 - 10 (Waktu Shalat & Adzan Bag. 1)"},
    {"jilid": 6, "filename": "Fathul Baari jilid 6.pdf", "start": 736, "end": 941, "books": "Kitab 10 - 11 (Adzan Bag. 2 & Shalat Jumat)"},
    {"jilid": 7, "filename": "Fathul Baari Jilid 7.pdf", "start": 942, "end": 1098, "books": "Kitab 12 - 17 (Shalat Khauf, Hari Raya, Witir, Istisqa', Gerhana, Sujud Tilawah)"},
    {"jilid": 8, "filename": "Fathul Baari Jilid 8.pdf", "start": 1099, "end": 1394, "books": "Kitab 18 - 23 (Mengqashar Shalat, Tahajjud, Jenazah)"},
    {"jilid": 9, "filename": "Fathul Baari Jilid 9.pdf", "start": 1395, "end": 1568, "books": "Kitab 24 - 25 (Zakat, Shadaqah Fithri & Haji Bag. 1)"},
    {"jilid": 10, "filename": "Fathul Baari jilid 10.pdf", "start": 1569, "end": 1805, "books": "Kitab 25 - 26 (Haji Bag. 2 & Umrah)"},
    {"jilid": 11, "filename": "Fathul Baari jilid 11.pdf", "start": 1806, "end": 2007, "books": "Kitab 27 - 30 (Terhalang Haji, Denda Berburu, Keutamaan Madinah, Puasa)"},
    {"jilid": 12, "filename": "Fathul Baari jilid 12.pdf", "start": 2008, "end": 2238, "books": "Kitab 31 - 34 (Tarawih, Lailatul Qadar, I'tikaf, Jual Beli)"},
    {"jilid": 13, "filename": "Fathul Baari jilid 13.pdf", "start": 2239, "end": 2350, "books": "Kitab 35 - 41 (Salam, Syuf'ah, Ijarah, Hawalah, Kafalah, Wakalah, Muzara'ah)"},
    {"jilid": 14, "filename": "Fathul Baari jilid 14.pdf", "start": 2351, "end": 2565, "books": "Kitab 42 - 50 (Pengairan, Utang & Pailit, Pertikaian, Temuan, Zhalim, Syirkah, Gadai, Pembebasan Budak)"},
    {"jilid": 15, "filename": "Fathul Baari jilid 15.pdf", "start": 2566, "end": 2781, "books": "Kitab 51 - 55 (Hibah, Saksi, Damai, Syarat, Wasiat)"},
    {"jilid": 16, "filename": "Fathul Baari jilid 16.pdf", "start": 2782, "end": 3090, "books": "Kitab 56 (Jihad dan Ekspedisi)"},
    {"jilid": 17, "filename": "Fathul Baari jilid 17.pdf", "start": 3091, "end": 3189, "books": "Kitab 57 - 58 (Khumus & Jizyah)"},
    {"jilid": 18, "filename": "Fathul Baari jilid 18.pdf", "start": 3190, "end": 3325, "books": "Kitab 59 (Awal Mula Penciptaan)"},
    {"jilid": 19, "filename": "Fathul Baari jilid 19.pdf", "start": 3326, "end": 3488, "books": "Kitab 60 (Kisah Para Nabi Bag. 1)"},
    {"jilid": 20, "filename": "Fathul Baari jilid 20.pdf", "start": 3489, "end": 3648, "books": "Kitab 60 - 61 (Kisah Para Nabi Bag. 2 & Manaqib Bag. 1)"},
    {"jilid": 21, "filename": "Fathul Baari jilid 21.pdf", "start": 3649, "end": 3775, "books": "Kitab 61 - 62 (Manaqib Bag. 2 & Keutamaan Sahabat)"},
    {"jilid": 22, "filename": "Fathul Baari jilid 22.pdf", "start": 3776, "end": 3948, "books": "Kitab 63 (Keutamaan Kaum Anshar)"},
    {"jilid": 23, "filename": "Fathul Baari jilid 23.pdf", "start": 3949, "end": 4150, "books": "Kitab 64 (Peperangan Nabi / Maghazi Bag. 1)"},
    {"jilid": 24, "filename": "Fathul Baari Jilid 24.pdf", "start": 4151, "end": 4473, "books": "Kitab 64 (Maghazi Bag. 2)"},
    {"jilid": 25, "filename": "Fathul Baari Jilid 25.pdf", "start": 4474, "end": 4722, "books": "Kitab 65 (Tafsir Al-Qur'an Bag. 1: Al-Fatihah - Al-Kahf)"},
    {"jilid": 26, "filename": "Fathul Baari Jilid 26.pdf", "start": 4723, "end": 4977, "books": "Kitab 65 (Tafsir Al-Qur'an Bag. 2: Maryam - An-Nas)"},
    {"jilid": 27, "filename": "Fathul Baari Jilid 27.pdf", "start": 4979, "end": 5250, "books": "Kitab 66 - 67 (Keutamaan Al-Qur'an & Pernikahan)"},
    {"jilid": 28, "filename": "Fathul Baari Jilid 28.pdf", "start": 5251, "end": 5466, "books": "Kitab 68 - 70 (Thalaq, Nafkah, Makanan & Santapan)"},
    {"jilid": 29, "filename": "Fathul Baari Jilid 29.pdf", "start": 5467, "end": 5639, "books": "Kitab 71 - 74 (Aqiqah, Sembelihan & Berburu, Kurban, Minuman)"},
    {"jilid": 30, "filename": "Fathul Baari Jilid 30.pdf", "start": 5640, "end": 5782, "books": "Kitab 75 - 76 (Orang Sakit & Pengobatan / Thibbun Nabawi)"},
    {"jilid": 31, "filename": "Fathul Baari Jilid 31.pdf", "start": 5783, "end": 6115, "books": "Kitab 77 - 78 (Pakaian & Perhiasan, Adab & Etika Bag. 1)"},
    {"jilid": 32, "filename": "Fathul Baari Jilid 32.pdf", "start": 6116, "end": 6303, "books": "Kitab 78 - 79 (Adab Bag. 2 & Meminta Izin)"},
    {"jilid": 33, "filename": "Fathul Baari Jilid 33.pdf", "start": 6304, "end": 6593, "books": "Kitab 80 - 81 (Doa-Doa & Pelelembut Hati / Ar-Riqaq)"},
    {"jilid": 34, "filename": "Fathul Baari Jilid 34.pdf", "start": 6594, "end": 6771, "books": "Kitab 82 - 85 (Takdir, Sumpah & Nadzar, Kafarat, Waris)"},
    {"jilid": 35, "filename": "Fathul Baari Jilid 35.pdf", "start": 6772, "end": 6981, "books": "Kitab 86 - 90 (Hudud, Diyat, Murtad, Pemaksaan, Hiyal)"},
    {"jilid": 36, "filename": "Fathul Baari Jilid 36.pdf", "start": 6982, "end": 7563, "books": "Kitab 91 - 97 (Mimpi, Fitnah Akhir Zaman, Ahkam, Tamanni, Berpegang Sunnah, Tauhid)"}
]

# Enrich each fathul_bari_jilid item with Google Drive info
for j in fathul_bari_jilid:
    info = get_gdrive_info(j["filename"])
    if info:
        j["drive_id"] = info["drive_id"]
        j["view_url"] = info["view_url"]
        j["preview_url"] = info["preview_url"]
        j["download_url"] = info["download_url"]

def find_fathul_bari_jilid(hadith_num):
    for j in fathul_bari_jilid:
        if j["start"] <= hadith_num <= j["end"]:
            return {
                "jilid": j["jilid"],
                "filename": j["filename"],
                "drive_id": j.get("drive_id"),
                "view_url": j.get("view_url"),
                "preview_url": j.get("preview_url"),
                "scope": j["books"]
            }
    # fallback to Jilid 36 if > 7563
    if hadith_num >= 6982:
        return {
            "jilid": 36,
            "filename": "Fathul Baari Jilid 36.pdf",
            "drive_id": fathul_bari_jilid[-1].get("drive_id"),
            "view_url": fathul_bari_jilid[-1].get("view_url"),
            "preview_url": fathul_bari_jilid[-1].get("preview_url"),
            "scope": fathul_bari_jilid[-1]["books"]
        }
    return None

# Load the 5 editions
print("Loading raw datasets...")
with open("hadith_data_raw/id.json", "r", encoding="utf-8") as f:
    data_id = json.load(f)
with open("hadith_data_raw/ar.json", "r", encoding="utf-8") as f:
    data_ar = json.load(f)
with open("hadith_data_raw/en.json", "r", encoding="utf-8") as f:
    data_en = json.load(f)
with open("hadith_data_raw/urd.json", "r", encoding="utf-8") as f:
    data_ur = json.load(f)
with open("hadith_data_raw/fra.json", "r", encoding="utf-8") as f:
    data_fr = json.load(f)

print("Indexing all translations by hadithnumber...")
hadiths_ar_map = {h["hadithnumber"]: h["text"] for h in data_ar["hadiths"]}
hadiths_en_map = {h["hadithnumber"]: h["text"] for h in data_en["hadiths"]}
hadiths_ur_map = {h["hadithnumber"]: h["text"] for h in data_ur["hadiths"]}
hadiths_fr_map = {h["hadithnumber"]: h["text"] for h in data_fr["hadiths"]}

# Full Arabic and Indonesian names for the 97 Kitab
book_names_id = {
    1: "Permulaan Wahyu",
    2: "Keimanan",
    3: "Ilmu Pengetahuan",
    4: "Wudhu'",
    5: "Mandi Junub",
    6: "Haid",
    7: "Tayammum",
    8: "Shalat",
    9: "Waktu-Waktu Shalat",
    10: "Adzan",
    11: "Shalat Jumat",
    12: "Shalat Khauf (Dalam Ketakutan)",
    13: "Dua Hari Raya (Idul Fitri & Idul Adha)",
    14: "Shalat Witir",
    15: "Istisqa' (Meminta Hujan)",
    16: "Gerhana Matahari & Bulan",
    17: "Sujud Tilawah Al-Qur'an",
    18: "Mengqashar Shalat (Taqshir)",
    19: "Shalat Tahajjud (Shalat Malam)",
    20: "Keutamaan Shalat di Masjid Makkah & Madinah",
    21: "Perbuatan Yang Boleh Dilakukan Saat Shalat",
    22: "Lupa Dalam Shalat (Sujud Sahwi)",
    23: "Jenazah",
    24: "Zakat",
    25: "Haji",
    26: "Umrah",
    27: "Orang Yang Terhalang Haji (Al-Muhshar)",
    28: "Denda Berburu Saat Ihram",
    29: "Keutamaan Kota Madinah Al-Munawwarah",
    30: "Puasa (Ash-Shaum)",
    31: "Shalat Tarawih di Bulan Ramadhan",
    32: "Keutamaan Malam Lailatul Qadar",
    33: "I'tikaf di Masjid",
    34: "Jual Beli (Al-Buyu')",
    35: "Jual Beli Salam (Pesanan Dimuka)",
    36: "Syuf'ah (Hak Membeli Dahulu)",
    37: "Sewa-Menyewa & Upah (Al-Ijarah)",
    38: "Pengalihan Utang (Al-Hawalah)",
    39: "Tanggungan & Jaminan (Al-Kafalah)",
    40: "Perwakilan & Kuasa (Al-Wakalah)",
    41: "Bercocok Tanam & Pertanian (Al-Muzara'ah)",
    42: "Pengairan & Sumber Air (Al-Musaqah)",
    43: "Pinjaman, Pelunasan Utang & Kepailitan",
    44: "Gugatan & Pertikaian (Al-Khushumat)",
    45: "Barang Temuan (Al-Luqathah)",
    46: "Kezhaliman & Perampasan Hak (Al-Mazhalim)",
    47: "Perserikatan Usaha (Asy-Syirkah)",
    48: "Gadai (Ar-Rahn)",
    49: "Memerdekakan Budak (Al-'Itq)",
    50: "Perjanjian Kemerdekaan Budak (Al-Makatib)",
    51: "Hibah & Hadiah",
    52: "Saksi-Saksi (Asy-Syahadat)",
    53: "Perdamaian (Ash-Shulh)",
    54: "Syarat-Syarat Dalam Akad",
    55: "Wasiat (Al-Washaya)",
    56: "Jihad & Perjuangan di Jalan Allah",
    57: "Khumus (Seperlima Harta Rampasan)",
    58: "Jizyah & Perjanjian Damai",
    59: "Awal Mula Penciptaan Makhluk",
    60: "Kisah Para Nabi ('Alaihimussalam)",
    61: "Manaqib (Keagungan & Mukjizat Rasulullah ﷺ)",
    62: "Keutamaan Para Sahabat Nabi",
    63: "Keutamaan Kaum Anshar",
    64: "Peperangan & Ekspedisi Rasulullah ﷺ (Al-Maghazi)",
    65: "Tafsir Al-Qur'an Al-Karim",
    66: "Keutamaan Al-Qur'an (Fadhail Al-Qur'an)",
    67: "Pernikahan (An-Nikah)",
    68: "Perceraian (Ath-Thalaq)",
    69: "Nafkah Keluarga",
    70: "Makanan & Santapan (Al-Ath'imah)",
    71: "Aqiqah",
    72: "Sembelihan & Berburu Binatang",
    73: "Kurban Hari Raya (Al-Adhahi)",
    74: "Minuman (Al-Asyribah)",
    75: "Orang Sakit & Kunjungannya",
    76: "Kedokteran & Pengobatan Nabawi (Ath-Thibb)",
    77: "Pakaian & Perhiasan (Al-Libas)",
    78: "Adab, Etika & Budi Pekerti (Al-Adab)",
    79: "Meminta Izin Bertamu (Al-Isti'dzan)",
    80: "Doa-Doa Munajat (Ad-Da'awat)",
    81: "Pelelembut Hati (Ar-Riqaq)",
    82: "Takdir & Ketetapan Ilahi (Al-Qadar)",
    83: "Sumpah & Nadzar (Al-Aiman wan Nudzur)",
    84: "Kafarat Penebus Sumpah",
    85: "Hukum Waris (Al-Faraidh)",
    86: "Hudud (Hukuman Tindak Pidana Syariat)",
    87: "Diyat (Denda Ganti Rugi Jiwa & Fisik)",
    88: "Murtad & Mengajak Bertaubat",
    89: "Pemaksaan (Al-Ikrah)",
    90: "Tipu Daya & Rekayasa Hukum (Al-Hiyal)",
    91: "Ta'bir & Tafsir Mimpi",
    92: "Fitnah-Fitnah Akhir Zaman (Al-Fitan)",
    93: "Hukum-Hukum Kehakiman (Al-Ahkam)",
    94: "Angan-Angan & Harapan (At-Tamanni)",
    95: "Khabar Ahad (Menerima Riwayat Orang Terpercaya)",
    96: "Berpegang Teguh Pada Al-Qur'an & As-Sunnah",
    97: "Tauhid & Mengesakan Allah Ta'ala"
}

book_names_ar = {
    1: "كتاب بدء الوحي",
    2: "كتاب الإيمان",
    3: "كتاب العلم",
    4: "كتاب الوضوء",
    5: "كتاب الغسل",
    6: "كتاب الحيض",
    7: "كتاب التيمم",
    8: "كتاب الصلاة",
    9: "كتاب مواقيت الصلاة",
    10: "كتاب الأذان",
    11: "كتاب الجمعة",
    12: "كتاب الخوف",
    13: "كتاب العيدين",
    14: "كتاب الوتر",
    15: "كتاب الاستسقاء",
    16: "كتاب الكسوف",
    17: "كتاب سجود القرآن",
    18: "كتاب تقصير الصلاة",
    19: "كتاب التهجد",
    20: "كتاب فضل الصلاة في مسجد مكة والمدينة",
    21: "كتاب العمل في الصلاة",
    22: "كتاب السهو",
    23: "كتاب الجنائز",
    24: "كتاب الزكاة",
    25: "كتاب الحج",
    26: "كتاب العمرة",
    27: "كتاب المحصر",
    28: "كتاب جزاء الصيد",
    29: "كتاب فضائل المدينة",
    30: "كتاب الصوم",
    31: "كتاب صلاة التراويح",
    32: "كتاب فضل ليلة القدر",
    33: "كتاب الاعتكاف",
    34: "كتاب البيوع",
    35: "كتاب السلم",
    36: "كتاب الشفعة",
    37: "كتاب الإجارة",
    38: "كتاب الحوالات",
    39: "كتاب الكفالة",
    40: "كتاب الوكالة",
    41: "كتاب المزارعة",
    42: "كتاب المساقاة",
    43: "كتاب في الاستقراض وأداء الديون",
    44: "كتاب الخصومات",
    45: "كتاب اللقطة",
    46: "كتاب المظالم والغصب",
    47: "كتاب الشركة",
    48: "كتاب الرهن",
    49: "كتاب العتق",
    50: "كتاب المكاتب",
    51: "كتاب الهبة وفضلها",
    52: "كتاب الشهادات",
    53: "كتاب الصلح",
    54: "كتاب الشروط",
    55: "كتاب الوصايا",
    56: "كتاب الجهاد والسير",
    57: "كتاب فرض الخمس",
    58: "كتاب الجزية والموادعة",
    59: "كتاب بدء الخلق",
    60: "كتاب أحاديث الأنبياء",
    61: "كتاب المناقب",
    62: "كتاب فضائل أصحاب النبي صلى الله عليه وسلم",
    63: "كتاب مناقب الأنصار",
    64: "كتاب المغازي",
    65: "كتاب التفسير",
    66: "كتاب فضائل القرآن",
    67: "كتاب النكاح",
    68: "كتاب الطلاق",
    69: "كتاب النفقات",
    70: "كتاب الأطعمة",
    71: "كتاب العقيقة",
    72: "كتاب الذبائح والصيد",
    73: "كتاب الأضاحي",
    74: "كتاب الأشربة",
    75: "كتاب المرضى",
    76: "كتاب الطب",
    77: "كتاب اللباس",
    78: "كتاب الأدب",
    79: "كتاب الاستئذان",
    80: "كتاب الدعوات",
    81: "كتاب الرقاق",
    82: "كتاب القدر",
    83: "كتاب الأيمان والنذور",
    84: "كتاب كفارات الأيمان",
    85: "كتاب الفرائض",
    86: "كتاب الحدود",
    87: "كتاب الديات",
    88: "كتاب استتابة المرتدين والمعاندين وقتالهم",
    89: "كتاب الإكراه",
    90: "كتاب الحيل",
    91: "كتاب التعبير",
    92: "كتاب الفتن",
    93: "كتاب الأحكام",
    94: "كتاب التمني",
    95: "كتاب أخبار الآحاد",
    96: "كتاب الاعتصام بالكتاب والسنة",
    97: "كتاب التوحيد"
}

sections = data_id["metadata"]["sections"]
section_details = data_id["metadata"]["section_details"]

# Group hadiths by book
books_hadiths = {b: [] for b in range(1, 98)}
quick_index = []

print("Processing all 7,589 hadiths and associating translations & Fathul Bari references...")
for item in data_id["hadiths"]:
    h_num = item["hadithnumber"]
    book_id = item["reference"]["book"]
    h_in_book = item["reference"]["hadith"]
    ar_num = item["arabicnumber"]
    id_text = item["text"]
    ar_text = hadiths_ar_map.get(h_num, "")
    en_text = hadiths_en_map.get(h_num, "")
    ur_text = hadiths_ur_map.get(h_num, "")
    fr_text = hadiths_fr_map.get(h_num, "")
    fb_info = find_fathul_bari_jilid(int(h_num))

    hadith_obj = {
        "number": h_num,
        "arabic_number": ar_num,
        "book_id": book_id,
        "hadith_in_book": h_in_book,
        "text_ar": ar_text,
        "text_id": id_text,
        "text_en": en_text,
        "text_ur": ur_text,
        "text_fr": fr_text,
        "fathul_bari": fb_info
    }

    if 1 <= book_id <= 97:
        books_hadiths[book_id].append(hadith_obj)

    # For quick search index (lightweight snippet)
    snippet_id = id_text[:140] + "..." if len(id_text) > 140 else id_text
    snippet_ar = ar_text[:120] + "..." if len(ar_text) > 120 else ar_text
    quick_index.append({
        "num": h_num,
        "book": book_id,
        "snippet_id": snippet_id,
        "snippet_ar": snippet_ar,
        "jilid": fb_info["jilid"] if fb_info else None
    })

# Write each book to public/data/books/book_X.json
books_summary = []
for b_id in range(1, 98):
    b_hadiths = books_hadiths[b_id]
    h_count = len(b_hadiths)
    first_no = b_hadiths[0]["number"] if b_hadiths else 0
    last_no = b_hadiths[-1]["number"] if b_hadiths else 0
    
    first_fb = find_fathul_bari_jilid(first_no)
    last_fb = find_fathul_bari_jilid(last_no)
    fb_jilid_str = f"Jilid {first_fb['jilid']}" if (first_fb and last_fb and first_fb['jilid'] == last_fb['jilid']) else f"Jilid {first_fb['jilid']} - {last_fb['jilid']}" if (first_fb and last_fb) else ""

    b_meta = {
        "id": b_id,
        "name_id": book_names_id.get(b_id, f"Kitab {b_id}"),
        "name_ar": book_names_ar.get(b_id, sections.get(str(b_id), f"كتاب {b_id}")),
        "name_en": sections.get(str(b_id), ""),
        "hadith_count": h_count,
        "start_hadith": first_no,
        "end_hadith": last_no,
        "fathul_bari_jilid": fb_jilid_str,
        "fathul_bari_file": first_fb["filename"] if first_fb else None,
        "fathul_bari_url": first_fb["view_url"] if first_fb else None,
        "fathul_bari_preview": first_fb["preview_url"] if first_fb else None
    }
    books_summary.append(b_meta)

    # Save individual book file
    book_file_path = f"public/data/books/book_{b_id}.json"
    with open(book_file_path, "w", encoding="utf-8") as bf:
        json.dump({
            "book": b_meta,
            "hadiths": b_hadiths
        }, bf, ensure_ascii=False)

print("Saved all 97 book JSON files.")

# Save books_summary
with open("public/data/books_metadata.json", "w", encoding="utf-8") as f:
    json.dump(books_summary, f, indent=2, ensure_ascii=False)
print("Saved books_metadata.json")

# Save fathul_bari_library with all 50 items from the user's Google Drive folder
maktabah_items = []
for fname, fid in gdrive_catalog.items():
    # Detect category
    cat = "Syarah Fathul Baari"
    if "manarul qori" in fname.lower():
        cat = "Manarul Qari Syarah Mukhtashar"
    elif "mukhtashar" in fname.lower() or "mukhtashor" in fname.lower() or "ringkasan" in fname.lower():
        cat = "Mukhtashar & Ringkasan"
    elif "shahih" in fname.lower() and "syarah" not in fname.lower():
        cat = "Matan Shahih Bukhari"
    elif "syarah" in fname.lower():
        cat = "Syarah Bukhari Lainnya"

    # Extract jilid number if any
    import re
    jilid_m = re.search(r'jilid\s*(\d+)', fname, re.IGNORECASE)
    jil_no = int(jilid_m.group(1)) if jilid_m else None

    maktabah_items.append({
        "title": fname.replace(".pdf", ""),
        "filename": fname,
        "drive_id": fid,
        "category": cat,
        "jilid": jil_no,
        "view_url": f"https://drive.google.com/file/d/{fid}/preview",
        "preview_url": f"https://drive.google.com/file/d/{fid}/preview",
        "download_url": f"https://drive.google.com/uc?export=download&id={fid}"
    })

# Sort library: Fathul Bari 1..36 first, then others
def sort_key(item):
    if item["category"] == "Syarah Fathul Baari":
        return (0, item["jilid"] or 0)
    elif item["category"] == "Manarul Qari Syarah Mukhtashar":
        return (1, item["jilid"] or 0)
    elif item["category"] == "Mukhtashar & Ringkasan":
        return (2, item["title"])
    return (3, item["title"])

maktabah_items.sort(key=sort_key)

with open("public/data/gdrive_library.json", "w", encoding="utf-8") as f:
    json.dump({
        "folder_url": "https://drive.google.com/drive/folders/110GKl6R4-wuH_luAiMiYByBLs0gEQIdr?usp=sharing",
        "total_files": len(maktabah_items),
        "items": maktabah_items,
        "fathul_bari_jilid_map": fathul_bari_jilid
    }, f, indent=2, ensure_ascii=False)
print("Saved gdrive_library.json with 50 files.")

# Save quick search index
with open("public/data/quick_search.json", "w", encoding="utf-8") as f:
    json.dump(quick_index, f, ensure_ascii=False)
print(f"Saved quick_search.json ({len(quick_index)} entries).")

print("=== Compilation Completed Successfully! ===")
