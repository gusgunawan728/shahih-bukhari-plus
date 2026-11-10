import React from 'react';
import { 
  X, 
  Type, 
  Palette, 
  Globe, 
  RotateCcw,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  primaryLang,
  setPrimaryLang,
  arabicFontSize,
  setArabicFontSize,
  transFontSize,
  setTransFontSize,
  arabicFont,
  setArabicFont,
  theme,
  setTheme,
  onReset
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#12221b] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-islamic-700 dark:text-emerald-400" />
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              Pengaturan Tampilan & Pembaca
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Controls */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Tema Tampilan
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition ${
                  theme === 'light'
                    ? 'border-islamic-600 bg-islamic-50 text-islamic-900 ring-2 ring-islamic-500/20'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Sun className="w-5 h-5 mb-1 text-amber-500" />
                <span>Terang (Putih)</span>
              </button>

              <button
                onClick={() => setTheme('sepia')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition ${
                  theme === 'sepia'
                    ? 'border-amber-700 bg-amber-100 text-amber-950 ring-2 ring-amber-700/20'
                    : 'border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100/50'
                }`}
              >
                <div className="w-5 h-5 mb-1 rounded-full bg-[#e8dec0] border border-amber-600"></div>
                <span>Sepia (Mushaf)</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition ${
                  theme === 'dark'
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Moon className="w-5 h-5 mb-1 text-emerald-400" />
                <span>Gelap (Malam)</span>
              </button>
            </div>
          </div>

          {/* Arabic Font Size Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              <span>Ukuran Huruf Arab ({arabicFontSize}px)</span>
            </div>
            <input
              type="range"
              min="20"
              max="44"
              step="2"
              value={arabicFontSize}
              onChange={(e) => setArabicFontSize(parseInt(e.target.value))}
              className="w-full accent-islamic-600 cursor-pointer"
            />
            {/* Live Arabic Preview */}
            <div 
              dir="rtl"
              className={`mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center font-arabic ${arabicFont}`}
              style={{ fontSize: `${arabicFontSize}px` }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </div>

          {/* Translation Font Size Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              <span>Ukuran Huruf Terjemahan ({transFontSize}px)</span>
            </div>
            <input
              type="range"
              min="13"
              max="22"
              step="1"
              value={transFontSize}
              onChange={(e) => setTransFontSize(parseInt(e.target.value))}
              className="w-full accent-islamic-600 cursor-pointer"
            />
            <div 
              className="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center text-gray-700 dark:text-gray-300 font-sans"
              style={{ fontSize: `${transFontSize}px` }}
            >
              "Semua perbuatan tergantung pada niatnya..."
            </div>
          </div>

          {/* Arabic Font Family */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Pilihan Khath / Font Arab
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setArabicFont('font-arabic-amiri')}
                className={`p-3 rounded-xl border text-sm font-arabic font-bold transition ${
                  arabicFont === 'font-arabic-amiri'
                    ? 'border-islamic-600 bg-islamic-50 text-islamic-900 dark:bg-islamic-950 dark:text-emerald-300'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Amiri (Klasik Mesir)
              </button>

              <button
                onClick={() => setArabicFont('font-arabic-scheherazade')}
                className={`p-3 rounded-xl border text-sm font-arabic font-bold transition ${
                  arabicFont === 'font-arabic-scheherazade'
                    ? 'border-islamic-600 bg-islamic-50 text-islamic-900 dark:bg-islamic-950 dark:text-emerald-300'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Scheherazade (Naskh Madinah)
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kembalikan Default</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-islamic-700 hover:bg-islamic-800 text-white font-semibold text-xs shadow-md"
          >
            Simpan & Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
