import React from 'react';
import { 
  Home,
  Layers, 
  Search, 
  FileText, 
  Users, 
  BookOpen, 
  Star, 
  Bookmark, 
  FileEdit, 
  History, 
  ChevronRight, 
  Check, 
  Crown,
  X
} from 'lucide-react';

export default function LeftSidebar({
  currentTab,
  setCurrentTab,
  bookmarksCount = 0,
  onOpenUpgradeModal,
  isOpen,
  setIsOpen
}) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'books', label: 'Kitab & Jilid', icon: Layers, hasSub: true },
    { id: 'search', label: 'Pencarian Hadits', icon: Search },
    { id: 'thematic', label: 'Indeks Tematik', icon: FileText },
    { id: 'bio', label: 'Biografi Perawi', icon: Users },
    { id: 'library', label: 'Syarah & Penjelasan', icon: BookOpen },
    { id: 'featured', label: 'Hadits Pilihan', icon: Star },
    { id: 'bookmarks', label: 'Bookmark', icon: Bookmark, count: bookmarksCount },
    { id: 'notes', label: 'Catatan Saya', icon: FileEdit },
    { id: 'history', label: 'Riwayat Baca', icon: History },
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-[#f8fafc] dark:bg-[#0c1813] border-r border-gray-200/90 dark:border-gray-800 flex flex-col justify-between p-4 shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* 1. Brand Header: Dark Green Box with Gold App Emblem & Premium Badge */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#093926] via-[#0d452f] to-[#093926] p-3.5 text-white shadow-md border border-emerald-700/40 mb-4">
            <div className="flex items-center justify-between gap-2.5">
              <div 
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0"
              >
                {/* Gold Emblem */}
                <div className="w-11 h-11 rounded-full overflow-hidden border border-amber-300/80 shadow-md bg-[#082e1f] shrink-0 p-0.5 group-hover:scale-105 transition-transform">
                  <img 
                    src="./images/app_emblem.png" 
                    alt="Shahih Bukhari Plus Emblem" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* App Title & Subtitle */}
                <div className="min-w-0">
                  <h1 className="font-extrabold text-[15px] sm:text-base text-white tracking-tight leading-tight truncate">
                    Shahih Bukhari Plus
                  </h1>
                  <p className="text-[10px] text-emerald-200/90 truncate mt-0.5">
                    Portal Digital Hadits Terlengkap
                  </p>
                </div>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 lg:hidden shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gold Premium Pill Badge under title */}
            <div className="mt-2.5 pt-2 border-t border-emerald-700/50 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-black shadow-xs tracking-wider uppercase">
                <Crown className="w-3 h-3 fill-black text-black" />
                <span>PREMIUM</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-200">
                v2.6 Pro Edition
              </span>
            </div>
          </div>

          {/* 2. Navigation List */}
          <nav className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition duration-150 ${
                    isActive
                      ? 'bg-[#0ea570] text-white shadow-md shadow-emerald-600/30 font-extrabold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className="tracking-tight">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.count > 0 && (
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white text-emerald-800' : 'bg-rose-500 text-white'
                      }`}>
                        {item.count}
                      </span>
                    )}

                    {item.hasSub && (
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 3. Bottom Card: Shahih Bukhari Plus Premium */}
        <div className="pt-3">
          <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-[#fdf6e2] to-amber-100/70 dark:from-[#1b190f] dark:via-[#17140b] dark:to-[#221c0e] border border-amber-300/80 dark:border-amber-700/60 p-4 shadow-sm relative overflow-hidden">
            
            {/* Header: Crown icon + Title */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-black flex items-center justify-center shrink-0 shadow-xs">
                <Crown className="w-4 h-4 fill-black" />
              </div>
              <h3 className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                Shahih Bukhari Plus Premium
              </h3>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 text-[11px] text-gray-700 dark:text-gray-300 mb-3.5">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Akses lengkap 7.563 hadits</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Syarah 36 Jilid</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Fitur catatan & bookmark</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Bebas iklan</span>
              </div>
            </div>

            {/* Upgrade Button */}
            <button
              onClick={() => {
                if (onOpenUpgradeModal) onOpenUpgradeModal();
                setIsOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition cursor-pointer"
            >
              <span>Upgrade Sekarang</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}
