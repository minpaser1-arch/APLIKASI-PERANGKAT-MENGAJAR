import { GoogleGenAI } from '@google/genai';
import { GeneratorInput, generateModulAjarMIKBC } from './curriculumGenerator';
import { ModulAjarMIKBC } from '../types/curriculum';

export async function generateWithOptionalAI(input: GeneratorInput): Promise<{
  modul: ModulAjarMIKBC;
  isAiGenerated: boolean;
  notes?: string;
}> {
  // Check if API key is present in client or environment
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;

  if (!input.useAi || !apiKey) {
    // Return high quality deterministic expert model directly
    const modul = generateModulAjarMIKBC(input);
    return {
      modul,
      isAiGenerated: false,
      notes: 'Dihasilkan oleh Mesin Pakar Kurikulum Nasional MI-KBC terstruktur.',
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Anda adalah Pakar Kurikulum Nasional yang mengintegrasikan Kurikulum Merdeka (Kemendikbudristek & Kemenag RI) dan Kurikulum Berbasis Cinta (KBC) untuk Madrasah Ibtidaiyah (MI).
Tugas Anda: Susun Modul Ajar / RPP terpadu siap pakai untuk:
Mata Pelajaran: ${input.mapel}
Kelas: ${input.kelas} (${input.fase})
Topik: ${input.topik}
Alokasi Waktu: ${input.alokasiWaktu || '2 x 35 Menit'}
Kebutuhan Khusus: ${input.kebutuhanKhusus || 'Diferensiasi proses dan sahabat sebaya'}

Patuhi 7 LANGKAH ALGORITMA:
Langkah 1: Ekstraksi Konteks
Langkah 2: Tujuan Terpadu 3 Lapis (Kompetensi Akademik, Profil Pelajar Pancasila + PPRA, Nilai KBC 2-4 cabang: Cinta kepada Tuhan, Cinta Diri, Cinta Sesama, Cinta Alam, Cinta Ilmu, Cinta Tanah Air) dengan 1 rumusan utuh.
Langkah 3: Alur Kegiatan 5 Tahap (Pembukaan 5-7m, Inti Eksplorasi 8-10m, Inti Elaborasi 12-15m, Inti Konfirmasi 5-7m, Penutup 5-7m) dengan integrasi KBC dan aktivitas guru-siswa.
Langkah 4: Integrasi KBC Mapel sesuai matriks.
Langkah 5: Penilaian Terpadu 3 Aspek (Akademik, Sikap & Akhlak, KBC) TANPA peringkat, evaluasi diri sendiri, dan umpan balik menguatkan.
Langkah 6: Media & Sumber Belajar lingkungan madrasah dan Papan "Anak Berhati Mulia".
Langkah 7: Refleksi Guru (Menyentuh hati, Perlu perbaikan, Tindak lanjut, Refleksi batin teladan).

Kembalikan jawaban dalam format JSON murni dengan struktur:
{
  "tujuanUtuh": "...",
  "kompetensiAkademik": "...",
  "profilP5": ["..."],
  "profilPPRA": ["..."],
  "cabangKbc": ["..."],
  "kegiatan": [
    {
      "bagian": "🕌 Pembukaan",
      "durasi": "5–7 menit",
      "isiKegiatan": "...",
      "penyisipanKBC": "...",
      "aktivitasGuru": "...",
      "aktivitasSiswa": "..."
    },
    ...
  ],
  "titikIntegrasi": "...",
  "penjelasanIntegrasi": "...",
  "dalil": "...",
  "penilaianAkademikCara": "...",
  "penilaianAkademikIndikator": ["..."],
  "penilaianSikapCara": "...",
  "penilaianSikapIndikator": ["..."],
  "penilaianKbcCara": "...",
  "penilaianKbcIndikator": ["..."],
  "umpanBalik": "...",
  "mediaSederhana": ["..."],
  "sumberLingkungan": ["..."],
  "refleksiHati": "...",
  "refleksiPerbaikan": "...",
  "refleksiTindakLanjut": "...",
  "refleksiBatin": "..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      const baseModul = generateModulAjarMIKBC(input);

      // Merge AI insights with standard MI-KBC structure
      baseModul.tujuanTerpadu.rumusanUtuh = parsed.tujuanUtuh || baseModul.tujuanTerpadu.rumusanUtuh;
      baseModul.tujuanTerpadu.kompetensiAkademik = parsed.kompetensiAkademik || baseModul.tujuanTerpadu.kompetensiAkademik;
      if (Array.isArray(parsed.profilP5) && parsed.profilP5.length > 0) {
        baseModul.tujuanTerpadu.profilPelajar.pancasila = parsed.profilP5;
      }
      if (Array.isArray(parsed.profilPPRA) && parsed.profilPPRA.length > 0) {
        baseModul.tujuanTerpadu.profilPelajar.rahmatanLilAlamin = parsed.profilPPRA;
      }
      if (Array.isArray(parsed.kegiatan) && parsed.kegiatan.length === 5) {
        baseModul.kegiatanTerpadu = parsed.kegiatan;
      }
      if (parsed.titikIntegrasi) {
        baseModul.integrasiKBCMapel.titikIntegrasi = parsed.titikIntegrasi;
      }
      if (parsed.penjelasanIntegrasi) {
        baseModul.integrasiKBCMapel.penjelasanPenerapan = parsed.penjelasanIntegrasi;
      }
      if (parsed.dalil) {
        baseModul.integrasiKBCMapel.dalilAtauNilaiHikmah = parsed.dalil;
      }
      if (parsed.umpanBalik) {
        baseModul.penilaian.umpanBalikStandar = parsed.umpanBalik;
      }
      if (parsed.refleksiHati) {
        baseModul.refleksiGuru.bagianMenyentuhHati = parsed.refleksiHati;
      }
      if (parsed.refleksiPerbaikan) {
        baseModul.refleksiGuru.bagianPerluPerbaikan = parsed.refleksiPerbaikan;
      }
      if (parsed.refleksiTindakLanjut) {
        baseModul.refleksiGuru.tindakLanjut = parsed.refleksiTindakLanjut;
      }
      if (parsed.refleksiBatin) {
        baseModul.refleksiGuru.refleksiBatin = parsed.refleksiBatin;
      }

      return {
        modul: baseModul,
        isAiGenerated: true,
        notes: 'Disempurnakan secara dinamis melalui Gemini 2.5 Flash sesuai kaidah Kurikulum Merdeka & KBC MI.',
      };
    }
  } catch (error) {
    console.warn('AI generation fallback to deterministic engine:', error);
  }

  // Graceful fallback
  const modul = generateModulAjarMIKBC(input);
  return {
    modul,
    isAiGenerated: false,
    notes: 'Dihasilkan oleh Algoritma Kurikulum Nasional MI-KBC.',
  };
}
