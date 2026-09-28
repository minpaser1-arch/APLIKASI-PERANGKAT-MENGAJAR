import React, { useState } from 'react';
import { MapelMI, KelasMI, RefleksiGuru } from '../types/curriculum';
import { MAPEL_MI_LIST } from '../data/curriculumData';
import { FileText, Heart, Plus, Sparkles, Printer, CheckCircle, HelpCircle } from 'lucide-react';

interface SavedReflection {
  id: string;
  tanggal: string;
  namaGuru: string;
  mapel: MapelMI;
  kelas: KelasMI;
  topik: string;
  refleksi: RefleksiGuru;
}

const INITIAL_REFLECTIONS: SavedReflection[] = [
  {
    id: 'r1',
    tanggal: '28 Sep 2026',
    namaGuru: 'Ustadzah Siti Rahmah, S.Pd.I',
    mapel: 'Matematika',
    kelas: 'Kelas 4',
    topik: 'Operasi Perkalian Bilangan Cacah',
    refleksi: {
      bagianMenyentuhHati: 'Saat Ananda Fatih dengan sabar dan tersenyum menuntun Ananda Dimas mengelompokkan kancing tanpa ada nada mengejek sedikitpun.',
      bagianPerluPerbaikan: 'Manajemen waktu saat fase elaborasi perlu dijaga agar setiap anak sempat menuliskan kalimat refleksi batin di buku hariannya.',
      tindakLanjut: 'Memberi pengayaan soal berbasis cerita nyata madrasah dan menyediakan wadah manipulatif yang lebih mudah dijangkau meja siswa.',
      refleksiBatin: 'Apakah saya menjadi teladan kasih hari ini? — Ya, saya telah menyapa dengan senyum tulus, tidak memarahi siswa yang lambat berhitung, dan menuntun mereka dengan kesabaran.',
    },
  },
  {
    id: 'r2',
    tanggal: '27 Sep 2026',
    namaGuru: 'Ustadz Ahmad Fauzi, S.Pd',
    mapel: 'Akidah Akhlak',
    kelas: 'Kelas 1',
    topik: 'Asmaul Husna: Ar-Rahman dan Ar-Rahim',
    refleksi: {
      bagianMenyentuhHati: 'Melihat anak-anak kelas 1 tersenyum gembira saat bercermin dan berani saling memuji sahabatnya dengan kata-kata lembut.',
      bagianPerluPerbaikan: 'Cerita dongeng boneka tangan sebaiknya dipersingkat menjadi 7 menit agar siswa tidak mulai gelisah.',
      tindakLanjut: 'Membuat pojok ekspresi kasih di mana siswa dapat menempelkan origami hati setiap kali berbuat kebaikan.',
      refleksiBatin: 'Apakah saya menjadi teladan kasih hari ini? — Saya telah mendengarkan celoteh setiap anak dengan penuh perhatian tanpa memotong pembicaraan mereka dengan nada tergesa-gesa.',
    },
  },
];

