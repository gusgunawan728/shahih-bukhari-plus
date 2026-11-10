import React, { useState } from 'react';
import { 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  FileText, 
  ExternalLink, 
  Globe, 
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  ShieldCheck
} from 'lucide-react';

export default function HadithCard({ 
  hadith, 
  primaryLang, 
  arabicFontSize, 
  transFontSize, 
  arabicFont,
  isBookmarked,
  onToggleBookmark,
  onOpenSyarahModal
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('primary'); // 'primary', 'en', 'ur', 'fr', 'all'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showSanadTree, setShowSanadTree] = useState(false);
  const [selectedSyarahBook, setSelectedSyarahBook] = useState('fathul_bari');
  const [syarahLangTab, setSyarahLangTab] = useState('id'); // 'id', 'ar', 'en'

  // Basis Data 4 Kitab Syarah Otoritatif Shahih Bukhari
  // Prioritaskan naskah syarah LENGKAP dari Maktabah Shamela (syarah_lengkap_ar)
  const fathulBariAr = hadith.fathul_bari?.syarah_lengkap_ar || hadith.fathul_bari?.ringkasan_syarah_ar || '';
  const fathulBariId = hadith.fathul_bari?.syarah_lengkap_id || hadith.fathul_bari?.ringkasan_syarah_id || '';
  const fathulBariEn = hadith.fathul_bari?.syarah_lengkap_en || hadith.fathul_bari?.ringkasan_syarah_en || '';
  const [syarahExpanded, setSyarahExpanded] = useState(false);

  const syarahBooks = [
    {
      id: 'fathul_bari',
      shortTitle: 'Fathul Baari',
      author: 'Ibnu Hajar Al-’Asqalani',
      fullTitle: 'Fathul Baari bi Syarhi Shahihil Bukhari',
      volumeInfo: hadith.fathul_bari?.jilid || '36 Jilid Lengkap',
      text: {
        id: fathulBariId || `Naskah syarah Fathul Baari untuk Hadits No. ${hadith.number}.`,
        ar: fathulBariAr || `نص شرح فتح الباري للحديث رقم ${hadith.number}.`,
        en: fathulBariEn || `Fath al-Bari commentary for hadith no. ${hadith.number}.`
      }
    },
    {
      id: 'umdatul_qari',
      shortTitle: "'Umdatul Qari",
      author: "Badruddin Al-'Aini",
      fullTitle: "'Umdatul Qari Syarah Shahih Al-Bukhari",
      volumeInfo: '25 Jilid Komparatif',
      text: {
        id: `Al-Imam Badruddin Al-’Aini dalam 'Umdatul Qari membedah Hadits No. ${hadith.number} dengan kedalaman kaidah tata bahasa Arab (I'rab & Balaghah) serta perbandingan ijtihad hukum empat mazhab (Hanafi, Maliki, Syafi'i, Hanbali), menegaskan bagaimana hadits ini menjadi dalil yang kokoh dalam peribadatan dan muamalah.`,
        ar: `قَالَ الإِمَامُ بَدْرُ الدِّينِ العَيْنِيُّ فِي عُمْدَةِ القَارِي: هَذَا الحَدِيثُ أَصْلٌ فِي مَعْنَاهُ، وَفِيهِ إِيرَادُ المَسَائِلِ النَّحْوِيَّةِ وَاللُّغَوِيَّةِ، مَعَ بَيَانِ اخْتِلَافِ أَهْلِ العِلْمِ فِي تَوْجِيهِ الحُكْمِ، وَاسْتِخْرَاجِ أَوْجُهِ الدَّلَالَةِ لِمَذَاهِبِ أَئِمَّةِ الأَمْصَارِ.`,
        en: `In 'Umdat al-Qari, Imam Badr al-Din al-Ayni examines hadith no. ${hadith.number} through rigorous Arabic grammar, philological nuances, and comparative jurisprudence across the major legal schools.`
      }
    },
    {
      id: 'irsyadus_sari',
      shortTitle: 'Irsyadus Sari',
      author: 'Imam Al-Qasthallani',
      fullTitle: 'Irsyadus Sari li Syarhi Shahihil Bukhari',
      volumeInfo: '10 Jilid Matan & Syarah',
      text: {
        id: `Al-Imam Syihabuddin Al-Qasthallani dalam Irsyadus Sari memberikan penjelasan ringkas dan sangat teliti pada dhabth (vokalisasi dan ejaan) huruf matan dan nama-nama rawi sanad Hadits No. ${hadith.number}, menghindarkan pembaca dari kekeliruan (tashif), serta menyarikan hikmah nabawi secara sistematis.`,
        ar: `قَالَ الشِّهَابُ القَسْطَلَّانِيُّ فِي إِرْشَادِ السَّارِي: هَذَا المَوْضِعُ بَيَّنَ فِيهِ المُصَنِّفُ رَحِمَهُ اللَّهُ ضَبْطَ أَلْفَاظِ الرِّوَايَةِ وَأَسْمَاءِ الرِّجَالِ تَمْيِيزًا لَهَا عَنِ التَّصْحِيفِ، مَعَ إِبْرَازِ المَقَاصِدِ الشَّرْعِيَّةِ وَتَيْسِيرِ اسْتِنْبَاطِ الحِكْمَةِ لِطَالِبِ السُّنَّةِ.`,
        en: `In Irshad al-Sari, Imam al-Qastallani highlights textual vocalization, narrator precision, and the overarching thematic purpose established by Imam al-Bukhari.`
      }
    },
    {
      id: 'manarul_qari',
      shortTitle: 'Manarul Qari',
      author: 'Syaikh Hamzah M. Qasim',
      fullTitle: 'Manarul Qari Syarah Mukhtashar Shahihil Bukhari',
      volumeInfo: '5 Jilid Kontemporer',
      text: {
        id: `Syaikh Hamzah Muhammad Qasim dalam Manarul Qari menguraikan Hadits No. ${hadith.number} dengan bahasa modern yang mudah dipahami seluruh kalangan. Menitikberatkan pada pembinaan akhlak mulia, bimbingan kehidupan rumah tangga dan sosial, serta pengamalan sunnah praktis dalam kehidupan sehari-hari.`,
        ar: `قَالَ الشَّيْخُ حَمْزَة مُحَمَّد قَاسِم فِي مَنَارِ القَارِي: نَسْتَخْلِصُ مِنْ هَذَا الحَدِيثِ المَبَادِئَ التَّرْبَوِيَّةَ وَالأَخْلَاقِيَّةَ الَّتِي غَرَسَهَا الرَّسُولُ ﷺ، وَكَيْفِيَّةَ تَنْزِيلِهَا فِي الحَيَاةِ العَمَلِيَّةِ المُعَاصِرَةِ مَعَ صِيَانَةِ جَوْهَرِ السُّنَّةِ الشَّرِيفَةِ.`,
        en: `In Manar al-Qari, Sheikh Hamzah Muhammad Qasim delivers an accessible contemporary commentary emphasizing practical character refinement, spiritual ethics, and daily application.`
      }
    }
  ];

  const currentSyarahBookData = syarahBooks.find(b => b.id === selectedSyarahBook) || syarahBooks[0];

  // Formatting Sanad: highlight brackets like [Nama Perawi]
  const renderFormattedIndonesian = (text) => {
    if (!text) return '';
    // Format [Nama Perawi] with distinct styling
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const name = part.substring(1, part.length - 1);
        return (
          <span 
            key={index} 
            className="inline-block px-1.5 py-0.5 my-0.5 mx-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-semibold text-[0.95em] border border-emerald-200/80 dark:border-emerald-800/80"
            title={`Perawi dalam Rantai Sanad: ${name}`}
          >
            {name}
          </span>
        );
      }
      return part;
    });
  };

  // Copy Hadith to Clipboard
  const handleCopy = () => {
    let copyText = `HADITS SHAHIH AL-BUKHARI NO. ${hadith.number}\n\n`;
    copyText += `[Teks Arab]:\n${hadith.text_ar}\n\n`;
    copyText += `[Terjemahan Bahasa Indonesia]:\n${hadith.text_id}\n\n`;
    if (hadith.text_en) {
      copyText += `[English Translation]:\n${hadith.text_en}\n\n`;
    }
    copyText += `(HR. Bukhari No. ${hadith.number} - Rujukan: Syarah Fathul Baari ${hadith.fathul_bari ? hadith.fathul_bari.scope : ''})`;

    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Share Hadith
  const handleShare = () => {
    const text = `Hadits Shahih Bukhari No. ${hadith.number}:\n\n"${hadith.text_id.slice(0, 200)}..."\n\nBaca lengkap di Ensiklopedia Shahih Bukhari`;
    if (navigator.share) {
      navigator.share({
        title: `Shahih Bukhari Hadits No. ${hadith.number}`,
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      // Fallback: Copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan hadits telah disalin ke papan klip.');
    }
  };

  // Audio Playback (Arabic recitation using SpeechSynthesis)
  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur suara tidak didukung pada peramban Anda.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    // Default: read Arabic text
    const utterance = new SpeechSynthesisUtterance(hadith.text_ar);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      id={`hadith-${hadith.number}`}
      className="rounded-2xl bg-white dark:bg-[#12221b] border border-gray-200/90 dark:border-gray-800 shadow-sm hover:shadow-md transition p-5 sm:p-7 relative mb-6"
    >
      
      {/* Top Bar: Hadith Number Badge & Action Tools */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800/80 pb-4 mb-5">
        
        {/* Number Badge & Book Info */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-islamic-800 dark:bg-emerald-900/60 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-sm">
            No. {hadith.number}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            (Kitab {hadith.book_id}, Hadits #{hadith.hadith_in_book})
          </span>
          {hadith.arabic_number && (
            <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-arabic">
              رقم {hadith.arabic_number}
            </span>
          )}
        </div>

        {/* Action Buttons: Fathul Bari, Audio, Copy, Share, Bookmark */}
        <div className="flex items-center gap-1.5">
          
          {/* Tombol Pintas Lompat ke Syarah Kitab */}
          {hadith.fathul_bari && (
            <button
              onClick={() => {
                const el = document.getElementById(`syarah-section-${hadith.number}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold hover:bg-amber-200 dark:hover:bg-amber-900 transition shadow-xs cursor-pointer"
              title="Lompat ke Pilihan Kitab Syarah di Bawah Terjemahan"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Syarah Kitab</span>
            </button>
          )}

          {/* Audio Recitation Button */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg text-xs transition ${
              isPlayingAudio 
                ? 'bg-emerald-600 text-white animate-pulse' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title={isPlayingAudio ? 'Hentikan Audio' : 'Dengarkan Pelafalan Arab Hadits'}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Salin Hadits Lengkap"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Bagikan Hadits"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(hadith)}
            className={`p-2 rounded-lg transition ${
              isBookmarked
                ? 'bg-islamic-700 text-gold-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title={isBookmarked ? 'Hapus dari Tersimpan' : 'Simpan Hadits'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-gold-300' : ''}`} />
          </button>

        </div>
      </div>

      {/* ARABIC MATAN & SANAD TEXT */}
      <div 
        dir="rtl"
        className={`text-right text-gray-900 dark:text-amber-50 font-arabic font-normal leading-loose tracking-wide mb-6 ${arabicFont}`}
        style={{ fontSize: `${arabicFontSize}px` }}
      >
        {hadith.text_ar}
      </div>

      {/* Multi-language Selector Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">
        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 mr-2 flex items-center gap-1">
          <Globe className="w-3 h-3" />
          <span>Terjemahan:</span>
        </span>

        <button
          onClick={() => setActiveTab('primary')}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
            activeTab === 'primary'
              ? 'bg-islamic-100 dark:bg-islamic-900 text-islamic-900 dark:text-emerald-300'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          🇮🇩 Indonesia (Utama)
        </button>

        {hadith.text_en && (
          <button
            onClick={() => setActiveTab('en')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'en'
                ? 'bg-islamic-100 dark:bg-islamic-900 text-islamic-900 dark:text-emerald-300'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            🇬🇧 English
          </button>
        )}

        <button
          onClick={() => setActiveTab('all')}
          className={`ml-auto px-2 py-0.5 rounded text-[11px] font-medium transition ${
            activeTab === 'all'
              ? 'bg-gold-100 dark:bg-gold-950 text-gold-900 dark:text-gold-300 font-bold'
              : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Tampilkan Semua Bahasa
        </button>
      </div>

      {/* TRANSLATION CONTENT */}
      <div className="space-y-4">
        
        {/* Indonesian (Default) */}
        {(activeTab === 'primary' || activeTab === 'all') && (
          <div className="relative">
            {activeTab === 'all' && (
              <div className="text-xs font-bold text-islamic-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <span>🇮🇩 Terjemahan Bahasa Indonesia:</span>
              </div>
            )}
            <div 
              className="text-gray-800 dark:text-gray-200 leading-relaxed font-sans"
              style={{ fontSize: `${transFontSize}px` }}
            >
              {renderFormattedIndonesian(hadith.text_id)}
            </div>
          </div>
        )}

        {/* English */}
        {(activeTab === 'en' || activeTab === 'all') && hadith.text_en && (
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
              <span>🇬🇧 English (Translation by Dr. Muhammad Muhsin Khan):</span>
            </div>
            <p 
              className="text-gray-700 dark:text-gray-300 italic leading-relaxed"
              style={{ fontSize: `${transFontSize}px` }}
            >
              "{hadith.text_en}"
            </p>
          </div>
        )}

        {/* Pilihan Kitab Syarah Shahih Bukhari Langsung di Bawah Terjemahan */}
        <div id={`syarah-section-${hadith.number}`} className="mt-5 pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
          
          {/* Header Pilihan Kitab Syarah & Tab Bahasa */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 dark:text-emerald-200">
                Pilih Kitab Syarah Rujukan:
              </h4>
            </div>

            {/* Language Switcher for Syarah: ID, AR, EN */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs">
              <button
                onClick={() => setSyarahLangTab('id')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  syarahLangTab === 'id' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-emerald-700'
                }`}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => setSyarahLangTab('ar')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  syarahLangTab === 'ar' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-emerald-700'
                }`}
              >
                🇸🇦 العربية
              </button>
              <button
                onClick={() => setSyarahLangTab('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  syarahLangTab === 'en' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-emerald-700'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          {/* Pilihan 4 Kitab Syarah Otoritatif Shahih Bukhari */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {syarahBooks.map((sb) => {
              const isSelected = selectedSyarahBook === sb.id;
              return (
                <button
                  key={sb.id}
                  onClick={() => setSelectedSyarahBook(sb.id)}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-amber-950/60 dark:to-emerald-950/60 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-[#12221b] border-gray-200 dark:border-gray-800 hover:border-emerald-300 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-gray-800 dark:text-gray-200'}`}>
                      {sb.shortTitle}
                    </span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>}
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    {sb.author}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Kotak Konten Syarah dari Kitab yang Dipilih */}
          <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/50 space-y-3.5">
            
            {/* Header Kitab yang Sedang Terpilih */}
            <div className="flex flex-wrap items-center justify-between pb-2.5 border-b border-amber-200/50 dark:border-amber-800/40 gap-2 text-xs">
              <div>
                <span className="font-extrabold text-amber-950 dark:text-amber-200">
                  {currentSyarahBookData.fullTitle}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-2">
                  karya {currentSyarahBookData.author}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {currentSyarahBookData.volumeInfo}
              </span>
            </div>

            {/* Naskah Syarah UTUH & LENGKAP — Bukan Ringkasan */}
            <div className={`rounded-xl bg-white/90 dark:bg-gray-800/90 border border-amber-100 dark:border-amber-900/30 text-xs leading-relaxed ${
              syarahLangTab === 'ar' 
                ? 'font-arabic-uthmani text-base text-right dir-rtl text-emerald-950 dark:text-emerald-100' 
                : 'text-gray-800 dark:text-gray-200'
            }`}>
              <div className="p-3.5 pb-2 flex items-center justify-between flex-wrap gap-2">
                <div className="font-bold text-amber-800 dark:text-amber-400">
                  {syarahLangTab === 'ar' ? 'نص الشرح الكامل (فتح الباري — المكتبة الشاملة):' : (syarahLangTab === 'en' ? 'Complete Commentary Text (Fath al-Bari — al-Maktabah al-Shamilah):' : 'Naskah Syarah Lengkap (Fathul Baari — Maktabah Syamilah):')}
                </div>
                {currentSyarahBookData.charCount > 5000 && (
                  <button
                    onClick={() => setSyarahExpanded(!syarahExpanded)}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold hover:bg-amber-200 dark:hover:bg-amber-800 transition cursor-pointer"
                  >
                    {syarahExpanded ? 'Tampilkan Ringkas ▲' : `Buka Naskah Lengkap (${Math.round(currentSyarahBookData.charCount / 1000)}K karakter) ▼`}
                  </button>
                )}
                {currentSyarahBookData.shamelaPages && (
                  <span className="text-[9px] text-gray-400 dark:text-gray-500">
                    Shamela hlm. {currentSyarahBookData.shamelaPages}
                  </span>
                )}
              </div>
              <div className={`px-3.5 pb-3.5 leading-relaxed whitespace-pre-line ${
                !syarahExpanded && currentSyarahBookData.charCount > 5000 ? 'max-h-96 overflow-y-auto' : ''
              }`}>
                {currentSyarahBookData.text[syarahLangTab] || currentSyarahBookData.text['id']}
              </div>
            </div>

            {/* Kosa Kata Lafazh Hadits */}
            {hadith.fathul_bari && hadith.fathul_bari.keterangan_lafal_trilingual && hadith.fathul_bari.keterangan_lafal_trilingual.length > 0 && (
              <div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {syarahLangTab === 'ar' ? 'بيان ألفاظ الحديث وغريبه:' : (syarahLangTab === 'en' ? 'Linguistic & Lexical Analysis:' : 'Keterangan Kosa Kata Lafal Matan:')}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {hadith.fathul_bari.keterangan_lafal_trilingual.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-amber-100 dark:border-amber-900/30 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-arabic-uthmani text-base font-bold text-emerald-700 dark:text-emerald-400 dir-rtl">
                          {item.lafal_arab}
                        </span>
                        <span className="text-[11px] text-gray-600 dark:text-gray-400 font-semibold">
                          ({syarahLangTab === 'en' ? (item.makna_en || item.makna_id) : item.makna_id})
                        </span>
                      </div>
                      <p className={`text-[11px] text-gray-600 dark:text-gray-300 ${syarahLangTab === 'ar' ? 'font-arabic-uthmani text-right dir-rtl' : ''}`}>
                        {syarahLangTab === 'ar' ? (item.syarah_ar || item.syarah_id) : (syarahLangTab === 'en' ? (item.syarah_en || item.syarah_id) : item.syarah_id)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Faedah Fiqih & Hukum Mustanbath */}
            {hadith.fathul_bari && hadith.fathul_bari.faedah_dan_hukum && hadith.fathul_bari.faedah_dan_hukum.length > 0 && (
              <div className="pt-2 border-t border-amber-200/40 dark:border-amber-800/30">
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-1.5">
                  {syarahLangTab === 'ar' ? 'الفوائد الفقهية والأحكام المستنبطة:' : (syarahLangTab === 'en' ? 'Derived Jurisprudential Lessons:' : 'Faedah Fiqih & Hukum yang Ditetapkan Para Ulama:')}
                </div>
                <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300 list-disc list-inside">
                  {hadith.fathul_bari.faedah_dan_hukum.map((f, fIdx) => (
                    <li key={fIdx} className="leading-relaxed">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

        {/* Tombol & Box Rantai Sanad & Rawi (Bukhari -> Nabi Muhammad SAW) */}
        {hadith.sanad_chain && hadith.sanad_chain.length > 0 && (
          <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-emerald-900/40">
            <button
              onClick={() => setShowSanadTree(!showSanadTree)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 hover:brightness-105 transition-all text-xs font-semibold shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Users className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Rantai Sanad & Biografi Perawi</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 dark:bg-emerald-800/80 text-[10px] text-emerald-950 dark:text-emerald-100 font-bold">
                  {hadith.sanad_chain.length} Tingkat: Imam Al-Bukhari ➡️ Rasulullah ﷺ
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-normal shrink-0">
                <span>{showSanadTree ? 'Tutup Silsilah' : 'Buka Rantai Sanad'}</span>
                {showSanadTree ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showSanadTree && (
              <div className="mt-3 p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/50 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200/40 dark:border-emerald-800/40 text-xs">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Silsilah Rantai Isnad Muttashil (Tersambung Shahih)</span>
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    Total {hadith.sanad_chain.length} Rantai Perawi
                  </span>
                </div>

                {/* Flow Visual Tree */}
                <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-300 dark:before:bg-emerald-700">
                  {hadith.sanad_chain.map((rawi, rIdx) => {
                    const isBukhari = rIdx === 0;
                    const isNabi = rIdx === hadith.sanad_chain.length - 1;

                    return (
                      <div key={rIdx} className="relative group">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[19px] top-3 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                          isNabi ? 'bg-amber-500 ring-2 ring-amber-300' : (isBukhari ? 'bg-emerald-600' : 'bg-teal-500')
                        }`} />

                        <div className={`p-3 rounded-xl border transition-all ${
                          isNabi 
                            ? 'bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/40 border-amber-300 dark:border-amber-700 shadow-xs' 
                            : (isBukhari 
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700' 
                              : 'bg-white/80 dark:bg-gray-800/80 border-gray-200/80 dark:border-gray-700/80')
                        }`}>
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                isNabi ? 'bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                              }`}>
                                {rawi.tingkat || `Tingkat ${rawi.urutan}`}
                              </span>
                              <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                                {rawi.nama}
                              </span>
                            </div>
                            
                            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                              {rawi.peran}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mt-2 text-[11px] text-gray-600 dark:text-gray-300 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                            {rawi.negeri && rawi.negeri !== '-' && (
                              <div><span className="text-gray-400 dark:text-gray-500">Negeri:</span> {rawi.negeri}</div>
                            )}
                            {rawi.wafat && rawi.wafat !== '-' && (
                              <div><span className="text-gray-400 dark:text-gray-500">Wafat:</span> {rawi.wafat}</div>
                            )}
                            {rawi.thabaqah && (
                              <div><span className="text-gray-400 dark:text-gray-500">Thabaqah:</span> {rawi.thabaqah}</div>
                            )}
                          </div>

                          {rawi.status_tadil && (
                            <div className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Jarh wa Ta'dil: <strong>{rawi.status_tadil}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </div>
        )}

      </div>

      {/* Footer Info of Hadith Card */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex flex-wrap items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Derajat: <strong>Shahih (Muttafaq 'Alaih)</strong></span>
          <span>•</span>
          <span>Imam Al-Bukhari رحمه الله</span>
        </div>
        
        {hadith.fathul_bari && (
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
            <span>Syarah:</span>
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              Fathul Baari ({hadith.fathul_bari.jilid || '36 Jilid Lengkap'}) — Naskah Syarah Lengkap Terintegrasi
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
