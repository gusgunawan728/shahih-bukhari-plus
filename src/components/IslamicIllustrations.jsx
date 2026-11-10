import React from 'react';

// 1. Masjid Nabawi / Mosque Minaret & Dome
export function MosqueIllustration({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="domeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#skyGrad)" rx="16" />
      {/* Stars & Crescent */}
      <circle cx="80" cy="50" r="1.5" fill="#fef08a" opacity="0.8" />
      <circle cx="140" cy="40" r="2" fill="#fef08a" opacity="0.9" />
      <circle cx="280" cy="45" r="1.5" fill="#fef08a" opacity="0.7" />
      <circle cx="330" cy="65" r="2" fill="#fef08a" opacity="0.8" />
      {/* Crescent */}
      <path d="M310 35 A12 12 0 1 0 318 55 A10 10 0 1 1 310 35 Z" fill="#fef08a" />
      {/* Mosque Base Silhouette */}
      <path d="M40 240 L40 180 Q60 170 80 180 L80 240 Z" fill="#022c22" opacity="0.6" />
      <path d="M320 240 L320 180 Q340 170 360 180 L360 240 Z" fill="#022c22" opacity="0.6" />
      {/* Minarets */}
      <path d="M65 240 L65 110 L75 90 L85 110 L85 240 Z" fill="#10b981" opacity="0.3" />
      <path d="M315 240 L315 110 L325 90 L335 110 L335 240 Z" fill="#10b981" opacity="0.3" />
      {/* Main Dome */}
      <path d="M130 240 L130 170 C130 110 270 110 270 170 L270 240 Z" fill="url(#domeGrad)" />
      {/* Crescent on top of Dome */}
      <path d="M198 96 L202 96 L202 112 L198 112 Z" fill="#fef08a" />
      <circle cx="200" cy="94" r="5" fill="#fef08a" />
      {/* Windows & Arches */}
      <path d="M180 240 L180 200 Q200 185 220 200 L220 240 Z" fill="#064e3b" />
      <path d="M150 215 Q160 205 170 215 L170 240 L150 240 Z" fill="#064e3b" opacity="0.7" />
      <path d="M230 215 Q240 205 250 215 L250 240 L230 240 Z" fill="#064e3b" opacity="0.7" />
    </svg>
  );
}

