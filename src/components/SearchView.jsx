import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Layers,
  ChevronRight
} from 'lucide-react';

export default function SearchView({ 
  initialQuery = '', 
  books, 
  onSelectHadith, 
  onSelectBook 
}) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedBookFilter, setSelectedBookFilter] = useState('all');
  const [quickIndex, setQuickIndex] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Load quick index
  useEffect(() => {
    fetch('./data/quick_search.json')
      .then((res) => res.json())
      .then((data) => {
        setQuickIndex(data);
        setLoadingIndex(false);
      })
      .catch((err) => {
        console.error('Failed to load quick index:', err);
        setLoadingIndex(false);
      });
  }, []);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setCurrentPage(1);
    }
  }, [initialQuery]);

  // Search execution
  const results = useMemo(() => {
    if (!quickIndex || quickIndex.length === 0) return [];
    const q = query.trim().toLowerCase();

    // If query is an exact number
    const numQ = parseInt(q);
    if (!isNaN(numQ) && numQ >= 1 && numQ <= 7563 && q === numQ.toString()) {
      const match = quickIndex.find((item) => item.num === numQ);
      return match ? [match] : [];
    }

    if (!q) {
      // Default: show first 50 hadiths
      if (selectedBookFilter !== 'all') {
        const bId = parseInt(selectedBookFilter);
        return quickIndex.filter((item) => item.book === bId);
      }
      return quickIndex.slice(0, 50);
    }

    // Keyword search
    return quickIndex.filter((item) => {
      const matchBook = selectedBookFilter === 'all' || item.book === parseInt(selectedBookFilter);
      if (!matchBook) return false;

      const matchNum = item.num.toString().includes(q);
      const matchId = item.snippet_id && item.snippet_id.toLowerCase().includes(q);
      const matchAr = item.snippet_ar && item.snippet_ar.includes(q);

      return matchNum || matchId || matchAr;
    });
  }, [quickIndex, query, selectedBookFilter]);

  const totalPages = Math.ceil(results.length / pageSize) || 1;
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return results.slice(start, start + pageSize);
  }, [results, currentPage]);

  const getBookName = (bookId) => {
    const b = books.find((x) => x.id === bookId);
    return b ? b.name_id : `Kitab ${bookId}`;
  };

  const getBookArName = (bookId) => {
    const b = books.find((x) => x.id === bookId);
    return b ? b.name_ar : '';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Mesin Pencari Hadits Shahih Bukhari
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Cari berdasarkan nomor hadits (1 s/d 7.563), kata kunci bahasa Indonesia, maupun lafazh Arab.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white dark:bg-[#12221b] p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Ketik nomor hadits (contoh: 1, 135, 7563) atau kata (contoh: niat, shalat, haji, adzan, sedekah)..."
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-islamic-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            {query && (
              <button
                onClick={() => { setQuery(''); setCurrentPage(1); }}
                className="absolute right-3 top-3.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕ Hapus
              </button>
            )}
          </div>

          {/* Book Filter Dropdown */}
          <div className="w-full sm:w-64">
            <select
              value={selectedBookFilter}
              onChange={(e) => {
                setSelectedBookFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-islamic-500 cursor-pointer"
            >
              <option value="all">Semua Kitab (1 - 97)</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  Kitab {b.id}: {b.name_id}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Tag Recommendations */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Pencarian Populer:</span>
          {['niat', 'iman', 'shalat', 'wudhu', 'zakat', 'puasa', 'haji', 'jihad', 'akhlak', 'surga', 'tauhid', 'istighfar'].map((tag) => (
            <button
              key={tag}
              onClick={() => { setQuery(tag); setCurrentPage(1); }}
              className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-islamic-100 dark:hover:bg-islamic-900/60 text-gray-700 dark:text-gray-300 hover:text-islamic-800 text-xs transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div>
          Ditemukan <strong>{results.length}</strong> hadits yang sesuai
          {query && <span> untuk kata "<strong>{query}</strong>"</span>}
        </div>
        {totalPages > 1 && (
          <div>Halaman {currentPage} dari {totalPages}</div>
        )}
      </div>

      {/* Loading state */}
      {loadingIndex && (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-4 border-islamic-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs text-gray-500">Menyiapkan indeks pencarian 7.563 hadits...</p>
        </div>
      )}

      {/* Results List */}
      {!loadingIndex && (
        <div className="space-y-3">
          {paginatedResults.map((item) => (
            <div
              key={item.num}
              onClick={() => onSelectHadith(item.book, item.num)}
              className="rounded-xl bg-white dark:bg-[#12221b] border border-gray-200 dark:border-gray-800 hover:border-islamic-500 dark:hover:border-emerald-600 p-4 sm:p-5 shadow-sm hover:shadow transition cursor-pointer group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-islamic-800 text-white font-bold text-xs">
                    HR. Bukhari No. {item.num}
                  </span>
                  <span className="text-xs font-semibold text-islamic-700 dark:text-emerald-400">
                    Kitab {item.book}: {getBookName(item.book)}
                  </span>
                </div>

                {item.jilid && (
                  <span className="text-[11px] font-semibold text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded bg-gold-50 dark:bg-gold-950 border border-gold-300 dark:border-gold-800">
                    Fathul Baari Jilid {item.jilid}
                  </span>
                )}
              </div>

              {/* Arabic Snippet */}
              {item.snippet_ar && (
                <div 
                  dir="rtl"
                  className="font-arabic text-base sm:text-lg text-gray-900 dark:text-amber-100 font-semibold mb-2 line-clamp-2"
                >
                  {item.snippet_ar}
                </div>
              )}

              {/* Indonesian Snippet */}
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                {item.snippet_id}
              </p>

              {/* Footer action */}
              <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs text-gray-400">
                <span className="font-arabic text-gray-500">{getBookArName(item.book)}</span>
                <span className="flex items-center gap-1 font-semibold text-islamic-600 dark:text-emerald-400 group-hover:translate-x-1 transition">
                  <span>Buka Teks Lengkap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
                Tidak ada hadits yang ditemukan
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Silakan coba kata kunci lain atau periksa ejaan nomor hadits Anda.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-5 mt-6">
              <button
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 150, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold disabled:opacity-40"
              >
                Halaman Sebelumnya
              </button>

              <div className="text-xs text-gray-500">
                Halaman {currentPage} dari {totalPages}
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 150, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold disabled:opacity-40"
              >
                Halaman Berikutnya
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
