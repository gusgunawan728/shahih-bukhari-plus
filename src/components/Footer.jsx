import React from 'react';
import { 
  BookOpen, 
  Heart, 
  ExternalLink, 
  FolderArchive, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';

export default function Footer({ onSelectBook, onOpenLibrary, onOpenBio }) {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 text-xs border-t border-gray-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand & Intro */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-islamic-800 text-gold-400 border border-gold-500/40 flex items-center justify-center font-arabic font-bold text-lg">
                ص
              </div>
              <div>
                <h3 className="text-white font-bold text-base tracking-tight">
                  Shahih Al-Bukhari Digital
                </h3>
                <p className="text-[11px] text-gray-500 font-arabic">
                  الجامع المسند الصحيح المختصر من أمور رسول الله ﷺ وسننه وأيامه
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-lg mb-4">
              Aplikasi Ensiklopedia Kitab Shahih Bukhari terlengkap dan utuh tanpa ada satu pun hadits yang tertinggal (seluruh 7.563 hadits dalam 97 Kitab). Dikelola secara ilmiah dengan integrasi penuh 36 Jilid Kitab Syarah Fathul Baari karya Al-Hafizh Ibnu Hajar Al-’Asqalani yang terhubung langsung ke Google Drive.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <GraduationCap className="w-4 h-4" />
              <span>Divalidasi dengan Standar Disiplin Ilmu Hadits (Kutubus Sittah)</span>
            </div>
          </div>

          {/* Col 2: Navigasi Kitab Inti */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Kitab Utama Pilihan
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectBook(1)} className="hover:text-emerald-400 transition">
                  Kitab 1: Permulaan Wahyu
                </button>
              </li>
              <li>
                <button onClick={() => onSelectBook(2)} className="hover:text-emerald-400 transition">
                  Kitab 2: Keimanan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectBook(8)} className="hover:text-emerald-400 transition">
                  Kitab 8: Shalat
                </button>
              </li>
              <li>
                <button onClick={() => onSelectBook(24)} className="hover:text-emerald-400 transition">
                  Kitab 24: Zakat
                </button>
              </li>
              <li>
                <button onClick={() => onSelectBook(30)} className="hover:text-emerald-400 transition">
                  Kitab 30: Puasa (Shaum)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectBook(65)} className="hover:text-emerald-400 transition">
                  Kitab 65: Tafsir Al-Qur'an
                </button>
              </li>
              <li>
                <button onClick={() => onSelectBook(97)} className="hover:text-emerald-400 transition">
                  Kitab 97: Kitab Tauhid
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Maktabah & Referensi */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Maktabah & Rujukan
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenLibrary} className="hover:text-gold-400 transition flex items-center gap-1">
                  <FolderArchive className="w-3.5 h-3.5 text-gold-400" />
                  <span>36 Jilid Fathul Baari (PDF)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenLibrary} className="hover:text-gold-400 transition">
                  Manarul Qari Syarah Mukhtashar (5 Jilid)
                </button>
              </li>
              <li>
                <button onClick={onOpenLibrary} className="hover:text-gold-400 transition">
                  Mukhtashar Sahihil Bukhari (Az-Zabidi)
                </button>
              </li>
              <li>
                <button onClick={onOpenBio} className="hover:text-emerald-400 transition flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Biografi & 5 Syarat Keshahihan</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLibrary}
                  className="hover:text-gold-400 transition flex items-center gap-1 text-gold-400 font-semibold mt-2"
                >
                  <FolderArchive className="w-3.5 h-3.5" />
                  <span>Daftar 50 File PDF Rujukan</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Doa & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="text-center sm:text-left">
            <span className="font-arabic text-sm text-gray-400 block sm:inline mr-2">
              سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ
            </span>
          </div>

          <div className="text-center sm:text-right">
            <span>Ensiklopedia Digital Shahih Bukhari • Bahasa Indonesia & Multibahasa Dunia</span>
          </div>
        </div>

        {/* Creator & Founder Credit */}
        <div className="pt-5 mt-5 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0"></span>
            <span className="text-gray-300">
              created by. <strong className="text-gold-300 font-bold">Digitab Team</strong>
            </span>
          </div>

          <div className="text-[11px] text-emerald-400/90 font-medium text-center sm:text-right">
            <span>Dedikasi Dakwah & Digitalisasi Khazanah Hadits Nabawi</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
