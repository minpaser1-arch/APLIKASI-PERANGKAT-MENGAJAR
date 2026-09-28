export type FaseMI = 'Fase A' | 'Fase B' | 'Fase C';

export type KelasMI = 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'Kelas 4' | 'Kelas 5' | 'Kelas 6';

export type MapelMI =
  | 'Al-Qur’an & Hadis'
  | 'Akidah Akhlak'
  | 'Fikih'
  | 'Sejarah Kebudayaan Islam (SKI)'
  | 'Bahasa Indonesia'
  | 'Matematika'
  | 'IPAS'
  | 'IPS'
  | 'Bahasa Inggris'
  | 'Seni Budaya & Prakarya'
  | 'PJOK';

export type CabangKasih =
  | 'Cinta kepada Tuhan'
  | 'Cinta Diri'
  | 'Cinta Sesama'
  | 'Cinta Alam'
  | 'Cinta Ilmu'
  | 'Cinta Tanah Air';

export interface CabangKasihInfo {
  id: CabangKasih;
  emoji: string;
  name: string;
  description: string;
  contohPerilakuMI: string;
  warna: string;
  bgWarna: string;
  borderWarna: string;
}

export interface MapelInfo {
  id: MapelMI;
  kategori: 'Pendidikan Agama Islam' | 'Mata Pelajaran Umum';
  icon: string;
  titikIntegrasiKBC: string;
  faseTersedia: FaseMI[];
  contohTopik: Record<FaseMI, string[]>;
}

export interface AlurKegiatanTahap {
  bagian: string;
  durasi: string;
  isiKegiatan: string;
  penyisipanKBC: string;
  aktivitasGuru: string;
  aktivitasSiswa: string;
}

export interface PenilaianTerpadu {
  akademik: {
    fokus: string;
    cara: string;
    indikator: string[];
  };
  sikapAkhlak: {
    fokus: string;
    cara: string;
    indikator: string[];
  };
  kbc: {
    fokus: string;
    cara: string;
    indikator: string[];
  };
  umpanBalikStandar: string;
  panduanEvaluasiDiri: string;
}

export interface RefleksiGuru {
  bagianMenyentuhHati: string;
  bagianPerluPerbaikan: string;
  tindakLanjut: string;
  refleksiBatin: string;
}

export interface ModulAjarMIKBC {
  id: string;
  header: string; // [MI-KBC] Nama Mapel — Kelas X — Topik: ...
  
  // Langkah 1 - Ekstraksi Konteks
  konteks: {
    namaMadrasah?: string;
    namaPenyusun?: string;
    mapel: MapelMI;
    kelas: KelasMI;
    fase: FaseMI;
    topik: string;
    alokasiWaktu: string;
    kebutuhanKhusus?: string;
    semester?: string;
    tahunAjaran?: string;
  };

  // Langkah 2 - Perumusan Tujuan Terpadu (3 Lapis)
  tujuanTerpadu: {
    kompetensiAkademik: string; // TP Kurikulum Merdeka MI
    profilPelajar: {
      pancasila: string[];
      rahmatanLilAlamin: string[];
      deskripsi: string;
    };
    nilaiKBC: {
      cabangTerpilih: CabangKasih[];
      deskripsi: string;
    };
    rumusanUtuh: string; // Format standar 1 paragraf terpadu
  };

  // Langkah 3 - Alur Kegiatan Terpadu (5 Tahap)
  kegiatanTerpadu: AlurKegiatanTahap[];

  // Langkah 4 - Integrasi KBC Spesifik Mapel
  integrasiKBCMapel: {
    titikIntegrasi: string;
    penjelasanPenerapan: string;
    dalilAtauNilaiHikmah: string;
  };

  // Langkah 5 - Penyusunan Penilaian Terpadu (3 Aspek)
  penilaian: PenilaianTerpadu;

  // Langkah 6 - Media & Sumber Belajar
  mediaSumberBelajar: {
    alatBahanSederhana: string[];
    sumberBelajarLingkungan: string[];
    papanHatiMulia: string;
    ruangKelasBerkarakter: string;
  };

  // Langkah 7 - Refleksi Guru
  refleksiGuru: RefleksiGuru;

  footer: string; // Disediakan oleh Sistem MI-KBC | Kurikulum Merdeka + Kurikulum Berbasis Cinta | Versi 1.0 — Siap disebarkan & dikembangkan bersama
  createdAt: string;
}

export interface SiswaKebaikan {
  id: string;
  nama: string;
  kelas: KelasMI;
  cabangKasih: CabangKasih;
  tindakanKebaikan: string;
  tanggal: string;
  apresiasiGuru: string;
}

export interface PenilaianSiswaIndividual {
  id: string;
  namaSiswa: string;
  kelas: KelasMI;
  mapel: MapelMI;
  capaianAkademik: {
    skorKemajuan: 'Memerlukan Bimbingan' | 'Berkembang Sesuai Harapan' | 'Sangat Berkembang';
    catatanKemajuan: string;
  };
  capaianAkhlak: {
    sikapMenonjol: string;
    perkembangan: string;
  };
  capaianKBC: {
    cabangDominan: CabangKasih;
    tindakanTeramati: string;
  };
  umpanBalikKasih: string;
}
