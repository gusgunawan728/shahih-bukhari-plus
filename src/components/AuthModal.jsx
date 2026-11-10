import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  User, 
  Mail, 
  Eye, 
  EyeOff, 
  Crown, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onLoginSuccess, 
  onLogout 
}) {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'profile'
  const [username, setUsername] = useState('agus');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Agus Gunawan, M.Pd.');
  const [email, setEmail] = useState('agus@digitab.id');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Check registered users in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('shahih_bukhari_users_db') || '[]');
    
    // Default demo account
    let foundUser = null;
    if ((username.toLowerCase() === 'agus' || username.toLowerCase() === 'agus@digitab.id') && password === 'password123') {
      foundUser = {
        username: 'agus',
        fullName: 'Agus Gunawan, M.Pd.',
        email: 'agus@digitab.id',
        role: 'premium',
        isPremium: true,
        avatar: './images/profile_agus.jpg',
        joinedDate: 'Januari 2026'
      };
    } else {
      foundUser = savedUsers.find(
        (u) => (u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase()) && u.password === password
      );
    }

    if (foundUser) {
      setSuccessMessage('Berhasil masuk! Mengalihkan...');
      setTimeout(() => {
        onLoginSuccess(foundUser);
        onClose();
        setSuccessMessage('');
      }, 700);
    } else {
      setErrorMessage('Username atau password salah. Coba: agus / password123');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim() || !fullName.trim()) {
      setErrorMessage('Semua kolom wajib diisi.');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('shahih_bukhari_users_db') || '[]');
    const exists = savedUsers.some((u) => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
      setErrorMessage('Username sudah digunakan, silakan pilih username lain.');
      return;
    }

    const newUser = {
      username: username.trim(),
      password: password,
      fullName: fullName.trim(),
      email: email.trim(),
      role: 'premium',
      isPremium: true, // Bonus gratis premium untuk pendaftaran pertama
      avatar: './images/profile_agus.jpg',
      joinedDate: 'November 2026'
    };

    savedUsers.push(newUser);
    localStorage.setItem('shahih_bukhari_users_db', JSON.stringify(savedUsers));

    setSuccessMessage('Pendaftaran berhasil! Akun Anda aktif dengan status Premium.');
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
      setSuccessMessage('');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#0c1813] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden relative">
        
        {/* Header Visual */}
        <div className="p-6 bg-gradient-to-r from-[#093926] via-[#0e4b33] to-[#12583d] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shadow-inner">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                <span>Shahih Bukhari Plus</span>
              </div>
              <h3 className="text-lg font-bold">
                {currentUser ? 'Akun Pengguna' : mode === 'login' ? 'Masuk ke Portal Hadits' : 'Daftar Akun Baru'}
              </h3>
            </div>
          </div>
        </div>

        {/* User is Already Logged In */}
        {currentUser ? (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <img
                src={currentUser.avatar || './images/profile_agus.jpg'}
                alt={currentUser.fullName}
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-md"
              />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base">
                  {currentUser.fullName}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  @{currentUser.username} • {currentUser.email}
                </p>
                <div className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold">
                  <Crown className="w-3 h-3 text-amber-500" />
                  <span>PREMIUM MEMBER (Akses Penuh 100%)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span>Status Akun:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Aktif & Terverifikasi ✓</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <span>Akses 7.563 Hadits & 36 Jilid Syarah:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Terbuka Tanpa Batas</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onLogout}
                className="flex-1 py-2.5 px-4 rounded-xl border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
              >
                Keluar (Logout)
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition cursor-pointer"
              >
                Lanjutkan Membaca
              </button>
            </div>
          </div>
        ) : (
          /* Login & Register Forms */
          <div className="p-6 space-y-4">
            
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800 text-xs font-bold">
              <button
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className={`py-2 rounded-xl transition cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white dark:bg-gray-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Masuk (Login)
              </button>
              <button
                onClick={() => { setMode('register'); setErrorMessage(''); }}
                className={`py-2 rounded-xl transition cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white dark:bg-gray-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Daftar Akun Baru
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Login Form */}
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Username atau Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username/email..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan password..."
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Hint */}
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-center justify-between">
                  <span>Akun Demo Premium: <strong>agus</strong> / <strong>password123</strong></span>
                  <button
                    type="button"
                    onClick={() => { setUsername('agus'); setPassword('password123'); }}
                    className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                  >
                    Isi Otomatis
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Akun</span>
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nama lengkap Anda..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Pilih username..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email aktif..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 6 karakter..."
                      className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar & Dapatkan Akses Premium</span>
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
