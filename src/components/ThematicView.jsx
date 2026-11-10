import React, { useState } from 'react';
import { 
  Layers, 
  BookOpen, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Sun, 
  Compass, 
  Users, 
  Award,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function ThematicView({ books = [], onSelectBook, onSelectHadith }) {
  const [searchTopic, setSearchTopic] = useState('');

  const themes = [
    {
      id: 'iman',
      title: 'Iman, Tauhid & Akidah',
      arabic: 'الإيمان والعقيدة',
      icon: Heart,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Kitab #2 & #97',
      desc: 'Rukun iman, cabang-cabang iman, tauhid kepada Allah, fitrah manusia, dan perlindungan dari syirik.',
      books: [
        { id: 2, name: 'Kitab Iman', count: 137, startNo: 8 },
        { id: 97, name: 'Kitab Tauhid', count: 193, startNo: 7371 }
      ]
    },
    {
      id: 'ibadah',
      title: 'Thaharah, Shalat & Adzan',
      arabic: 'الطهارة والصلاة',
      icon: Sun,
      color: 'from-emerald-600 to-teal-700',
      badge: 'Kitab #4 s/d #23',
      desc: 'Wudhu, tayamum, mandi wajib, shalat lima waktu, shalat berjamaah, jum\'at, witir, dan gerhana.',
      books: [
        { id: 4, name: 'Kitab Wudhu', count: 114, startNo: 135 },
        { id: 8, name: 'Kitab Shalat', count: 149, startNo: 349 },
        { id: 10, name: 'Kitab Adzan', count: 147, startNo: 603 },
        { id: 11, name: 'Kitab Jum\'at', count: 48, startNo: 876 }
      ]
    },
    {
      id: 'zakat-puasa',
      title: 'Zakat, Sedekah & Puasa Ramadhan',
      arabic: 'الزكاة والصوم',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      badge: 'Kitab #24 s/d #32',
      desc: 'Kewajiban zakat, sedekah sukarela, keutamaan bulan Ramadhan, lailatul qadar, dan itikaf.',
      books: [
        { id: 24, name: 'Kitab Zakat', count: 118, startNo: 1395 },
        { id: 30, name: 'Kitab Puasa', count: 100, startNo: 1891 },
        { id: 31, name: 'Kitab Tarawih', count: 9, startNo: 2008 },
        { id: 32, name: 'Kitab I\'tikaf', count: 18, startNo: 2025 }
      ]
    },
    {
      id: 'haji',
      title: 'Haji & Umrah',
      arabic: 'الحج والعمرة',
      icon: Compass,
      color: 'from-cyan-600 to-blue-700',
      badge: 'Kitab #25 s/d #29',
      desc: 'Tata cara manasik haji, thawaf, sa\'i, wukuf di Arafah, dam, umrah, serta keutamaan kota Madinah Munawwarah.',
      books: [
        { id: 25, name: 'Kitab Haji', count: 243, startNo: 1513 },
        { id: 26, name: 'Kitab Umrah', count: 26, startNo: 1773 },
        { id: 29, name: 'Kitab Keutamaan Madinah', count: 21, startNo: 1867 }
      ]
    },
    {
      id: 'muamalah',
      title: 'Muamalah, Jual Beli & Ekonomi Syariah',
      arabic: 'البيوع والمعاملات',
      icon: Layers,
      color: 'from-purple-600 to-pink-700',
      badge: 'Kitab #34 s/d #55',
      desc: 'Jual beli halal & haram, salam, syirkah, gadai, sewa, upah kerja, hibah, saksi, dan wasiat.',
      books: [
        { id: 34, name: 'Kitab Jual Beli (Buyu\')', count: 161, startNo: 2047 },
        { id: 41, name: 'Kitab Syirkah', count: 21, startNo: 2483 },
        { id: 43, name: 'Kitab Gadai (Rahn)', count: 8, startNo: 2508 },
        { id: 55, name: 'Kitab Wasiat', count: 40, startNo: 2738 }
      ]
    },
    {
      id: 'akhlak',
      title: 'Akhlak, Adab & Doa Harian',
      arabic: 'الأدب والدعوات',
      icon: Heart,
      color: 'from-rose-500 to-red-700',
      badge: 'Kitab #78 s/d #80',
      desc: 'Bakti kepada kedua orang tua, silaturahmi, menjaga lisan, adab bertamu, salam, dan kumpulan doa mustajab.',
      books: [
        { id: 78, name: 'Kitab Adab', count: 256, startNo: 5970 },
        { id: 79, name: 'Kitab Meminta Izin (Isti\'dzan)', count: 53, startNo: 6227 },
        { id: 80, name: 'Kitab Doa-Doa (Da\'awat)', count: 104, startNo: 6304 }
      ]
    },
    {
      id: 'sirah',
      title: 'Sirah Nabawiyah & Para Sahabat',
      arabic: 'السيرة وفضائل الصحابة',
      icon: Users,
      color: 'from-emerald-700 to-teal-900',
      badge: 'Kitab #62 s/d #64',
      desc: 'Keutamaan sahabat Nabi (Abu Bakar, Umar, Utsman, Ali, Anshar, Muhajirin) dan sejarah peperangan Rasulullah ﷺ.',
      books: [
        { id: 62, name: 'Kitab Keutamaan Sahabat', count: 120, startNo: 3649 },
        { id: 63, name: 'Kitab Manakib Anshar', count: 96, startNo: 3776 },
        { id: 64, name: 'Kitab Maghazi (Peperangan)', count: 437, startNo: 3949 }
      ]
    },
    {
      id: 'akhir-zaman',
      title: 'Fitnah Akhir Zaman, Kiamat & Hari Pembalasan',
      arabic: 'الفتن وأشراط الساعة',
      icon: Flame,
      color: 'from-red-600 to-amber-700',
      badge: 'Kitab #91 s/d #93',
      desc: 'Tanda-tanda kiamat, keluarnya Dajjal, turunnya Nabi Isa, tiupan sangkakala, hisab, surga, dan neraka.',
      books: [
        { id: 81, name: 'Kitab Riqaq (Pelembut Hati)', count: 187, startNo: 6412 },
        { id: 92, name: 'Kitab Fitnah', count: 96, startNo: 7048 },
        { id: 93, name: 'Kitab Hukum & Pemerintahan', count: 87, startNo: 7137 }
      ]
    }
  ];

  const filteredThemes = themes.filter((t) => {
    const q = searchTopic.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.arabic.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-islamic-950 text-white p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-xs">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>Indeks Tematik Digital Shahih Al-Bukhari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Klasifikasi Hadits Berdasarkan Topik
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
            Telusuri hadits-hadits Rasulullah ﷺ yang telah disusun secara tematik dari 97 Kitab. Memudahkan pencarian tema fikih, akidah, akhlak, dan sejarah dengan satu klik.
          </p>
        </div>
      </div>

      {/* Search Topic */}
      <div className="relative">
        <input
          type="text"
          value={searchTopic}
          onChange={(e) => setSearchTopic(e.target.value)}
          placeholder="Cari tema / topik hadits (misal: shalat, jual beli, fitnah, akidah)..."
          className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c1813] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredThemes.map((theme) => {
          const Icon = theme.icon;
          return (
            <div
              key={theme.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#0c1813] border border-gray-200/90 dark:border-gray-800 hover:border-emerald-400 shadow-sm transition space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${theme.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                      {theme.title}
                    </h3>
                    <p className="text-xs font-arabic text-emerald-700 dark:text-emerald-400">
                      {theme.arabic}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {theme.badge}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {theme.desc}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Kitab Terkait:
                </div>
                {theme.books.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onSelectBook(b.id)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-gray-50 hover:bg-emerald-50 dark:bg-gray-900/60 dark:hover:bg-emerald-950/40 text-left transition group text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] flex items-center justify-center">
                        {b.id}
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                        {b.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-emerald-600">
                      <span className="text-[11px] font-medium">{b.count} Hadits</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
