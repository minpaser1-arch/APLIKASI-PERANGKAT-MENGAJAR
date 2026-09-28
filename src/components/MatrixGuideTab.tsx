import React, { useState } from 'react';
import { CABANG_KASIH_LIST, MAPEL_MI_LIST, DIMENSI_P5, DIMENSI_PPRA } from '../data/curriculumData';
import { MAPEL_KBC_MATRIX } from '../services/curriculumGenerator';
import { BookmarkCheck, Heart, Shield, Sparkles, BookOpen, Globe, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export const MatrixGuideTab: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>(CABANG_KASIH_LIST[0].id);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-bold px-3 py-1 rounded-full text-xs">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Panduan Resmi Pakar Kurikulum Nasional MI-KBC</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
          Matriks & Prinsip Kurikulum Terpadu
        </h2>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Kerangka acuan resmi yang mengintegrasikan Kurikulum Merdeka (Kemendikbudristek & Kemenag RI) dengan 6 Cabang Kasih Kurikulum Berbasis Cinta (KBC) khusus jenjang Madrasah Ibtidaiyah.
        </p>
      </div>

      {/* 6 Prinsip Pokok yang TIDAK BOLEH DISEPELENGKAN */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            PRINSIP MUTLAK
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-2 font-serif">
            6 Prinsip yang TIDAK BOLEH DISEPELENGKAN
          </h3>
          <p className="text-xs text-slate-500">
            Setiap pendidik, kepala madrasah, dan pengawas wajib memegang teguh kaidah ini dalam menyusun dan melaksanakan pembelajaran.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">1</span>
              <span>Sesuai Jenjang MI</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Fase A (Kls I–II), Fase B (Kls III–IV), Fase C (Kls V–VI). Bahasa, kedalaman konsep, dan metode kinestetik disesuaikan dengan kematangan psikologis anak.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">2</span>
              <span>KBC Menyatu, Bukan Ditambal</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Setiap tujuan, kegiatan eksplorasi-elaborasi-konfirmasi, media, dan penilaian melekat organik dengan 6 cabang kasih. Bukan sekadar tempelan di akhir.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">3</span>
              <span>Penilaian Terpadu Berimbang</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Akademik + Akhlak/Sikap + Pertumbuhan KBC dinilai seimbang. Mengharamkan peringkat umum; perbandingan hanya dengan kemajuan diri sendiri (self-growth).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">4</span>
              <span>Teladan adalah Metode Utama</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Guru wajib menjadi teladan iman, ilmu, dan kasih sebelum menjadi pengajar. Tutur kata lembut, tidak mempermalukan murid, dan menyapa dengan senyum tulus.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">5</span>
              <span>Bahasa Lugas, Baku, Menguatkan</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Tidak berbelit-belit, tidak menakut-nakuti anak dengan ancaman atau hukuman keras, melainkan mengalirkan motivasi dan optimisme iman.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">6</span>
              <span>Siap Pakai Langsung</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Format jelas, langkah terurut (7 Langkah Algoritma), contoh nyata untuk setiap mata pelajaran MI tanpa perlu menerka-nerka lagi di ruang kelas.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Cabang Kasih KBC Detail */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600" />
            <span>6 Cabang Kasih Kurikulum Berbasis Cinta (KBC)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Pondasi spiritual, humanis, dan ekologis bagi peserta didik madrasah sejak usia dini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CABANG_KASIH_LIST.map((c) => (
            <div
              key={c.id}
              className={`p-5 rounded-2xl border-2 ${c.bgWarna} ${c.borderWarna} space-y-3 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{c.emoji}</span>
                  <h4 className="font-extrabold text-sm">{c.name}</h4>
                </div>
                <p className="text-xs leading-relaxed opacity-90">{c.description}</p>
              </div>

              <div className="bg-white/80 backdrop-blur p-2.5 rounded-lg border border-slate-200/60 text-xs">
                <strong className="text-slate-800 block text-[11px] mb-0.5">Contoh Perilaku Nyata MI:</strong>
                <p className="text-slate-700 italic text-[11px] leading-snug">{c.contohPerilakuMI}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Matriks Integrasi KBC 11 Mata Pelajaran MI */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>Matriks Resmi Integrasi KBC untuk 11 Mata Pelajaran MI</span>
          </h3>
          <p className="text-xs text-slate-500">
            Titik integrasi organik agar setiap mapel mengalirkan nilai kasih tanpa kehilangan ketuntasan akademik.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-r border-slate-200 w-44">Mata Pelajaran</th>
                <th className="p-3 border-b border-r border-slate-200 w-64">Titik Integrasi KBC</th>
                <th className="p-3 border-b border-r border-slate-200">Uraian Penerapan Pedagogis</th>
                <th className="p-3 border-b border-slate-200 w-48">Landasan Hikmah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MAPEL_MI_LIST.map((m) => {
                const matrix = MAPEL_KBC_MATRIX[m.id];
                return (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                      <span className="block">{m.id}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{m.kategori}</span>
                    </td>
                    <td className="p-3 font-semibold text-emerald-800 border-r border-slate-200 font-serif">
                      "{m.titikIntegrasiKBC}"
                    </td>
                    <td className="p-3 text-slate-700 border-r border-slate-200 leading-relaxed">
                      {matrix?.deskripsi}
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] font-serif italic">
                      {matrix?.dalilHikmah}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Profil Pelajar Pancasila & Rahmatan Lil 'Alamin */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-700" />
            <span>Pilar Profil Pelajar: Pancasila (P5) & Rahmatan Lil ‘Alamin (PPRA)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Harmoni nilai kebangsaan Indonesia dan nilai-nilai luhur Islam wasathiyah (moderat) di madrasah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 space-y-2">
            <h4 className="font-bold text-teal-950 text-sm flex items-center gap-1.5">
              <span>🇮🇩</span> 6 Dimensi Profil Pelajar Pancasila (P5)
            </h4>
            <ul className="space-y-1.5 text-slate-700">
              {DIMENSI_P5.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
              <span>🕌</span> 10 Nilai Profil Pelajar Rahmatan Lil ‘Alamin (PPRA)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700">
              {DIMENSI_PPRA.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lisensi & Panduan Kontribusi GitHub */}
      <section className="bg-slate-900 text-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Arsip Terbuka & Ketentuan Pengembangan Bersama</span>
            </h3>
            <p className="text-xs text-slate-400">
              Inisiatif kurikulum terbuka bagi seluruh guru madrasah dan pegiat pendidikan di Indonesia.
            </p>
          </div>
          <span className="text-[11px] font-mono bg-emerald-900/80 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full">
            Lisensi Edukasi Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="font-bold text-emerald-400 block text-xs">Aturan Hak Cipta & Lisensi:</span>
            <p className="text-slate-300 leading-relaxed">
              Bebas digunakan, digandakan, dan disesuaikan oleh seluruh guru, madrasah, dan lembaga pendidikan di Indonesia. Wajib mencantumkan atribusi resmi: <em>"Sistem MI-KBC | Kurikulum Merdeka + Kurikulum Berbasis Cinta"</em>.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="font-bold text-amber-400 block text-xs">Prinsip Pengembangan Teknis:</span>
            <p className="text-slate-300 leading-relaxed">
              Setiap pembaruan tetap memegang teguh prinsip inti: <strong>kasih tidak boleh dikorbankan demi efisiensi</strong>. Masukan nyata dari guru di lapangan menjadi bahan penyempurnaan utama.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
