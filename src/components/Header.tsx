import React from 'react';
import { BookOpen, Heart, Sparkles, Award, FileText, CheckCircle2, BookmarkCheck, ExternalLink, Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenGitHubModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenGitHubModal }) => {
  const tabs = [
    { id: 'generator', label: 'Generator Modul Ajar', icon: Sparkles },
    { id: 'library', label: 'Pustaka 11 Mapel', icon: BookOpen },
    { id: 'papan-kebaikan', label: 'Papan Anak Berhati Mulia', icon: Heart },
    { id: 'penilaian', label: 'Penilaian & Umpan Balik', icon: Award },
    { id: 'matriks', label: 'Panduan & Matriks KBC', icon: BookmarkCheck },
    { id: 'refleksi', label: 'Refleksi Guru', icon: FileText },
  ];

  return (
    <header className="bg-white border-b border-emerald-100 shadow-xs sticky top-0 z-40">
      {/* Top Bar Banner with Islamic/National Motif */}
      <div className="bg-linear-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white px-4 py-2 text-xs flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="inline-flex items-center justify-center bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded text-[11px]">
            KEMENAG & KEMENDIKBUDRISTEK RI
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Kurikulum Merdeka × Kurikulum Berbasis Cinta (KBC)</span>
          <span className="hidden md:inline">• Jenjang Madrasah Ibtidaiyah (Fase A, B, C)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-200 text-xs hidden lg:inline">
            💛 Cinta Tuhan • 💚 Cinta Diri • 💙 Cinta Sesama • 🌿 Cinta Alam • 📚 Cinta Ilmu • 🇮🇩 Cinta Tanah Air
          </span>
          <button
            onClick={onOpenGitHubModal}
            className="flex items-center gap-1.5 bg-emerald-700/80 hover:bg-emerald-600 px-2.5 py-1 rounded-md text-[11px] font-semibold transition border border-emerald-500/40 text-emerald-50 cursor-pointer"
          >
            <span>Arsip Terbuka</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Brand & Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 shrink-0 border border-emerald-400/40">
              <span className="text-2xl font-serif">📖</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  Sistem <span className="text-emerald-700 font-serif">MI-KBC</span>
                </h1>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Versi 1.0 Resmi
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Pakar Kurikulum Nasional: Panduan, Perangkat Ajar, & Penilaian Kasih 11 Mata Pelajaran MI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="hidden sm:flex flex-col text-right pr-3 border-r border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">Prinsip Pokok</span>
              <span className="text-xs font-semibold text-emerald-800">Teladan adalah Metode Utama</span>
            </div>
            <button
              onClick={() => window.print()}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
              title="Cetak Tampilan Saat Ini"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Cepat</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar pt-3 mt-1 border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs shadow-emerald-700/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
