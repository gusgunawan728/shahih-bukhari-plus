import React, { useRef, useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Layers, 
  FileText, 
  Users, 
  Star, 
  Bookmark, 
  FileEdit,
  ArrowRight
} from 'lucide-react';

export default function Hero({ 
  onStartReading, 
  onOpenLibrary, 
  onOpenSearch, 
  onOpenBio, 
  onOpenDownloadModal,
  onNavigateTab
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const bookSliderRef = useRef(null);

  const scrollBooks = (direction) => {
    if (bookSliderRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      bookSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 8 Pastel Quick Navigation Cards matching the design screenshot
  const quickNavCards = [
    {
      id: 'books',
      label: 'Semua Kitab',
      icon: BookOpen,
      bg: 'bg-[#eefcf4] dark:bg-[#0c2419]',
      border: 'border-emerald-200/70 dark:border-emerald-800/60',
      text: 'text-emerald-800 dark:text-emerald-300',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      action: () => (onNavigateTab ? onNavigateTab('books') : onStartReading(1))
    },
    {
      id: 'thematic',
      label: 'Indeks Tematik',
      icon: Layers,
      bg: 'bg-[#f8f0ff] dark:bg-[#1f132e]',
      border: 'border-purple-200/70 dark:border-purple-800/60',
      text: 'text-purple-800 dark:text-purple-300',
      iconColor: 'text-purple-600 dark:text-purple-400',
      action: () => (onNavigateTab ? onNavigateTab('thematic') : onStartReading(1))
    },
    {
      id: 'search',
      label: 'Pencarian Hadits',
      icon: Search,
      bg: 'bg-[#eff8ff] dark:bg-[#0d1e2e]',
      border: 'border-sky-200/70 dark:border-sky-800/60',
      text: 'text-sky-800 dark:text-sky-300',
      iconColor: 'text-sky-600 dark:text-sky-400',
      action: onOpenSearch
    },
    {
      id: 'library',
      label: 'Syarah (36 Jilid)',
      icon: BookOpen,
      bg: 'bg-[#fff0f6] dark:bg-[#2b101d]',
      border: 'border-pink-200/70 dark:border-pink-800/60',
      text: 'text-pink-800 dark:text-pink-300',
      iconColor: 'text-pink-600 dark:text-pink-400',
      action: onOpenLibrary
    },
    {
      id: 'bio',
      label: 'Biografi Perawi',
      icon: Users,
      bg: 'bg-[#fffbeb] dark:bg-[#261f0e]',
      border: 'border-amber-200/70 dark:border-amber-800/60',
      text: 'text-amber-800 dark:text-amber-300',
      iconColor: 'text-amber-600 dark:text-amber-400',
      action: onOpenBio
    },
    {
      id: 'featured',
      label: 'Hadits Pilihan',
      icon: Star,
      bg: 'bg-[#e6faf8] dark:bg-[#0a2323]',
      border: 'border-teal-200/70 dark:border-teal-800/60',
      text: 'text-teal-800 dark:text-teal-300',
      iconColor: 'text-teal-600 dark:text-teal-400',
      action: () => (onNavigateTab ? onNavigateTab('featured') : onStartReading(1))
    },
    {
      id: 'bookmarks',
      label: 'Bookmark',
      icon: Bookmark,
      bg: 'bg-[#eff6ff] dark:bg-[#0f1d33]',
      border: 'border-blue-200/70 dark:border-blue-800/60',
      text: 'text-blue-800 dark:text-blue-300',
      iconColor: 'text-blue-600 dark:text-blue-400',
      action: () => (onNavigateTab ? onNavigateTab('bookmarks') : onStartReading(1))
    },
    {
      id: 'notes',
      label: 'Catatan Saya',
      icon: FileEdit,
      bg: 'bg-[#f5f3ff] dark:bg-[#1a1530]',
      border: 'border-indigo-200/70 dark:border-indigo-800/60',
      text: 'text-indigo-800 dark:text-indigo-300',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      action: () => (onNavigateTab ? onNavigateTab('notes') : onStartReading(1))
    },
  ];

  // 6 Featured Kitab Cards matching the screenshot
  const featuredKitabCards = [
    { num: 1, name: 'Kitab Iman', count: '333 Hadits', bookId: 2 },
    { num: 2, name: 'Kitab Ilmu', count: '96 Hadits', bookId: 3 },
    { num: 3, name: 'Kitab Wudhu', count: '142 Hadits', bookId: 4 },
    { num: 4, name: 'Kitab Shalat', count: '448 Hadits', bookId: 8 },
    { num: 5, name: 'Kitab Zakat', count: '129 Hadits', bookId: 24 },
    { num: 6, name: 'Kitab Puasa', count: '187 Hadits', bookId: 30 },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Hero Banner: Gambar 1 Desain Artistik dengan Tombol Interaktif 3D */}
      <div className="rounded-3xl overflow-hidden shadow-lg border border-amber-300/40 dark:border-amber-900/50 relative bg-[#071711] group">
        
        {/* Gambar 1 Artwork */}
        <div className="relative w-full aspect-[16/9]">
          <img 
            src="./images/shahih_bukhari_hero_banner.jpg" 
            alt="Shahih Bukhari Plus - Portal Digital Hadits Terlengkap" 
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Area Interaktif 1: Cover Kitab 3D di Sisi Kiri */}
          <button
            onClick={() => onStartReading(1)}
            className="group/book absolute left-[3.2%] top-[13.5%] w-[33.5%] h-[75.5%] rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] focus:outline-none"
            title="Klik untuk Mulai Membaca Kitab 1 (Permulaan Wahyu)"
            aria-label="Mulai Baca Kitab 1"
          >
            <span className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/0 via-amber-400/10 to-white/20 opacity-0 group-hover/book:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="absolute bottom-[6%] left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-200 border border-emerald-400/60 shadow-xl text-[clamp(9px,1.1vw,13px)] font-bold opacity-0 group-hover/book:opacity-100 group-hover/book:-translate-y-2 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap backdrop-blur-xs">
              <Sparkles className="w-[1.1em] h-[1.1em] text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Buka Kitab 1</span>
              <ChevronRight className="w-[1.1em] h-[1.1em]" />
            </span>
          </button>

          {/* Area Interaktif 2: Tombol 3D 'Mulai Baca >' */}
          <button
            onClick={() => onStartReading(1)}
            className="group/btn absolute left-[37.8%] top-[79.0%] w-[23.5%] h-[15.5%] rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(4,120,87,0.6)] active:scale-95 active:translate-y-0.5 focus:outline-none flex items-center justify-center gap-[0.5em] px-[0.8em] bg-gradient-to-b from-[#0e8544] via-[#056330] to-[#02441f] border-2 border-emerald-300/90 shadow-[inset_0_2px_3px_rgba(255,255,255,0.4),0_6px_16px_rgba(2,68,31,0.5)] text-[clamp(9px,1.3vw,16px)]"
            title="Mulai Membaca Kitab 1 (Permulaan Wahyu)"
            aria-label="Mulai Baca Hadits"
          >
            <span className="absolute inset-x-2 top-0.5 h-[38%] rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
            <span className="relative flex items-center justify-center text-white transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:-rotate-12 filter drop-shadow">
              <BookOpen className="w-[1.25em] h-[1.25em]" />
            </span>
            <span className="font-extrabold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] select-none whitespace-nowrap">
              Mulai Baca
            </span>
            <span className="relative flex items-center justify-center text-emerald-100 transition-transform duration-300 group-hover/btn:translate-x-1">
              <ChevronRight className="w-[1.1em] h-[1.1em]" />
            </span>
          </button>

          {/* Area Interaktif 3: Tombol 3D 'Download / Unduh PDF >' */}
          <button
            onClick={onOpenDownloadModal}
            className="group/btn absolute left-[62.6%] top-[79.0%] w-[28.8%] h-[15.5%] rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(245,158,11,0.6)] active:scale-95 active:translate-y-0.5 focus:outline-none flex items-center justify-center gap-[0.5em] px-[0.8em] bg-gradient-to-b from-[#ffea54] via-[#f5b800] to-[#df8e00] border-2 border-amber-100 shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_6px_16px_rgba(223,142,0,0.5)] text-[clamp(9px,1.3vw,16px)]"
            title="Download Aplikasi Android & PC Offline / PDF"
            aria-label="Download Aplikasi Android & PC"
          >
            <span className="absolute inset-x-2 top-0.5 h-[38%] rounded-t-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
            <span className="relative flex items-center justify-center text-gray-950 transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-6 filter drop-shadow">
              <Download className="w-[1.25em] h-[1.25em]" />
            </span>
            <span className="font-black tracking-wide text-gray-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] select-none whitespace-nowrap">
              Download / Unduh PDF
            </span>
            <span className="relative flex items-center justify-center text-gray-950 transition-transform duration-300 group-hover/btn:translate-x-1">
              <ChevronRight className="w-[1.1em] h-[1.1em]" />
            </span>
          </button>
        </div>

        {/* Mobile quick buttons */}
        <div className="sm:hidden p-3 bg-gradient-to-r from-[#0d281e] to-[#143e2e] border-t border-amber-400/30 flex items-center gap-2 justify-center">
          <button
            onClick={() => onStartReading(1)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mulai Baca</span>
          </button>
          <button
            onClick={onOpenDownloadModal}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Offline / PDF</span>
          </button>
        </div>

      </div>

      {/* 2. Carousel Dots Indicator (● ○ ○ ○) */}
      <div className="flex items-center justify-center gap-2 py-1">
        {[0, 1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSlide === idx 
                ? 'w-7 bg-[#0ea570] shadow-xs' 
                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* 3. Row of 8 Pastel Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {quickNavCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={card.action}
              className={`p-3 rounded-2xl ${card.bg} border ${card.border} hover:shadow-md hover:scale-[1.03] active:scale-95 transition flex flex-col items-center justify-center text-center cursor-pointer group`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform mb-1.5`}>
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </span>
              <span className={`text-[11px] font-extrabold ${card.text} leading-tight`}>
                {card.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Section: Jelajahi Kitab Shahih Bukhari with Horizontal Slider */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
              Jelajahi Kitab Shahih Bukhari
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab ? onNavigateTab('books') : onStartReading(1)}
              className="text-xs font-bold text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 flex items-center gap-1 transition"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Slider arrows */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => scrollBooks('left')}
                className="w-7 h-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 flex items-center justify-center text-gray-700 dark:text-gray-200 transition shadow-xs active:scale-90"
                title="Geser Kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBooks('right')}
                className="w-7 h-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 flex items-center justify-center text-gray-700 dark:text-gray-200 transition shadow-xs active:scale-90"
                title="Geser Kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Book Slider */}
        <div 
          ref={bookSliderRef}
          className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x"
        >
          {featuredKitabCards.map((b) => (
            <div
              key={b.num}
              onClick={() => onStartReading(b.bookId)}
              className="w-40 sm:w-44 shrink-0 snap-start p-3.5 rounded-2xl bg-gradient-to-b from-[#0e4b33] via-[#093c28] to-[#042417] text-white border-2 border-amber-300/60 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between text-center relative overflow-hidden group"
              style={{ minHeight: '175px' }}
            >
              {/* Corner Islamic gold filigree accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-amber-400/80 pointer-events-none"></div>
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-amber-400/80 pointer-events-none"></div>
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-amber-400/80 pointer-events-none"></div>
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-amber-400/80 pointer-events-none"></div>

              {/* Number Badge */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-black font-black text-xs flex items-center justify-center shadow-md">
                {b.num}
              </div>

              {/* Islamic Book Name */}
              <div className="my-2">
                <div className="text-[13px] sm:text-sm font-extrabold tracking-wide text-white group-hover:text-amber-200 transition">
                  {b.name}
                </div>
              </div>

              {/* Hadith Count Pill */}
              <div className="px-3 py-1 rounded-full bg-white/15 border border-amber-300/40 text-[10px] font-extrabold text-amber-200 shadow-inner group-hover:bg-amber-400 group-hover:text-black transition">
                {b.count}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
