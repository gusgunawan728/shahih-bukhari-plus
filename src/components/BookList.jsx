import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  FileText, 
  ChevronRight, 
  Layers, 
  Sparkles
} from 'lucide-react';

export default function BookList({ books, onSelectBook, onOpenFathulBariModal }) {
  const [filterText, setFilterText] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua (97 Kitab)' },
    { id: 'aqidah', label: 'Aqidah & Wahyu' },
    { id: 'ibadah', label: 'Thaharah & Ibadah' },
    { id: 'muamalah', label: 'Muamalah & Harta' },
    { id: 'sirah', label: 'Jihad & Maghazi' },
    { id: 'quran', label: 'Tafsir & Keutamaan Qur\'an' },
    { id: 'keluarga', label: 'Nikah & Keluarga' },
    { id: 'adab', label: 'Adab, Makanan & Doa' },
    { id: 'hukum', label: 'Hukum Syariat & Waris' },
    { id: 'akhir', label: 'Fitnah Akhir Zaman & Tauhid' },
  ];

  const getBookCategory = (id) => {
    if (id === 1 || id === 2 || id === 59 || id === 82 || id === 96 || id === 97) return 'aqidah';
    if (id >= 4 && id <= 33) return 'ibadah';
    if (id >= 34 && id <= 55) return 'muamalah';
    if (id >= 56 && id <= 64) return 'sirah';
    if (id === 65 || id === 66) return 'quran';
    if (id >= 67 && id <= 69) return 'keluarga';
    if (id >= 70 && id <= 81) return 'adab';
    if (id >= 83 && id <= 90) return 'hukum';
    if (id >= 91 && id <= 95) return 'akhir';
    return 'all';
  };

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchCat = activeCategory === 'all' || getBookCategory(b.id) === activeCategory;
      const q = filterText.toLowerCase().trim();
      if (!q) return matchCat;
      const matchSearch = 
        b.id.toString() === q ||
        b.name_id.toLowerCase().includes(q) ||
        (b.name_en && b.name_en.toLowerCase().includes(q)) ||
        (b.name_ar && b.name_ar.includes(q)) ||
        (b.fathul_bari_jilid && b.fathul_bari_jilid.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [books, filterText, activeCategory]);

  return (
    <div className="space-y-6">
      
      {/* Search and Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </span>
            <span>Daftar 97 Kitab Shahih Al-Bukhari</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Klik nama kitab di bawah atau pilih langsung dari panduan di bilah samping kiri.
          </p>
        </div>

        {/* Search input in Book List */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Saring nama kitab atau nomor..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          {filterText && (
            <button
              onClick={() => setFilterText('')}
              className="absolute right-3 top-2 text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
              activeCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200/80 dark:border-gray-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Result Count Indicator */}
      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <span>Menampilkan <strong>{filteredBooks.length}</strong> Kitab Tematik</span>
        {activeCategory !== 'all' && (
          <button 
            onClick={() => setActiveCategory('all')} 
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            Tampilkan Semua
          </button>
        )}
      </div>

      {/* Book Cards Grid with the Majestic Cover Image on ALL 97 Kitabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => {
          return (
            <div
              key={book.id}
              className="rounded-3xl bg-white dark:bg-[#12221b] border border-gray-200/90 dark:border-gray-800 hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Cover Image (Icon Gambar Pertama Shahih Bukhari untuk Seluruh Bab) */}
                <div className="h-44 sm:h-48 w-full relative overflow-hidden bg-emerald-950">
                  <img 
                    src="./images/shahih_bukhari_cover.jpg" 
                    alt={`Kitab ${book.id}: ${book.name_id}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                  
                  {/* Floating Kitab Number Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white font-extrabold text-xs flex items-center gap-1.5 border border-gold-400/40 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Kitab #{book.id}</span>
                  </div>

                  {/* Fathul Baari Syarah Pill on banner */}
                  {book.fathul_bari_jilid && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenFathulBariModal(book.fathul_bari_file, book.fathul_bari_url);
                      }}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[11px] flex items-center gap-1 shadow-md transition"
                      title="Buka Dokumen Syarah Fathul Baari Langsung"
                    >
                      <FileText className="w-3 h-3 text-black" />
                      <span>{book.fathul_bari_jilid}</span>
                    </button>
                  )}

                  {/* Arabic Title on banner bottom */}
                  <div className="absolute bottom-2.5 right-3.5 font-arabic text-lg sm:text-xl font-bold text-amber-200 drop-shadow-md">
                    {book.name_ar}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5">
                  {/* Indonesian Title */}
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
                    {book.name_id}
                  </h3>

                  {/* English Name if exists */}
                  {book.name_en && (
                    <div className="text-[11px] text-gray-400 dark:text-gray-500 italic mt-0.5 truncate">
                      {book.name_en}
                    </div>
                  )}

                  {/* Metadata Pills: Hadith count & range */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200/80 dark:border-emerald-800/80">
                      {book.hadith_count} Hadits
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                      No. {book.start_hadith} - {book.end_hadith}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: One Click Read Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onSelectBook(book.id)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 group-hover:translate-y-[-1px] transition transform"
                >
                  <BookOpen className="w-4 h-4 text-emerald-100" />
                  <span>Buka & Pelajari Hadits</span>
                  <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800/40 rounded-3xl border border-gray-200 dark:border-gray-800">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-gray-700 dark:text-gray-300">Kitab Tidak Ditemukan</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Coba kata kunci pencarian yang lain.</p>
          <button
            onClick={() => { setFilterText(''); setActiveCategory('all'); }}
            className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Reset Saringan
          </button>
        </div>
      )}

    </div>
  );
}
