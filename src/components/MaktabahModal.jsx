import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Download, 
  BookOpen, 
  Maximize2, 
  FileText, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function MaktabahModal({ isOpen, onClose, fileData }) {
  const [fullscreen, setFullscreen] = useState(false);

  if (!isOpen || !fileData) return null;

  const previewUrl = fileData.preview_url || `https://drive.google.com/file/d/${fileData.drive_id}/preview`;
  const viewUrl = fileData.view_url || `https://drive.google.com/file/d/${fileData.drive_id}/view?usp=sharing`;
  const downloadUrl = fileData.download_url || `https://drive.google.com/uc?export=download&id=${fileData.drive_id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      
      <div 
        className={`bg-white dark:bg-[#101e18] rounded-2xl shadow-2xl border border-gold-400/30 flex flex-col overflow-hidden transition-all duration-300 ${
          fullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-full max-w-5xl h-[88vh]'
        }`}
      >
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-islamic-900 via-islamic-800 to-islamic-950 text-white flex items-center justify-between border-b border-islamic-700">
          
          <div className="flex items-center gap-2.5 truncate mr-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 border border-gold-400/30">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 className="font-bold text-sm sm:text-base truncate text-gold-200">
                {fileData.filename || fileData.title}
              </h3>
              {fileData.scope && (
                <p className="text-[11px] text-emerald-200 truncate">
                  Cakupan: <strong>{fileData.scope}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            
            {/* View direct clean PDF */}
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-islamic-700/80 hover:bg-islamic-600 text-emerald-100 text-xs font-medium border border-islamic-600 transition"
              title="Buka Dokumen PDF Langsung di Tab Baru"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka di Tab Baru</span>
            </a>

            {/* Direct Download */}
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-islamic-700/80 hover:bg-islamic-600 text-emerald-100 hover:text-white transition"
              title="Unduh PDF"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-2 rounded-lg bg-islamic-700/80 hover:bg-islamic-600 text-emerald-100 hover:text-white transition hidden md:block"
              title={fullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-600/80 hover:bg-red-700 text-white transition ml-1"
              title="Tutup Jendela"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Modal Info Banner */}
        <div className="bg-gold-50 dark:bg-gold-950/40 px-5 py-2 border-b border-gold-200 dark:border-gold-900/40 flex items-center justify-between text-xs text-gold-900 dark:text-gold-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500"></span>
            <span>
              Kitab Digital Rujukan Google Drive: <strong>{fileData.title || fileData.filename}</strong>
            </span>
          </div>
          <span className="hidden md:inline text-[11px] text-gray-500 dark:text-gray-400">
            Gunakan kontrol pembaca PDF di bawah untuk memperbesar, membalik halaman, dan mencari teks.
          </span>
        </div>

        {/* Embedded PDF Iframe Viewer */}
        <div className="flex-1 bg-gray-900 relative">
          <iframe
            src={previewUrl}
            title={fileData.filename}
            className="w-full h-full border-0"
            allow="autoplay"
          ></iframe>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-gray-100 dark:bg-[#0c1813] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Pustaka Rujukan Shahih Al-Bukhari • Terhubung ke Google Drive</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>

      </div>

    </div>
  );
}
