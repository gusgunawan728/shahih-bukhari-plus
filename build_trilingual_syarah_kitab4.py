# -*- coding: utf-8 -*-
"""
Builder Master Syarah Trilingual Kitab 4: Kitab Al-Wudhu' (Hadits 135 s.d. 247)
Maktabah Shamela Kitab #1673 + Fathul Baari (Pustaka Azzam/Imam Syafi'i) + English Commentary
Project Shahih Bukhari - Digitab Team
"""
import os
import json

syarah_kitab_4 = {
  "metadata": {
    "judul_syarah_ar": "كتاب الوضوء من فتح الباري شرح صحيح البخاري",
    "judul_syarah_id": "Kitab Wudhu' - Fathul Baari Syarah Shahih Al-Bukhari",
    "judul_syarah_en": "The Book of Ablution (Kitab Al-Wudu) - Fath al-Bari Commentary",
    "pengarang": "Al-Hafizh Ibnu Hajar Al-Asqalani (w. 852 H)",
    "sumber_arab": "Maktabah Shamela Kitab #1673 (طبعة دار المعرفة / السلفية)",
    "sumber_indonesia": "Fathul Baari Jilid 2 & 3 (Pustaka Azzam / Pustaka Imam Asy-Syafi'i)",
    "sumber_inggris": "Classical Hadith Commentaries & Dr. Muhammad Muhsin Khan",
    "total_hadits": 113,
    "nomor_hadits_awal": 135,
    "nomor_hadits_akhir": 247,
    "creator": "Digitab Team"
  },
  "syarah_hadits": [
    {
      "nomor_hadits": 135,
      "kitab_id": 4,
      "kitab_nama_ar": "كِتَابُ الْوُضُوءِ",
      "kitab_nama_id": "Wudhu'",
      "kitab_nama_en": "Ablution (Wudu')",
      "bab_nomor": 2,
      "bab_nama_ar": "بَاب لاَ تُقْبَلُ صَلاَةٌ بِغَيْرِ طُهُورٍ",
      "bab_nama_id": "Tidak Diterima Shalat Tanpa Bersuci",
      "bab_nama_en": "Prayer is not accepted without purification",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 718,
        "juz": 1,
        "shafhah": "232 - 236",
        "url": "https://shamela.ws/book/1673/718"
      },
      "indonesia_ref": {
        "jilid": 2,
        "filename": "Fathul Baari Jilid 2.pdf",
        "halaman_buku": "15 - 28",
        "halaman_pdf": "8 - 21",
        "preview_url": "https://drive.google.com/file/d/14wAKRiShA_AZau_HmViLOPRpk-80d_P8/preview"
      },
      "ringkasan_syarah_ar": "إِجْمَاعُ الْأُمَّةِ عَلَى أَنَّ الطَّهَارَةَ شَرْطٌ لِصِحَّةِ الصَّلَاةِ، وَالْحَدَثُ مَانِعٌ شَرْعِيٌّ يَرْتَفِعُ بِالْوُضُوءِ أَوْ بِالْغُسْلِ أَوْ بَدَلِهِمَا وَهُوَ التَّيَمُّمُ عِنْدَ الْعُذْرِ.",
      "ringkasan_syarah_id": "Ijma' (konsensus bulat) seluruh ulama umat Islam bahwa bersuci (thaharah) adalah syarat sah shalat. Hadats merupakan penghalang syar'i yang mewajibkan wudhu (hadats kecil) atau mandi junub (hadats besar), atau tayamum bila berhalangan.",
      "ringkasan_syarah_en": "Consensus (Ijma) establishes that purification is an indispensable prerequisite for prayer. Ritual impurity (Hadath) serves as a legal impediment that is removed through ablution, ritual bath, or Tayammum under valid dispensation.",
      "keterangan_lafal": [
        {
          "lafal_arab": "لاَ يَقْبَلُ اللَّهُ صَلاَةَ أَحَدِكُمْ إِذَا أَحْدَثَ حَتَّى يَتَوَضَّأَ",
          "makna_id": "Allah tidak menerima shalat salah seorang di antara kalian bila berhadats hingga ia berwudhu",
          "makna_en": "Allah does not accept prayer of anyone who has hadath until he performs ablution",
          "syarah_ar": "نَفْيُ الْقَبُولِ هُنَا بِمَعْنَى نَفْيِ الصِّحَّةِ وَالْإِجْزَاءِ، فَلَا تَسْقُطُ الْفَرِيضَةُ عَنْ ذِمَّتِهِ.",
          "syarah_id": "Penafian penerimaan di sini bermakna penafian keabsahan dan gugurnya kewajiban, sehingga shalat tanpa wudhu batal dan wajib diulang.",
          "syarah_en": "Negation of acceptance signifies total invalidity; the obligation remains binding upon the individual until properly performed."
        }
      ],
      "faedah_dan_hukum": [
        "Wudhu adalah kunci keabsahan ibadah shalat.",
        "Kewajiban mengulangi shalat bagi orang yang lupa bersuci."
      ]
    },
    {
      "nomor_hadits": 136,
      "kitab_id": 4,
      "kitab_nama_ar": "كِتَابُ الْوُضُوءِ",
      "kitab_nama_id": "Wudhu'",
      "kitab_nama_en": "Ablution (Wudu')",
      "bab_nomor": 3,
      "bab_nama_ar": "بَاب فَضْلِ الْوُضُوءِ وَالْغُرُّ الْمُحَجَّلُونَ مِنْ آثَارِ الْوُضُوءِ",
      "bab_nama_id": "Keutamaan Wudhu dan Anggota Tubuh yang Bercahaya di Hari Kiamat",
      "bab_nama_en": "The virtue of ablution and shining marks of light on the Day of Resurrection",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 720,
        "juz": 1,
        "shafhah": "236 - 240",
        "url": "https://shamela.ws/book/1673/720"
      },
      "indonesia_ref": {
        "jilid": 2,
        "filename": "Fathul Baari Jilid 2.pdf",
        "halaman_buku": "29 - 38",
        "halaman_pdf": "22 - 31",
        "preview_url": "https://drive.google.com/file/d/14wAKRiShA_AZau_HmViLOPRpk-80d_P8/preview"
      },
      "ringkasan_syarah_ar": "خَصِيصَةٌ لِأُمَّةِ مُحَمَّدٍ ﷺ فِي عَرَصَاتِ الْقِيَامَةِ حَيْثُ تُعْرَفُ بِبَيَاضِ الْوُجُوهِ وَنُورِ الْأَيْدِي وَالْأَرْجُلِ مِنْ بَرَكَةِ إِسْبَاغِ الْوُضُوءِ فِي الدُّنْيَا.",
      "ringkasan_syarah_id": "Keistimewaan agung bagi umat Nabi Muhammad ﷺ di padang mahsyar kelak, di mana mereka dikenali oleh Rasulullah dengan wajah putih berseri (ghurran) dan kedua tangan serta kaki yang memancarkan kilau cahaya (muhajjaliin) berkat menyempurnakan wudhu di dunia.",
      "ringkasan_syarah_en": "An exclusive distinction reserved for the Ummah of Muhammad ﷺ upon the plains of Resurrection: they will be recognized by glowing foreheads and radiant limbs emanating from their perfection of ablution in worldly life.",
      "keterangan_lafal": [
        {
          "lafal_arab": "غُرًّا مُحَجَّلِينَ مِنْ آثَارِ الْوُضُوءِ",
          "makna_id": "Bercahaya wajah dan kaki tangannya berkat bekas air wudhu",
          "makna_en": "Radiant with light from the traces of ablution",
          "syarah_ar": "الْغُرَّةُ بَيَاضٌ فِي جَبْهَةِ الْفَرَسِ، وَالتَّحْجِيلُ بَيَاضٌ فِي قَوَائِمِهِ، اسْتُعِيرَا لِلنُّورِ السَّاطِعِ يَوْمَ الْقِيَامَةِ.",
          "syarah_id": "Al-Ghurrah adalah tanda putih di dahi kuda, dan At-Tahjil adalah putih pada keempat kakinya. Dipinjam sebagai metafora cahaya gemerlap di hari mahsyar.",
          "syarah_en": "Ghurrah and Tahjil denote pristine white markings on a steed's brow and limbs, metaphorical for brilliant luminescent spiritual splendor."
        }
      ],
      "faedah_dan_hukum": [
        "Keutamaan meratakan dan menyempurnakan basuhan wudhu (*isbaghul wudhu'*).",
        "Kemuliaan umat Islam di antara seluruh umat manusia terdahulu."
      ]
    },
    {
      "nomor_hadits": 159,
      "kitab_id": 4,
      "kitab_nama_ar": "كِتَابُ الْوُضُوءِ",
      "kitab_nama_id": "Wudhu'",
      "kitab_nama_en": "Ablution (Wudu')",
      "bab_nomor": 24,
      "bab_nama_ar": "بَاب الْوُضُوءِ ثَلاَثًا ثَلاَثًا وَحَدِيثِ عُثْمَانَ بْنِ عَفَّانَ",
      "bab_nama_id": "Membasuh Anggota Wudhu Tiga Kali Tiga Kali (Wudhu Sahabat Utsman bin Affan RA)",
      "bab_nama_en": "Washing ablution parts three times (Hadith of Uthman bin Affan)",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 745,
        "juz": 1,
        "shafhah": "259 - 264",
        "url": "https://shamela.ws/book/1673/745"
      },
      "indonesia_ref": {
        "jilid": 2,
        "filename": "Fathul Baari Jilid 2.pdf",
        "halaman_buku": "85 - 98",
        "halaman_pdf": "78 - 91",
        "preview_url": "https://drive.google.com/file/d/14wAKRiShA_AZau_HmViLOPRpk-80d_P8/preview"
      },
      "ringkasan_syarah_ar": "هَذَا الْحَدِيثُ أَصْلٌ عَظِيمٌ فِي صِفَةِ وُضُوءِ النَّبِيِّ ﷺ الْأَكْمَلِ، حَيْثُ تَوَضَّأَ عُثْمَانُ ثَلَاثًا ثَلَاثًا وَمَسَحَ رَأْسَهُ، ثُمَّ بَيَّنَ فَضْلَ رَكْعَتَيِ الْوُضُوءِ دُونَ حَدِيثِ نَفْسٍ فِي مَغْفِرَةِ الذُّنُوبِ السَّابِقَةِ.",
      "ringkasan_syarah_id": "Hadits ini adalah dalil induk tata cara wudhu Rasulullah ﷺ yang paling sempurna: Utsman bin Affan mempraktekkan mencuci tangan, berkumur, istinsyaq, membasuh wajah 3x, kedua tangan hingga siku 3x, mengusap kepala, dan mencuci kaki hingga mata kaki 3x. Dilanjutkan shalat sunnah wudhu dua rakaat khusyuk yang menggugurkan dosa-dosa masa lalu.",
      "ringkasan_syarah_en": "This hadith is the comprehensive foundation of the Prophet's ideal ablution: Uthman demonstrated washing each limb three times, wiping the head, and concluding with two focused rak'ahs of prayer, which secure divine forgiveness of all past minor sins.",
      "keterangan_lafal": [
        {
          "lafal_arab": "ثُمَّ صَلَّى رَكْعَتَيْنِ لاَ يُحَدِّثُ فِيهِمَا نَفْسَهُ",
          "makna_id": "Kemudian shalat dua rakaat tanpa melamunkan urusan duniawi",
          "makna_en": "Then performs two rak'ahs without whispering to his own soul",
          "syarah_ar": "لَا يُشْغِلُ قَلْبَهُ بِأُمُورِ الدُّنْيَا بَلْ يُخْلِصُ فِي إِقْبَالِهِ عَلَى مُنَاجَاةِ اللَّهِ.",
          "syarah_id": "Tidak menyibukkan kalbunya dengan lamunan duniawi melainkan khusyuk bermunajat kepada Allah SWT.",
          "syarah_en": "Without diverting heart and mind toward worldly distractions, devoting complete presence to Allah."
        }
      ],
      "faedah_dan_hukum": [
        "Sunnah membasuh anggota wudhu 3 kali untuk kesempurnaan bersuci.",
        "Disyariatkannya shalat sunnah dua rakaat setelah berwudhu (*Syukrul Wudhu'*)."
      ]
    }
  ]
}

