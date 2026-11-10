import React, { useState, useEffect } from 'react';
import { 
  FileEdit, 
  Trash2, 
  BookOpen, 
  Search, 
  Plus, 
  Calendar, 
  Save, 
  X,
  Sparkles,
  BookMarked
} from 'lucide-react';

export default function NotesView({ onSelectHadith, onSelectBook, books = [] }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState({
    id: null,
    hadithNumber: '',
    bookId: 1,
    title: '',
    content: ''
  });

  // Load notes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shahih_bukhari_notes');
      if (saved) {
        setNotes(JSON.parse(saved));
      } else {
        // Initial sample notes
        const initialNotes = [
          {
            id: 'note-1',
            hadithNumber: 1,
            bookId: 1,
            title: 'Pentingnya Keikhlasan Niat dalam Setiap Amal',
            content: 'Hadits pertama ini merupakan pondasi seluruh agama Islam. Imam Syafi\'i menyatakan hadits niat mencakup sepertiga ilmu. Sebelum memulai amal kebajikan atau menuntut ilmu, selalu luruskan niat semata karena Allah SWT.',
            date: '2026-11-08'
          },
          {
            id: 'note-2',
            hadithNumber: 42,
            bookId: 2,
            title: 'Tingkatan Iman dan Manisnya Iman',
            content: 'Tiga perkara yang apabila ada pada diri seseorang maka ia akan merasakan manisnya iman: mencintai Allah dan Rasul-Nya lebih dari segalanya, mencintai seseorang karena Allah, dan benci kembali kepada kekufuran.',
            date: '2026-11-09'
          }
        ];
        setNotes(initialNotes);
        localStorage.setItem('shahih_bukhari_notes', JSON.stringify(initialNotes));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!editingNote.title.trim() || !editingNote.content.trim()) return;

    let updated;
    const now = new Date().toISOString().split('T')[0];
    if (editingNote.id) {
      updated = notes.map((n) => (n.id === editingNote.id ? { ...editingNote, date: now } : n));
    } else {
      const newNote = {
        ...editingNote,
        id: 'note-' + Date.now(),
        date: now
      };
      updated = [newNote, ...notes];
    }

    setNotes(updated);
    try {
      localStorage.setItem('shahih_bukhari_notes', JSON.stringify(updated));
    } catch (e) {}

    setIsEditing(false);
    setEditingNote({ id: null, hadithNumber: '', bookId: 1, title: '', content: '' });
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('Hapus catatan ini?')) {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      try {
        localStorage.setItem('shahih_bukhari_notes', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const filteredNotes = notes.filter((n) => {
    const q = searchQuery.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      (n.hadithNumber && n.hadithNumber.toString().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-800 text-white p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-xs">
            <FileEdit className="w-3.5 h-3.5 text-amber-300" />
            <span>Fitur Premium • Buku Catatan Santri & Peneliti</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Catatan Belajar & Tadabbur Hadits
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 mt-2 leading-relaxed">
            Simpan faidah ilmiah, intisari syarah Fathul Baari, dan refleksi pribadi Anda pada setiap nomor hadits Shahih Bukhari. Catatan tersimpan aman di perangkat Anda.
          </p>
        </div>
      </div>

      {/* Control bar: Search + Add */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari catatan, topik, atau nomor hadits..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c1813] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>

        <button
          onClick={() => {
            setEditingNote({ id: null, hadithNumber: 1, bookId: 1, title: '', content: '' });
            setIsEditing(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Catatan Baru</span>
        </button>
      </div>

      {/* Note Edit Modal / Inline Form */}
      {isEditing && (
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c1813] border-2 border-indigo-400 dark:border-indigo-600 shadow-xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-indigo-600" />
              <span>{editingNote.id ? 'Edit Catatan Hadits' : 'Tulis Catatan Baru'}</span>
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSaveNote} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Nomor Hadits (1 - 7.563)
                </label>
                <input
                  type="number"
                  min="1"
                  max="7563"
                  value={editingNote.hadithNumber}
                  onChange={(e) => setEditingNote({ ...editingNote, hadithNumber: parseInt(e.target.value) || '' })}
                  placeholder="Contoh: 1"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Judul Catatan / Tema
                </label>
                <input
                  type="text"
                  required
                  value={editingNote.title}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  placeholder="Misal: Faidah Niat & Keikhlasan..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Isi Catatan / Tadabbur / Kutipan Syarah
              </label>
              <textarea
                required
                rows={5}
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                placeholder="Tuliskan intisari hadits, faedah fikih, atau catatan ustadz/kajian di sini..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Catatan</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#0c1813] rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
          <BookMarked className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {searchQuery ? 'Tidak ada catatan yang cocok' : 'Belum Ada Catatan Pribadi'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Gunakan tombol "Tulis Catatan Baru" di atas untuk menambahkan catatan faedah ilmiah dari hadits yang sedang Anda pelajari.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#0c1813] border border-gray-200/90 dark:border-gray-800 hover:border-indigo-400/60 shadow-sm transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  {note.hadithNumber ? (
                    <button
                      onClick={() => onSelectHadith(note.bookId || 1, note.hadithNumber)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-extrabold hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
                      title="Buka Hadits Ini di Pembaca"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-600" />
                      <span>HR. Bukhari No. {note.hadithNumber}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-gray-400">Catatan Umum</span>
                  )}

                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{note.date}</span>
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {note.title}
                </h4>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line line-clamp-5">
                  {note.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => {
                    setEditingNote(note);
                    setIsEditing(true);
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
