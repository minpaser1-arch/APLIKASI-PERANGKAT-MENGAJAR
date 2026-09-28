import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, GitBranch, Heart, Shield, Code } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const readmeContent = `# Sistem MI-KBC: Integrasi Kurikulum Merdeka & Kurikulum Berbasis Cinta (KBC)
## Khusus Jenjang Madrasah Ibtidaiyah (Fase A, B, C)
*Versi 1.0 — Arsip Terbuka Nasional*

### 🌿 Visi & Filosofi
Mengintegrasikan Capaian Pembelajaran Kurikulum Merdeka (Kemendikbudristek & Kemenag RI) dengan 6 Cabang Kasih Kurikulum Berbasis Cinta (KBC) tanpa kompromi, tanpa tambal-sulam.

### 💛 6 Cabang Kasih:
1. 💛 **Cinta kepada Tuhan**: Syukur, ibadah tulus, mengagumi kebesaran ciptaan-Nya.
2. 💚 **Cinta Diri**: Menjaga kesehatan, percaya diri yang sehat, kejujuran, menjauhi hal merusak.
3. 💙 **Cinta Sesama**: Empati, saling menolong, hormat pada orang tua & guru, kasih antarteman.
4. 🌿 **Cinta Alam**: Menjaga kebersihan madrasah, menyiram tanaman, hemat energi, peduli lingkungan.
5. 📚 **Cinta Ilmu**: Rasa ingin tahu mendalam, gemar membaca, tekun memecahkan masalah.
6. 🇮🇩 **Cinta Tanah Air**: Bangga Indonesia, toleransi kebinekaan, kerukunan persaudaraan.

### 📐 6 Prinsip Wajib yang Tidak Boleh Disepelengkan:
1. **Sesuai Jenjang MI**: Fase A (Kls I–II), Fase B (Kls III–IV), Fase C (Kls V–VI).
2. **KBC Menyatu, Bukan Ditambal**: Tujuan, kegiatan, media, penilaian melekat organik.
3. **Penilaian Terpadu**: Akademik + Akhlak/Sikap + Pertumbuhan KBC. Tanpa ranking antarsiswa!
4. **Teladan adalah Metode Utama**: Guru sebagai teladan iman, ilmu, dan kasih.
5. **Bahasa Lugas, Baku, Menguatkan**: Memotivasi tanpa menakuti anak.
6. **Siap Pakai Langsung**: Format 7 langkah baku untuk 11 mata pelajaran MI.

### 📚 11 Mata Pelajaran MI:
Al-Qur’an & Hadis | Akidah Akhlak | Fikih | SKI | Bahasa Indonesia | Matematika | IPAS | IPS | Bahasa Inggris | Seni Budaya & Prakarya | PJOK

### 📜 Lisensi & Atribusi:
Bebas untuk pendidik & lembaga pendidikan madrasah/sekolah di seluruh Nusantara.
Wajib mencantumkan atribusi:
"Disediakan oleh Sistem MI-KBC | Kurikulum Merdeka + Kurikulum Berbasis Cinta | Versi 1.0"
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(readmeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([readmeContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README_MI_KBC.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Arsip Terbuka & GitHub Repository</h3>
              <p className="text-xs text-slate-400">Dokumentasi Terbuka Kurikulum Nasional MI-KBC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-1">
            <span className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-700 fill-emerald-600" />
              Komitmen Pengembang Teknis (GitHub & Vercel / Cloud Run)
            </span>
            <p className="text-slate-700 text-xs leading-relaxed">
              Repositori ini didesain sebagai arsip hidup (living open curriculum) yang siap disebarkan, dikloning, dan dikembangkan bersama seluruh musyawarah guru (KKG/MGMP) MI di Indonesia.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>README.md (Dokumentasi Induk)</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto max-h-56 whitespace-pre-wrap leading-relaxed">
              {readmeContent}
            </pre>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <h5 className="font-bold text-slate-900">Petunjuk Penyimpanan Berkas:</h5>
            <p>1. Tekan tombol <strong>"Unduh README.md"</strong> untuk menyimpan berkas master ke komputer Anda.</p>
            <p>2. Setiap Modul Ajar dapat diekspor langsung ke format Markdown (.md) yang rapi untuk di-push ke branch repositori Anda.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh README.md</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