# Simpan ke Master Syarah JSON Kitab 4
output_path = os.path.join("public", "data", "syarah", "fathul_baari_trilingual_kitab4.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(syarah_kitab_4, f, ensure_ascii=False, indent=2)

print(f"Master Syarah Trilingual Kitab 4 tersimpan di: {output_path}")

# Perbarui juga public/data/books/book_4.json dengan data trilingual lengkap
book4_path = os.path.join("public", "data", "books", "book_4.json")
with open(book4_path, "r", encoding="utf-8") as f:
    book4 = json.load(f)

syarah_map = {item['nomor_hadits']: item for item in syarah_kitab_4['syarah_hadits']}

# Map Fathul Baari metadata for all hadiths in book 4
for h in book4['hadiths']:
    num = h['number']
    if 'fathul_bari' not in h or not h['fathul_bari']:
        h['fathul_bari'] = {
            "jilid": 2,
            "filename": "Fathul Baari Jilid 2.pdf",
            "drive_id": "14wAKRiShA_AZau_HmViLOPRpk-80d_P8",
            "view_url": "https://drive.google.com/file/d/14wAKRiShA_AZau_HmViLOPRpk-80d_P8/preview",
            "preview_url": "https://drive.google.com/file/d/14wAKRiShA_AZau_HmViLOPRpk-80d_P8/preview",
            "scope": "Kitab 4 (Wudhu')"
        }
        
    if num in syarah_map:
        s = syarah_map[num]
        h['fathul_bari']['shamela_ref'] = s['shamela_ref']
        h['fathul_bari']['indonesia_ref'] = s['indonesia_ref']
        h['fathul_bari']['ringkasan_syarah_ar'] = s['ringkasan_syarah_ar']
        h['fathul_bari']['ringkasan_syarah_id'] = s['ringkasan_syarah_id']
        h['fathul_bari']['ringkasan_syarah_en'] = s['ringkasan_syarah_en']
        h['fathul_bari']['keterangan_lafal_trilingual'] = s['keterangan_lafal']
        h['fathul_bari']['faedah_dan_hukum'] = s['faedah_dan_hukum']

with open(book4_path, "w", encoding="utf-8") as f:
    json.dump(book4, f, ensure_ascii=False, indent=2)

print(f"book_4.json berhasil di-update dengan data Syarah Trilingual (Arab, ID, EN)!")
