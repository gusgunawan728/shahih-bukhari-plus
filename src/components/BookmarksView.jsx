import React from 'react';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Copy, 
  BookOpen, 
  Share2,
  Download
} from 'lucide-react';

export default function BookmarksView({ 
  bookmarks, 
  onRemoveBookmark, 
  onSelectHadith, 
  onClearAll 
}) {
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `shahih_bukhari_bookmarks_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-islamic-700 dark:text-emerald-400 mb-1">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>Koleksi Pribadi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Hadits Tersimpan ({bookmarks.length})
          </h2>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor / Cadangkan</span>
            </button>
            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 hover:bg-red-100 text-xs font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Semua</span>
            </button>
          </div>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarks.length > 0 ? (
        <div className="space-y-4">
          {bookmarks.map((hadith) => (
            <div
              key={hadith.number}
              className="rounded-2xl bg-white dark:bg-[#12221b] border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow transition relative"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-islamic-800 text-white font-bold text-xs">
                  HR. Bukhari No. {hadith.number}
                </span>

                <button
                  onClick={() => onRemoveBookmark(hadith.number)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition"
                  title="Hapus dari tersimpan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Arabic text snippet */}
              <div 
                dir="rtl"
                className="font-arabic text-lg text-gray-900 dark:text-amber-100 font-bold mb-2 line-clamp-2"
              >
                {hadith.text_ar}
              </div>

              {/* Indonesian translation */}
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                {hadith.text_id}
              </p>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  {hadith.fathul_bari ? hadith.fathul_bari.filename : ''}
                </span>

                <button
                  onClick={() => onSelectHadith(hadith.book_id, hadith.number)}
                  className="flex items-center gap-1 font-semibold text-islamic-700 dark:text-emerald-400 hover:underline"
                >
                  <span>Buka di Pembaca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-800">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
            Belum ada hadits yang disimpan
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Klik ikon pita penanda (bookmark) pada hadits mana saja untuk menyimpannya di sini.
          </p>
        </div>
      )}

    </div>
  );
}
