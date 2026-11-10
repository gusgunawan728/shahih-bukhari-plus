import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  Download, 
  Moon, 
  Sun, 
  Bell, 
  HelpCircle, 
  Crown, 
  LogOut, 
  User, 
  CreditCard, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onSearchSubmit,
  theme, 
  setTheme,
  onOpenDownloadModal,
  onToggleSidebar,
  currentUser,
  onOpenAuthModal,
  onOpenUpgradeModal,
  onLogout
}) {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    setLocalQuery(searchQuery || '');
  }, [searchQuery]);

  // Click outside listener for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearchSubmit(localQuery.trim());
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0c1813]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 shadow-xs transition-colors duration-200">
        <div className="px-3 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* 1. Left: Hamburger Menu Button */}
            <div className="flex items-center">
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                title="Buka / Tutup Menu Navigasi"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Center: Prominent Pill Search Bar */}
            <div className="flex-1 max-w-xl mx-1 sm:mx-4">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Cari hadits, tema, atau kata kunci..."
                  className="w-full pl-4 pr-11 py-2 text-xs sm:text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50/90 dark:bg-[#08120e] text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner transition"
                />
                
                {/* Circular emerald search button on the right */}
                <button
                  type="submit"
                  className="absolute right-1 w-8 h-8 rounded-full bg-[#0ea570] hover:bg-emerald-600 text-white flex items-center justify-center transition shadow-xs active:scale-95"
                  title="Cari Hadits"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            </div>

            {/* 3. Right: Download App, Notifications, Help, Theme, & User Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Gold Button: Download App (Android / PC) */}
              <button
                onClick={onOpenDownloadModal}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-extrabold text-xs shadow-sm hover:scale-[1.02] active:scale-95 transition"
                title="Download Aplikasi Android & PC Offline"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Download App (Android / PC)</span>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotification(!showNotification)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition relative"
                  title="Pemberitahuan"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 animate-pulse"></span>
                </button>

                {showNotification && (
                  <div className="absolute right-0 mt-2 w-72 p-3.5 rounded-2xl bg-white dark:bg-[#0c1813] border border-gray-200 dark:border-gray-800 shadow-xl z-50 text-xs">
                    <div className="font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-between">
                      <span>Pemberitahuan</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">1 Baru</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                      <div className="font-bold text-[11px]">Database Syarah Diperbarui</div>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5">
                        7.563 Hadits kini lengkap dengan Syarah Fathul Baari (36 Jilid) Maktabah Syamilah.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Help (?) Button */}
              <button
                onClick={() => setShowHelpModal(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                title="Bantuan & Panduan Aplikasi"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {/* Dark / Light Mode Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                title={`Beralih ke mode ${theme === 'dark' ? 'Terang' : 'Gelap'}`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-emerald-700" />
                )}
              </button>

              {/* User Profile Area (Agus Gunawan, M.Pd. | 👑 Premium) */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 pl-1 sm:pl-2 pr-1.5 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/80 transition cursor-pointer"
                >
                  {/* Circular Avatar */}
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400 shadow-xs shrink-0 bg-gray-200">
                    <img 
                      src={currentUser?.avatar || "./images/profile_agus.jpg"} 
                      alt={currentUser?.fullName || "Agus Gunawan, M.Pd."}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "./images/profile_agus.jpg";
                      }}
                    />
                  </div>

                  {/* Name and Premium Badge */}
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                      {currentUser?.fullName || "Agus Gunawan, M.Pd."}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      <Crown className="w-2.5 h-2.5 fill-amber-500" />
                      <span>{currentUser?.isPremium ? 'Premium' : 'Free Member'}</span>
                    </div>
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-white dark:bg-[#0c1813] border border-gray-200 dark:border-gray-800 shadow-xl z-50 text-xs animate-fade-in space-y-2">
                    
                    {/* User Header */}
                    <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
                        <img 
                          src={currentUser?.avatar || "./images/profile_agus.jpg"} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-extrabold text-xs text-gray-900 dark:text-white truncate">
                          {currentUser?.fullName || "Agus Gunawan, M.Pd."}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                          @{currentUser?.username || "agus"}
                        </div>
                        <div className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 rounded">
                          <Crown className="w-2.5 h-2.5 fill-amber-500" />
                          <span>{currentUser?.isPremium ? 'Lifetime Pro Member' : 'Akun Standar'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Subscription Status Card */}
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-[11px] text-emerald-900 dark:text-emerald-300">
                      <div className="font-bold flex items-center justify-between">
                        <span>Status Langganan</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-black">
                          {currentUser?.isPremium ? 'AKTIF' : 'GRATIS'}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                        {currentUser?.isPremium 
                          ? 'Akses tak terbatas ke 7.563 hadits dan 36 jilid syarah.'
                          : 'Tingkatkan ke Premium untuk membuka semua fitur.'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-1 pt-1">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          if (onOpenUpgradeModal) onOpenUpgradeModal();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold transition text-left"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Kelola Langganan / Upgrade</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          if (onOpenAuthModal) onOpenAuthModal();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition text-left"
                      >
                        <User className="w-4 h-4" />
                        <span>Ganti Akun / Masuk</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0c1813] border border-gray-200 dark:border-gray-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                  Panduan Penggunaan
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">
                  1. Pencarian Cepat
                </strong>
                Ketikkan kata kunci (misal: "shalat", "wudhu", "niat") atau langsung masukkan nomor hadits (1 s/d 7.563) di kotak pencarian atas.
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">
                  2. Membaca Syarah Fathul Baari
                </strong>
                Klik tab "Syarah & Penjelasan" atau klik tombol Syarah di setiap kartu hadits untuk membaca ulasan otentik Ibnu Hajar Al-Asqalani.
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">
                  3. Mode Offline & Download
                </strong>
                Gunakan tombol kuning "Download App" di atas untuk memasang aplikasi di PC Windows atau HP Android tanpa perlu kuota internet.
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
            >
              Mengerti & Lanjutkan
            </button>
          </div>
        </div>
      )}
    </>
  );
}
