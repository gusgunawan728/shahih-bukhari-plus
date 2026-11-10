import React, { useState } from 'react';
import { 
  BarChart2, 
  BookOpen, 
  Layers, 
  Clock, 
  Share2, 
  Bookmark, 
  Check, 
  ChevronRight, 
  Play, 
  FileText,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function RightSidebar({ 
  onSelectBook, 
  onSelectHadith, 
  onOpenSyarahModal, 
  bookmarks = [],
  onToggleBookmark,
  lastRead,
  onContinueLastRead
}) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Hadits Hari Ini (HR. Bukhari No. 1)
  const dailyHadith = {
    number: 1,
    book_id: 1,
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation: "Sesungguhnya setiap amal tergantung pada niatnya, dan sesungguhnya setiap orang (akan mendapatkan) sesuai dengan apa yang ia niatkan."
  };

  const isDailyBookmarked = bookmarks.some((b) => b.number === dailyHadith.number);

  const handleShare = () => {
    const text = `HR. Bukhari No. ${dailyHadith.number}\n\n${dailyHadith.arabic}\n\n"${dailyHadith.translation}"\n\n(Shahih Bukhari Plus Digital)`;
    if (navigator.share) {
      navigator.share({ title: 'Hadits Hari Ini', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(dailyHadith.arabic);
    u.lang = 'ar-SA';
    u.rate = 0.85;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="w-80 shrink-0 space-y-4 hidden xl:block">
      
      {/* 1. Hadits Hari Ini Card with Mosque Silhouette & Lantern */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c4a34] via-[#093c2a] to-[#042417] text-white p-5 shadow-lg border border-emerald-500/40 relative overflow-hidden">
        
        {/* Soft mosque dome & lantern background illustration */}
        <div className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none opacity-25">
          <svg viewBox="0 0 100 120" fill="currentColor" className="w-full h-full text-emerald-200">
            {/* Mosque minaret & dome outline */}
            <path d="M70,120 L70,50 Q70,40 78,32 Q80,20 80,10 L80,0 L80,10 Q80,20 82,32 Q90,40 90,50 L90,120 Z" />
            <path d="M20,120 L20,70 Q40,40 60,70 L60,120 Z" />
            {/* Hanging lantern */}
            <circle cx="85" cy="22" r="5" fill="#fcd34d" opacity="0.8" />
          </svg>
        </div>

        {/* Header: Quotation icon + Title */}
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <span className="text-amber-400 text-lg leading-none font-serif font-black">
            ❝
          </span>
          <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">
            Hadits Hari Ini
          </h3>
        </div>

        {/* Arabic Text */}
        <div className="font-arabic text-right text-base font-bold text-amber-100 leading-relaxed my-2 relative z-10">
          {dailyHadith.arabic}
        </div>

        {/* Translation */}
        <p className="text-[11px] text-emerald-100/90 leading-relaxed my-2.5 relative z-10 italic">
          "{dailyHadith.translation}"
        </p>

        {/* Bottom Row: HR. Bukhari (No. 1) + Actions */}
        <div className="pt-3 border-t border-emerald-600/50 flex items-center justify-between relative z-10">
          <button
            onClick={() => onSelectHadith ? onSelectHadith(1, 1) : onSelectBook(1)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 hover:text-white transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>HR. Bukhari (No. 1)</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleAudio}
              className={`p-1.5 rounded-lg transition ${
                isPlaying ? 'bg-amber-400 text-black' : 'hover:bg-white/10 text-emerald-200 hover:text-white'
              }`}
              title="Dengarkan Suara"
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition"
              title="Bagikan Hadits"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {onToggleBookmark && (
              <button
                onClick={() => onToggleBookmark({
                  number: dailyHadith.number,
                  book_id: dailyHadith.book_id,
                  text_ar: dailyHadith.arabic,
                  text_id: dailyHadith.translation
                })}
                className={`p-1.5 rounded-lg transition ${
                  isDailyBookmarked 
                    ? 'text-amber-400' 
                    : 'hover:bg-white/10 text-emerald-200 hover:text-white'
                }`}
                title="Bookmark Hadits"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 2. Statistik Koleksi Card */}
      <div className="rounded-3xl bg-white dark:bg-[#0c1813] border border-gray-200/90 dark:border-gray-800 p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-extrabold text-xs text-gray-900 dark:text-white">
            Statistik Koleksi
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Card 1: 7.563 Hadits */}
          <div className="p-2.5 rounded-2xl bg-[#eefcf4] dark:bg-[#0c2419] border border-emerald-100 dark:border-emerald-800/60 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
            <span className="font-black text-sm text-gray-900 dark:text-white leading-tight">
              7.563
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
              Hadits
            </span>
          </div>

          {/* Card 2: 97 Kitab */}
          <div className="p-2.5 rounded-2xl bg-[#f8f0ff] dark:bg-[#1f132e] border border-purple-100 dark:border-purple-800/60 flex flex-col items-center justify-center text-center">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400 mb-1" />
            <span className="font-black text-sm text-gray-900 dark:text-white leading-tight">
              97
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
              Kitab
            </span>
          </div>

          {/* Card 3: 36 Jilid Syarah */}
          <div className="p-2.5 rounded-2xl bg-[#fffbeb] dark:bg-[#261f0e] border border-amber-100 dark:border-amber-800/60 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
            <span className="font-black text-sm text-gray-900 dark:text-white leading-tight">
              36
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
              Jilid Syarah
            </span>
          </div>
        </div>
      </div>

      {/* 3. Lanjutkan Membaca Card */}
      <div className="rounded-3xl bg-white dark:bg-[#0c1813] border border-gray-200/90 dark:border-gray-800 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-xs text-gray-900 dark:text-white">
              Lanjutkan Membaca
            </h3>
          </div>
          <button
            onClick={() => onSelectBook(4)}
            className="text-[10px] font-bold text-gray-500 hover:text-emerald-600 dark:text-gray-400 transition"
          >
            Lihat Semua &gt;
          </button>
        </div>

        {/* Reading progress item matching screenshot */}
        <div 
          onClick={() => onSelectBook(4)}
          className="p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 flex items-center justify-between gap-2.5 cursor-pointer hover:border-emerald-400 transition group"
        >
          {/* Green Islamic book thumbnail */}
          <div className="w-10 h-12 rounded-lg bg-gradient-to-b from-[#0e4b33] to-[#042417] border border-amber-300/60 p-1 flex items-center justify-center text-center shadow-xs shrink-0">
            <span className="text-[7px] text-amber-200 font-arabic leading-tight">
              كتاب الوضوء
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-xs text-gray-900 dark:text-white truncate group-hover:text-emerald-600 transition">
              Kitab Wudhu – Bab Bersuci dengan Air
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-[#0ea570] rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                65%
              </span>
            </div>
          </div>

          {/* Green circular play button */}
          <button 
            className="w-7 h-7 rounded-full bg-[#0ea570] hover:bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs transition group-hover:scale-105"
            title="Lanjutkan Baca Kitab Wudhu"
          >
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* 4. Hadits Terakhir Dibaca Card */}
      <div className="rounded-3xl bg-white dark:bg-[#0c1813] border border-gray-200/90 dark:border-gray-800 p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-extrabold text-xs text-gray-900 dark:text-white">
            Hadits Terakhir Dibaca
          </h3>
        </div>

        <div className="space-y-2">
          {/* Item 1: HR. Bukhari No. 42 */}
          <div
            onClick={() => onSelectHadith ? onSelectHadith(2, 42) : onSelectBook(2)}
            className="p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 hover:border-emerald-400 transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </span>
              <div className="truncate">
                <div className="font-extrabold text-xs text-gray-900 dark:text-white truncate group-hover:text-emerald-600">
                  HR. Bukhari No. 42
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  Tentang Rukun Islam
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition shrink-0 ml-1" />
          </div>

          {/* Item 2: HR. Bukhari No. 333 */}
          <div
            onClick={() => onSelectHadith ? onSelectHadith(3, 333) : onSelectBook(3)}
            className="p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 hover:border-emerald-400 transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </span>
              <div className="truncate">
                <div className="font-extrabold text-xs text-gray-900 dark:text-white truncate group-hover:text-emerald-600">
                  HR. Bukhari No. 333
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  Tentang Keutamaan Ilmu
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition shrink-0 ml-1" />
          </div>
        </div>
      </div>

    </div>
  );
}
