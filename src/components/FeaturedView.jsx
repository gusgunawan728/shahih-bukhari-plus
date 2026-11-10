import React, { useState } from 'react';
import { 
  Star, 
  BookOpen, 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Search
} from 'lucide-react';

export default function FeaturedView({ onSelectBook, onSelectHadith, bookmarks = [], onToggleBookmark }) {
  const [copiedId, setCopiedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [search, setSearch] = useState('');

  const featuredList = [
    {
      number: 1,
      bookId: 1,
      bookName: 'Permulaan Wahyu',
      title: 'Kewajiban Ikhlas & Setiap Amal Bergantung pada Niat',
      arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
      idText: 'Sesungguhnya setiap amalan tergantung pada niatnya, dan setiap orang akan mendapatkan apa yang ia niatkan. Barangsiapa yang hijrahnya karena dunia yang ingin ia raih atau karena wanita yang ingin ia nikahi, maka hijrahnya itu kepada apa yang ia tuju.',
      enText: 'Actions are according to intentions, and each person will have but that which they intended. Thus he whose migration was for Allah and His Messenger, his migration is for Allah and His Messenger.',
      fathulBari: 'Jilid 1, Kitab Permulaan Wahyu: Al-Hafizh Ibnu Hajar Al-Asqalani menjelaskan bahwa hadits ini diletakkan Imam Bukhari sebagai mukadimah karena setiap penuntut ilmu wajib meluruskan niatnya semata mengharap ridha Allah SWT.'
    },
    {
      number: 8,
      bookId: 2,
      bookName: 'Iman',
      title: 'Pondasi Lima Rukun Islam',
      arabic: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالحَجِّ، وَصَوْمِ رَمَضَانَ',
      idText: 'Islam dibangun di atas lima perkara: bersaksi bahwa tidak ada tuhan selain Allah dan bahwa Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, menunaikan haji, dan berpuasa di bulan Ramadhan.',
      enText: 'Islam is based on five principles: To testify that none has the right to be worshipped but Allah and Muhammad is Allah\'s Apostle; to offer prayers; to pay Zakat; to perform Hajj; to observe fast during Ramadan.',
      fathulBari: 'Jilid 1, Kitab Iman: Menjelaskan perumpamaan Islam seperti sebuah bangunan kubah kokoh yang disangga oleh 5 pilar utama.'
    },
    {
      number: 13,
      bookId: 2,
      bookName: 'Iman',
      title: 'Kesempurnaan Kasih Sayang Sesama Mukmin',
      arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
      idText: 'Tidak sempurna iman salah seorang di antara kalian hingga ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.',
      enText: 'None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.',
      fathulBari: 'Jilid 1, Kitab Iman: Cinta di sini adalah kebaikan dalam agama dan dunia, menjauhi hasad dan dengki.'
    },
    {
      number: 33,
      bookId: 2,
      bookName: 'Iman',
      title: 'Tiga Tanda Orang Munafik',
      arabic: 'آيَةُ المُنَافِقِ ثَلاَثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ',
      idText: 'Tanda orang munafik itu ada tiga: apabila berbicara ia berdusta, apabila berjanji ia mengingkari, dan apabila dipercaya ia berkhianat.',
      enText: 'The signs of a hypocrite are three: Whenever he speaks, he tells a lie. Whenever he promises, he always breaks it. If you trust him, he proves to be dishonest.',
      fathulBari: 'Jilid 1, Kitab Iman: Tanda-tanda nifaq \'amali (perbuatan) yang wajib diwaspadai setiap muslim agar terhindar dari kehancuran moral.'
    },
    {
      number: 71,
      bookId: 3,
      bookName: 'Ilmu',
      title: 'Keutamaan Pemahaman Agama yang Mendalam',
      arabic: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ',
      idText: 'Barangsiapa yang Allah kehendaki kebaikan baginya, niscaya Allah akan pahamkan dia dalam urusan agamanya.',
      enText: 'If Allah wants to do good to a person, He makes him comprehend the religion.',
      fathulBari: 'Jilid 1, Kitab Ilmu: Faqih dalam agama mencakup akidah, fikih ibadah, dan hikmah hukum-hukum syariat.'
    },
    {
      number: 5027,
      bookId: 66,
      bookName: 'Keutamaan Al-Qur\'an',
      title: 'Sebaik-Baik Manusia Adalah yang Belajar & Mengajarkan Al-Qur\'an',
      arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ',
      idText: 'Sebaik-baik kalian adalah orang yang belajar Al-Qur\'an dan mengajarkannya kepada orang lain.',
      enText: 'The best among you (Muslims) are those who learn the Quran and teach it.',
      fathulBari: 'Jilid 25, Kitab Fadha\'il Al-Qur\'an: Penggabungan antara menyempurnakan diri sendiri dan menyempurnakan orang lain dengan Kalamullah.'
    }
  ];

  const handleCopy = (item) => {
    const text = `HR. Bukhari No. ${item.number} (${item.title})\n\n${item.arabic}\n\nTerjemahan:\n"${item.idText}"\n\n(Shahih Bukhari Plus Digital)`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(item.number);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleAudio = (item) => {
    if (!('speechSynthesis' in window)) return;
    if (playingId === item.number) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(item.arabic);
    u.lang = 'ar-SA';
    u.rate = 0.85;
    u.onend = () => setPlayingId(null);
    u.onerror = () => setPlayingId(null);
    setPlayingId(item.number);
    window.speechSynthesis.speak(u);
  };

  const filtered = featuredList.filter((f) => {
    const q = search.toLowerCase();
    return (
      f.title.toLowerCase().includes(q) ||
      f.idText.toLowerCase().includes(q) ||
      f.number.toString().includes(q) ||
      f.arabic.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-700 to-amber-700 text-white p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-xs">
            <Star className="w-3.5 h-3.5 text-amber-300" />
            <span>Mutiara Pilihan Shahih Bukhari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hadits Pilihan & Kaidah Emas Kehidupan
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
            Kumpulan hadits-hadits pokok yang menjadi pilar peradaban Islam, pedoman akhlak mulia, dan pondasi hukum yang sering dihafal dan diamalkan oleh para ulama salaf.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari hadits pilihan berdasarkan tema, nomor, atau terjemahan..."
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c1813] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
      </div>

      {/* Hadith Cards */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isBookmarked = bookmarks.some((b) => b.number === item.number);
          return (
            <div
              key={item.number}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0c1813] border border-gray-200/90 dark:border-gray-800 hover:border-emerald-400/70 shadow-sm transition space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-amber-500 text-black font-extrabold text-xs flex items-center justify-center shadow-xs">
                    ★
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      HR. Bukhari No. {item.number} • {item.bookName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleAudio(item)}
                    className={`p-2 rounded-xl transition ${
                      playingId === item.number
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                    title="Dengarkan Suara"
                  >
                    {playingId === item.number ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition"
                    title="Salin Hadits"
                  >
                    {copiedId === item.number ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  {onToggleBookmark && (
                    <button
                      onClick={() => onToggleBookmark({
                        number: item.number,
                        book_id: item.bookId,
                        text_ar: item.arabic,
                        text_id: item.idText
                      })}
                      className={`p-2 rounded-xl transition ${
                        isBookmarked
                          ? 'bg-rose-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                      title="Simpan ke Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Matan Arabic */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-emerald-950/20 border border-amber-200/50 dark:border-emerald-900/30 text-right font-arabic text-xl sm:text-2xl leading-loose text-gray-900 dark:text-amber-100">
                {item.arabic}
              </div>

              {/* Indonesian Translation */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Terjemahan Bahasa Indonesia:
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{item.idText}"
                </p>
              </div>

              {/* English Translation */}
              <div className="space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-400">
                  English Translation:
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
                  "{item.enText}"
                </p>
              </div>

              {/* Syarah Summary */}
              {item.fathulBari && (
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                  <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">
                    Intisari Syarah Fathul Baari:
                  </strong>
                  {item.fathulBari}
                </div>
              )}

              {/* Bottom Jump Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => onSelectHadith(item.bookId, item.number)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buka Naskah Lengkap & Sanad</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