// 2. Al-Qur'an & Rehal (Holy Book & Stand)
export function QuranIllustration({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="quranBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#quranBg)" rx="16" />
      {/* Soft Glow */}
      <circle cx="200" cy="110" r="70" fill="#38bdf8" opacity="0.15" />
      {/* Rehal (Stand) */}
      <path d="M140 200 L260 140 M260 200 L140 140" stroke="#b45309" strokeWidth="12" strokeLinecap="round" />
      {/* Open Book Left Page */}
      <path d="M200 135 C170 120 130 120 100 135 L100 85 C130 70 170 70 200 85 Z" fill="#fffbeb" />
      <path d="M200 135 C170 120 130 120 100 135 L96 138 L96 88 L100 85 Z" fill="#d97706" />
      {/* Open Book Right Page */}
      <path d="M200 135 C230 120 270 120 300 135 L300 85 C270 70 230 70 200 85 Z" fill="#fffbeb" />
      <path d="M200 135 C230 120 270 120 300 135 L304 138 L304 88 L300 85 Z" fill="#d97706" />
      {/* Gold Rosette Center Bookmark */}
      <circle cx="200" cy="85" r="7" fill="#f59e0b" />
      <path d="M198 85 L202 85 L203 145 L197 145 Z" fill="#f59e0b" />
      {/* Text lines */}
      <line x1="120" y1="95" x2="180" y2="95" stroke="#92400e" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="120" y1="105" x2="180" y2="105" stroke="#92400e" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="120" y1="115" x2="180" y2="115" stroke="#92400e" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="220" y1="95" x2="280" y2="95" stroke="#92400e" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="220" y1="105" x2="280" y2="105" stroke="#92400e" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="220" y1="115" x2="280" y2="115" stroke="#92400e" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}

// 3. Ka'bah / Makkah & Hajj
export function KaabaIllustration({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="kaabaBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#kaabaBg)" rx="16" />
      {/* Golden Rays */}
      <circle cx="200" cy="120" r="90" fill="#f59e0b" opacity="0.1" />
      {/* Ka'bah Cube */}
      <path d="M150 90 L200 65 L250 90 L250 170 L200 195 L150 170 Z" fill="#18181b" />
      <path d="M200 65 L250 90 L250 170 L200 195 Z" fill="#27272a" />
      {/* Kiswah Gold Belt */}
      <path d="M150 110 L200 85 L250 110 L250 120 L200 95 L150 120 Z" fill="#fbbf24" />
      {/* Door of Ka'bah (Babut Taubah) */}
      <rect x="215" y="115" width="20" height="45" fill="#f59e0b" rx="2" />
      {/* Tawaf Rings */}
      <ellipse cx="200" cy="205" rx="120" ry="25" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
      <ellipse cx="200" cy="215" rx="160" ry="30" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
    </svg>
  );
}

// 4. Hadith Scroll & Ink Pen (Pena Hadits & Naskah)
export function ScrollIllustration({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="scrollBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#scrollBg)" rx="16" />
      {/* Parchment Scroll */}
      <rect x="110" y="50" width="180" height="140" rx="8" fill="#fef3c7" />
      <path d="M100 50 Q110 40 120 50 L120 190 Q110 200 100 190 Z" fill="#fde68a" />
      <path d="M280 50 Q290 40 300 50 L300 190 Q290 200 280 190 Z" fill="#fde68a" />
      {/* Calligraphy Lines on Parchment */}
      <line x1="135" y1="75" x2="265" y2="75" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      <line x1="135" y1="95" x2="265" y2="95" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" />
      <line x1="135" y1="110" x2="265" y2="110" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" />
      <line x1="135" y1="125" x2="265" y2="125" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" />
      <line x1="135" y1="140" x2="220" y2="140" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" />
      {/* Red Scholar Seal */}
      <circle cx="250" cy="155" r="14" fill="#b91c1c" />
      <circle cx="250" cy="155" r="11" stroke="#fca5a5" strokeWidth="1.5" />
      {/* Feather Quill / Pen */}
      <path d="M220 180 Q270 120 310 40 Q290 90 280 120 Z" fill="#fbbf24" opacity="0.9" />
    </svg>
  );
}

// 5. Scales of Justice / Muamalah & Ahkam (Timbangan Hukum Syariat)
export function ScalesIllustration({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="scalesBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#scalesBg)" rx="16" />
      {/* Center Pillar */}
      <path d="M196 60 L204 60 L204 185 L196 185 Z" fill="#f59e0b" />
      <rect x="175" y="185" width="50" height="12" rx="3" fill="#d97706" />
      <circle cx="200" cy="55" r="8" fill="#f59e0b" />
      {/* Balance Beam */}
      <line x1="130" y1="75" x2="270" y2="75" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
      {/* Left Plate */}
      <line x1="135" y1="78" x2="115" y2="125" stroke="#fde68a" strokeWidth="1.5" />
      <line x1="135" y1="78" x2="155" y2="125" stroke="#fde68a" strokeWidth="1.5" />
      <path d="M110 125 Q135 145 160 125 Z" fill="#f59e0b" />
      {/* Right Plate */}
      <line x1="265" y1="78" x2="245" y2="125" stroke="#fde68a" strokeWidth="1.5" />
      <line x1="265" y1="78" x2="285" y2="125" stroke="#fde68a" strokeWidth="1.5" />
      <path d="M240 125 Q265 145 290 125 Z" fill="#f59e0b" />
    </svg>
  );
}

// 6. Dua & Heart / Adab & Tazkiyah (Doa & Pelelembut Hati)
export function DuaIllustration({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="duaBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#be123c" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#duaBg)" rx="16" />
      {/* Soft Glow */}
      <circle cx="200" cy="100" r="60" fill="#f43f5e" opacity="0.25" />
      {/* Lantern / Fanous */}
      <path d="M190 40 L210 40 L215 55 L185 55 Z" fill="#f59e0b" />
      <path d="M185 55 L215 55 L220 95 L180 95 Z" fill="#fef08a" opacity="0.8" />
      <path d="M180 95 L220 95 L200 115 Z" fill="#f59e0b" />
      <circle cx="200" cy="75" r="8" fill="#f97316" />
      {/* Dua Open Hands Silhouette */}
      <path d="M160 180 C150 150 165 130 185 145 C190 148 195 158 198 165 C198 175 190 190 175 190 Z" fill="#fff1f2" opacity="0.9" />
      <path d="M240 180 C250 150 235 130 215 145 C210 148 205 158 202 165 C202 175 210 190 225 190 Z" fill="#fff1f2" opacity="0.9" />
    </svg>
  );
}

// Helper to choose illustration based on book id / category
export function getKitabIllustration(bookId, category) {
  if (category === 'aqidah' || bookId === 1 || bookId === 2 || bookId === 97) {
    return MosqueIllustration;
  }
  if (category === 'quran' || bookId === 65 || bookId === 66 || bookId === 3) {
    return QuranIllustration;
  }
  if (bookId >= 25 && bookId <= 29) {
    return KaabaIllustration;
  }
  if (category === 'muamalah' || category === 'hukum') {
    return ScalesIllustration;
  }
  if (category === 'adab' || bookId >= 80 && bookId <= 81) {
    return DuaIllustration;
  }
  return ScrollIllustration;
}
