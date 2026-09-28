import React, { useState } from 'react';
import { ModulAjarMIKBC, MapelMI, FaseMI } from '../types/curriculum';
import { MAPEL_MI_LIST } from '../data/curriculumData';
import { ModulViewer } from './ModulViewer';
import { Search, Filter, BookOpen, Sparkles, ChevronRight, Check } from 'lucide-react';

interface LibraryTabProps {
  libraryModules: ModulAjarMIKBC[];
  onSelectModul: (modul: ModulAjarMIKBC) => void;
}

export const LibraryTab: React.FC<LibraryTabProps> = ({ libraryModules, onSelectModul }) => {
  const [selectedMapelFilter, setSelectedMapelFilter] = useState<string>('all');
  const [selectedFaseFilter, setSelectedFaseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewModul, setActivePreviewModul] = useState<ModulAjarMIKBC | null>(null);

  const filtered = libraryModules.filter((m) => {
    const matchesMapel = selectedMapelFilter === 'all' || m.konteks.mapel === selectedMapelFilter;
    const matchesFase = selectedFaseFilter === 'all' || m.konteks.fase === selectedFaseFilter;
    const matchesSearch =
      searchQuery === '' ||
      m.konteks.topik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.konteks.mapel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.header.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMapel && matchesFase && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pustaka Modul Terpadu 11 Mapel MI</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
            Koleksi Perangkat Ajar & Modul Emas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Perangkat ajar siap pakai dengan format 7 Langkah baku MI-KBC. Lengkap dengan tujuan 3 lapis, alur 5 tahap, dan penilaian autentik.
          </p>
        </div>

        <div className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          Total Modul Tersedia: <strong className="text-emerald-800 font-bold">{libraryModules.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari mapel, topik, kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedMapelFilter}
            onChange={(e) => setSelectedMapelFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700"
          >
            <option value="all">Semua Mata Pelajaran (11 Mapel)</option>
            {MAPEL_MI_LIST.map((m) => (
              <option key={m.id} value={m.id}>{m.id}</option>
            ))}
          </select>

          <select
            value={selectedFaseFilter}
            onChange={(e) => setSelectedFaseFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700"
          >
            <option value="all">Semua Fase (A, B, C)</option>
            <option value="Fase A">Fase A (Kls 1-2)</option>
            <option value="Fase B">Fase B (Kls 3-4)</option>
            <option value="Fase C">Fase C (Kls 5-6)</option>
          </select>
        </div>
      </div>

      {/* Modal / Inline Viewer when a module is selected for preview */}
      {activePreviewModul && (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Sedang Membuka Modul: {activePreviewModul.konteks.mapel} — {activePreviewModul.konteks.topik}
            </span>
            <button
              onClick={() => setActivePreviewModul(null)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 cursor-pointer"
            >
              Tutup Pratinjau
            </button>
          </div>
          <ModulViewer modul={activePreviewModul} />
        </div>
      )}

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((modul) => (
          <div
            key={modul.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {modul.konteks.mapel}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {modul.konteks.fase} • {modul.konteks.kelas}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition line-clamp-2">
                {modul.konteks.topik}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 italic font-serif">
                "{modul.tujuanTerpadu.rumusanUtuh}"
              </p>

              {/* KBC Branches badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {modul.tujuanTerpadu.nilaiKBC.cabangTerpilih.map((b, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                ⏱️ {modul.konteks.alokasiWaktu}
              </span>
              <button
                onClick={() => setActivePreviewModul(modul)}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-0.5 transition cursor-pointer"
              >
                <span>Buka Modul</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-semibold">Tidak ditemukan modul dengan kata kunci tersebut.</p>
          <p className="text-xs mt-1">Gunakan Generator untuk menyusun modul mata pelajaran baru secara instan!</p>
        </div>
      )}
    </div>
  );
};
