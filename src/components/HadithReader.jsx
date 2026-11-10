import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Search, 
  FileText, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookMarked
} from 'lucide-react';
import HadithCard from './HadithCard';

export default function HadithReader({
  bookId,
  books,
  onSelectBook,
  onBackToBooks,
  primaryLang,
  arabicFontSize,
  transFontSize,
  arabicFont,
  bookmarks,
  onToggleBookmark,
  onOpenFathulBariModal,
  onOpenSyarahModal
}) {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Find book meta in books array
  const currentBookMeta = useMemo(() => {
    return books.find((b) => b.id === bookId) || null;
  }, [books, bookId]);

  // Load book json
  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setFilterQuery('');

    // Save to last read
    try {
      localStorage.setItem('shahih_bukhari_last_read', JSON.stringify({
        bookId: bookId,
        bookName: currentBookMeta ? currentBookMeta.name_id : `Kitab ${bookId}`,
        timestamp: Date.now()
      }));
    } catch (e) {}

    fetch(`./data/books/book_${bookId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Gagal memuat Kitab ${bookId}`);
        return res.json();
      })
      .then((data) => {
        setBookData(data);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [bookId]);

  // Filter hadiths inside this book
  const filteredHadiths = useMemo(() => {
    if (!bookData || !bookData.hadiths) return [];
    if (!filterQuery.trim()) return bookData.hadiths;

    const q = filterQuery.toLowerCase().trim();
    return bookData.hadiths.filter((h) => {
      return (
        h.number.toString().includes(q) ||
        (h.text_id && h.text_id.toLowerCase().includes(q)) ||
        (h.text_ar && h.text_ar.includes(q)) ||
        (h.text_en && h.text_en.toLowerCase().includes(q))
      );
    });
  }, [bookData, filterQuery]);

  // Paginated hadiths
  const totalHadithsInView = filteredHadiths.length;
  const totalPages = Math.ceil(totalHadithsInView / pageSize) || 1;
  const paginatedHadiths = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredHadiths.slice(start, start + pageSize);
  }, [filteredHadiths, currentPage]);

  const bookmarkMap = useMemo(() => {
    const map = {};
    bookmarks.forEach((b) => { map[b.number] = true; });
    return map;
  }, [bookmarks]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBackToBooks}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-xs font-medium shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke 97 Kitab</span>
        </button>

        {/* Book Select Dropdown */}
        <div className="flex items-center gap-2">
          <button
            disabled={bookId <= 1}
            onClick={() => onSelectBook(bookId - 1)}
            className="p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Kitab Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <select
            value={bookId}
            onChange={(e) => onSelectBook(parseInt(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-islamic-500 cursor-pointer shadow-sm"
          >
            {books.map((b) => (
              <option key={b.id} value={b.id}>
                Kitab {b.id}: {b.name_id} ({b.hadith_count} Hadits)
              </option>
            ))}
          </select>

          <button
            disabled={bookId >= 97}
            onClick={() => onSelectBook(bookId + 1)}
            className="p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Kitab Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Book Banner Header */}
      {currentBookMeta && (
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-islamic-950 text-white p-6 sm:p-7 shadow-xl mb-8 relative overflow-hidden border border-gold-400/30 flex flex-col sm:flex-row items-center gap-6">
          
          {/* Cover Artwork Image Icon */}
          <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-2xl overflow-hidden border-2 border-gold-400 shadow-2xl shrink-0">
            <img 
              src="./images/shahih_bukhari_cover.jpg" 
              alt={currentBookMeta.name_id}
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="relative z-10 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Kitab ke-{currentBookMeta.id} dari 97
              </span>

              {/* Fathul Baari Syarah Reference */}
              {currentBookMeta.fathul_bari_jilid && (
                <button
                  onClick={() => onOpenFathulBariModal(currentBookMeta.fathul_bari_file, currentBookMeta.fathul_bari_url)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold shadow-md transition"
                >
                  <FileText className="w-3.5 h-3.5 text-black" />
                  <span>Syarah Fathul Baari ({currentBookMeta.fathul_bari_jilid})</span>
                </button>
              )}
            </div>

            {/* Arabic Title */}
            <div className="font-arabic text-2xl sm:text-3xl text-amber-200 font-bold mb-1">
              {currentBookMeta.name_ar}
            </div>

            {/* Indonesian Title */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentBookMeta.name_id}
            </h1>

            {/* English Title & Metadata */}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-emerald-200">
              {currentBookMeta.name_en && (
                <span className="italic">{currentBookMeta.name_en}</span>
              )}
              <span>•</span>
              <span>Total <strong>{currentBookMeta.hadith_count} Hadits</strong></span>
              <span>•</span>
              <span>Rentang Hadits No. <strong>{currentBookMeta.start_hadith}</strong> s/d <strong>{currentBookMeta.end_hadith}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* In-Book Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-white dark:bg-[#12221b] p-3 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => {
              setFilterQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari kata/nomor di dalam Kitab ini..."
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-islamic-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
          {filterQuery && (
            <button
              onClick={() => { setFilterQuery(''); setCurrentPage(1); }}
              className="absolute right-3 top-1.5 text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Total info & pagination indicator */}
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span>Menampilkan <strong>{paginatedHadiths.length}</strong> dari {filteredHadiths.length} hadits</span>
          {totalPages > 1 && (
            <span>(Hal {currentPage} dari {totalPages})</span>
          )}
        </div>

      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-20 bg-white dark:bg-[#12221b] rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="inline-block w-8 h-8 border-4 border-islamic-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Memuat Hadits Shahih Bukhari...</p>
        </div>
      )}

      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-center text-red-700 dark:text-red-300">
          <p className="font-semibold text-sm">{error}</p>
          <button
            onClick={() => onSelectBook(bookId)}
            className="mt-3 px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Hadith List Cards */}
      {!loading && !error && (
        <div>
          {paginatedHadiths.map((hadith) => (
            <HadithCard
              key={hadith.number}
              hadith={hadith}
              primaryLang={primaryLang}
              arabicFontSize={arabicFontSize}
              transFontSize={transFontSize}
              arabicFont={arabicFont}
              isBookmarked={!!bookmarkMap[hadith.number]}
              onToggleBookmark={onToggleBookmark}
              onOpenSyarahModal={onOpenSyarahModal}
            />
          ))}

          {/* Empty search */}
          {filteredHadiths.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Search className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tidak ada hadits yang cocok dengan kata "{filterQuery}"
              </p>
              <button
                onClick={() => setFilterQuery('')}
                className="mt-3 px-4 py-1.5 rounded-lg bg-islamic-700 text-white text-xs font-medium"
              >
                Hapus Pencarian
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-5">
              <button
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Halaman Sebelumnya</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  if (
                    p === 1 || 
                    p === totalPages || 
                    (p >= currentPage - 2 && p <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={p}
                        onClick={() => {
                          setCurrentPage(p);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                          currentPage === p
                            ? 'bg-islamic-700 text-white shadow-sm'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  } else if (p === currentPage - 3 || p === currentPage + 3) {
                    return <span key={p} className="text-gray-400 text-xs px-1">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <span>Halaman Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Next / Previous Book Footer Nav */}
          <div className="mt-10 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            {bookId > 1 ? (
              <button
                onClick={() => onSelectBook(bookId - 1)}
                className="flex items-center gap-2 text-xs font-semibold text-islamic-700 dark:text-emerald-400 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kitab Sebelumnya: Kitab {bookId - 1}</span>
              </button>
            ) : <div></div>}

            {bookId < 97 ? (
              <button
                onClick={() => onSelectBook(bookId + 1)}
                className="flex items-center gap-2 text-xs font-semibold text-islamic-700 dark:text-emerald-400 hover:underline"
              >
                <span>Lanjut ke Kitab {bookId + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : <div></div>}
          </div>

        </div>
      )}

    </div>
  );
}
