import React, { useState, useEffect } from 'react';
import { CabangKasih, FaseMI, KelasMI, MapelMI, ModulAjarMIKBC } from '../types/curriculum';
import { CABANG_KASIH_LIST, MAPEL_MI_LIST, EXEMPLAR_MODULES } from '../data/curriculumData';
import { MAPEL_KBC_MATRIX } from '../services/curriculumGenerator';
import { generateWithOptionalAI } from '../services/aiCurriculum';
import { ModulViewer } from './ModulViewer';
import { Sparkles, RefreshCw, Wand2, BookOpen, Heart, Info, Check, HelpCircle } from 'lucide-react';

interface GeneratorTabProps {
  onSaveToLibrary: (modul: ModulAjarMIKBC) => void;
}

export const GeneratorTab: React.FC<GeneratorTabProps> = ({ onSaveToLibrary }) => {
  const [selectedMapel, setSelectedMapel] = useState<MapelMI>('Matematika');
  const [selectedFase, setSelectedFase] = useState<FaseMI>('Fase B');
  const [selectedKelas, setSelectedKelas] = useState<KelasMI>('Kelas 4');
  const [topik, setTopik] = useState('Operasi Perkalian Bilangan Cacah');
  const [alokasiWaktu, setAlokasiWaktu] = useState('2 × 35 Menit (1 Pertemuan)');
  const [kebutuhanKhusus, setKebutuhanKhusus] = useState('Diferensiasi proses: pendampingan bertahap dengan bimbingan sahabat sebaya (peer-tutoring) yang ramah dan suportif.');
  const [namaMadrasah, setNamaMadrasah] = useState('Madrasah Ibtidaiyah Negeri 1 Paser');
  const [namaPenyusun, setNamaPenyusun] = useState('Pendidik MI Berbasis Cinta');
  const [selectedBranches, setSelectedBranches] = useState<CabangKasih[]>([
    'Cinta Ilmu',
    'Cinta Sesama',
    'Cinta kepada Tuhan',
  ]);
  const [useAi, setUseAi] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentModul, setCurrentModul] = useState<ModulAjarMIKBC>(EXEMPLAR_MODULES[0]);
  const [aiNotes, setAiNotes] = useState<string | null>(null);

  // Sync recommended branches and topics when Mapel changes
  useEffect(() => {
    const matrix = MAPEL_KBC_MATRIX[selectedMapel];
    if (matrix) {
      setSelectedBranches(matrix.cabangPrioritas);
    }
    const mapelInfo = MAPEL_MI_LIST.find((m) => m.id === selectedMapel);
    if (mapelInfo && mapelInfo.contohTopik[selectedFase]?.length > 0) {
      setTopik(mapelInfo.contohTopik[selectedFase][0]);
    }
  }, [selectedMapel, selectedFase]);

  // Adjust Kelas options based on Fase
  const getKelasOptions = (fase: FaseMI): KelasMI[] => {
    if (fase === 'Fase A') return ['Kelas 1', 'Kelas 2'];
    if (fase === 'Fase B') return ['Kelas 3', 'Kelas 4'];
    return ['Kelas 5', 'Kelas 6'];
  };

  const handleFaseChange = (newFase: FaseMI) => {
    setSelectedFase(newFase);
    const kelasOpts = getKelasOptions(newFase);
    setSelectedKelas(kelasOpts[0]);
  };

  const toggleBranch = (branch: CabangKasih) => {
    if (selectedBranches.includes(branch)) {
      if (selectedBranches.length > 2) {
        setSelectedBranches(selectedBranches.filter((b) => b !== branch));
      }
    } else {
      if (selectedBranches.length < 4) {
        setSelectedBranches([...selectedBranches, branch]);
      }
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setAiNotes(null);
    try {
      const res = await generateWithOptionalAI({
        namaMadrasah,
        namaPenyusun,
        mapel: selectedMapel,
        kelas: selectedKelas,
        fase: selectedFase,
        topik,
        alokasiWaktu,
        kebutuhanKhusus,
        cabangKbcPilihan: selectedBranches,
        useAi,
      });
      setCurrentModul(res.modul);
      if (res.notes) setAiNotes(res.notes);
    } catch (err) {
      console.error('Failed to generate:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadExemplar = (exId: string) => {
    const ex = EXEMPLAR_MODULES.find((m) => m.id === exId);
    if (ex) {
      setCurrentModul(ex);
      setSelectedMapel(ex.konteks.mapel);
      setSelectedFase(ex.konteks.fase);
      setSelectedKelas(ex.konteks.kelas);
      setTopik(ex.konteks.topik);
      setAlokasiWaktu(ex.konteks.alokasiWaktu);
      setSelectedBranches(ex.tujuanTerpadu.nilaiKBC.cabangTerpilih);
    }
  };

  const currentMapelInfo = MAPEL_MI_LIST.find((m) => m.id === selectedMapel);
  const currentMatrix = MAPEL_KBC_MATRIX[selectedMapel];

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-linear-to-r from-emerald-800 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-amber-400/90 text-emerald-950 font-bold px-3 py-1 rounded-full text-xs">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Pakar Kurikulum Nasional Terpadu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            Generator Perangkat Ajar & Modul MI-KBC
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Menyatukan Capaian Pembelajaran Kurikulum Merdeka (Kemendikbudristek & Kemenag RI) dengan 6 Cabang Kasih Kurikulum Berbasis Cinta untuk 11 Mata Pelajaran Madrasah Ibtidaiyah. Tanpa kompromi, tanpa tambal sulam.
          </p>
        </div>

        {/* Quick Exemplar Shortcuts */}
        <div className="mt-5 pt-4 border-t border-emerald-700/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-emerald-200 font-semibold">⚡ Muat Cepat Contoh Nyata:</span>
          {EXEMPLAR_MODULES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => handleLoadExemplar(ex.id)}
              className="bg-emerald-700/80 hover:bg-emerald-600 px-3 py-1 rounded-lg text-emerald-50 transition border border-emerald-500/40 cursor-pointer"
            >
              {ex.konteks.mapel} ({ex.konteks.kelas})
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Parameter Pembelajaran Terpadu</span>
            </h3>
            <p className="text-xs text-slate-500">
              Isi parameter di bawah untuk menghasilkan 7 Langkah Alur MI-KBC secara komprehensif.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Mapel Selector (11 Mapel) */}
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs font-bold text-slate-700">
              1. Mata Pelajaran MI (11 Mapel Lengkap) <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedMapel}
              onChange={(e) => setSelectedMapel(e.target.value as MapelMI)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <optgroup label="Pendidikan Agama Islam (PAI)">
                <option value="Al-Qur’an & Hadis">Al-Qur’an & Hadis</option>
                <option value="Akidah Akhlak">Akidah Akhlak</option>
                <option value="Fikih">Fikih</option>
                <option value="Sejarah Kebudayaan Islam (SKI)">Sejarah Kebudayaan Islam (SKI)</option>
              </optgroup>
              <optgroup label="Mata Pelajaran Umum">
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Matematika">Matematika</option>
                <option value="IPAS">IPAS</option>
                <option value="IPS">IPS</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Seni Budaya & Prakarya">Seni Budaya & Prakarya (SBdP)</option>
                <option value="PJOK">PJOK</option>
              </optgroup>
            </select>
            {currentMatrix && (
              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 mt-1">
                <strong>Titik Integrasi KBC:</strong> {currentMatrix.titikIntegrasi}
              </p>
            )}
          </div>

          {/* Fase & Kelas Selector */}
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs font-bold text-slate-700">
              2. Fase & Kelas MI <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedFase}
                onChange={(e) => handleFaseChange(e.target.value as FaseMI)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Fase A">Fase A (Kls 1-2)</option>
                <option value="Fase B">Fase B (Kls 3-4)</option>
                <option value="Fase C">Fase C (Kls 5-6)</option>
              </select>
              <select
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value as KelasMI)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {getKelasOptions(selectedFase).map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-500">
              Bahasa, kedalaman, dan tingkat kognitif disesuaikan dengan fase perkembangan anak MI.
            </p>
          </div>

          {/* Alokasi Waktu */}
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs font-bold text-slate-700">
              3. Alokasi Waktu <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={alokasiWaktu}
              onChange={(e) => setAlokasiWaktu(e.target.value)}
              placeholder="Contoh: 2 × 35 Menit (1 Pertemuan)"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            <p className="text-[11px] text-slate-500">
              Standar MI: 1 Jam Pelajaran (JP) = 35 Menit.
            </p>
          </div>
        </div>

        {/* Topik / Materi Pokok Input with Quick Suggestions */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            4. Materi Pokok / Topik Pembelajaran <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={topik}
            onChange={(e) => setTopik(e.target.value)}
            placeholder="Tuliskan materi pokok atau pilih dari saran di bawah..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />

          {/* Quick topic pills */}
          {currentMapelInfo && currentMapelInfo.contohTopik[selectedFase] && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 font-medium">Saran Topik Silabus MI:</span>
              {currentMapelInfo.contohTopik[selectedFase].map((ct, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopik(ct)}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition border cursor-pointer ${
                    topik === ct
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {ct}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 6 Cabang Kasih Multi-Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              5. Pilih 2–4 Cabang Kasih KBC (Wajib Menyatu) <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              Terpilih: <strong>{selectedBranches.length}</strong> / 4 Cabang
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {CABANG_KASIH_LIST.map((branch) => {
              const isSelected = selectedBranches.includes(branch.id);
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => toggleBranch(branch.id)}
                  className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                    isSelected
                      ? `${branch.bgWarna} border-2 ${branch.borderWarna} shadow-xs`
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                  <span className="text-xl block mb-1">{branch.emoji}</span>
                  <span className="font-bold text-xs block leading-tight">{branch.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kebutuhan Khusus / Diferensiasi & Identitas Madrasah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          <div className="space-y-1 md:col-span-1">
            <label className="block text-xs font-semibold text-slate-600">
              Kebutuhan Khusus / Diferensiasi:
            </label>
            <input
              type="text"
              value={kebutuhanKhusus}
              onChange={(e) => setKebutuhanKhusus(e.target.value)}
              placeholder="Contoh: Diferensiasi proses dan sahabat sebaya"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1 md:col-span-1">
            <label className="block text-xs font-semibold text-slate-600">
              Nama Madrasah:
            </label>
            <input
              type="text"
              value={namaMadrasah}
              onChange={(e) => setNamaMadrasah(e.target.value)}
              placeholder="Madrasah Ibtidaiyah..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1 md:col-span-1">
            <label className="block text-xs font-semibold text-slate-600">
              Pendidik Penyusun:
            </label>
            <input
              type="text"
              value={namaPenyusun}
              onChange={(e) => setNamaPenyusun(e.target.value)}
              placeholder="Nama Guru Pengampu..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
            />
          </div>
        </div>

        {/* Generation Action Buttons */}
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={useAi}
                onChange={(e) => setUseAi(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <span>Gunakan Sintesis AI (Gemini Flash) jika tersedia</span>
            </label>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menyusun Modul Terpadu 7 Langkah...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Hasilkan Modul Ajar MI-KBC</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {aiNotes && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{aiNotes}</span>
        </div>
      )}

      {/* Output Modul Viewer */}
      {currentModul && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Hasil Perangkat Ajar Sah MI-KBC</span>
            </h3>
            <button
              onClick={() => onSaveToLibrary(currentModul)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>+ Simpan ke Pustaka Modul</span>
            </button>
          </div>
          <ModulViewer modul={currentModul} onSaveToLibrary={onSaveToLibrary} />
        </div>
      )}
    </div>
  );
};
