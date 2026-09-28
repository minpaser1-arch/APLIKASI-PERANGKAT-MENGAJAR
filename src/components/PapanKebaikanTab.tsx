import React, { useState } from 'react';
import { CabangKasih, KelasMI, SiswaKebaikan } from '../types/curriculum';
import { CABANG_KASIH_LIST } from '../data/curriculumData';
import { Heart, Plus, Printer, Sparkles, Filter, Award, CheckCircle } from 'lucide-react';

const INITIAL_KEBAIKAN: SiswaKebaikan[] = [
  {
    id: 'k1',
    nama: 'Muhammad Fatih',
    kelas: 'Kelas 4',
    cabangKasih: 'Cinta Sesama',
    tindakanKebaikan: 'Dengan sabar menjelaskan cara berhitung perkalian kepada sahabat sebangku yang kesulitan tanpa merendahkan atau mengeluh.',
    tanggal: '28 Sep 2026',
    apresiasiGuru: 'Terima kasih Fatih telah menjadi cermin ketulusan sahabat setia di kelas!',
  },
  {
    id: 'k2',
    nama: 'Aisyah Humaira',
    kelas: 'Kelas 4',
    cabangKasih: 'Cinta Alam',
    tindakanKebaikan: 'Mengambil inisiatif menyiram tanaman bunga di depan kelas menggunakan sisa air wudhu dan merapikan pot yang miring.',
    tanggal: '28 Sep 2026',
    apresiasiGuru: 'Tangan lembutmu membuat lingkungan madrasah kita tersenyum asri, Aisyah!',
  },
  {
    id: 'k3',
    nama: 'Rayyan Al-Farizi',
    kelas: 'Kelas 1',
    cabangKasih: 'Cinta kepada Tuhan',
    tindakanKebaikan: 'Melafalkan kalimat Basmalah dengan suara lembut dan khusyuk sebelum mulai menulis, lalu mengajak temannya berdoa.',
    tanggal: '27 Sep 2026',
    apresiasiGuru: 'Hati yang selalu ingat Allah adalah hati yang paling damai dan bercahaya.',
  },
  {
    id: 'k4',
    nama: 'Nabila Zahra',
    kelas: 'Kelas 5',
    cabangKasih: 'Cinta Tanah Air',
    tindakanKebaikan: 'Mengajak teman-teman yang berbeda latar belakang suku untuk bermain bersama dengan riang gembira saat jam istirahat.',
    tanggal: '26 Sep 2026',
    apresiasiGuru: 'Nabila telah mempraktikkan indahnya Bhinneka Tunggal Ika dengan penuh kasih!',
  },
  {
    id: 'k5',
    nama: 'Zikri Pratama',
    kelas: 'Kelas 3',
    cabangKasih: 'Cinta Diri',
    tindakanKebaikan: 'Berani mengakui kesalahan saat secara tidak sengaja menjatuhkan buku teman, langsung meminta maaf dan merapikannya kembali.',
    tanggal: '26 Sep 2026',
    apresiasiGuru: 'Kejujuran dan keberanianmu meminta maaf adalah tanda jiwa ksatria yang mulia.',
  },
  {
    id: 'k6',
    nama: 'Hafizhah Khansa',
    kelas: 'Kelas 4',
    cabangKasih: 'Cinta Ilmu',
    tindakanKebaikan: 'Tekun membaca ensiklopedia tumbuhan di pojok baca saat istirahat dan menceritakan keajaiban ciptaan Allah kepada temannya.',
    tanggal: '25 Sep 2026',
    apresiasiGuru: 'Semangat belajarmu menularkan kecintaan pada ilmu kepada seluruh sahabat kelas!',
  },
];

