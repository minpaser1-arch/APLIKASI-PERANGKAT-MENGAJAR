import React, { useState } from 'react';
import { ModulAjarMIKBC } from '../types/curriculum';
import { formatModulAsMarkdown } from '../services/curriculumGenerator';
import { CABANG_KASIH_LIST } from '../data/curriculumData';
import { Printer, Copy, Download, Check, Eye, FileText, Code, Share2, Sparkles, Heart } from 'lucide-react';

interface ModulViewerProps {
  modul: ModulAjarMIKBC;
  onSaveToLibrary?: (modul: ModulAjarMIKBC) => void;
}

export const ModulViewer: React.FC<ModulViewerProps> = ({ modul, onSaveToLibrary }) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'official-print' | 'markdown'>('interactive');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopyMarkdown = () => {
    const md = formatModulAsMarkdown(modul);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const md = formatModulAsMarkdown(modul);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${modul.konteks.mapel.replace(/\s+/g, '_')}_${modul.konteks.kelas.replace(/\s+/g, '_')}_Modul_MI_KBC.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const getBranchBadge = (branchName: string) => {
    const info = CABANG_KASIH_LIST.find((c) => c.id === branchName);
    return info || { emoji: '❤️', name: branchName, bgWarna: 'bg-emerald-50 text-emerald-900 border-emerald-200' };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Action Bar */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-1 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Keluaran Sah Standar MI-KBC</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-mono">
            {modul.header}
          </h2>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggle */}
          <div className="flex bg-white rounded-lg p-1 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition cursor-pointer ${
                viewMode === 'interactive' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interaktif</span>
            </button>
            <button
              onClick={() => setViewMode('official-print')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition cursor-pointer ${
                viewMode === 'official-print' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Format Resmi MI</span>
            </button>
            <button
              onClick={() => setViewMode('markdown')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition cursor-pointer ${
                viewMode === 'markdown' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
          </div>

          {/* Action buttons */}
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-2xs cursor-pointer"
            title="Salin isi Modul Ajar"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-2xs cursor-pointer"
            title="Unduh Berkas Markdown (.md)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh .md</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition shadow-xs shadow-emerald-700/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE */}
      {viewMode === 'interactive' && (
        <div className="p-5 sm:p-8 space-y-8">
          {/* Header Banner info */}
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Perangkat Ajar Sah Terpadu</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                {modul.konteks.mapel} — {modul.konteks.kelas}
              </h3>
              <p className="text-sm font-medium text-slate-700">
                Topik: <span className="font-semibold text-emerald-900">{modul.konteks.topik}</span> ({modul.konteks.fase})
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-emerald-200 text-slate-700">
                ⏱️ <strong>Alokasi:</strong> {modul.konteks.alokasiWaktu}
              </div>
              <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-emerald-200 text-slate-700">
                🏫 <strong>Madrasah:</strong> {modul.konteks.namaMadrasah}
              </div>
            </div>
          </div>

          {/* LANGKAH 1 — EKSTRAKSI KONTEKS */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">1</span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                LANGKAH 1 — Ekstraksi Konteks Pembelajaran
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-medium block text-xs">Mata Pelajaran:</span>
                <span className="font-bold text-slate-900">{modul.konteks.mapel}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-medium block text-xs">Fase / Kelas:</span>
                <span className="font-bold text-slate-900">{modul.konteks.fase} / {modul.konteks.kelas}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-medium block text-xs">Materi Pokok / Topik:</span>
                <span className="font-bold text-emerald-800">{modul.konteks.topik}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-medium block text-xs">Alokasi Waktu:</span>
                <span className="font-bold text-slate-900">{modul.konteks.alokasiWaktu}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 sm:col-span-2">
                <span className="text-slate-500 font-medium block text-xs">Kebutuhan Khusus / Diferensiasi:</span>
                <span className="font-medium text-slate-800">{modul.konteks.kebutuhanKhusus}</span>
              </div>
            </div>
          </section>

          {/* LANGKAH 2 — PERUMUSAN TUJUAN TERPADU */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">2</span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                LANGKAH 2 — Perumusan Tujuan Terpadu (3 Lapis)
              </h4>
            </div>

            {/* Standard Golden Paragraph */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-16 h-16 bg-amber-200/40 rounded-full blur-sm"></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                  Rumusan Utuh Standar MI-KBC
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-900 font-serif leading-relaxed italic">
                "{modul.tujuanTerpadu.rumusanUtuh}"
              </p>
            </div>

            {/* 3 Lapis Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              {/* Lapis 1: Akademik */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <span className="p-1 rounded bg-blue-100 text-blue-800">1</span>
                    <span>KOMPETENSI AKADEMIK</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {modul.tujuanTerpadu.kompetensiAkademik}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Target: Capaian Pembelajaran Kurikulum Merdeka MI
                </div>
              </div>

              {/* Lapis 2: Profil Pelajar */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <span className="p-1 rounded bg-teal-100 text-teal-800">2</span>
                    <span>PROFIL PELAJAR (P5 + PPRA)</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <span className="font-semibold text-slate-600 text-[11px] block">Pancasila (P5):</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {modul.tujuanTerpadu.profilPelajar.pancasila.map((p, idx) => (
                          <span key={idx} className="bg-teal-50 text-teal-900 border border-teal-200 px-1.5 py-0.5 rounded text-[11px]">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-600 text-[11px] block">Rahmatan Lil ‘Alamin (PPRA):</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {modul.tujuanTerpadu.profilPelajar.rahmatanLilAlamin.map((p, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-1.5 py-0.5 rounded text-[11px]">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Karakter luhur kebangsaan & moderasi beragama
                </p>
              </div>

              {/* Lapis 3: KBC */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                    <span className="p-1 rounded bg-amber-100 text-amber-800">3</span>
                    <span>NILAI KBC TERPILIH</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {modul.tujuanTerpadu.nilaiKBC.cabangTerpilih.map((cabang, idx) => {
                      const badge = getBranchBadge(cabang);
                      return (
                        <span key={idx} className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${badge.bgWarna}`}>
                          {badge.emoji} {cabang}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    {modul.tujuanTerpadu.nilaiKBC.deskripsi}
                  </p>
                </div>
                <p className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Kasih menyatu dalam materi & perilaku
                </p>
              </div>
            </div>
          </section>

          {/* LANGKAH 3 — ALUR KEGIATAN TERPADU */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">3</span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                LANGKAH 3 — Alur Kegiatan Terpadu (5 Tahap Pembelajaran)
              </h4>
            </div>

            <div className="space-y-3.5">
              {modul.kegiatanTerpadu.map((k, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <span>{k.bagian}</span>
                    </div>
                    <span className="bg-white text-slate-700 font-semibold text-xs px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                      ⏱️ {k.durasi}
                    </span>
                  </div>
                  <div className="p-4 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-slate-500 block text-xs">Isi Kegiatan Pembelajaran:</span>
                      <p className="text-slate-800 leading-relaxed font-medium mt-0.5">{k.isiKegiatan}</p>
                    </div>
                    
                    {/* KBC Insertion */}
                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-2.5">
                      <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5 mb-0.5">
                        <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        Penyisipan Nilai KBC:
                      </span>
                      <p className="text-slate-800 text-xs leading-relaxed">{k.penyisipanKBC}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-700 block mb-0.5">Peran Guru (Teladan Kasih):</span>
                        <p className="text-slate-600">{k.aktivitasGuru}</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-700 block mb-0.5">Aktivitas Siswa (Tumbuh Bersama):</span>
                        <p className="text-slate-600">{k.aktivitasSiswa}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LANGKAH 4 — INTEGRASI KBC SPESIFIK MATA PELAJARAN */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">4</span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                LANGKAH 4 — Integrasi KBC per Mata Pelajaran ({modul.konteks.mapel})
              </h4>
            </div>

            <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-emerald-900 text-xs uppercase tracking-wide block mb-1">
                  Titik Integrasi KBC Resmi
                </span>
                <p className="text-base font-bold text-slate-900 font-serif">
                  "{modul.integrasiKBCMapel.titikIntegrasi}"
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {modul.integrasiKBCMapel.penjelasanPenerapan}
              </p>
              <div className="bg-white/90 p-3 rounded-lg border border-emerald-200 text-xs text-emerald-950 font-serif">
                <strong>Dalil / Nilai Hikmah:</strong> {modul.integrasiKBCMapel.dalilAtauNilaiHikmah}
              </div>
            </div>
          </section>

          {/* LANGKAH 5 — PENYUSUNAN PENILAIAN TERPADU */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">5</span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                LANGKAH 5 — Penyusunan Penilaian Terpadu (3 Aspek Berimbang)
              </h4>
            </div>

            {/* 3 Aspek Table */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs border-b border-slate-200 pb-2">
                  <span className="text-base">📝</span>
                  <span>ASPEK AKADEMIK</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Fokus Penilaian:</span>
                  <p className="text-slate-800 font-medium">{modul.penilaian.akademik.fokus}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Cara Penilaian:</span>
                  <p className="text-slate-700 text-xs">{modul.penilaian.akademik.cara}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Indikator:</span>
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1 mt-1">
                    {modul.penilaian.akademik.indikator.map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs border-b border-slate-200 pb-2">
                  <span className="text-base">💚</span>
                  <span>ASPEK SIKAP & AKHLAK</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Fokus Penilaian:</span>
                  <p className="text-slate-800 font-medium">{modul.penilaian.sikapAkhlak.fokus}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Cara Penilaian:</span>
                  <p className="text-slate-700 text-xs">{modul.penilaian.sikapAkhlak.cara}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Indikator:</span>
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1 mt-1">
                    {modul.penilaian.sikapAkhlak.indikator.map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-xs border-b border-slate-200 pb-2">
                  <span className="text-base">💛</span>
                  <span>ASPEK PERTUMBUHAN KBC</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Fokus Penilaian:</span>
                  <p className="text-slate-800 font-medium">{modul.penilaian.kbc.fokus}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Cara Penilaian:</span>
                  <p className="text-slate-700 text-xs">{modul.penilaian.kbc.cara}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 text-[11px] block">Indikator:</span>
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1 mt-1">
                    {modul.penilaian.kbc.indikator.map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Aturan Mutlak Penilaian Box */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm space-y-2">
              <span className="font-bold text-rose-900 flex items-center gap-1.5 uppercase tracking-wide text-xs">
                ⚠️ Aturan Mutlak Penilaian Terpadu MI-KBC
              </span>
              <ul className="list-disc pl-4 text-slate-800 space-y-1">
                <li><strong>Tidak ada peringkat umum</strong> antarsiswa di kelas.</li>
                <li><strong>Bandingkan kemajuan siswa hanya dengan dirinya sendiri</strong> pada catatan minggu/bulan sebelumnya.</li>
                <li><strong>Umpan balik selalu mengandung:</strong> Penguatan usaha + Arah perbaikan pelan-pelan + Keyakinan tulus guru bahwa siswa mampu.</li>
              </ul>
              <div className="bg-white p-3 rounded-lg border border-rose-200 mt-2">
                <span className="font-bold text-slate-700 block text-xs">Contoh Umpan Balik Menguatkan Standar:</span>
                <p className="text-slate-800 italic mt-0.5">"{modul.penilaian.umpanBalikStandar}"</p>
              </div>
            </div>
          </section>

          {/* LANGKAH 6 — MEDIA & SUMBER BELAJAR */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">6</span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                LANGKAH 6 — Media & Sumber Belajar Lingkungan Madrasah
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs">📦 Alat & Bahan Sederhana (Murah & Tersedia):</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  {modul.mediaSumberBelajar.alatBahanSederhana.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs">🌿 Sumber Belajar Lingkungan Madrasah:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  {modul.mediaSumberBelajar.sumberBelajarLingkungan.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-1 md:col-span-2">
                <span className="font-bold text-amber-950 block text-xs">💛 Papan "Anak Berhati Mulia" di Ruang Kelas:</span>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">{modul.mediaSumberBelajar.papanHatiMulia}</p>
                <p className="text-slate-600 text-xs mt-1"><em>Suasana Kelas:</em> {modul.mediaSumberBelajar.ruangKelasBerkarakter}</p>
              </div>
            </div>
          </section>

          {/* LANGKAH 7 — REFLEKSI GURU */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">7</span>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                LANGKAH 7 — Refleksi Guru (Wajib Ada di Setiap Modul)
              </h4>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-5 space-y-4 text-xs sm:text-sm shadow-md">
              <div className="border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-semibold block text-xs mb-1">
                  ✅ Bagian yang menyentuh hati siswa:
                </span>
                <p className="text-slate-200 leading-relaxed">{modul.refleksiGuru.bagianMenyentuhHati}</p>
              </div>

              <div className="border-b border-slate-800 pb-2">
                <span className="text-amber-400 font-semibold block text-xs mb-1">
                  ⚠️ Bagian perlu perbaikan:
                </span>
                <p className="text-slate-200 leading-relaxed">{modul.refleksiGuru.bagianPerluPerbaikan}</p>
              </div>

              <div className="border-b border-slate-800 pb-2">
                <span className="text-blue-400 font-semibold block text-xs mb-1">
                  💡 Tindak lanjut:
                </span>
                <p className="text-slate-200 leading-relaxed">{modul.refleksiGuru.tindakLanjut}</p>
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700">
                <span className="text-rose-400 font-bold block text-xs mb-1">
                  ❤️ Refleksi batin: Apakah saya menjadi teladan kasih hari ini?
                </span>
                <p className="text-slate-100 font-serif italic leading-relaxed">
                  "{modul.refleksiGuru.refleksiBatin}"
                </p>
              </div>
            </div>
          </section>

          {/* Footer Official Note */}
          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
            <p className="font-mono">{modul.footer}</p>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: OFFICIAL PRINT VIEW WITH KOP SURAT MADRASAH */}
      {viewMode === 'official-print' && (
        <div className="p-8 sm:p-12 max-w-4xl mx-auto font-serif text-slate-900 bg-white" id="printable-modul">
          {/* Kop Surat Madrasah Resmi */}
          <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 text-center space-y-1">
            <h5 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-700">
              KEMENTERIAN AGAMA REPUBLIK INDONESIA
            </h5>
            <h4 className="text-lg font-bold tracking-tight uppercase">
              {modul.konteks.namaMadrasah?.toUpperCase() || 'MADRASAH IBTIDAIYAH'}
            </h4>
            <p className="text-xs font-sans text-slate-600">
              PERANGKAT AJAR TERPADU: KURIKULUM MERDEKA × KURIKULUM BERBASIS CINTA (KBC)
            </p>
            <p className="text-[11px] font-sans text-slate-500">
              Tahun Ajaran: {modul.konteks.tahunAjaran || '2026/2027'} • Semester: {modul.konteks.semester || 'Ganjil'}
            </p>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-base font-bold uppercase underline tracking-wide">
              MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN (RPP)
            </h3>
            <p className="text-xs font-mono mt-1 font-sans text-slate-700">
              {modul.header}
            </p>
          </div>

          {/* Tabel Informasi Umum */}
          <table className="w-full text-xs border border-slate-900 mb-6 font-sans">
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="w-1/4 p-2 bg-slate-100 font-bold border-r border-slate-300">Mata Pelajaran</td>
                <td className="p-2 border-r border-slate-300">{modul.konteks.mapel}</td>
                <td className="w-1/4 p-2 bg-slate-100 font-bold border-r border-slate-300">Fase / Kelas</td>
                <td className="p-2">{modul.konteks.fase} / {modul.konteks.kelas}</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2 bg-slate-100 font-bold border-r border-slate-300">Materi Pokok / Topik</td>
                <td className="p-2 border-r border-slate-300">{modul.konteks.topik}</td>
                <td className="p-2 bg-slate-100 font-bold border-r border-slate-300">Alokasi Waktu</td>
                <td className="p-2">{modul.konteks.alokasiWaktu}</td>
              </tr>
              <tr>
                <td className="p-2 bg-slate-100 font-bold border-r border-slate-300">Diferensiasi / Kebutuhan</td>
                <td colSpan={3} className="p-2">{modul.konteks.kebutuhanKhusus}</td>
              </tr>
            </tbody>
          </table>

          {/* Bagian I: Tujuan Pembelajaran Terpadu */}
          <div className="mb-6 space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wide border-b border-slate-900 pb-1">
              I. TUJUAN PEMBELAJARAN TERPADU (3 LAPIS)
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded text-xs mb-2 font-serif italic">
              <strong>Rumusan Utuh:</strong> "{modul.tujuanTerpadu.rumusanUtuh}"
            </div>
            <div className="text-xs space-y-1.5 pl-2 font-sans">
              <p><strong>1. Kompetensi Akademik (TP):</strong> {modul.tujuanTerpadu.kompetensiAkademik}</p>
              <p><strong>2. Profil Pelajar:</strong> {modul.tujuanTerpadu.profilPelajar.pancasila.join(', ')} | PPRA: {modul.tujuanTerpadu.profilPelajar.rahmatanLilAlamin.join(', ')}</p>
              <p><strong>3. Nilai KBC Terpilih:</strong> {modul.tujuanTerpadu.nilaiKBC.cabangTerpilih.join(' • ')} — {modul.tujuanTerpadu.nilaiKBC.deskripsi}</p>
            </div>
          </div>

          {/* Bagian II: Alur Kegiatan Terpadu */}
          <div className="mb-6 space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wide border-b border-slate-900 pb-1">
              II. ALUR KEGIATAN PEMBELAJARAN (5 TAHAP)
            </h4>
            <table className="w-full text-xs border border-slate-900 font-sans">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-900 text-left">
                  <th className="p-2 border-r border-slate-900 w-28">Tahap</th>
                  <th className="p-2 border-r border-slate-900 w-20">Durasi</th>
                  <th className="p-2">Uraian Kegiatan & Penyisipan Nilai KBC</th>
                </tr>
              </thead>
              <tbody>
                {modul.kegiatanTerpadu.map((k, i) => (
                  <tr key={i} className="border-b border-slate-300 align-top">
                    <td className="p-2 font-bold border-r border-slate-300">{k.bagian}</td>
                    <td className="p-2 border-r border-slate-300">{k.durasi}</td>
                    <td className="p-2 space-y-1">
                      <p><strong>Kegiatan:</strong> {k.isiKegiatan}</p>
                      <p className="text-slate-800 italic"><strong>KBC:</strong> {k.penyisipanKBC}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bagian III: Penilaian Terpadu 3 Aspek */}
          <div className="mb-6 space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wide border-b border-slate-900 pb-1">
              III. PENILAIAN TERPADU 3 ASPEK (TANPA PERINGKAT UMUM)
            </h4>
            <table className="w-full text-xs border border-slate-900 font-sans">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-900 text-left">
                  <th className="p-2 border-r border-slate-900 w-32">Aspek</th>
                  <th className="p-2 border-r border-slate-900">Fokus & Indikator</th>
                  <th className="p-2 w-48">Metode Penilaian</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300 align-top">
                  <td className="p-2 font-bold border-r border-slate-300">1. Akademik</td>
                  <td className="p-2 border-r border-slate-300">
                    <p>{modul.penilaian.akademik.fokus}</p>
                    <p className="text-[11px] text-slate-600 mt-1">{modul.penilaian.akademik.indikator.join('; ')}</p>
                  </td>
                  <td className="p-2">{modul.penilaian.akademik.cara}</td>
                </tr>
                <tr className="border-b border-slate-300 align-top">
                  <td className="p-2 font-bold border-r border-slate-300">2. Sikap & Akhlak</td>
                  <td className="p-2 border-r border-slate-300">
                    <p>{modul.penilaian.sikapAkhlak.fokus}</p>
                    <p className="text-[11px] text-slate-600 mt-1">{modul.penilaian.sikapAkhlak.indikator.join('; ')}</p>
                  </td>
                  <td className="p-2">{modul.penilaian.sikapAkhlak.cara}</td>
                </tr>
                <tr className="border-b border-slate-300 align-top">
                  <td className="p-2 font-bold border-r border-slate-300">3. Pertumbuhan KBC</td>
                  <td className="p-2 border-r border-slate-300">
                    <p>{modul.penilaian.kbc.fokus}</p>
                    <p className="text-[11px] text-slate-600 mt-1">{modul.penilaian.kbc.indikator.join('; ')}</p>
                  </td>
                  <td className="p-2">{modul.penilaian.kbc.cara}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[11px] text-slate-600 italic">
              * Prinsip Penilaian: Evaluasi diri mandiri berkesinambungan tanpa ranking umum. Umpan balik standar: "{modul.penilaian.umpanBalikStandar}"
            </p>
          </div>

          {/* Bagian IV: Refleksi Guru */}
          <div className="mb-8 space-y-1 text-xs font-sans border border-slate-300 p-3 rounded">
            <h5 className="font-bold uppercase text-[11px] text-slate-800 mb-1">Catatan Refleksi Teladan Guru:</h5>
            <p><strong>Bagian Menyentuh Hati:</strong> {modul.refleksiGuru.bagianMenyentuhHati}</p>
            <p><strong>Perlu Perbaikan:</strong> {modul.refleksiGuru.bagianPerluPerbaikan}</p>
            <p><strong>Tindak Lanjut:</strong> {modul.refleksiGuru.tindakLanjut}</p>
            <p><strong>Refleksi Batin Kasih:</strong> <em>"{modul.refleksiGuru.refleksiBatin}"</em></p>
          </div>

          {/* Lembar Pengesahan Tanda Tangan */}
          <div className="grid grid-cols-2 text-center text-xs font-sans mt-8 pt-4">
            <div>
              <p>Mengetahui,</p>
              <p>Kepala Madrasah Ibtidaiyah</p>
              <div className="h-16"></div>
              <p className="font-bold underline uppercase">( .................................................... )</p>
              <p className="text-[11px] text-slate-500">NIP. ....................................................</p>
            </div>
            <div>
              <p>Paser, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p>Guru Kelas / Pengampu Mapel</p>
              <div className="h-16"></div>
              <p className="font-bold underline uppercase">({modul.konteks.namaPenyusun || ' .................................................... '})</p>
              <p className="text-[11px] text-slate-500">NIP. ....................................................</p>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 mt-10 pt-2 border-t border-slate-200">
            {modul.footer}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: MARKDOWN RAW */}
      {viewMode === 'markdown' && (
        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono text-slate-500">Pratinjau Format Markdown Standar GitHub</span>
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
            >
              {copied ? 'Tersalin ke Clipboard!' : 'Salin Semua Markdown'}
            </button>
          </div>
          <pre className="bg-slate-900 text-emerald-400 p-5 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {formatModulAsMarkdown(modul)}
          </pre>
        </div>
      )}
    </div>
  );
};
