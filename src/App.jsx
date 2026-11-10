import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Hero from './components/Hero';
import BookList from './components/BookList';
import HadithReader from './components/HadithReader';
import MaktabahView from './components/MaktabahView';
import MaktabahModal from './components/MaktabahModal';
import SearchView from './components/SearchView';
import BiographyView from './components/BiographyView';
import BookmarksView from './components/BookmarksView';
import ThematicView from './components/ThematicView';
import FeaturedView from './components/FeaturedView';
import NotesView from './components/NotesView';
import HistoryView from './components/HistoryView';
import AuthModal from './components/AuthModal';
import UpgradePremiumModal from './components/UpgradePremiumModal';
import SettingsModal from './components/SettingsModal';
import DownloadDeployModal from './components/DownloadDeployModal';
import Footer from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedBookId, setSelectedBookId] = useState(1);
  const [books, setBooks] = useState([]);
  const [libraryData, setLibraryData] = useState(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // User & Auth State (Default matching screenshot: Agus Gunawan, M.Pd.)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shahih_bukhari_auth_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {}
    return {
      username: 'agus',
      fullName: 'Agus Gunawan, M.Pd.',
      role: 'premium',
      plan: 'Paket Lifetime Pro',
      isPremium: true,
      avatar: '/images/profile_agus.jpg'
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Settings
  const [primaryLang, setPrimaryLang] = useState('id'); // Bahasa Indonesia as default
  const [arabicFontSize, setArabicFontSize] = useState(28);
  const [transFontSize, setTransFontSize] = useState(16);
  const [arabicFont, setArabicFont] = useState('font-arabic-amiri');
  const [theme, setTheme] = useState('light'); // 'light', 'dark', 'sepia'
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Bookmarks & Last Read
  const [bookmarks, setBookmarks] = useState([]);
  const [lastRead, setLastRead] = useState(null);

  // Modals
  const [activeModalFile, setActiveModalFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load books metadata & gdrive library on mount
  useEffect(() => {
    Promise.all([
      fetch('/data/books_metadata.json').then((r) => r.json()),
      fetch('/data/gdrive_library.json').then((r) => r.json())
    ])
      .then(([bData, lData]) => {
        setBooks(bData);
        setLibraryData(lData);
        setLoadingApp(false);
      })
      .catch((err) => {
        console.error('Error loading initial data:', err);
        setLoadingApp(false);
      });

    // Load saved settings & state
    try {
      const savedBm = localStorage.getItem('shahih_bukhari_bookmarks');
      if (savedBm) setBookmarks(JSON.parse(savedBm));

      const savedLr = localStorage.getItem('shahih_bukhari_last_read');
      if (savedLr) setLastRead(JSON.parse(savedLr));

      const savedTheme = localStorage.getItem('shahih_bukhari_theme');
      if (savedTheme) setTheme(savedTheme);

      const savedArSize = localStorage.getItem('shahih_bukhari_ar_size');
      if (savedArSize) setArabicFontSize(parseInt(savedArSize));

      const savedTrSize = localStorage.getItem('shahih_bukhari_tr_size');
      if (savedTrSize) setTransFontSize(parseInt(savedTrSize));

      const savedArFont = localStorage.getItem('shahih_bukhari_ar_font');
      if (savedArFont) setArabicFont(savedArFont);
    } catch (e) {}
  }, []);

  // Persist Theme
  useEffect(() => {
    localStorage.setItem('shahih_bukhari_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('theme-sepia');
    } else if (theme === 'sepia') {
      root.classList.remove('dark');
      root.classList.add('theme-sepia');
    } else {
      root.classList.remove('dark');
      root.classList.remove('theme-sepia');
    }
  }, [theme]);

  // Persist Settings
  useEffect(() => {
    localStorage.setItem('shahih_bukhari_ar_size', arabicFontSize.toString());
  }, [arabicFontSize]);

  useEffect(() => {
    localStorage.setItem('shahih_bukhari_tr_size', transFontSize.toString());
  }, [transFontSize]);

  useEffect(() => {
    localStorage.setItem('shahih_bukhari_ar_font', arabicFont);
  }, [arabicFont]);

  // Persist User
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('shahih_bukhari_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('shahih_bukhari_auth_user');
    }
  }, [currentUser]);

  // Bookmark Toggle
  const handleToggleBookmark = (hadith) => {
    let updated;
    const exists = bookmarks.some((b) => b.number === hadith.number);
    if (exists) {
      updated = bookmarks.filter((b) => b.number !== hadith.number);
    } else {
      updated = [
        ...bookmarks,
        {
          number: hadith.number,
          book_id: hadith.book_id,
          text_ar: hadith.text_ar ? hadith.text_ar.slice(0, 150) + '...' : '',
          text_id: hadith.text_id ? hadith.text_id.slice(0, 200) + '...' : '',
          fathul_bari: hadith.fathul_bari,
          savedAt: Date.now()
        }
      ];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('shahih_bukhari_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllBookmarks = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua hadits tersimpan?')) {
      setBookmarks([]);
      localStorage.removeItem('shahih_bukhari_bookmarks');
    }
  };

  const handleRemoveBookmark = (num) => {
    const updated = bookmarks.filter((b) => b.number !== num);
    setBookmarks(updated);
    try {
      localStorage.setItem('shahih_bukhari_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  // Navigations & Logging
  const logReadingHistory = (bookId, hadithNumber, bookName) => {
    try {
      const saved = localStorage.getItem('shahih_bukhari_reading_history');
      const list = saved ? JSON.parse(saved) : [];
      const newEntry = {
        id: 'h-' + Date.now(),
        number: hadithNumber,
        bookId: bookId,
        bookName: bookName || `Kitab #${bookId}`,
        topic: `HR. Bukhari No. ${hadithNumber}`,
        timestamp: Date.now()
      };
      const filtered = list.filter((x) => x.number !== hadithNumber);
      const updated = [newEntry, ...filtered].slice(0, 50);
      localStorage.setItem('shahih_bukhari_reading_history', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSelectBook = (bookId) => {
    setSelectedBookId(bookId);
    setCurrentTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHadith = (bookId, hadithNumber) => {
    setSelectedBookId(bookId);
    setCurrentTab('reader');
    logReadingHistory(bookId, hadithNumber);
    setTimeout(() => {
      const el = document.getElementById(`hadith-${hadithNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-emerald-500');
        setTimeout(() => el.classList.remove('ring-2', 'ring-emerald-500'), 3000);
      }
    }, 400);
  };

  const handleContinueLastRead = () => {
    if (lastRead) {
      setSelectedBookId(lastRead.bookId);
      setCurrentTab('reader');
    } else {
      setSelectedBookId(4); // Default Kitab Wudhu from screenshot
      setCurrentTab('reader');
    }
  };

  // Modal handlers
  const handleOpenSyarahModal = (fathulBariInfo) => {
    if (!fathulBariInfo) return;
    setActiveModalFile({
      title: fathulBariInfo.filename,
      filename: fathulBariInfo.filename,
      drive_id: fathulBariInfo.drive_id,
      view_url: fathulBariInfo.view_url,
      preview_url: fathulBariInfo.preview_url,
      scope: fathulBariInfo.scope
    });
    setIsModalOpen(true);
  };

  const handleOpenFileModal = (fileItem) => {
    setActiveModalFile(fileItem);
    setIsModalOpen(true);
  };

  const handleResetSettings = () => {
    setArabicFontSize(28);
    setTransFontSize(16);
    setArabicFont('font-arabic-amiri');
    setTheme('light');
    setPrimaryLang('id');
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda ingin keluar dari akun?')) {
      setCurrentUser(null);
    }
  };

  const handleUpgradeSuccess = (plan) => {
    const updated = {
      ...(currentUser || { username: 'agus', fullName: 'Agus Gunawan, M.Pd.', avatar: '/images/profile_agus.jpg' }),
      isPremium: true,
      plan: plan.name,
      role: 'premium'
    };
    setCurrentUser(updated);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#08120e] text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-200">
      
      {/* 1. Left Sidebar Navigation matching screenshot */}
      <LeftSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        bookmarksCount={bookmarks.length}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Wrapper with Left Sidebar Margin on Desktop (lg:pl-80) */}
      <div className="lg:pl-80 flex flex-col flex-1 min-w-0">
        
        {/* 2. Top Header Bar matching screenshot */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={(q) => {
            setSearchQuery(q);
            setCurrentTab('search');
          }}
          theme={theme}
          setTheme={setTheme}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* 3. Central Application Dashboard Layout */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-[1400px] w-full mx-auto">
          {loadingApp ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-300">
                Memuat Ensiklopedia Shahih Al-Bukhari...
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Menghubungkan 7.563 Hadits & 36 Jilid Maktabah Fathul Baari
              </p>
            </div>
          ) : (
            <div className="flex gap-5 items-start">
              
              {/* Center Content Column */}
              <div className="flex-1 min-w-0 space-y-6">
                
                {/* Home / Dashboard View */}
                {currentTab === 'home' && (
                  <>
                    <Hero
                      onStartReading={(bId) => handleSelectBook(bId || 1)}
                      onOpenLibrary={() => setCurrentTab('library')}
                      onOpenSearch={() => setCurrentTab('search')}
                      onOpenBio={() => setCurrentTab('bio')}
                      onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
                      onNavigateTab={(tab) => setCurrentTab(tab)}
                    />
                    <BookList
                      books={books}
                      onSelectBook={handleSelectBook}
                      onOpenFathulBariModal={(file, url) => {
                        const found = libraryData?.items.find((x) => x.filename === file);
                        if (found) handleOpenFileModal(found);
                      }}
                    />
                  </>
                )}

                {/* Indeks 97 Kitab View */}
                {currentTab === 'books' && (
                  <BookList
                    books={books}
                    onSelectBook={handleSelectBook}
                    onOpenFathulBariModal={(file, url) => {
                      const found = libraryData?.items.find((x) => x.filename === file);
                      if (found) handleOpenFileModal(found);
                    }}
                  />
                )}

                {/* Hadith Reader View */}
                {currentTab === 'reader' && (
                  <HadithReader
                    bookId={selectedBookId}
                    books={books}
                    onSelectBook={handleSelectBook}
                    onBackToBooks={() => setCurrentTab('books')}
                    primaryLang={primaryLang}
                    arabicFontSize={arabicFontSize}
                    transFontSize={transFontSize}
                    arabicFont={arabicFont}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenFathulBariModal={(file, url) => {
                      const found = libraryData?.items.find((x) => x.filename === file);
                      if (found) handleOpenFileModal(found);
                    }}
                    onOpenSyarahModal={handleOpenSyarahModal}
                  />
                )}

                {/* Maktabah Syarah (36 Jilid Lengkap) View */}
                {currentTab === 'library' && (
                  <MaktabahView
                    libraryData={libraryData}
                    books={books}
                    onSelectBook={handleSelectBook}
                    onOpenFileModal={handleOpenFileModal}
                  />
                )}

                {/* Global Search View */}
                {currentTab === 'search' && (
                  <SearchView
                    initialQuery={searchQuery}
                    books={books}
                    onSelectHadith={handleSelectHadith}
                    onSelectBook={handleSelectBook}
                  />
                )}

                {/* Indeks Tematik View */}
                {currentTab === 'thematic' && (
                  <ThematicView
                    books={books}
                    onSelectBook={handleSelectBook}
                    onSelectHadith={handleSelectHadith}
                  />
                )}

                {/* Hadits Pilihan View */}
                {currentTab === 'featured' && (
                  <FeaturedView
                    books={books}
                    onSelectBook={handleSelectBook}
                    onSelectHadith={handleSelectHadith}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmark}
                  />
                )}

                {/* Catatan Saya (Notes View) */}
                {currentTab === 'notes' && (
                  <NotesView
                    books={books}
                    onSelectBook={handleSelectBook}
                    onSelectHadith={handleSelectHadith}
                  />
                )}

                {/* Riwayat Baca (History View) */}
                {currentTab === 'history' && (
                  <HistoryView
                    books={books}
                    onSelectBook={handleSelectBook}
                    onSelectHadith={handleSelectHadith}
                  />
                )}

                {/* Biography View */}
                {currentTab === 'bio' && (
                  <BiographyView
                    onOpenLibrary={() => setCurrentTab('library')}
                    onStartReading={(bId) => handleSelectBook(bId || 1)}
                  />
                )}

                {/* Bookmarks View */}
                {currentTab === 'bookmarks' && (
                  <BookmarksView
                    bookmarks={bookmarks}
                    onRemoveBookmark={handleRemoveBookmark}
                    onSelectHadith={handleSelectHadith}
                    onClearAll={handleClearAllBookmarks}
                  />
                )}

              </div>

              {/* 4. Right Sidebar matching screenshot */}
              <RightSidebar
                onSelectBook={handleSelectBook}
                onSelectHadith={handleSelectHadith}
                onOpenSyarahModal={handleOpenSyarahModal}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                lastRead={lastRead}
                onContinueLastRead={handleContinueLastRead}
              />

            </div>
          )}
        </main>

        {/* 5. Footer with Founder Credit */}
        <Footer
          onSelectBook={handleSelectBook}
          onOpenLibrary={() => setCurrentTab('library')}
          onOpenBio={() => setCurrentTab('bio')}
        />

      </div>

      {/* Global Modals */}
      <MaktabahModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fileData={activeModalFile}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        primaryLang={primaryLang}
        setPrimaryLang={setPrimaryLang}
        arabicFontSize={arabicFontSize}
        setArabicFontSize={setArabicFontSize}
        transFontSize={transFontSize}
        setTransFontSize={setTransFontSize}
        arabicFont={arabicFont}
        setArabicFont={setArabicFont}
        theme={theme}
        setTheme={setTheme}
        onReset={handleResetSettings}
      />

      <DownloadDeployModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Auth Modal (Login / Register / User Account) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
        onLogout={handleLogout}
        onOpenUpgradeModal={() => {
          setIsAuthModalOpen(false);
          setIsUpgradeModalOpen(true);
        }}
      />

      {/* Upgrade Premium & Payment Simulation Modal */}
      <UpgradePremiumModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentUser={currentUser}
        onUpgradeSuccess={handleUpgradeSuccess}
      />

    </div>
  );
}
