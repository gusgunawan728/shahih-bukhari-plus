import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  BookOpen, 
  Calendar, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export default function HistoryView({ onSelectHadith, onSelectBook, books = [] }) {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shahih_bukhari_reading_history');
      if (saved) {
        setHistoryList(JSON.parse(saved));
      } else {
        // Initial sample history matching the design screenshot
        const initialHistory = [
          {
            id: 'h-1',
            number: 42,
            bookId: 2,
            bookName: 'Kitab Iman',
            topic: 'Tentang Rukun Islam & Manisnya Iman',
            timestamp: Date.now() - 1000 * 60 * 35 // 35 mins ago
          },
          {
            id: 'h-2',
            number: 333,
            bookId: 3,
            bookName: 'Kitab Ilmu',
            topic: 'Tentang Keutamaan Menuntut Ilmu & Menghafal Sanad',
            timestamp: Date.now() - 1000 * 60 * 120 // 2 hours ago
          },
          {
            id: 'h-3',
            number: 1,
            bookId: 1,
            bookName: 'Kitab Permulaan Wahyu',
            topic: 'Tentang Niat dan Hijrah karena Allah',
            timestamp: Date.now() - 1000 * 60 * 60 * 24 // 1 day ago
          }
        ];
        setHistoryList(initialHistory);
        localStorage.setItem('shahih_bukhari_reading_history', JSON.stringify(initialHistory));
      }
    } catch (e) {}
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Bersihkan seluruh riwayat baca?')) {
      setHistoryList([]);
      localStorage.removeItem('shahih_bukhari_reading_history');
    }
  };

  const formatTime = (ts) => {
    if (!ts) return 'Baru saja';
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return `${Math.floor(diff / 86400)} hari yang lalu`;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-800 via-emerald-800 to-cyan-900 text-white p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-xs">
            <History className="w-3.5 h-3.5 text-amber-300" />
            <span>Riwayat Baca Pengguna</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Jejak & Riwayat Baca Hadits
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-2 leading-relaxed">
            Catatan otomatis hadits dan kitab yang baru saja Anda telaah. Anda dapat melanjutkan membaca kembali kapan saja dari titik terakhir yang Anda kunjungi.
          </p>
        </div>
      </div>

      {/* Action Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          Total Riwayat: {historyList.length} Entri
        </span>

        {historyList.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Semua Riwayat</span>
          </button>
        )}
      </div>

      {/* History List */}
      {historyList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#0c1813] rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
          <History className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
            Belum Ada Riwayat Baca
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Mulailah menjelajahi hadits atau kitab pada menu Beranda atau Indeks Kitab.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHadith(item.bookId, item.number)}
              className="p-4 rounded-2xl bg-white dark:bg-[#0c1813] border border-gray-200/90 dark:border-gray-800 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <BookOpen className="w-5 h-5" />
                </span>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-gray-900 dark:text-white group-hover:text-emerald-600 transition">
                      HR. Bukhari No. {item.number}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {item.bookName}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {item.topic}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-[11px] text-gray-400 hidden sm:inline">
                  {formatTime(item.timestamp)}
                </span>
                <span className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
