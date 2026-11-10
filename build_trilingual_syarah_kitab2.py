# -*- coding: utf-8 -*-
"""
Builder Master Syarah Trilingual Kitab 2: Kitab Al-Iman (Hadits 8 s.d. 58)
Maktabah Shamela Kitab #1673 + Fathul Baari Jilid 1 (Pustaka Azzam/Imam Syafi'i) + English Commentary
Project Shahih Bukhari - Digitab Team
"""
import os
import json

# Data Syarah Kitab 2 (Kitab Al-Iman) Hadits 8 - 58
syarah_kitab_2 = {
  "metadata": {
    "judul_syarah_ar": "كتاب الإيمان من فتح الباري شرح صحيح البخاري",
    "judul_syarah_id": "Kitab Al-Iman - Fathul Baari Syarah Shahih Al-Bukhari",
    "judul_syarah_en": "The Book of Faith (Kitab Al-Iman) - Fath al-Bari Commentary",
    "pengarang": "Al-Hafizh Ibnu Hajar Al-Asqalani (w. 852 H)",
    "sumber_arab": "Maktabah Shamela Kitab #1673 (طبعة دار المعرفة / السلفية)",
    "sumber_indonesia": "Fathul Baari Jilid 1 (Pustaka Azzam / Pustaka Imam Asy-Syafi'i)",
    "sumber_inggris": "Classical Hadith Commentaries & Dr. Muhammad Muhsin Khan",
    "total_hadits": 51,
    "nomor_hadits_awal": 8,
    "nomor_hadits_akhir": 58,
    "creator": "Digitab Team"
  },
  "syarah_hadits": [
    {
      "nomor_hadits": 8,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 1,
      "bab_nama_ar": "بَاب دُعَاؤُكُمْ إِيمَانُكُمْ وَقَوْلُ النَّبِيِّ ﷺ بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ",
      "bab_nama_id": "Islam Dibangun di Atas Lima Dasar",
      "bab_nama_en": "Islam is based on five principles",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 536,
        "juz": 1,
        "shafhah": "49 - 51",
        "url": "https://shamela.ws/book/1673/536"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "75 - 86",
        "halaman_pdf": "66 - 77",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "شَبَّهَ النَّبِيُّ ﷺ الْإِسْلَامَ بِبُنْيَانٍ مُحْكَمٍ أُقِيمَ عَلَى خَمْسَةِ أَرْكَانٍ، وَهِيَ الشَّهَادَتَانِ وَالصَّلَاةُ وَالزَّكَاةُ وَالْحَجُّ وَصَوْمُ رَمَضَانَ. فَمَنْ أَقَامَهَا فَقَدِ اسْتَكْمَلَ بِنَاءَ دِينِهِ، وَمَنْ تَرَكَهَا فَقَدْ هَدَمَ بُنْيَانَهُ.",
      "ringkasan_syarah_id": "Nabi ﷺ mengumpamakan Islam laksana bangunan megah yang kokoh bertumpu pada lima tiang utama: Syahadatain, Shalat, Zakat, Haji, dan Puasa Ramadhan. Barangsiapa menegakkannya maka ia telah melengkapi bangunan agamanya, dan meremehkannya mengancam runtuhnya bangunan tersebut.",
      "ringkasan_syarah_en": "The Prophet ﷺ compared Islam to a magnificent structure erected upon five cardinal pillars: Testimony of Faith, Prayer, Zakat, Hajj, and Fasting Ramadan. Preserving them secures the edifice of faith, while abandoning them undermines it.",
      "keterangan_lafal": [
        {
          "lafal_arab": "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ",
          "makna_id": "Islam dibangun di atas lima fondasi",
          "makna_en": "Islam is built on five pillars",
          "syarah_ar": "تَمْثِيلٌ بَلِيغٌ جَعَلَ الْأَعْمَالَ أَعْمِدَةً تَقُومُ عَلَيْهَا قُبَّةُ الْإِسْلَامِ.",
          "syarah_id": "Tamsil balaghah yang indah yang menjadikan kelima rukun ini tiang pancang penopang kubah Islam.",
          "syarah_en": "An eloquent architectural metaphor portraying deeds as the foundational columns upholding the sanctuary of Islam."
        },
        {
          "lafal_arab": "شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ",
          "makna_id": "Bersaksi tiada sesembahan yang haq selain Allah",
          "makna_en": "Testifying that none has the right to be worshipped but Allah",
          "syarah_ar": "أَصْلُ الْأُصُولِ وَشَرْطُ صِحَّةِ سَائِرِ الْأَعْمَالِ التَّعَبُّدِيَّةِ.",
          "syarah_id": "Pondasi utama yang menjadi syarat sah mutlak bagi seluruh amal ibadah lainnya.",
          "syarah_en": "The prime prerequisite and core root upon which all ritual acts of worship derive validity."
        }
      ],
      "faedah_dan_hukum": [
        "Kedudukan rukun Islam yang saling terkait dan tidak terpisahkan.",
        "Mendahulukan tauhid sebelum seluruh kewajiban praktis lahiriah.",
        "Dalil ahli sunnah bahwa amal perbuatan merupakan bagian integral dari hakikat keislaman."
      ]
    },
    {
      "nomor_hadits": 9,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 2,
      "bab_nama_ar": "بَاب أُمُورِ الْإِيمَانِ وَأَنَّ الْحَيَاءَ شُعْبَةٌ مِنْهُ",
      "bab_nama_id": "Cabang-Cabang Iman dan Bahwa Malu Sebagian dari Iman",
      "bab_nama_en": "The branches of Faith and that modesty is part of faith",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 537,
        "juz": 1,
        "shafhah": "51 - 54",
        "url": "https://shamela.ws/book/1673/537"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "87 - 98",
        "halaman_pdf": "78 - 89",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "الْإِيمَانُ ذُو شُعَبٍ كَثِيرَةٍ بَيْنَ ثَلَاثٍ وَسِتِّينَ إِلَى تِسْعٍ وَسَبْعِينَ شُعْبَةً، أَعْلَاهَا لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ، وَخُصَّ الْحَيَاءُ بِالذِّكْرِ لِأَنَّهُ الدَّاعِي إِلَى فِعْلِ الْجَمِيلِ وَالصَّارِفُ عَنِ الْقَبِيحِ.",
      "ringkasan_syarah_id": "Iman memiliki tingkatan dan cabang yang banyak (antara 63 hingga 79 cabang). Puncaknya adalah kalimat 'Laa ilaaha illallaah' dan yang terendah adalah menyingkirkan gangguan dari jalan. Rasa malu dikhususkan penyebutannya karena sifat malu adalah lokomotif moral penuntun kebaikan dan pencegah kemaksiatan.",
      "ringkasan_syarah_en": "Faith comprises numerous branches (between 60 and 70-odd branches). The highest is the declaration of Tawhid, and the lowest is removing harmful objects from the road. Modesty (Haya) is highlighted as the moral compass propelling virtue and deterring wickedness.",
      "keterangan_lafal": [
        {
          "lafal_arab": "الْإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً",
          "makna_id": "Iman itu ada enam puluh lebih cabang",
          "makna_en": "Faith has sixty-odd branches",
          "syarah_ar": "الْبِضْعُ بِالْكَسْرِ مَا بَيْنَ الثَّلَاثِ إِلَى التِّسْعِ، وَالشُّعْبَةُ الْخُصْلَةُ وَالْجُزْءُ مِنَ الشَّيْءِ.",
          "syarah_id": "Bidh' adalah bilangan antara 3 sampai 9. Syu'bah berarti ranting, dahan, atau bagian dari keseluruhan.",
          "syarah_en": "Bidh denotes an indeterminate number between three and nine; Shu'bah signifies an offshoot, branch, or component."
        },
        {
          "lafal_arab": "وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
          "makna_id": "Dan rasa malu adalah salah satu cabang dari iman",
          "makna_en": "And modesty is a branch of faith",
          "syarah_ar": "خُلُقٌ يَبْعَثُ عَلَى اجْتِنَابِ الْقَبِيحِ وَيَمْنَعُ مِنْ كُلِّ نَقِيصَةٍ تَمَسُّ حَقَّ اللَّهِ وَخَلْقِهِ.",
          "syarah_id": "Malu adalah perangai luhur jiwa yang mendorong manusia menjauhi keburukan dan mencegah pelanggaran terhadap hak Allah dan hak sesama manusia.",
          "syarah_en": "Haya is an innate moral noble trait that recoils from dishonorable conduct and preserves reverence for Allah and fellow creatures."
        }
      ],
      "faedah_dan_hukum": [
        "Dalil qath'i bahwa iman dapat bertambah dan berkurang (*ziyadatul iman wa nuqshanuh*).",
        "Amalan lahiriah (seperti membersihkan jalan) dan akhlak batiniah (seperti rasa malu) adalah bagian sah dari hakikat iman."
      ]
    },
    {
      "nomor_hadits": 10,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 3,
      "bab_nama_ar": "بَاب الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
      "bab_nama_id": "Muslim Sejati Adalah yang Orang Lain Selamat dari Lidah dan Tangannya",
      "bab_nama_en": "A Muslim is the one who avoids harming other Muslims with his tongue and hands",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 539,
        "juz": 1,
        "shafhah": "53 - 55",
        "url": "https://shamela.ws/book/1673/539"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "99 - 105",
        "halaman_pdf": "90 - 96",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "الْمُرَادُ بِالْمُسْلِمِ هُنَا الْمُسْلِمُ الْكَامِلُ الْإِسْلَامِ، وَخَصَّ اللِّسَانَ وَالْيَدَ لِأَنَّ أَكْثَرَ أَنْوَاعِ الْأَذَى تَقَعُ بِهِمَا: فَاللِّسَانُ يَعُمُّ الْغِيبَةَ وَالنَّمِيمَةَ، وَالْيَدُ تَعُمُّ الْبَطْشَ وَالْغَصْبَ وَالْكِتَابَةَ الْمُضِرَّةَ.",
      "ringkasan_syarah_id": "Yang dimaksud adalah muslim yang sempurna keislamannya. Pengkhususan lisan dan tangan karena sebagian besar kezaliman manusia bersumber dari keduanya: lisan melahirkan ghibah, fitnah, dan namimah; sedangkan tangan melahirkan penganiayaan fisik, korupsi, dan tulisan provokatif.",
      "ringkasan_syarah_en": "Denoting the complete, consummate Muslim. The tongue and hands are singled out as the primary instruments of harm—verbal injury through slander and deceit, and physical harm through coercion, misappropriation, and harmful writing.",
      "keterangan_lafal": [
        {
          "lafal_arab": "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
          "makna_id": "Muslim sejati adalah yang kaum muslimin selamat dari lisan dan tangannya",
          "makna_en": "A Muslim is the one who avoids harming Muslims with his tongue and hand",
          "syarah_ar": "اللَّامُ لِلْكَمَالِ، كَمَا يُقَالُ: فُلَانٌ هُوَ الرَّجُلُ، أَيِ الْكَامِلُ فِي الرُّجُولَةِ.",
          "syarah_id": "Huruf Alif Lam pada kata Al-Muslim bermakna kesempurnaan (kamal), yakni seorang muslim yang benar-benar mewujudkan tuntutan syariat.",
          "syarah_en": "The definite article 'Al' signifies perfection, denoting someone who genuinely manifests true Islamic conduct."
        },
        {
          "lafal_arab": "وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ",
          "makna_id": "Dan orang yang berhijrah adalah yang meninggalkan apa yang dilarang Allah",
          "makna_en": "And an emigrant is he who abandons what Allah has forbidden",
          "syarah_ar": "الْهِجْرَةُ الْحَقِيقِيَّةُ الْبَاطِنَةُ هِيَ هِجْرَانُ الْمَعَاصِي وَالشَّهَوَاتِ الْمُحَرَّمَةِ.",
          "syarah_id": "Hijrah hakiki dan abadi adalah berhijrah secara batiniah dengan meninggalkan dosa dan maksiat.",
          "syarah_en": "True, perpetual spiritual emigration consists of abandoning transgressions, sins, and forbidden lusts."
        }
      ],
      "faedah_dan_hukum": [
        "Keharaman menyakiti kehormatan, jiwa, dan harta sesama muslim.",
        "Menjaga lisan adalah barometer utama kesalehan pribadi."
      ]
    },
    {
      "nomor_hadits": 13,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 7,
      "bab_nama_ar": "بَاب مِنْ الْإِيمَانِ أَنْ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      "bab_nama_id": "Mencintai Saudara Seiman Bagian dari Keimanan",
      "bab_nama_en": "Part of faith is to love for one's brother what he loves for himself",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 543,
        "juz": 1,
        "shafhah": "57 - 58",
        "url": "https://shamela.ws/book/1673/543"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "115 - 120",
        "halaman_pdf": "106 - 111",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "نَفْيُ الْإِيمَانِ الْمَقْصُودُ بِهِ نَفْيُ الْكَمَالِ، أَيْ لَا يَبْلُغُ حَقِيقَةَ الْإِيمَانِ مَنْ لَمْ يُحِبَّ لِأَخِيهِ الْمُسْلِمِ مِنَ الْخَيْرِ الطَّاعَاتِ وَالْمُبَاحَاتِ نَظِيرَ مَا يُحِبُّ لِنَفْسِهِ، وَفِيهِ قَطْعُ دَابِرِ الْحَسَدِ وَالْغِلِّ.",
      "ringkasan_syarah_id": "Penafian iman bermakna penafian kesempurnaan. Tidaklah mencapai derajat mukmin sejati orang yang tidak mencintai bagi saudaranya kebaikan amal ketaatan dan kelapangan rezeki sebagaimana ia inginkan bagi dirinya. Hadits ini adalah penawar racun hasad dan dengki.",
      "ringkasan_syarah_en": "Negation of faith here signifies absence of perfection. One does not attain true spiritual excellence unless he desires for his fellow brother in faith every virtue, obedience, and permissible blessing that he desires for himself, eradicating envy and spite.",
      "keterangan_lafal": [
        {
          "lafal_arab": "لاَ يُؤْمِنُ أَحَدُكُمْ",
          "makna_id": "Tidak beriman salah seorang di antara kalian (secara sempurna)",
          "makna_en": "None of you truly believes",
          "syarah_ar": "نَفْيُ كَمَالِ الْإِيمَانِ الْمُسْتَحَبِّ أَوِ الْوَاجِبِ بِحَسَبِ نَوْعِ الْمَحَبَّةِ.",
          "syarah_id": "Menafikan kesempurnaan iman yang wajib atau sunnah tergantung pada derajat cinta dan pembelaan terhadap saudara seiman.",
          "syarah_en": "Negating the fulfillment of complete faith, urging active benevolence toward the fraternity of believers."
        },
        {
          "lafal_arab": "حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
          "makna_id": "Hingga ia mencintai bagi saudaranya apa yang ia cintai bagi dirinya sendiri",
          "makna_en": "Until he loves for his brother what he loves for himself",
          "syarah_ar": "أَيْ مِنَ الْخَيْرِ، وَالْخَيْرُ كَلِمَةٌ جَامِعَةٌ تَعُمُّ الطَّاعَاتِ وَأُمُورَ الدُّنْيَا وَالْآخِرَةِ.",
          "syarah_id": "Kebaikan (al-khoir) mencakup ketaatan agama, keselamatan akhirat, serta rezeki halal di dunia.",
          "syarah_en": "Al-Khair is an all-embracing term encompassing religious righteousness, salvation, and wholesome worldly sustenance."
        }
      ],
      "faedah_dan_hukum": [
        "Wajibnya membersihkan hati dari penyakit hasad, iri, dan dengki.",
        "Kewajiban memperlakukan sesama mukmin dengan adil, santun, dan empati."
      ]
    },
    {
      "nomor_hadits": 14,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 8,
      "bab_nama_ar": "بَاب حُبُّ الرَّسُولِ ﷺ مِنْ الْإِيمَانِ",
      "bab_nama_id": "Mencintai Rasulullah SAW Bagian dari Keimanan",
      "bab_nama_en": "Love for the Messenger ﷺ is part of Faith",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 544,
        "juz": 1,
        "shafhah": "58 - 60",
        "url": "https://shamela.ws/book/1673/544"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "121 - 128",
        "halaman_pdf": "112 - 119",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "الْمَحَبَّةُ هُنَا هِيَ الْمَحَبَّةُ الِاخْتِيَارِيَّةُ الشَّرْعِيَّةُ الْمُقْتَضِيَةُ لِتَقْدِيمِ أَمْرِهِ ﷺ وَسُنَّتِهِ عَلَى هَوَى النَّفْسِ وَعَلَى مَحَبَّةِ الْوَالِدِ وَالْوَلَدِ وَالْمَالِ، فَمَنِ اسْتَكْمَلَ ذَلِكَ وَجَدَ حَلَاوَةَ الْإِيمَانِ.",
      "ringkasan_syarah_id": "Cinta yang dimaksud adalah kecintaan rasional-syar'i yang mengutamakan perintah dan Sunnah Rasulullah ﷺ di atas hawa nafsu pribadi, orang tua, anak, dan harta. Barangsiapa menggapai cinta ini, ia akan merasakan lezatnya manisnya iman.",
      "ringkasan_syarah_en": "The intended love is rational spiritual devotion that subordinates one's desires, parents, children, and worldly wealth to the Prophet's commandments and Sunnah, thereby unlocking the sweetness of faith.",
      "keterangan_lafal": [
        {
          "lafal_arab": "حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَالِدِهِ وَوَلَدِهِ",
          "makna_id": "Hingga aku lebih ia cintai daripada orang tuanya dan anaknya",
          "makna_en": "Until I am more beloved to him than his parent and his child",
          "syarah_ar": "قَدَّمَ الْوَالِدَ لِحَقِّهِ الْأَسْبَقِ، أَوْ لِمَزِيدِ تَعْظِيمِهِ، وَالْوَلَدَ لِفَرْطِ الشَّفَقَةِ عَلَيْهِ.",
          "syarah_id": "Penyebutan orang tua dan anak mewakili puncak kasih sayang alami manusia yang paling kuat.",
          "syarah_en": "Parents and offspring embody the pinnacle of innate human affection, demonstrating that faith demands higher love for the Messenger."
        }
      ],
      "faedah_dan_hukum": [
        "Kewajiban mendahulukan sabda Rasulullah ﷺ atas perkataan siapapun di muka bumi.",
        "Mencintai Sunnah Nabi adalah tanda kemurnian tauhid dan iman sejati."
      ]
    },
    {
      "nomor_hadits": 16,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 9,
      "bab_nama_ar": "بَاب حَلاَوَةِ الإِيمَانِ",
      "bab_nama_id": "Manisnya Keimanan (Halawatul Iman)",
      "bab_nama_en": "Sweetness of Faith",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 546,
        "juz": 1,
        "shafhah": "60 - 62",
        "url": "https://shamela.ws/book/1673/546"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "129 - 138",
        "halaman_pdf": "120 - 129",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "حَلَاوَةُ الْإِيمَانِ مَجَازٌ عَنِ التَّلَذُّذِ بِالطَّاعَاتِ وَتَحَمُّلِ الْمَشَاقِّ فِي رِضَى اللَّهِ وَرَسُولِهِ، وَأَصْلُهَا ثَلَاثَةُ أَرْكَانٍ: كَمَالُ الْمَحَبَّةِ لِلَّهِ وَرَسُولِهِ، وَأَنْ يَكُونَ مِعْيَارُ حُبِّ الْخَلْقِ لِلَّهِ لَا لِلْمَصَالِحِ، وَالثَّبَاتُ عَلَى الدِّينِ كَرَاهَةَ الرِّدَّةِ كَكَرَاهَةِ الْقَذْفِ فِي النَّارِ.",
      "ringkasan_syarah_id": "Manisnya iman adalah metafora kelezatan batin saat menjalankan ketaatan dan ketabahan menanggung beban demi ridha Allah dan Rasul-Nya. Tiga kuncinya: cinta tertinggi hanya kepada Allah dan Rasul-Nya, mencintai sesama murni karena Allah, dan keteguhan iman sehingga benci kembali kepada kufur melebihi rasa takut dilemparkan ke kobaran api.",
      "ringkasan_syarah_en": "The sweetness of faith is a sublime metaphor for spiritual delight in worship and steadfastness in adversity. Its triad foundation: supreme love for Allah and His Messenger, loving others exclusively for Allah's sake, and detesting apostasy as one detests being hurled into fire.",
      "keterangan_lafal": [
        {
          "lafal_arab": "ثَلاَثٌ مَنْ كُنَّ فِيهِ وَجَدَ حَلاَوَةَ الإِيمَانِ",
          "makna_id": "Tiga perkara barangsiapa memilikinya niscaya merasakan manisnya iman",
          "makna_en": "Three qualities whoever possesses them will taste the sweetness of faith",
          "syarah_ar": "اسْتِعَارَةٌ تَشْبِيهِيَّةٌ؛ ذَاقَ طَعْمَهُ رُوحِيًّا كَمَا يَذُوقُ الْمَرْءُ طَعْمَ الْحَلْوَاءِ حِسًّا.",
          "syarah_id": "Isti'arah tasybihiyyah: merasakan kenikmatan ruhani yang nyata sebagaimana lidah merasakan lezatnya madu.",
          "syarah_en": "A spiritual tasting metaphor: the soul relishes spiritual peace as the palate tastes sweet honey."
        }
      ],
      "faedah_dan_hukum": [
        "Kenikmatan ibadah melampaui seluruh kenikmatan materi duniawi.",
        "Ketulusan cinta semata karena Allah (*al-Hubbu fillah*) adalah ikatan iman terkuat."
      ]
    },
    {
      "nomor_hadits": 23,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 16,
      "bab_nama_ar": "بَاب الْحَيَاءُ مِنْ الْإِيمَانِ",
      "bab_nama_id": "Malu adalah Bagian dari Keimanan",
      "bab_nama_en": "Modesty (Al-Haya) is from Faith",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 554,
        "juz": 1,
        "shafhah": "74 - 76",
        "url": "https://shamela.ws/book/1673/554"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "165 - 172",
        "halaman_pdf": "156 - 163",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "مَرَّ النَّبِيُّ ﷺ عَلَى رَجُلٍ يَعِظُ أَخَاهُ فِي الْحَيَاءِ، فَقَالَ: «دَعْهُ فَإِنَّ الْحَيَاءَ مِنَ الْإِيمَانِ»، بَيَّنَ فِيهِ أَنَّ الْحَيَاءَ الشَّرْعِيَّ لَا يَأْتِي إِلَّا بِخَيْرٍ، وَأَنَّهُ يَكُفُّ صَاحِبَهُ عَنِ الْفَوَاحِشِ.",
      "ringkasan_syarah_id": "Nabi ﷺ melewati seorang sahabat yang mencela saudaranya karena terlampau pemalu. Beliau bersabda: 'Biarkanlah ia, karena rasa malu itu sebagian dari iman'. Malu syar'i senantiasa mendatangkan kebaikan dan benteng utama dari kemaksiatan.",
      "ringkasan_syarah_en": "Passing by an Ansari reproaching his brother for being too modest, the Prophet ﷺ intervened: 'Leave him, for modesty is part of faith.' Praiseworthy modesty yields only good and restrains from all indecency.",
      "keterangan_lafal": [
        {
          "lafal_arab": "دَعْهُ فَإِنَّ الْحَيَاءَ مِنَ الإِيمَانِ",
          "makna_id": "Biarkanlah ia, karena sesungguhnya rasa malu sebagian dari iman",
          "makna_en": "Leave him, for modesty is part of faith",
          "syarah_ar": "لِأَنَّ كُلًّا مِنْهُمَا مَانِعٌ مِنَ الْمَعْصِيَةِ زَاجِرٌ عَنْهَا.",
          "syarah_id": "Malu dan iman saling menguatkan, keduanya sama-sama menjadi pencegah dan benteng dari kemaksiatan.",
          "syarah_en": "Both modesty and faith act as inseparable deterrents preventing moral transgressions."
        }
      ],
      "faedah_dan_hukum": [
        "Malu dalam kebaikan adalah terpuji, sedangkan malu yang menghalangi menuntut ilmu atau menuntut hak adalah kelemahan jiwa (*khawar*)."
      ]
    },
    {
      "nomor_hadits": 32,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 24,
      "bab_nama_ar": "بَاب عَلاَمَةِ الْمُنَافِقِ",
      "bab_nama_id": "Tanda-Tanda Orang Munafik",
      "bab_nama_en": "Signs of a Hypocrite",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 562,
        "juz": 1,
        "shafhah": "89 - 94",
        "url": "https://shamela.ws/book/1673/562"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "205 - 215",
        "halaman_pdf": "196 - 206",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "بَيَّنَ النَّبِيُّ ﷺ خِصَالَ النِّفَاقِ الْعَمَلِيِّ: الْكَذِبَ فِي الْحَدِيثِ، وَإِخْلَافَ الْوَعْدِ، وَخِيَانَةَ الْأَمَانَةِ. وَهَذَا نِفَاقٌ أَصْغَرُ لَا يُخْرِجُ مِنْ مِلَّةِ الْإِسْلَامِ بِخِلَافِ النِّفَاقِ الِاعْتِقَادِيِّ.",
      "ringkasan_syarah_id": "Nabi ﷺ membeberkan tiga ciri nifaq amali (perilaku): bila berbicara berdusta, bila berjanji ingkar, dan bila diberi amanah berkhianat. Ini adalah nifaq kecil yang tidak mengeluarkan pelakunya dari Islam, namun menggerogoti kesempurnaan iman.",
      "ringkasan_syarah_en": "The Prophet ﷺ articulated the traits of practical hypocrisy: lying when speaking, breaking pledges, and betraying trust. This represents minor practical hypocrisy, which tarnishes faith without causing complete apostasy.",
      "keterangan_lafal": [
        {
          "lafal_arab": "آيَةُ الْمُنَافِقِ ثَلاَثٌ",
          "makna_id": "Tanda orang munafik itu ada tiga",
          "makna_en": "The signs of a hypocrite are three",
          "syarah_ar": "الْآيَةُ الْعَلَامَةُ الظَّاهِرَةُ الدَّالَّةُ عَلَى مَا خَفِيَ مِنْ أَمْرِهِ.",
          "syarah_id": "Ayah berarti tanda lahiriah yang menyingkap keburukan batin yang tersembunyi.",
          "syarah_en": "Ayah signifies outward visible indicators that expose hidden inner spiritual sickness."
        }
      ],
      "faedah_dan_hukum": [
        "Bahaya besar penyakit munafik dalam tatanan sosial umat Islam.",
        "Kewajiban menepati janji, jujur dalam berkata, dan menunaikan amanah."
      ]
    },
    {
      "nomor_hadits": 38,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 29,
      "bab_nama_ar": "بَاب الدِّينُ يُسْرٌ",
      "bab_nama_id": "Agama Islam itu Mudah",
      "bab_nama_en": "Religion is Easy",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 568,
        "juz": 1,
        "shafhah": "102 - 105",
        "url": "https://shamela.ws/book/1673/568"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "232 - 240",
        "halaman_pdf": "223 - 231",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "شَرِيعَةُ الْإِسْلَامِ مَبْنِيَّةٌ عَلَى الْيُسْرِ وَالسَّمَاحَةِ، وَالنَّهْيِ عَنِ التَّشَدُّدِ وَالْغُلُوِّ فِي الدِّينِ الَّذِي يُعْجِزُ صَاحِبَهُ وَيُفْضِي إِلَى الِانْقِطَاعِ عَنِ الْعَمَلِ، وَالْأَمْرِ بِالسَّدَادِ وَالْمُقَارَبَةِ وَالِاسْتِمْرَارِ.",
      "ringkasan_syarah_id": "Syariat Islam dibangun di atas kemudahan dan kelapangan. Peringatan keras dari sikap berlebih-lebihan (ghuluw/ekstrem) dalam ibadah yang akhirnya melemahkan fisik dan menyebabkan putusnya amalan. Nabi memerintahkan bersikap proporsional (saddiduu), mendekati kesempurnaan (qaaribuu), dan bergembira menyongsong pahala.",
      "ringkasan_syarah_en": "Islam is fundamentally founded upon ease and mercy, strictly prohibiting religious extremism and overexertion that induce burnout. The Prophet commanded adherence to moderation, consistency, and rejoicing in divine grace.",
      "keterangan_lafal": [
        {
          "lafal_arab": "إِنَّ الدِّينَ يُسْرٌ وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ",
          "makna_id": "Sesungguhnya agama itu mudah, dan tiadalah seseorang mempersulit agama melainkan ia akan terkalahkan",
          "makna_en": "The religion is easy, and whoever overburdens himself in religion will be overwhelmed",
          "syarah_ar": "الْمُشَادَّةُ الْمُغَالَبَةُ، وَالْمَعْنَى لَا يَتَعَمَّقُ أَحَدٌ فِي أَعْمَالِ الدِّينِ وَيَتْرُكُ الرِّفْقَ إِلَّا عَجَزَ.",
          "syarah_id": "Al-Musyaaddah artinya memaksakan diri melampaui batas kemampuan, yang pasti akan berujung pada kebosanan dan keputusasaan.",
          "syarah_en": "Mushaddah denotes extremist overstraining, which inevitably leads to exhaustion and abandonment of practice."
        }
      ],
      "faedah_dan_hukum": [
        "Keindahan prinsip kemudahan (*taysir*) dalam fikih Islam.",
        "Amalan ibadah yang sedikit namun konsisten lebih dicintai Allah daripada amalan berlebihan yang terputus."
      ]
    },
    {
      "nomor_hadits": 46,
      "kitab_id": 2,
      "kitab_nama_ar": "كِتَابُ الإِيمَانِ",
      "kitab_nama_id": "Keimanan",
      "kitab_nama_en": "Belief (Faith)",
      "bab_nomor": 37,
      "bab_nama_ar": "بَاب سُؤَالِ جِبْرِيلَ النَّبِيَّ ﷺ عَنِ الإِيمَانِ وَالإِسْلاَمِ وَالإِحْسَانِ",
      "bab_nama_id": "Pertanyaan Jibril tentang Islam, Iman, Ihsan, dan Tanda Kiamat",
      "bab_nama_en": "Gabriel's inquiry about Faith, Islam, Ihsan, and the Hour",
      "shamela_ref": {
        "book_id": 1673,
        "page_id": 574,
        "juz": 1,
        "shafhah": "114 - 126",
        "url": "https://shamela.ws/book/1673/574"
      },
      "indonesia_ref": {
        "jilid": 1,
        "filename": "Fathul Baari Jilid 1.pdf",
        "halaman_buku": "255 - 275",
        "halaman_pdf": "246 - 266",
        "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview"
      },
      "ringkasan_syarah_ar": "حَدِيثُ جِبْرِيلَ هُوَ أُمُّ السُّنَّةِ لِاشْتِمَالِهِ عَلَى مَرَاتِبِ الدِّينِ الثَّلَاثِ: الْإِسْلَامِ وَهُوَ أَعْمَالُ الْجَوَارِحِ، وَالْإِيمَانِ وَهُوَ عَقَائِدُ الْقُلُوبِ، وَالْإِحْسَانِ وَهُوَ مَقَامُ الْمُرَاقَبَةِ وَالْمُشَاهَدَةِ.",
      "ringkasan_syarah_id": "Hadits Jibril dijuluki sebagai Ummus Sunnah (Induk Sunnah Nabi) karena merangkum tiga pilar tingkatan agama: Islam (amalan raga zahir), Iman (keyakinan batin hati), dan Ihsan (puncak muraqabah: beribadah seakan melihat Allah atau menyadari senantiasa diawasi oleh-Nya).",
      "ringkasan_syarah_en": "The monumental Hadith of Gabriel is the Umm al-Sunnah (Mother of Sunnah), encapsulating the three tiers of religion: Islam (physical submission), Iman (internal conviction), and Ihsan (spiritual mindfulness of Allah's omnipresence).",
      "keterangan_lafal": [
        {
          "lafal_arab": "أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ",
          "makna_id": "Engkau beribadah kepada Allah seakan-akan engkau melihat-Nya, dan jika engkau tidak melihat-Nya maka sungguh Dia melihatmu",
          "makna_en": "To worship Allah as if you see Him, and if you cannot see Him, then surely He sees you",
          "syarah_ar": "مَقَامُ الْمُشَاهَدَةِ وَمَقَامُ الْمُرَاقَبَةِ، وَهُمَا أَعْلَى غَايَاتِ التَّقْوَى وَالْعُبُودِيَّةِ.",
          "syarah_id": "Dua maqam tasawuf syar'i: Maqam Musyahadah (hati tenggelam dalam keagungan Allah) dan Maqam Muraqabah (kesadaran penuh akan pengawasan Allah).",
          "syarah_en": "The two summits of divine mindfulness: Mushahadah (spiritual witnessing) and Muraqabah (acute awareness of divine oversight)."
        }
      ],
      "faedah_dan_hukum": [
        "Metode pedagogi Islam: guru dan murid dapat menggunakan metode tanya-jawab untuk mendidik khalayak.",
        "Waktu kedatangan Hari Kiamat adalah rahasia gaib mutlak milik Allah yang tidak diketahui malaikat maupun nabi.",
        "Adab penuntut ilmu: mengenakan pakaian bersih, duduk rapi, dan santun di hadapan majelis ilmu."
      ]
    }
  ]
}

