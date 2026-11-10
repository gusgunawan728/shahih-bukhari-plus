import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Globe, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function MaktabahView({ libraryData, books = [], onSelectBook, onOpenFileModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'trilingual', '36jilid'

  // Pre-compiled list of 36 Jilid Fathul Baari with starting book and description
  const jilidCatalog = useMemo(() => {
    const list = [
      { jilid: 1, name: "Permulaan Wahyu & Kitab Keimanan", bookId: 1, hadithRange: "1 - 58", booksCovered: "Kitab 1 (Permulaan Wahyu) & Kitab 2 (Keimanan)", shamelaPage: "1/9 - 140", isTrilingualReady: true },
      { jilid: 2, name: "Kitab Ilmu & Permulaan Wudhu'", bookId: 3, hadithRange: "59 - 213", booksCovered: "Kitab 3 (Ilmu) & Sebagian Kitab 4 (Wudhu)", shamelaPage: "1/141 - 310", isTrilingualReady: true },
      { jilid: 3, name: "Penyempurnaan Wudhu, Mandi Junub & Haid", bookId: 4, hadithRange: "214 - 348", booksCovered: "Kitab 4 (Wudhu), Kitab 5 (Mandi), Kitab 6 (Haid), Kitab 7 (Tayammum)", shamelaPage: "1/311 - 460", isTrilingualReady: true },
      { jilid: 4, name: "Kitab Shalat Lengkap & Tata Caranya", bookId: 8, hadithRange: "349 - 520", booksCovered: "Kitab 8 (Shalat) & Sutrah Shalat", shamelaPage: "1/461 - 590", isTrilingualReady: true },
      { jilid: 5, name: "Waktu Shalat & Permulaan Adzan", bookId: 9, hadithRange: "521 - 650", booksCovered: "Kitab 9 (Waktu Shalat) & Kitab 10 (Adzan)", shamelaPage: "2/3 - 145", isTrilingualReady: false },
      { jilid: 6, name: "Shalat Berjamaah, Imam & Shalat Jumat", bookId: 10, hadithRange: "651 - 940", booksCovered: "Kitab 10 (Adzan & Jamaah) & Kitab 11 (Jumat)", shamelaPage: "2/146 - 430", isTrilingualReady: false },
      { jilid: 7, name: "Shalat Idain, Witir, Istisqa' & Gerhana", bookId: 13, hadithRange: "941 - 1098", booksCovered: "Kitab 13 (Dua Hari Raya), Kitab 14 (Witir), Kitab 15 (Istisqa')", shamelaPage: "2/431 - 560", isTrilingualReady: false },
      { jilid: 8, name: "Sujud Sahwi, Jenazah & Pemakaman", bookId: 21, hadithRange: "1099 - 1394", booksCovered: "Kitab 21 (Sujud Tilawah), Kitab 22 (Sahwi), Kitab 23 (Jenazah)", shamelaPage: "3/3 - 260", isTrilingualReady: false },
      { jilid: 9, name: "Kitab Zakat, Sedekah & Zakat Fitrah", bookId: 24, hadithRange: "1395 - 1512", booksCovered: "Kitab 24 (Zakat) & Kitab Sedekah", shamelaPage: "3/261 - 380", isTrilingualReady: false },
      { jilid: 10, name: "Kitab Manasik Haji & Umrah (1)", bookId: 25, hadithRange: "1513 - 1650", booksCovered: "Kitab 25 (Haji: Miqat, Thawaf, Sa'i)", shamelaPage: "3/381 - 590", isTrilingualReady: false },
      { jilid: 11, name: "Kelanjutan Haji, Muhshar & Buruan Ihram", bookId: 25, hadithRange: "1651 - 1772", booksCovered: "Kitab 25 (Penyempurnaan Haji & Umrah)", shamelaPage: "4/3 - 110", isTrilingualReady: false },
      { jilid: 12, name: "Keutamaan Madinah & Kitab Puasa (Shaum)", bookId: 29, hadithRange: "1773 - 2046", booksCovered: "Kitab 29 (Fadhail Madinah) & Kitab 30 (Puasa)", shamelaPage: "4/111 - 270", isTrilingualReady: false },
      { jilid: 13, name: "Shalat Tarawih, I'tikaf & Jual Beli (Buyu')", bookId: 31, hadithRange: "2047 - 2238", booksCovered: "Kitab 31 (Tarawih), Kitab 33 (I'tikaf), Kitab 34 (Jual Beli)", shamelaPage: "4/271 - 425", isTrilingualReady: false },
      { jilid: 14, name: "Jual Beli Salam, Syuf'ah & Sewa-Menyewa", bookId: 35, hadithRange: "2239 - 2319", booksCovered: "Kitab 35 (Salam), Kitab 36 (Syuf'ah), Kitab 37 (Ijarah)", shamelaPage: "4/426 - 490", isTrilingualReady: false },
      { jilid: 15, name: "Hawalah, Kafalah, Wakalah & Pertanian", bookId: 38, hadithRange: "2320 - 2409", booksCovered: "Kitab 38 (Hawalah), Kitab 40 (Wakalah), Kitab 41 (Muzara'ah)", shamelaPage: "5/3 - 55", isTrilingualReady: false },
      { jilid: 16, name: "Pengairan, Pinjam Meminjam & Penganiayaan", bookId: 42, hadithRange: "2410 - 2482", booksCovered: "Kitab 42 (Musaqah), Kitab 43 (Pinjaman), Kitab 46 (Mazhalim)", shamelaPage: "5/56 - 150", isTrilingualReady: false },
      { jilid: 17, name: "Syirkah (Kemitraan), Gadai (Rahn) & Budak", bookId: 47, hadithRange: "2483 - 2565", booksCovered: "Kitab 47 (Syirkah), Kitab 48 (Gadai), Kitab 49 (Memerdekakan)", shamelaPage: "5/151 - 220", isTrilingualReady: false },
      { jilid: 18, name: "Hibah (Hadiah), Persaksian (Syahadat)", bookId: 51, hadithRange: "2566 - 2689", booksCovered: "Kitab 51 (Hibah) & Kitab 52 (Syahadat)", shamelaPage: "5/221 - 330", isTrilingualReady: false },
      { jilid: 19, name: "Perdamaian (Shulh), Syarat-Syarat & Wasiat", bookId: 53, hadithRange: "2690 - 2781", booksCovered: "Kitab 53 (Shulh), Kitab 54 (Syarat), Kitab 55 (Washaya)", shamelaPage: "5/331 - 425", isTrilingualReady: false },
      { jilid: 20, name: "Kitab Jihad & Ekspedisi Perang (Bagian 1)", bookId: 56, hadithRange: "2782 - 2976", booksCovered: "Kitab 56 (Jihad fis Sabilillah)", shamelaPage: "6/3 - 170", isTrilingualReady: false },
      { jilid: 21, name: "Jihad (2), Khumus, Jizyah & Gencatan Senjata", bookId: 56, hadithRange: "2977 - 3189", booksCovered: "Kitab 56 (Jihad lanjutan), Kitab 57 (Khumus), Kitab 58 (Jizyah)", shamelaPage: "6/171 - 335", isTrilingualReady: false },
      { jilid: 22, name: "Permulaan Penciptaan (Bad'ul Khalq)", bookId: 59, hadithRange: "3190 - 3325", booksCovered: "Kitab 59 (Permulaan Alam, Malaikat, Jin & Langit)", shamelaPage: "6/336 - 450", isTrilingualReady: false },
      { jilid: 23, name: "Kisah Nabi-Nabi (Ahaditsul Anbiya')", bookId: 60, hadithRange: "3326 - 3488", booksCovered: "Kitab 60 (Adam, Nuh, Ibrahim, Musa, Isa AS)", shamelaPage: "6/451 - 620", isTrilingualReady: false },
      { jilid: 24, name: "Manaqib Quraisy & Tanda Kenabian", bookId: 61, hadithRange: "3489 - 3648", booksCovered: "Kitab 61 (Manaqib Quraisy & Mukjizat Rasulullah)", shamelaPage: "6/621 - 730", isTrilingualReady: false },
      { jilid: 25, name: "Keutamaan Shahabat Nabi (Fadhailush Shahabah)", bookId: 62, hadithRange: "3649 - 3775", booksCovered: "Kitab 62 (Abu Bakar, Umar, Utsman, Ali, dll.)", shamelaPage: "7/3 - 130", isTrilingualReady: false },
      { jilid: 26, name: "Manaqib Kaum Anshar & Hijrah Nabi", bookId: 63, hadithRange: "3776 - 3948", booksCovered: "Kitab 63 (Kemuliaan Anshar & Sejarah Hijrah)", shamelaPage: "7/131 - 280", isTrilingualReady: false },
      { jilid: 27, name: "Kitab Maghazi: Perang Badar, Uhud & Khandaq", bookId: 64, hadithRange: "3949 - 4180", booksCovered: "Kitab 64 (Ekspedisi Badar, Uhud, Ahzab)", shamelaPage: "7/281 - 490", isTrilingualReady: false },
      { jilid: 28, name: "Maghazi: Khaibar, Fathu Makkah & Tabuk", bookId: 64, hadithRange: "4181 - 4473", booksCovered: "Kitab 64 (Penaklukan Makkah & Wafat Rasulullah)", shamelaPage: "7/491 - 770", isTrilingualReady: false },
      { jilid: 29, name: "Tafsir Al-Qur'anul Karim (Bagian 1)", bookId: 65, hadithRange: "4474 - 4700", booksCovered: "Kitab 65 (Tafsir Surah Al-Fatihah hingga Al-Kahf)", shamelaPage: "8/3 - 390", isTrilingualReady: false },
      { jilid: 30, name: "Tafsir Al-Qur'an (Bagian 2) & Fadhailul Qur'an", bookId: 65, hadithRange: "4701 - 5062", booksCovered: "Kitab 65 (Surah Maryam - An-Nas) & Kitab 66 (Fadhail Qur'an)", shamelaPage: "8/391 - 730", isTrilingualReady: false },
      { jilid: 31, name: "Kitab Nikah (Pernikahan Islami)", bookId: 67, hadithRange: "5063 - 5250", booksCovered: "Kitab 67 (Khitbah, Mahar, Walimah, Hak Suami-Istri)", shamelaPage: "9/3 - 260", isTrilingualReady: false },
      { jilid: 32, name: "Kitab Thalaq (Perceraian) & Nafkah", bookId: 68, hadithRange: "5251 - 5466", booksCovered: "Kitab 68 (Thalaq, Iddah, Li'an) & Kitab 69 (Nafkah)", shamelaPage: "9/261 - 530", isTrilingualReady: false },
      { jilid: 33, name: "Makanan, Aqiqah, Sembelihan & Minuman", bookId: 70, hadithRange: "5467 - 5639", booksCovered: "Kitab 70 (Makanan), Kitab 71 (Aqiqah), Kitab 72 (Berburu), Kitab 74 (Minuman)", shamelaPage: "9/531 - 670", isTrilingualReady: false },
      { jilid: 34, name: "Thibbun Nabawi (Kedokteran), Pakaian & Adab", bookId: 76, hadithRange: "5640 - 6226", booksCovered: "Kitab 76 (Thibbun Nabawi), Kitab 77 (Pakaian), Kitab 78 (Adab)", shamelaPage: "10/3 - 480", isTrilingualReady: false },
      { jilid: 35, name: "Isti'dzan (Izin), Doa-Doa & Riqaq (Zuhud)", bookId: 79, hadithRange: "6227 - 6593", booksCovered: "Kitab 79 (Isti'dzan), Kitab 80 (Doa), Kitab 81 (Riqaq/Kelembutan Hati)", shamelaPage: "11/3 - 460", isTrilingualReady: false },
      { jilid: 36, name: "Qadar, Sumpah, Faraidh, Hudud, Fitnah & Tauhid", bookId: 82, hadithRange: "6594 - 7563", booksCovered: "Kitab 82 (Takdir) hingga Kitab 97 (Tauhid Penutup Shahih Bukhari)", shamelaPage: "11/461 - 13/530", isTrilingualReady: false },
    ];
    return list;
  }, []);

  const filteredJilid = useMemo(() => {
    return jilidCatalog.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) {
        if (filterMode === 'trilingual') return item.isTrilingualReady;
        return true;
      }
      const matchSearch =
        item.jilid.toString() === q ||
        item.name.toLowerCase().includes(q) ||
        item.booksCovered.toLowerCase().includes(q) ||
        item.hadithRange.includes(q);

      if (filterMode === 'trilingual') return matchSearch && item.isTrilingualReady;
      return matchSearch;
    });
  }, [jilidCatalog, searchQuery, filterMode]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-7">
      
      {/* 1. Header Banner Utama: Shahih Bukhari Plus */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0b2b1d] via-[#123e2b] to-[#1c553b] text-white p-6 sm:p-8 shadow-xl border border-emerald-400/30 relative overflow-hidden">
        
        {/* Subtle Watermark Calligraphy */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 font-arabic text-9xl flex items-center justify-end select-none pr-6 pointer-events-none text-emerald-300">
          فتح الباري
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Shahih Bukhari Plus • Syarah Terintegrasi Tanpa PDF</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Shahih Bukhari Plus: Syarah Terintegrasi di Setiap Nomor Hadits
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
            Syarah Shahih Bukhari kini telah <strong>include langsung di dalam setiap nomor hadits</strong>, tidak lagi terpisah dalam bentuk file PDF atau ebook. Naskah syarah berbahasa Arab bersumber otentik dari <strong>Maktabah Syamilah (www.maktabasyamila.com)</strong>, dan terjemahan bahasa Indonesia lengkap dari <strong>36 Jilid Kitab Fathul Baari</strong> karya <em>Al-Hafizh Ibnu Hajar Al-’Asqalani</em> telah disajikan utuh dalam naskah digital terintegrasi.
          </p>

          {/* 4 Feature Badges */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-black/30 border border-emerald-400/20 flex items-start gap-2.5">
              <span className="text-base">🇸🇦</span>
              <div>
                <div className="text-xs font-bold text-gold-300">Maktabah Syamilah</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Teks Arab resmi Kitab #1673</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/30 border border-emerald-400/20 flex items-start gap-2.5">
              <span className="text-base">🇮🇩</span>
              <div>
                <div className="text-xs font-bold text-gold-300">36 Jilid Lengkap</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Naskah utuh terjemahan</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/30 border border-emerald-400/20 flex items-start gap-2.5">
              <span className="text-base">📖</span>
              <div>
                <div className="text-xs font-bold text-gold-300">Include Per Hadits</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Buka nomor hadits & syarah ada</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/30 border border-emerald-400/20 flex items-start gap-2.5">
              <span className="text-base">⚡</span>
              <div>
                <div className="text-xs font-bold text-gold-300">Bebas Kuota & Cepat</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Offline di Android & PC</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#12221b] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Semua (36 Jilid Lengkap)
          </button>

          <button
            onClick={() => setFilterMode('trilingual')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              filterMode === 'trilingual'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kupasan Trilingual Unggulan</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari jilid, topik, no. hadits..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

      </div>

      {/* 3. Catalog of 36 Jilid Syarah */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 px-1">
          <div>
            Menampilkan <strong>{filteredJilid.length} Jilid Syarah</strong> (Naskah Lengkap Terintegrasi)
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Klik tombol untuk langsung membaca hadits bersangkutan
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJilid.map((item) => (
            <div
              key={item.jilid}
              className="rounded-2xl bg-white dark:bg-[#12221b] border border-gray-200/90 dark:border-gray-800 hover:border-emerald-500/60 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Jilid Badge & Hadith Range */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                      {item.jilid}
                    </span>
                    <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                      Jilid {item.jilid}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Hadits #{item.hadithRange}
                  </span>
                </div>

                {/* Title & Scope */}
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {item.booksCovered}
                  </p>
                </div>

                {/* Integration Details */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Rujukan Syamilah:</span>
                    </span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-300">
                      Juz {item.shamelaPage}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                      <span>Format Syarah:</span>
                    </span>
                    <span className="font-bold text-gold-700 dark:text-gold-400">
                      Naskah Lengkap
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Button: Jump directly to the book reader where Syarah is integrated */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80">
                <button
                  onClick={() => {
                    if (onSelectBook) {
                      onSelectBook(item.bookId);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4 text-emerald-200" />
                  <span>Buka Hadits & Syarah Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
