import React, { useState } from 'react';
import { PenilaianSiswaIndividual, MapelMI, KelasMI, CabangKasih } from '../types/curriculum';
import { MAPEL_MI_LIST, CABANG_KASIH_LIST } from '../data/curriculumData';
import { Award, Heart, Sparkles, UserCheck, MessageSquare, Printer, Check, Plus, AlertCircle } from 'lucide-react';

const INITIAL_STUDENT_PROGRESS: PenilaianSiswaIndividual[] = [
  {
    id: 's1',
    namaSiswa: 'Muhammad Fatih',
    kelas: 'Kelas 4',
    mapel: 'Matematika',
    capaianAkademik: {
      skorKemajuan: 'Sangat Berkembang',
      catatanKemajuan: 'Minggu lalu masih ragu dalam perkalian 7 dan 8, hari ini sudah sangat lancar dan mandiri menyelesaikan soal cerita.',
    },
    capaianAkhlak: {
      sikapMenonjol: 'Sangat teliti dan sabar',
      perkembangan: 'Tidak terburu-buru mengumpulkan tugas, selalu memeriksa kembali perhitungannya dengan tenang.',
    },
    capaianKBC: {
      cabangDominan: 'Cinta Sesama',
      tindakanTeramati: 'Dengan penuh kesabaran membimbing teman sebangkunya yang sedang kesulitan memahami tabel perkalian.',
    },
    umpanBalikKasih: 'Fatih, usahamu belajar berhitung sangat tekun dan sungguh membanggakan. Cara kamu membimbing temanmu dengan senyuman tulus adalah akhlak mulia yang dicintai Allah. Teruslah rendah hati dan bersemangat, bapak/ibu guru yakin kamu akan terus tumbuh menjadi anak shalih yang hebat!',
  },
  {
    id: 's2',
    namaSiswa: 'Aisyah Humaira',
    kelas: 'Kelas 4',
    mapel: 'IPAS',
    capaianAkademik: {
      skorKemajuan: 'Berkembang Sesuai Harapan',
      catatanKemajuan: 'Mampu menjelaskan fungsi daun dan akar dengan kalimat sendiri yang runtut dan jelas.',
    },
    capaianAkhlak: {
      sikapMenonjol: 'Santun dan tertib',
      perkembangan: 'Selalu mengangkat tangan dengan sopan saat ingin bertanya atau memberi tanggapan.',
    },
    capaianKBC: {
      cabangDominan: 'Cinta Alam',
      tindakanTeramati: 'Mengambil inisiatif menyiram tanaman bunga madrasah tanpa disuruh dan mengajak temannya merawat kebun.',
    },
    umpanBalikKasih: 'Aisyah sayang, penjelasanmu tentang bagian tanaman sangat runtut dan mudah dipahami. Kepedulianmu merawat tanaman madrasah menunjukkan hatimu yang lembut dan penuh cinta pada alam ciptaan Allah. Bagian fotosintesis bisa kita ulas kembali pelan-pelan ya nak, kamu pasti bisa menguasainya dengan sempurna!',
  },
];