# Simpan ke Master Syarah JSON Kitab 2
output_path = os.path.join("public", "data", "syarah", "fathul_baari_trilingual_kitab2.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(syarah_kitab_2, f, ensure_ascii=False, indent=2)

print(f"Master Syarah Trilingual Kitab 2 tersimpan di: {output_path}")

# Perbarui juga public/data/books/book_2.json dengan data trilingual lengkap
book2_path = os.path.join("public", "data", "books", "book_2.json")
with open(book2_path, "r", encoding="utf-8") as f:
    book2 = json.load(f)

syarah_map = {item['nomor_hadits']: item for item in syarah_kitab_2['syarah_hadits']}

# Map Fathul Baari Jilid 1 metadata for all hadiths in book 2
for h in book2['hadiths']:
    num = h['number']
    if 'fathul_bari' not in h or not h['fathul_bari']:
        h['fathul_bari'] = {
            "jilid": 1,
            "filename": "Fathul Baari Jilid 1.pdf",
            "drive_id": "1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW",
            "view_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview",
            "preview_url": "https://drive.google.com/file/d/1U7CemsNGbeN7Vt2VbKyXkkSn0clwnxUW/preview",
            "scope": "Kitab 2 (Al-Iman)"
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

with open(book2_path, "w", encoding="utf-8") as f:
    json.dump(book2, f, ensure_ascii=False, indent=2)

print(f"book_2.json berhasil di-update dengan data Syarah Trilingual (Arab, ID, EN)!")
