import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Compass, 
  BookOpen, 
  GraduationCap, 
  CheckCircle, 
  FileText,
  Sparkles
} from 'lucide-react';

export default function BiographyView({ onOpenLibrary, onStartReading }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-semibold mb-3">
          <GraduationCap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Kajian Ilmiah Ahli Hadits Kontemporer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Biografi Amirul Mukminin Fil Hadits & Manhaj Shahih Al-Bukhari
        </h1>
        <div className="font-arabic text-xl sm:text-2xl text-islamic-700 dark:text-emerald-400 font-bold mt-2">
          الإمام أبو عبد الله محمد بن إسماعيل بن إبراهيم البخاري الجعفي رحمه الله
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        
        {/* Card 1: Nasab dan Kelahiran */}
        <div className="rounded-2xl bg-white dark:bg-[#12221b] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-islamic-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-islamic-700 text-white text-xs flex items-center justify-center font-bold">1</span>
            <span>Nasab, Kelahiran, dan Masa Muda</span>
          </h2>
          <p className="mb-3">
            Beliau adalah <strong>Abu Abdillah Muhammad bin Ismail bin Ibrahim bin Al-Mughirah bin Bardizbah Al-Ju'fi Al-Bukhari</strong>. Beliau lahir pada hari Jum'at, 13 Syawwal 194 H di kota Bukhara (sekarang Uzbekistan). Kakek buyutnya, Bardizbah, dahulunya beragama Majusi, lalu putranya Al-Mughirah memeluk Islam di tangan gubernur Bukhara, Yaman Al-Ju'fi, sehingga nisbat "Al-Ju'fi" melekat sebagai <em>wala'</em> keislaman.
          </p>
          <p>
            Ayah beliau, Ismail bin Ibrahim, adalah seorang ulama hadits wara' murid dari Imam Malik bin Anas dan Hammad bin Zaid. Ketika ayahnya wafat, beliau dibesarkan oleh ibundanya yang shalihah dan dianugerahi kecerdasan serta daya ingat hafalan (<em>quwwat al-hifzh</em>) yang luar biasa sejak usia belia. Beliau telah menghafal Al-Qur'an dan puluhan ribu hadits sebelum usia baligh.
          </p>
        </div>

        {/* Card 2: Pengujian 100 Hadits di Baghdad */}
        <div className="rounded-2xl bg-white dark:bg-[#12221b] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-islamic-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-islamic-700 text-white text-xs flex items-center justify-center font-bold">2</span>
            <span>Ujian 100 Hadits Terbalik di Kota Baghdad</span>
          </h2>
          <p className="mb-3">
            Ketika reputasi keilmuan Imam Al-Bukhari tersohor di seantero negeri Islam, para ulama ahli hadits di Baghdad bersepakat untuk menguji ketajaman hafalan beliau. Mereka mengumpulkan <strong>100 hadits</strong>, lalu menukar sanad satu hadits ke matan hadits yang lain, dan sebaliknya, hingga semuanya campur aduk secara acak.
          </p>
          <p>
            Di hadapan majelis ulama yang sesak, sepuluh orang penguji membacakan satu per satu ke-100 hadits terbalik tersebut. Setiap kali dibacakan, Imam Al-Bukhari hanya menjawab dengan tenang: <em>"La a'rifuhu"</em> (Aku tidak mengetahuinya dengan lafazh dan sanad seperti itu). Setelah selesai, beliau bangkit dan mengembalikan satu per satu matan kepada sanad aslinya yang benar tanpa ada satu huruf pun yang meleset. Majelis Baghdad pun tunduk mengakui kedudukan beliau sebagai <strong>Amirul Mukminin fil Hadits</strong>.
          </p>
        </div>

        {/* Card 3: Syarat Keshahihan (Syurut Al-Bukhari) */}
        <div className="rounded-2xl bg-gradient-to-br from-islamic-900 to-islamic-950 text-white p-6 sm:p-8 shadow-md border border-islamic-700">
          <h2 className="text-xl font-bold text-gold-300 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>5 Syarat Mutlak Keshahihan Hadits Imam Al-Bukhari</span>
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mb-4">
            Imam Al-Bukhari menetapkan standar keshahihan paling ketat dalam sejarah periwayatan Islam, melebihi ulama lainnya:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-islamic-800/80 border border-islamic-600">
              <div className="font-bold text-emerald-300 mb-1">1. Ittishal As-Sanad (Sanad Bersambung)</div>
              <p className="text-gray-300">
                Setiap perawi harus benar-benar mendengar langsung dari gurunya dari awal hingga Rasulullah ﷺ. Imam Al-Bukhari mensyaratkan <strong>Al-Liqa' wal Mu'asharah</strong> (bukti pasti bertemunya murid dan guru), bukan sekadar hidup sezaman (<em>mu'asharah</em>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-islamic-800/80 border border-islamic-600">
              <div className="font-bold text-emerald-300 mb-1">2. 'Adalah Ar-Ruwat (Integritas Perawi)</div>
              <p className="text-gray-300">
                Semua perawi dalam sanad harus muslim, baligh, berakal, bertaqwa, menjauhi dosa besar dan bid'ah, serta memelihara <em>muru'ah</em> (kehormatan diri).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-islamic-800/80 border border-islamic-600">
              <div className="font-bold text-emerald-300 mb-1">3. Dhabth At-Tamm (Kekuatan Hafalan Sempurna)</div>
              <p className="text-gray-300">
                Perawi memiliki ingatan yang sangat kokoh (<em>dhabth shadr</em>) atau ketelitian catatan naskah yang terjaga (<em>dhabth kitab</em>) tanpa kekeliruan fatal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-islamic-800/80 border border-islamic-600">
              <div className="font-bold text-emerald-300 mb-1">4. Salamah min Asy-Syudzudz (Bebas dari Kejanggalan)</div>
              <p className="text-gray-300">
                Riwayat perawi terpercaya (tsiqah) tidak bertentangan dengan riwayat perawi lain yang lebih tsiqah atau jama'ah perawi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-islamic-800/80 border border-islamic-600 md:col-span-2">
              <div className="font-bold text-emerald-300 mb-1">5. Salamah min Al-'Illah Al-Qadihah (Bebas dari Cacat Tersembunyi)</div>
              <p className="text-gray-300">
                Hadits bersih dari cacat halus yang hanya dapat disingkap oleh para pakar hadits yang sangat mendalam (<em>'ilal al-hadits</em>).
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Tata Cara Penulisan & Adab Ruhani */}
        <div className="rounded-2xl bg-white dark:bg-[#12221b] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-islamic-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-islamic-700 text-white text-xs flex items-center justify-center font-bold">3</span>
            <span>Adab Ruhani: Shalat Istikharah di Raudhah Nabi ﷺ</span>
          </h2>
          <p className="mb-3">
            Imam Al-Bukhari menyusun kitab Shahih ini selama <strong>16 tahun</strong> dari saringan sekitar <strong>600.000 hadits</strong> yang beliau hafal. Beliau menuturkan:
          </p>
          <blockquote className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-600 text-amber-950 dark:text-amber-200 italic my-3 font-serif">
            "Tidaklah aku mencantumkan satu hadits pun ke dalam kitab Al-Jami' ini melainkan aku telah mandi terlebih dahulu dan mendirikan shalat sunnah dua rakaat (istikharah) memohon petunjuk kepada Allah Ta'ala."
          </blockquote>
          <p>
            Sebagian besar kitab ini disusun dan dirampungkan di depan makam mulia Rasulullah ﷺ dan Raudhah Syarifah di Masjid Nabawi Madinah Al-Munawwarah.
          </p>
        </div>

        {/* Card 5: Integrasi Syarah Fathul Baari */}
        <div className="rounded-2xl bg-white dark:bg-[#12221b] border border-gold-300 dark:border-gold-800 p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-xl font-bold text-gold-900 dark:text-gold-300 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gold-600" />
              <span>Syarah Teragung: Fathul Baari (36 Jilid Lengkap)</span>
            </h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold-100 dark:bg-gold-950 text-gold-800 dark:text-gold-300 border border-gold-300 dark:border-gold-800">
              36 Jilid PDF di Google Drive
            </span>
          </div>

          <p className="mb-3">
            Kitab syarah paling berbobot dan menjadi rujukan utama seluruh umat Islam adalah <strong>Fathul Baari bi Syarhi Shahihil Bukhari</strong> karya <em>Syaikhul Islam Al-Hafizh Ibnu Hajar Al-’Asqalani</em> (wafat 852 H). Beliau menghabiskan waktu lebih dari 25 tahun untuk merampungkan mahakarya ini.
          </p>
          <p className="mb-4">
            Para ulama dahulu mengatakan pepatah mashur: <em>"La hijrata ba'dal Fath"</em> (Tidak ada lagi kewajiban hijrah setelah penaklukan Makkah, yang dianalogikan: Tidak ada lagi kebutuhan mencari syarah hadits lain setelah terbitnya Fathul Baari karya Ibnu Hajar).
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenLibrary}
              className="px-4 py-2 rounded-xl bg-gold-600 hover:bg-gold-700 text-black font-bold text-xs shadow transition"
            >
              Buka Koleksi Maktabah 36 Jilid PDF
            </button>
            <button
              onClick={() => onStartReading(1)}
              className="px-4 py-2 rounded-xl bg-islamic-700 hover:bg-islamic-800 text-white font-semibold text-xs shadow transition"
            >
              Mulai Membaca Hadits Shahih Bukhari
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