export const TeacherReflectionTab: React.FC = () => {
  const [reflections, setReflections] = useState<SavedReflection[]>(INITIAL_REFLECTIONS);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [namaGuru, setNamaGuru] = useState('Pendidik MI Berbasis Cinta');
  const [mapel, setMapel] = useState<MapelMI>('Matematika');
  const [kelas, setKelas] = useState<KelasMI>('Kelas 4');
  const [topik, setTopik] = useState('');
  const [bagianMenyentuhHati, setBagianMenyentuhHati] = useState('');
  const [bagianPerluPerbaikan, setBagianPerluPerbaikan] = useState('');
  const [tindakLanjut, setTindakLanjut] = useState('');
  const [refleksiBatin, setRefleksiBatin] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topik || !bagianMenyentuhHati) return;

    const newRefl: SavedReflection = {
      id: `ref-${Date.now()}`,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      namaGuru: namaGuru || 'Pendidik MI Teladan Kasih',
      mapel,
      kelas,
      topik,
      refleksi: {
        bagianMenyentuhHati,
        bagianPerluPerbaikan: bagianPerluPerbaikan || 'Perlu menjaga ketepatan durasi antar-tahap pembelajaran.',
        tindakLanjut: tindakLanjut || 'Mempersiapkan media manipulatif yang lebih variatif untuk pertemuan berikutnya.',
        refleksiBatin:
          refleksiBatin ||
          'Ya Allah, jadikanlah hamba teladan yang teduh, sabar, dan penuh kasih sayang bagi anak-anak didik hamba setiap saat.',
      },
    };

    setReflections([newRefl, ...reflections]);
    setTopik('');
    setBagianMenyentuhHati('');
    setBagianPerluPerbaikan('');
    setTindakLanjut('');
    setRefleksiBatin('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-linear-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full text-xs border border-emerald-500/30">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
            <span>Kewajiban Pedagogis MI-KBC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Jurnal Refleksi Harian Guru (Langkah 7)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            "Guru sebagai teladan iman, ilmu, dan kasih sebelum menjadi pengajar." Refleksi wajib di akhir setiap kegiatan pembelajaran untuk merawat keikhlasan batin dan komitmen keteladanan.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Refleksi Pembelajaran Hari Ini</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs border border-slate-700 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Jurnal Refleksi</span>
          </button>
        </div>
      </div>

      {/* 4 Pilar Refleksi Guide Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h4 className="font-bold text-slate-900 text-sm mb-3 font-serif">
          Struktur 4 Poin Wajib Refleksi Guru MI-KBC:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
            <span className="font-bold text-emerald-900 block mb-1">
              ✅ Bagian Menyentuh Hati:
            </span>
            <p className="text-slate-700 leading-snug">
              Momen konkret saat murid menunjukkan empati, antusiasme, rasa takjub, atau pertolongan sesama.
            </p>
          </div>

          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
            <span className="font-bold text-amber-900 block mb-1">
              ⚠️ Bagian Perlu Perbaikan:
            </span>
            <p className="text-slate-700 leading-snug">
              Kendala waktu, miskonsepsi materi, atau reaksi murid yang memerlukan penyesuaian pendekatan guru.
            </p>
          </div>

          <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200">
            <span className="font-bold text-blue-900 block mb-1">
              💡 Tindak Lanjut:
            </span>
            <p className="text-slate-700 leading-snug">
              Langkah praktis yang akan dilakukan pada pertemuan berikutnya untuk merawat pemahaman dan adab.
            </p>
          </div>

          <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-200">
            <span className="font-bold text-rose-900 block mb-1">
              ❤️ Refleksi Batin Teladan:
            </span>
            <p className="text-slate-700 leading-snug">
              Pertanyaan jujur pada nurani: <em>"Apakah saya menjadi teladan kasih hari ini bagi anak-anak titipan Allah?"</em>
            </p>
          </div>
        </div>
      </div>

      {/* Form Input */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl border-2 border-emerald-500 p-5 sm:p-7 shadow-md space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Entri Baru Jurnal Refleksi Teladan</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Pendidik:</label>
              <input
                type="text"
                value={namaGuru}
                onChange={(e) => setNamaGuru(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran:</label>
              <select
                value={mapel}
                onChange={(e) => setMapel(e.target.value as MapelMI)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              >
                {MAPEL_MI_LIST.map((m) => (
                  <option key={m.id} value={m.id}>{m.id}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kelas:</label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value as KelasMI)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              >
                <option value="Kelas 1">Kelas 1</option>
                <option value="Kelas 2">Kelas 2</option>
                <option value="Kelas 3">Kelas 3</option>
                <option value="Kelas 4">Kelas 4</option>
                <option value="Kelas 5">Kelas 5</option>
                <option value="Kelas 6">Kelas 6</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Topik / Materi Pokok:</label>
              <input
                type="text"
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                placeholder="Contoh: Perkalian Bilangan Cacah"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="block font-bold text-emerald-900 mb-1">
                ✅ Bagian yang menyentuh hati siswa: <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={bagianMenyentuhHati}
                onChange={(e) => setBagianMenyentuhHati(e.target.value)}
                placeholder="Ceritakan momen di mana kasih sayang, antusiasme, atau ketulusan siswa terpancar nyata..."
                rows={2}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-bold text-amber-900 mb-1">
                ⚠️ Bagian perlu perbaikan:
              </label>
              <textarea
                value={bagianPerluPerbaikan}
                onChange={(e) => setBagianPerluPerbaikan(e.target.value)}
                placeholder="Apa yang belum berjalan mulus? (Durasi, media, kejelasan instruksi, pengelolaan emosi)..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-bold text-blue-900 mb-1">
                💡 Tindak lanjut:
              </label>
              <textarea
                value={tindakLanjut}
                onChange={(e) => setTindakLanjut(e.target.value)}
                placeholder="Rencana konkret perbaikan pada pembelajaran berikutnya..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-bold text-rose-900 mb-1">
                ❤️ Refleksi batin: Apakah saya menjadi teladan kasih hari ini?
              </label>
              <textarea
                value={refleksiBatin}
                onChange={(e) => setRefleksiBatin(e.target.value)}
                placeholder="Perenungan nurani guru terhadap kesabaran, senyuman, tutur kata, dan keikhlasan hari ini..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-serif italic"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            Simpan Jurnal Refleksi Harian
          </button>
        </form>
      )}

      {/* List of Reflections */}
      <div className="space-y-4">
        {reflections.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {item.mapel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {item.kelas} • Topik: <strong>{item.topik}</strong>
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1 font-serif">
                  {item.namaGuru}
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
                {item.tanggal}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-900 block mb-1">
                  ✅ Bagian yang menyentuh hati siswa:
                </span>
                <p className="text-slate-700 leading-relaxed">{item.refleksi.bagianMenyentuhHati}</p>
              </div>

              <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-900 block mb-1">
                  ⚠️ Bagian perlu perbaikan:
                </span>
                <p className="text-slate-700 leading-relaxed">{item.refleksi.bagianPerluPerbaikan}</p>
              </div>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                <span className="font-bold text-blue-900 block mb-1">
                  💡 Tindak lanjut:
                </span>
                <p className="text-slate-700 leading-relaxed">{item.refleksi.tindakLanjut}</p>
              </div>

              <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-100">
                <span className="font-bold text-rose-900 block mb-1">
                  ❤️ Refleksi batin keteladanan:
                </span>
                <p className="text-slate-800 font-serif italic leading-relaxed">
                  "{item.refleksi.refleksiBatin}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