export const PapanKebaikanTab: React.FC = () => {
  const [records, setRecords] = useState<SiswaKebaikan[]>(INITIAL_KEBAIKAN);
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New record form state
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState<KelasMI>('Kelas 4');
  const [cabangKasih, setCabangKasih] = useState<CabangKasih>('Cinta Sesama');
  const [tindakanKebaikan, setTindakanKebaikan] = useState('');
  const [apresiasiGuru, setApresiasiGuru] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !tindakanKebaikan) return;

    const newRecord: SiswaKebaikan = {
      id: `k-${Date.now()}`,
      nama,
      kelas,
      cabangKasih,
      tindakanKebaikan,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      apresiasiGuru: apresiasiGuru || 'Terima kasih atas kebaikan hatimu yang menyinari madrasah kita!',
    };

    setRecords([newRecord, ...records]);
    setNama('');
    setTindakanKebaikan('');
    setApresiasiGuru('');
    setIsAdding(false);
  };

  const filtered = records.filter(
    (r) => filterBranch === 'all' || r.cabangKasih === filterBranch
  );

  const getBranchInfo = (branchName: CabangKasih) => {
    return (
      CABANG_KASIH_LIST.find((c) => c.id === branchName) || {
        emoji: '❤️',
        name: branchName,
        bgWarna: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        warna: 'emerald-600',
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-100">
            <Heart className="w-3.5 h-3.5 fill-current text-amber-200" />
            <span>Instrumen Kasih Ruang Kelas MI-KBC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Papan "Anak Berhati Mulia"
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            Menghilangkan peringkat angka kompetitif — menggantikannya dengan perayaan amal kebajikan nyata. Setiap anak dihargai atas kelembutan kalbu, pertolongan sesama, dan kepedulian terhadap lingkungan madrasah.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 bg-white text-amber-900 font-bold px-4 py-2 rounded-xl text-xs shadow-md hover:bg-amber-50 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Sematkan Catatan Kebaikan</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-amber-800/80 hover:bg-amber-800 text-amber-100 font-semibold px-4 py-2 rounded-xl text-xs border border-amber-400/40 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak untuk Dinding Kelas</span>
          </button>
        </div>
      </div>

      {/* Add Form Accordion */}
      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="bg-white rounded-2xl border-2 border-amber-300 p-5 sm:p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Sematkan Bintang Kebaikan Baru</span>
            </h3>
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
                value={nama}
                onChange={(e) => setNama(e.target.value)}
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
              <label className="block font-bold text-slate-700 mb-1">Cabang Kasih:</label>
              <select
                value={cabangKasih}
                onChange={(e) => setCabangKasih(e.target.value as CabangKasih)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              >
                {CABANG_KASIH_LIST.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="block font-bold text-slate-700">Tindakan Kebaikan Nyata Teramati:</label>
            <textarea
              value={tindakanKebaikan}
              onChange={(e) => setTindakanKebaikan(e.target.value)}
              placeholder="Ceritakan kejadian nyata kebaikan hati yang dilakukan anak hari ini..."
              rows={2}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="block font-bold text-slate-700">Catatan Apresiasi Guru (Teladan Kasih):</label>
            <input
              type="text"
              value={apresiasiGuru}
              onChange={(e) => setApresiasiGuru(e.target.value)}
              placeholder="Kalimat penguatan yang membesarkan hati siswa..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            Sematkan ke Papan Kebaikan
          </button>
        </form>
      )}

      {/* Filter by Cabang Kasih */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2">
        <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" />
          Filter:
        </span>
        <button
          onClick={() => setFilterBranch('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            filterBranch === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          Semua Cabang ({records.length})
        </button>
        {CABANG_KASIH_LIST.map((c) => {
          const count = records.filter((r) => r.cabangKasih === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setFilterBranch(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                filterBranch === c.id
                  ? `${c.bgWarna} border-2`
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
              <span className="text-[10px] opacity-75 font-normal">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Kindness Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="printable-papan">
        {filtered.map((item) => {
          const info = getBranchInfo(item.cabangKasih);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Branch Color Ribbon Indicator */}
              <div className={`h-1.5 absolute top-0 left-0 right-0 ${info.bgWarna}`} />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${info.bgWarna}`}>
                    <span>{info.emoji}</span>
                    <span>{item.cabangKasih}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{item.tanggal}</span>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-slate-900 font-serif">
                    {item.nama}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">{item.kelas}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Tindakan Mulia:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    "{item.tindakanKebaikan}"
                  </p>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
                  <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1 mb-0.5">
                    <Heart className="w-3 h-3 text-amber-600 fill-amber-500" />
                    Apresiasi Teladan Guru:
                  </span>
                  <p className="text-xs text-slate-700 italic">
                    "{item.apresiasiGuru}"
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Madrasah Ibtidaiyah Berbasis Cinta</span>
                <span className="text-emerald-700 font-bold">★ Anak Berhati Mulia</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
