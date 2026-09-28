import React, { useState } from 'react';
import { Header } from './components/Header';
import { GeneratorTab } from './components/GeneratorTab';
import { LibraryTab } from './components/LibraryTab';
import { PapanKebaikanTab } from './components/PapanKebaikanTab';
import { AssessmentTab } from './components/AssessmentTab';
import { MatrixGuideTab } from './components/MatrixGuideTab';
import { TeacherReflectionTab } from './components/TeacherReflectionTab';
import { GitHubModal } from './components/GitHubModal';
import { ModulAjarMIKBC } from './types/curriculum';
import { EXEMPLAR_MODULES } from './data/curriculumData';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('generator');
  const [libraryModules, setLibraryModules] = useState<ModulAjarMIKBC[]>(EXEMPLAR_MODULES);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveToLibrary = (modul: ModulAjarMIKBC) => {
    // Check if module with same id already exists
    if (libraryModules.some((m) => m.id === modul.id)) {
      showNotification('Modul sudah ada dalam Pustaka Perangkat Ajar Anda.');
      return;
    }
    setLibraryModules([modul, ...libraryModules]);
    showNotification(`Modul "${modul.konteks.mapel} - ${modul.konteks.topik}" berhasil disimpan ke Pustaka.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'generator' && (
          <GeneratorTab onSaveToLibrary={handleSaveToLibrary} />
        )}

        {activeTab === 'library' && (
          <LibraryTab
            libraryModules={libraryModules}
            onSelectModul={(modul) => {
              // Switch to generator or view
            }}
          />
        )}

        {activeTab === 'papan-kebaikan' && <PapanKebaikanTab />}

        {activeTab === 'penilaian' && <AssessmentTab />}

        {activeTab === 'matriks' && <MatrixGuideTab />}

        {activeTab === 'refleksi' && <TeacherReflectionTab />}
      </main>

      {/* Open GitHub / Archive Modal */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* Official Standard Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3 text-slate-100">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-base font-serif">
                📖
              </span>
              <div>
                <p className="font-bold text-sm tracking-tight text-white">SISTEM MI-KBC NASIONAL</p>
                <p className="text-[11px] text-slate-400">Integrasi Kurikulum Merdeka × Kurikulum Berbasis Cinta (KBC)</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">💛 Cinta Tuhan</span>
              <span className="flex items-center gap-1">💚 Cinta Diri</span>
              <span className="flex items-center gap-1">💙 Cinta Sesama</span>
              <span className="flex items-center gap-1">🌿 Cinta Alam</span>
              <span className="flex items-center gap-1">📚 Cinta Ilmu</span>
              <span className="flex items-center gap-1">🇮🇩 Cinta Tanah Air</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px]">
            <p className="font-mono text-emerald-400">
              Disediakan oleh Sistem MI-KBC | Kurikulum Merdeka + Kurikulum Berbasis Cinta | Versi 1.0 — Siap disebarkan & dikembangkan bersama
            </p>
            <p className="text-slate-500">
              Pakar Kurikulum Nasional • Jenjang Madrasah Ibtidaiyah (Fase A, B, C)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
