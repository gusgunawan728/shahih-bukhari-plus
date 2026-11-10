import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Laptop, 
  CheckCircle, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check
} from 'lucide-react';

export default function DownloadDeployModal({ isOpen, onClose }) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#12221b] w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-400/30 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#0b2b1d] via-[#123e2b] to-[#1c553b] text-white flex items-center justify-between border-b border-emerald-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-gold-300 flex items-center justify-center border border-emerald-400/30 shadow-inner">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  Download Shahih Bukhari Plus
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gold-400 text-black">
                  Offline
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Pilihan Penggunaan Tanpa Kuota di Android & Komputer (PC)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 scrollbar-thin">
          
          {/* Card 1: Download / Pasang di HP Android */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 dark:from-[#0d1d16] dark:to-[#0a1711] border-2 border-emerald-400/80 dark:border-emerald-700 shadow-sm relative overflow-hidden">
            
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-900 dark:text-white">
                    1. Pasang di HP Android (Offline & Tanpa Kuota)
                  </h4>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
                    Aplikasi PWA Ringan • Bebas Kuota Internet
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                Direkomendasikan
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Aplikasi <strong>Shahih Bukhari Plus</strong> telah mendukung teknologi <em>Progressive Web App (PWA)</em> modern. Anda dapat memasangnya langsung di layar beranda HP Android Anda tanpa perlu mendownload APK besar:
            </p>

            {/* Step-by-step instructions for Android */}
            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-black/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs text-gray-700 dark:text-gray-300 mb-3.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Buka link website ini di browser <strong>Google Chrome</strong> di HP Android Anda.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Ketuk ikon menu <strong>titik tiga (⋮)</strong> di sudut kanan atas Google Chrome.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Pilih opsi <strong>"Tambahkan ke Layar Utama" (Add to Home screen)</strong> atau <strong>"Instal Aplikasi"</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                <span>Ikon <strong>Shahih Bukhari Plus</strong> akan terpasang di HP Anda dan dapat dibuka kapan saja tanpa memerlukan kuota internet!</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link untuk Buka di HP'}</span>
              </button>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Kirim link ke HP via WhatsApp/Telegram
              </span>
            </div>

          </div>

          {/* Card 2: Download untuk PC / Laptop (Windows .zip Portabel) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-[#1c160c] dark:to-[#17130a] border border-amber-300 dark:border-amber-800 shadow-sm">
            
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-900 dark:text-white">
                    2. Download Aplikasi untuk PC / Laptop (Offline)
                  </h4>
                  <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                    Paket Windows Portabel .ZIP (~11.7 MB)
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                100% Offline
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Paket lengkap aplikasi offline untuk PC/Laptop Windows telah dikemas dalam bentuk berkas portabel. Sudah mencakup <strong>seluruh 7.563 hadits, silsilah sanad, dan syarah naskah lengkap 36 jilid</strong> serta server lokal cerdas.
            </p>

            {/* Extraction Guide */}
            <div className="p-3 rounded-xl bg-white/90 dark:bg-black/40 border border-amber-200 dark:border-amber-900/60 space-y-1.5 text-xs text-gray-700 dark:text-gray-300 mb-4">
              <div className="font-bold text-amber-900 dark:text-amber-300 mb-1">
                Panduan Penggunaan di PC:
              </div>
              <div className="flex items-start gap-1.5">
                <span>1.</span>
                <span>Klik tombol download berkas <strong>Shahih_Bukhari_PC.zip</strong> di bawah.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span>2.</span>
                <span>Setelah terdownload, klik kanan berkas ZIP lalu pilih <strong>"Extract All..." (Ekstrak Semua)</strong>.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span>3.</span>
                <span>Buka folder hasil ekstrak, lalu klik dua kali berkas <strong>Jalankan_Shahih_Bukhari.bat</strong>.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span>4.</span>
                <span>Browser akan terbuka otomatis dan aplikasi dapat dinikmati 100% offline!</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/Shahih_Bukhari_PC.zip"
                download="Shahih_Bukhari_PC.zip"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-extrabold text-xs shadow-md transition transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Paket PC (Shahih_Bukhari_PC.zip)</span>
              </a>

              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Ukuran berkas ~53 MB (Lengkap dengan Seluruh Naskah Syarah 36 Jilid)
              </span>
            </div>

          </div>

        </div>

        {/* Footer Credit & Close */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            created by. <strong>Digitab Team</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