export const AssessmentTab: React.FC = () => {
  const [students, setStudents] = useState<PenilaianSiswaIndividual[]>(INITIAL_STUDENT_PROGRESS);
  const [isAdding, setIsAdding] = useState(false);

  // Form for single student progress
  const [namaSiswa, setNamaSiswa] = useState('');
  const [kelas, setKelas] = useState<KelasMI>('Kelas 4');
  const [mapel, setMapel] = useState<MapelMI>('Matematika');
  const [skorKemajuan, setSkorKemajuan] = useState<'Memerlukan Bimbingan' | 'Berkembang Sesuai Harapan' | 'Sangat Berkembang'>('Berkembang Sesuai Harapan');
  const [catatanKemajuan, setCatatanKemajuan] = useState('');
  const [sikapMenonjol, setSikapMenonjol] = useState('');
  const [cabangDominan, setCabangDominan] = useState<CabangKasih>('Cinta Sesama');
  const [tindakanTeramati, setTindakanTeramati] = useState('');
  const [halPerluPerbaikan, setHalPerluPerbaikan] = useState('');

  // Generated feedback state
  const [generatedFeedback, setGeneratedFeedback] = useState('');

  const generateFeedbackNote = (nama: string, usaha: string, perbaikan: string, cabang: CabangKasih) => {
    return `${nama}, kamu sudah berusaha dengan sungguh-sungguh dan menunjukkan ketekunan yang sangat membanggakan dalam pembelajaran ini. Kebaikanmu mengamalkan nilai ${cabang} sungguh menyejukkan hati seluruh kelas. Bagian ${perbaikan || 'yang belum kamu kuasai'} bisa kita pelajari dan perbaiki pelan-pelan bersama guru dan sahabatmu — bapak/ibu guru sangat yakin kamu pasti mampu berkembang menjadi lebih hebat lagi!`;
  };

  const handleQuickGenerateFeedback = () => {
    const fb = generateFeedbackNote(
      namaSiswa || 'Ananda',
      catatanKemajuan || 'belajar dengan tekun',
      halPerluPerbaikan || 'perhitungan bertingkat',
      cabangDominan
    );
    setGeneratedFeedback(fb);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaSiswa) return;

    const feedback =
      generatedFeedback ||
      generateFeedbackNote(namaSiswa, catatanKemajuan, halPerluPerbaikan, cabangDominan);

    const newStudent: PenilaianSiswaIndividual = {
      id: `s-${Date.now()}`,
      namaSiswa,
      kelas,
      mapel,
      capaianAkademik: {
        skorKemajuan,
        catatanKemajuan: catatanKemajuan || 'Menunjukkan perkembangan positif dibanding pekan lalu.',
      },
      capaianAkhlak: {
        sikapMenonjol: sikapMenonjol || 'Santun dan jujur dalam proses belajar',
        perkembangan: 'Terus menunjukkan keterbukaan menerima saran.',
      },
      capaianKBC: {
        cabangDominan,
        tindakanTeramati: tindakanTeramati || 'Aktif membantu teman dan menjaga ketertiban kelas.',
      },
      umpanBalikKasih: feedback,
    };

    setStudents([newStudent, ...students]);
    setNamaSiswa('');
    setCatatanKemajuan('');
    setHalPerluPerbaikan('');
    setGeneratedFeedback('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-linear-to-r from-teal-800 to-emerald-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-2.5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-400 text-teal-950 font-bold px-3 py-1 rounded-full text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Asesmen Terpadu 3 Lapis Kurikulum MI-KBC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Penilaian Terpadu & Umpan Balik Menguatkan
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
            Menilai secara berimbang 3 aspek: 📝 Akademik, 💚 Sikap & Akhlak, dan 💛 Pertumbuhan Nilai Kasih (KBC). Mengharamkan perlombaan peringkat angka, mengedepankan evaluasi diri berkelanjutan (self-referenced growth).
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Rekam Kemajuan Siswa Baru</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-teal-700/80 hover:bg-teal-700 text-teal-100 font-semibold px-4 py-2 rounded-xl text-xs border border-teal-500/40 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rekap Penilaian</span>
          </button>
        </div>
      </div>

      {/* Golden Principles Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="p-1 rounded bg-rose-100 text-rose-700">🚫</span>
            <span>Aturan 1: Tanpa Ranking</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Tidak ada peringkat 1, 2, 3 di depan umum. Mencegah rasa rendah diri, sombong, atau kecemasan akademis pada anak MI.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="p-1 rounded bg-emerald-100 text-emerald-700">🌱</span>
            <span>Aturan 2: Self-Growth</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Bandingkan kemajuan siswa hanya dengan dirinya sendiri di masa lalu (misal: "Kemarin masih terbata-bata, hari ini sudah percaya diri").
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="p-1 rounded bg-amber-100 text-amber-700">💌</span>
            <span>Aturan 3: 3 Elemen Umpan Balik</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Wajib memuat: <strong>Penguatan usaha</strong> + <strong>Arah perbaikan santun</strong> + <strong>Keyakinan guru anak mampu</strong>.
          </p>
        </div>
      </div>

      {/* Add Progress Record Modal / Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border-2 border-emerald-400 p-5 sm:p-7 shadow-md space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Instrumen Catatan Kemajuan Mandiri Siswa</span>
              </h3>
              <p className="text-xs text-slate-500">
                Pencatatan perkembangan diri siswa tanpa perbandingan antarsiswa.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Siswa:</label>
              <input
                type="text"
                value={namaSiswa}
                onChange={(e) => setNamaSiswa(e.target.value)}
                placeholder="Contoh: Muhammad Fatih"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs">
            {/* Lapis 1: Akademik */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">📝 1. Capaian Akademik (TP)</span>
              <div>
                <label className="text-[11px] text-slate-500 block">Kategori Pertumbuhan Diri:</label>
                <select
                  value={skorKemajuan}
                  onChange={(e) => setSkorKemajuan(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 mt-0.5"
                >
                  <option value="Memerlukan Bimbingan">Memerlukan Bimbingan Lembut</option>
                  <option value="Berkembang Sesuai Harapan">Berkembang Sesuai Harapan</option>
                  <option value="Sangat Berkembang">Sangat Berkembang</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block">Catatan Kemajuan Pribadi (vs masa lalu):</label>
                <textarea
                  value={catatanKemajuan}
                  onChange={(e) => setCatatanKemajuan(e.target.value)}
                  placeholder="Bandingkan dengan kemampuan siswa minggu lalu..."
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 mt-0.5"
                />
              </div>
            </div>

            {/* Lapis 2: Sikap & Akhlak */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-emerald-900 block text-xs">💚 2. Sikap & Akhlak Mulia</span>
              <div>
                <label className="text-[11px] text-slate-500 block">Sikap Menonjol:</label>
                <input
                  type="text"
                  value={sikapMenonjol}
                  onChange={(e) => setSikapMenonjol(e.target.value)}
                  placeholder="Misal: Teliti, jujur, sopan..."
                  className="w-full bg-white border border-slate-300 rounded p-1.5 mt-0.5"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block">Area yang Perlu Dikuatkan Perlahan:</label>
                <input
                  type="text"
                  value={halPerluPerbaikan}
                  onChange={(e) => setHalPerluPerbaikan(e.target.value)}
                  placeholder="Misal: Percaya diri saat maju ke depan..."
                  className="w-full bg-white border border-slate-300 rounded p-1.5 mt-0.5"
                />
              </div>
            </div>

            {/* Lapis 3: KBC */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-amber-900 block text-xs">💛 3. Nilai Kasih (KBC)</span>
              <div>
                <label className="text-[11px] text-slate-500 block">Cabang Kasih Dominan:</label>
                <select
                  value={cabangDominan}
                  onChange={(e) => setCabangDominan(e.target.value as CabangKasih)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 mt-0.5"
                >
                  {CABANG_KASIH_LIST.map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block">Tindakan Kasih Teramati:</label>
                <input
                  type="text"
                  value={tindakanTeramati}
                  onChange={(e) => setTindakanTeramati(e.target.value)}
                  placeholder="Misal: Membantu teman yang kesulitan..."
                  className="w-full bg-white border border-slate-300 rounded p-1.5 mt-0.5"
                />
              </div>
            </div>
          </div>

          {/* Generator Umpan Balik Kasih */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
                Generator Narasi Umpan Balik Menguatkan (Standar MI-KBC)
              </span>
              <button
                type="button"
                onClick={handleQuickGenerateFeedback}
                className="text-[11px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 hover:bg-emerald-100 transition cursor-pointer"
              >
                Susun Narasi Otomatis
              </button>
            </div>
            <textarea
              value={generatedFeedback}
              onChange={(e) => setGeneratedFeedback(e.target.value)}
              placeholder="Klik 'Susun Narasi Otomatis' atau tulis kalimat penguatan yang menyentuh hati siswa..."
              rows={3}
              className="w-full bg-white border border-emerald-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            Simpan Catatan Kemajuan Siswa
          </button>
        </form>
      )}

      {/* Student Records List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-700" />
          <span>Rekap Evaluasi Diri Siswa (Self-Referenced Growth Tracker)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 font-serif">
                    {st.namaSiswa}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {st.kelas} • Mapel: <strong className="text-slate-700">{st.mapel}</strong>
                  </p>
                </div>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                  {st.capaianAkademik.skorKemajuan}
                </span>
              </div>

              {/* 3 Lapis Summary */}
              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-700 block text-[11px]">📝 Kemajuan Akademik Pribadi:</span>
                  <p className="text-slate-600 mt-0.5">{st.capaianAkademik.catatanKemajuan}</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-bold text-emerald-800 block text-[11px]">💚 Akhlak & Karakter:</span>
                  <p className="text-slate-600 mt-0.5">{st.capaianAkhlak.sikapMenonjol} — {st.capaianAkhlak.perkembangan}</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-bold text-amber-800 block text-[11px]">💛 Pertumbuhan KBC ({st.capaianKBC.cabangDominan}):</span>
                  <p className="text-slate-600 mt-0.5">{st.capaianKBC.tindakanTeramati}</p>
                </div>
              </div>

              {/* Umpan Balik Menguatkan Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                <span className="font-bold text-emerald-950 text-xs flex items-center gap-1.5 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  Umpan Balik Kasih Guru:
                </span>
                <p className="text-xs text-slate-800 italic leading-relaxed">
                  "{st.umpanBalikKasih}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
