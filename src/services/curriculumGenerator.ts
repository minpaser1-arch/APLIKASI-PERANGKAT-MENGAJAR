import { CabangKasih, FaseMI, KelasMI, MapelMI, ModulAjarMIKBC } from '../types/curriculum';
import { CABANG_KASIH_LIST, DIMENSI_P5, DIMENSI_PPRA, MAPEL_MI_LIST } from '../data/curriculumData';

export interface GeneratorInput {
  namaMadrasah?: string;
  namaPenyusun?: string;
  mapel: MapelMI;
  kelas: KelasMI;
  fase: FaseMI;
  topik: string;
  alokasiWaktu?: string;
  kebutuhanKhusus?: string;
  semester?: string;
  tahunAjaran?: string;
  cabangKbcPilihan?: CabangKasih[];
  useAi?: boolean;
}

// Mapel KBC Matrix definition strictly from the prompt
export const MAPEL_KBC_MATRIX: Record<MapelMI, {
  titikIntegrasi: string;
  deskripsi: string;
  cabangPrioritas: CabangKasih[];
  dalilHikmah: string;
}> = {
  'Al-Qur’an & Hadis': {
    titikIntegrasi: 'Cinta Allah & Rasul ﷺ, syukur atas petunjuk, amalkan isi kandungan ayat',
    deskripsi: 'Menjadikan kalam Ilahi dan sunnah Rasulullah bukan sekadar lafal hafalan, melainkan lentera cinta yang membimbing lisan, hati, dan perbuatan siswa dalam mengasihi sesama makhluk.',
    cabangPrioritas: ['Cinta kepada Tuhan', 'Cinta Ilmu', 'Cinta Sesama'],
    dalilHikmah: 'QS. Al-Isra: 82 ("Dan Kami turunkan dari Al-Qur’an suatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman").',
  },
  'Akidah Akhlak': {
    titikIntegrasi: 'Cinta Tuhan, jujur, hormat, berakhlak, amanah, kasih kepada sesama',
    deskripsi: 'Membangun tauhid yang berakar pada kelembutan kalbu dan akhlak mulia; memupuk rasa aman di bawah naungan Asmaul Husna serta membiasakan sikap jujur dan pemaaf.',
    cabangPrioritas: ['Cinta kepada Tuhan', 'Cinta Diri', 'Cinta Sesama'],
    dalilHikmah: 'Hadis: "Sesungguhnya aku diutus hanya untuk menyempurnakan kesalehan akhlak." (HR. Ahmad).',
  },
  'Fikih': {
    titikIntegrasi: 'Cinta cara Allah mengatur hidup, tertib, bersih, peduli hak orang lain, berbagi',
    deskripsi: 'Memahami syariat ibadah dan muamalah sebagai panduan penuh kasih dari Allah agar hidup manusia tertata teratur, suci lahir batin, dan adil terhadap hak sesama makhluk.',
    cabangPrioritas: ['Cinta kepada Tuhan', 'Cinta Diri', 'Cinta Sesama'],
    dalilHikmah: 'Hadis: "Kesucian itu sebagian dari iman" (HR. Muslim) & QS. Al-Baqarah: 222 ("Sesungguhnya Allah menyukai orang-orang yang bertaubat dan menyukai orang-orang yang mensucikan diri").',
  },
  'Sejarah Kebudayaan Islam (SKI)': {
    titikIntegrasi: 'Teladani Nabi & tokoh, cinta damai, bangga ajaran Islam, menghormati perbedaan',
    deskripsi: 'Meneladani kepemimpinan Rasulullah ﷺ, para sahabat, dan ulama Nusantara yang menyebarkan Islam dengan jalan damai, kasih sayang, dan toleransi tanpa kekerasan.',
    cabangPrioritas: ['Cinta kepada Tuhan', 'Cinta Sesama', 'Cinta Tanah Air'],
    dalilHikmah: 'QS. Al-Anbiya: 107 ("Dan tiadalah Kami mengutus kamu, melainkan untuk menjadi rahmat bagi semesta alam").',
  },
  'Bahasa Indonesia': {
    titikIntegrasi: 'Sampaikan kebaikan, dengarkan sesama, tulis hal bermanfaat, hargai karya orang',
    deskripsi: 'Menggunakan bahasa persatuan sebagai jembatan silaturahmi, mengekspresikan pikiran dengan lisan yang santun dan jujur, serta mendengarkan teman dengan penuh empati.',
    cabangPrioritas: ['Cinta Sesama', 'Cinta Ilmu', 'Cinta Tanah Air'],
    dalilHikmah: 'QS. Al-Baqarah: 83 ("Dan bertuturkatalah yang baik kepada sesama manusia") & hadis: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata yang baik atau diam."',
  },
  'Matematika': {
    titikIntegrasi: 'Teliti, sabar, jujur, hemat, syukuri keteraturan ciptaan, bantu teman',
    deskripsi: 'Menikmati keindahan pola bilangan yang teratur sebagai karya agung Sang Pencipta; mengasah ketelitian jiwa, kejujuran berpikir, dan kesediaan membimbing sahabat yang kesulitan.',
    cabangPrioritas: ['Cinta Ilmu', 'Cinta Sesama', 'Cinta kepada Tuhan'],
    dalilHikmah: 'QS. Al-Qamar: 49 ("Sesungguhnya Kami menciptakan segala sesuatu menurut ukuran yang tepat").',
  },
  'IPAS': {
    titikIntegrasi: 'Syukur ciptaan Allah, pelihara alam, hidup sederhana, jaga tubuh amanah',
    deskripsi: 'Menjelajahi keajaiban alam semesta dan tubuh manusia sebagai titipan Ilahi yang wajib dirawat dengan penuh rasa takjub, kebiasaan hemat energi, dan kelestarian ekosistem.',
    cabangPrioritas: ['Cinta Alam', 'Cinta kepada Tuhan', 'Cinta Diri'],
    dalilHikmah: 'QS. Ar-Rum: 41 ("Telah tampak kerusakan di darat dan di laut disebabkan karena perbuatan tangan manusia...") & ajaran khalifah fil ardh.',
  },
  'IPS': {
    titikIntegrasi: 'Gotong royong, hormati perbedaan, cinta tanah air, lestarikan budaya, berbakti',
    deskripsi: 'Mengenal keragaman sosial budaya Nusantara dengan kebanggaan dan persaudaraan sejati; membiasakan gotong royong serta mengapresiasi kontribusi pahlawan dan leluhur bangsa.',
    cabangPrioritas: ['Cinta Tanah Air', 'Cinta Sesama', 'Cinta Ilmu'],
    dalilHikmah: 'QS. Al-Hujurat: 13 ("Wahai manusia, sesungguhnya Kami menciptakan kamu dari seorang laki-laki dan seorang perempuan dan menjadikan kamu berbangsa-bangsa dan bersuku-suku supaya kamu saling kenal-mengenal").',
  },
  'Bahasa Inggris': {
    titikIntegrasi: 'Sopan, hargai sesama, sampaikan kabar baik, kenal bangsa lain dengan kasih',
    deskripsi: 'Menguasai bahasa komunikasi antarbangsa untuk menebarkan citra keramahan Islam dan Indonesia yang rahmatan lil ‘alamin, serta saling mengenal sesama insan dunia secara bermartabat.',
    cabangPrioritas: ['Cinta Ilmu', 'Cinta Sesama', 'Cinta Tanah Air'],
    dalilHikmah: 'Prinsip ta’aruf antarbangsa dan hadis anjuran mempelajari bahasa kaum lain demi kemaslahatan umat.',
  },
  'Seni Budaya & Prakarya': {
    titikIntegrasi: 'Hargai keindahan ciptaan, rajin, sabar, berbagi karya, apresiasi teman',
    deskripsi: 'Mengekspresikan rasa keindahan yang dianugerahkan Allah melalui karya seni yang santun, melatih kesabaran dalam berkarya, dan senantiasa mengapresiasi keunikan karya teman.',
    cabangPrioritas: ['Cinta kepada Tuhan', 'Cinta Diri', 'Cinta Sesama'],
    dalilHikmah: 'Hadis: "Sesungguhnya Allah itu Maha Indah dan menyukai keindahan" (HR. Muslim).',
  },
  'PJOK': {
    titikIntegrasi: 'Jaga tubuh amanah Allah, disiplin, sportif, bantu teman, jaga kebersihan',
    deskripsi: 'Mensyukuri raga yang sehat sebagai amanah Allah dengan melatih kebugaran, menjaga sportivitas, menghormati teman bermain, dan saling menolong saat ada yang terjatuh.',
    cabangPrioritas: ['Cinta Diri', 'Cinta Sesama', 'Cinta kepada Tuhan'],
    dalilHikmah: 'Hadis: "Mukmin yang kuat lebih baik dan lebih dicintai Allah daripada mukmin yang lemah, namun pada keduanya ada kebaikan." (HR. Muslim).',
  },
};

export function generateModulAjarMIKBC(input: GeneratorInput): ModulAjarMIKBC {
  const mapelInfo = MAPEL_MI_LIST.find((m) => m.id === input.mapel) || MAPEL_MI_LIST[0];
  const matrix = MAPEL_KBC_MATRIX[input.mapel] || MAPEL_KBC_MATRIX['Al-Qur’an & Hadis'];

  // Determine selected KBC branches (2 to 4 branches)
  const selectedKbc: CabangKasih[] =
    input.cabangKbcPilihan && input.cabangKbcPilihan.length >= 2
      ? input.cabangKbcPilihan.slice(0, 4)
      : matrix.cabangPrioritas;

  const kelasNumber = input.kelas.replace('Kelas ', '');
  const header = `[MI-KBC] ${input.mapel} — ${input.kelas} — Topik: ${input.topik}`;

  // Step 2: 3-layer objectives
  const p5List = selectP5Dimensions(input.mapel, input.fase);
  const ppraList = selectPPRADimensions(input.mapel);

  const tujuanRumusan = `Siswa mampu memahami dan mengaplikasikan konsep ${input.topik.toLowerCase()}, bersikap ${getSikapKarakter(input.mapel)}, serta bersedia saling membantu dan menghargai teman sekelas — menyadari kebesaran ciptaan dan rahmat Allah SWT serta mensyukuri karunia akal dan budi pekerti yang dianugerahkan-Nya.`;

  // Step 3: 5 structured stages
  const kegiatan = generateKegiatan5Tahap(input.mapel, input.kelas, input.fase, input.topik, selectedKbc);

  // Step 5: 3-aspect assessment
  const penilaian = generatePenilaianTerpadu(input.mapel, input.topik, selectedKbc);

  // Step 6: Media and Resources
  const media = generateMediaLingkungan(input.mapel, input.topik);

  // Step 7: Teacher reflection
  const refleksi = generateRefleksiGuru(input.mapel, input.topik);

  return {
    id: `modul-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    header,
    konteks: {
      namaMadrasah: input.namaMadrasah || 'Madrasah Ibtidaiyah',
      namaPenyusun: input.namaPenyusun || 'Pendidik Teladan Kasih MI',
      mapel: input.mapel,
      kelas: input.kelas,
      fase: input.fase,
      topik: input.topik,
      alokasiWaktu: input.alokasiWaktu || '2 × 35 Menit (1 Pertemuan)',
      kebutuhanKhusus:
        input.kebutuhanKhusus ||
        'Diferensiasi proses: pendampingan bertahap dengan bimbingan sahabat sebaya (peer-tutoring) yang ramah dan suportif.',
      semester: input.semester || 'Semester Ganjil',
      tahunAjaran: input.tahunAjaran || '2026/2027',
    },
    tujuanTerpadu: {
      kompetensiAkademik: `Siswa mampu menguasai pemahaman esensial dan keterampilan aplikatif materi ${input.topik} sesuai capaian pembelajaran Fase ${input.fase.replace('Fase ', '')} Kurikulum Merdeka MI.`,
      profilPelajar: {
        pancasila: p5List,
        rahmatanLilAlamin: ppraList,
        deskripsi: `Mewujudkan Profil Pelajar Pancasila yang beriman, berakhlak mulia, bernalar kritis, dan bergotong royong, serta meneguhkan Profil Pelajar Rahmatan Lil ‘Alamin bercirikan keteladanan (qudwah), keadaban (ta'addub), dan keseimbangan (tawazun).`,
      },
      nilaiKBC: {
        cabangTerpilih: selectedKbc,
        deskripsi: `Mengintegrasikan ${selectedKbc.join(', ')} secara harmonis; menautkan pengetahuan kognitif dengan kehangatan rasa batin dan pembiasaan amal kebajikan sehari-hari.`,
      },
      rumusanUtuh: tujuanRumusan,
    },
    kegiatanTerpadu: kegiatan,
    integrasiKBCMapel: {
      titikIntegrasi: matrix.titikIntegrasi,
      penjelasanPenerapan: matrix.deskripsi,
      dalilAtauNilaiHikmah: matrix.dalilHikmah,
    },
    penilaian,
    mediaSumberBelajar: media,
    refleksiGuru: refleksi,
    footer: 'Disediakan oleh Sistem MI-KBC | Kurikulum Merdeka + Kurikulum Berbasis Cinta | Versi 1.0 — Siap disebarkan & dikembangkan bersama',
    createdAt: new Date().toISOString().split('T')[0],
  };
}

function selectP5Dimensions(mapel: MapelMI, fase: FaseMI): string[] {
  if (mapel === 'Al-Qur’an & Hadis' || mapel === 'Akidah Akhlak' || mapel === 'Fikih') {
    return ['Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia', 'Mandiri', 'Bergotong Royong'];
  }
  if (mapel === 'Matematika' || mapel === 'IPAS') {
    return ['Bernalar Kritis', 'Bergotong Royong', 'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia'];
  }
  if (mapel === 'IPS' || mapel === 'Bahasa Indonesia' || mapel === 'Bahasa Inggris') {
    return ['Berkebinekaan Global', 'Bergotong Royong', 'Bernalar Kritis'];
  }
  return ['Kreatif', 'Bergotong Royong', 'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia'];
}

function selectPPRADimensions(mapel: MapelMI): string[] {
  if (mapel === 'Akidah Akhlak' || mapel === 'Al-Qur’an & Hadis') {
    return ['Berkeadaban (Ta’addub)', 'Keteladanan (Qudwah)', 'Toleransi (Tasamuh)'];
  }
  if (mapel === 'Fikih' || mapel === 'Matematika') {
    return ['Berimbang (Tawazun)', 'Lurus dan Tegas (I’tidal)', 'Keteladanan (Qudwah)'];
  }
  if (mapel === 'Sejarah Kebudayaan Islam (SKI)' || mapel === 'IPS') {
    return ['Kewarganegaraan dan Kebangsaan (Muwatanah)', 'Musyawarah (Syura)', 'Toleransi (Tasamuh)'];
  }
  if (mapel === 'IPAS' || mapel === 'PJOK') {
    return ['Keteladanan (Qudwah)', 'Mengambil Jalan Tengah (Tawassut)', 'Dinamis dan Inovatif (Tathawwur wa Ibtikar)'];
  }
  return ['Berkeadaban (Ta’addub)', 'Keteladanan (Qudwah)', 'Dinamis dan Inovatif (Tathawwur wa Ibtikar)'];
}

function getSikapKarakter(mapel: MapelMI): string {
  switch (mapel) {
    case 'Al-Qur’an & Hadis':
      return 'khusyuk, menghormati firman Allah, dan gemar mengamalkan kebaikan';
    case 'Akidah Akhlak':
      return 'jujur, amanah, pemaaf, dan berbakti kepada orang tua serta guru';
    case 'Fikih':
      return 'tertib, mencintai kebersihan, dan menghargai hak beribadah sesama';
    case 'Sejarah Kebudayaan Islam (SKI)':
      return 'meneladani kesantunan Rasulullah ﷺ dan menjunjung persaudaraan damai';
    case 'Bahasa Indonesia':
      return 'santun dalam bertutur kata, tekun menyimak, dan menghargai karya orang lain';
    case 'Matematika':
      return 'teliti, sabar, jujur dalam proses hitung, dan suka membantu teman';
    case 'IPAS':
      return 'kagum pada ayat kauniyah ciptaan Allah dan berhati-hati menjaga kelestarian alam';
    case 'IPS':
      return 'bangga pada tanah air, rukun dalam kebinekaan, dan gemar bergotong royong';
    case 'Bahasa Inggris':
      return 'percaya diri, bersikap sopan santun, dan menghargai perbedaan budaya';
    case 'Seni Budaya & Prakarya':
      return 'kreatif, menghargai keindahan fitrah, tekun, dan mengapresiasi karya sesama';
    case 'PJOK':
      return 'disiplin, sportif, peduli kesehatan tubuh sebagai titipan Allah, dan saling menjaga';
    default:
      return 'jujur, santun, dan peduli sesama';
  }
}

function generateKegiatan5Tahap(
  mapel: MapelMI,
  kelas: KelasMI,
  fase: FaseMI,
  topik: string,
  kbcBranches: CabangKasih[]
) {
  const c1 = kbcBranches[0] || 'Cinta kepada Tuhan';
  const c2 = kbcBranches[1] || 'Cinta Sesama';
  const c3 = kbcBranches[2] || 'Cinta Ilmu';

  return [
    {
      bagian: '🕌 Pembukaan',
      durasi: '5–7 menit',
      isiKegiatan: `Sapa hangat penuh keibuan/kebapakan, doa pembuka bersama dengan khusyuk, apersepsi mengaitkan materi ${topik} dengan nikmat dan kasih sayang Allah SWT, serta penyampaian kesepakatan kelas saling menghargai.`,
      penyisipanKBC: `💛 Cinta kepada Tuhan & 💙 Cinta Sesama: Guru mengawali dengan salam penuh senyuman tulus, menanyakan kabar batin siswa, dan menanamkan niat suci bahwa belajar ${mapel} hari ini adalah ibadah dan wujud cinta kepada Tuhan serta sesama insan.`,
      aktivitasGuru: `Menyambut setiap siswa dengan hangat, memimpin doa kelapangan dada (Rabbisyrahli shadri), dan mengaitkan materi ${topik} dengan manfaat nyata bagi kehidupan diri dan sesama.`,
      aktivitasSiswa: `Berdoa bersama dengan khidmat, menyapa teman sebangku dengan senyum ramah, dan menyimak tujuan pembelajaran dengan rasa antusias.`,
    },
    {
      bagian: '💡 Inti — Eksplorasi',
      durasi: '8–10 menit',
      isiKegiatan: `Pemantik rasa ingin tahu melalui kisah inspiratif, media konkret, atau fenomena nyata terkait ${topik}. Menghubungkan materi dengan kebesaran Allah SWT dan kebaikan ajaran-Nya.`,
      penyisipanKBC: `${c1} & ${c3}: Menumbuhkan rasa takjub dan cinta ilmu. Siswa diajak menyadari bahwa di balik materi ${topik} tersimpan hikmah agung dan keteraturan rancangan Sang Maha Pencipta.`,
      aktivitasGuru: `Menyajikan stimulus (cerita/benda konkret/gambar kontekstual) dan melontarkan pertanyaan pemantik yang menyentuh akal dan hati: "Mengapa Allah mengaruniakan hikmah ini kepada kita?"`,
      aktivitasSiswa: `Mengamati stimulus dengan cermat, berani mengajukan pertanyaan dengan santun tanpa rasa takut salah, dan menghubungkan materi dengan pengalaman hidup mereka.`,
    },
    {
      bagian: '🤝 Inti — Elaborasi',
      durasi: '12–15 menit',
      isiKegiatan: `Aktivitas kolaboratif berpasangan atau kelompok kecil "Sahabat Berhati Mulia". Menyelesaikan lembar kegiatan bernalar terkait ${topik} dengan prinsip saling bantu, saling menyimak, dan mengutamakan proses pemahaman.`,
      penyisipanKBC: `💙 Cinta Sesama & 💚 Cinta Diri: Siswa yang lebih cepat memahami materi bertindak sebagai fasilitator kasih bagi temannya; tidak ada yang merasa tersisih atau direndahkan. Siswa membangun kepercayaan diri bahwa ia mampu bertumbuh.`,
      aktivitasGuru: `Berkeliling dengan ramah memberikan pendampingan diferensiasi, memuji ketekunan dan kerja sama kelompok, serta mencontohkan tutur kata lembut saat meluruskan kekeliruan konsep.`,
      aktivitasSiswa: `Berdiskusi aktif dalam kelompok kecil, saling bertukar ide dengan adil, mendengarkan saran teman dengan sabar, dan menyusun hasil karya pemecahan masalah dengan teliti.`,
    },
    {
      bagian: '🌟 Inti — Konfirmasi',
      durasi: '5–7 menit',
      isiKegiatan: `Perwakilan siswa/kelompok membagikan temuan karya mereka. Guru dan kelas memberikan apresiasi atas setiap proses usaha belajar, lalu menghubungkan materi ${topik} dengan amal nyata kebajikan.`,
      penyisipanKBC: `💚 Cinta Diri & 💙 Cinta Sesama: Budaya saling mengapresiasi (memberikan tepuk kasih atau kalimat santun seperti "Usahamu luar biasa"). Menegaskan bahwa setiap anak memiliki keunikan dan potensi yang dihargai Allah.`,
      aktivitasGuru: `Memberikan penguatan konsep esensial, memvalidasi proses usaha siswa dengan pujian spesifik (bukan sekadar hasil angka), dan mengaitkan konsep dengan amalan shalih.`,
      aktivitasSiswa: `Mempresentasikan hasil karya dengan santun dan rendah hati, memberikan tepuk tangan apresiasi kepada rekan kelompok lain, dan menerima masukan dengan lapang dada.`,
    },
    {
      bagian: '💌 Penutup',
      durasi: '5–7 menit',
      isiKegiatan: `Merumuskan simpulan bermakna bersama siswa. Refleksi batin mandiri: "Apa kebaikan yang bisa saya lakukan hari ini setelah mempelajari ${topik}?". Doa penutup kafaratul majelis dan pesan penguatan teladan.`,
      penyisipanKBC: `💛 Cinta kepada Tuhan & ${c2}: Mengakhiri pembelajaran dengan rasa syukur mendalam, berjanji mengamalkan ilmu untuk menolong orang tua atau teman di rumah dan lingkungan madrasah.`,
      aktivitasGuru: `Memandu refleksi diri siswa, memberikan kalimat motivasi penguat jiwa, memimpin doa penutup, dan mengantar siswa dengan senyum serta doa keberkahan.`,
      aktivitasSiswa: `Menyimpulkan intisari pelajaran, merenungkan komitmen kebaikan diri di buku harian kasih, dan berdoa bersama dengan penuh kekhusyukan.`,
    },
  ];
}

function generatePenilaianTerpadu(mapel: MapelMI, topik: string, kbcBranches: CabangKasih[]) {
  return {
    akademik: {
      fokus: `Penguasaan materi esensial ${topik}, penalaran kritis, dan keterampilan aplikatif sesuai jenjang.`,
      cara: 'Lembar kerja bernalar, tes lisan dialogis yang menyejukkan, penilaian unjuk kerja / portofolio karya nyata.',
      indikator: [
        `Menunjukkan pemahaman konsep inti mengenai ${topik}`,
        'Mampu menghubungkan teori dengan penerapan praktis di lingkungan sekitar',
        'Mampu memecahkan soal/tantangan dengan penalaran yang runtut dan rapi',
      ],
    },
    sikapAkhlak: {
      fokus: `Kejujuran dalam proses belajar, kesantunan bertutur kata, ketertiban adab di majelis ilmu, dan kedisiplinan.`,
      cara: 'Pengamatan harian berbasis ceklis perilaku positif dan jurnal catatan sikap pendidik.',
      indikator: [
        'Jujur dalam mengerjakan tugas dan mengakui jika belum memahami materi',
        'Menunjukkan sikap sopan santun kepada guru dan sesama sahabat madrasah',
        'Menjaga ketertiban ruang belajar serta merawat kebersihan fasilitas kelas',
      ],
    },
    kbc: {
      fokus: `Pertumbuhan nilai ${kbcBranches.join(', ')} — kemampuan bersyukur, empati menolong teman, dan merawat lingkungan tanpa pamrih.`,
      cara: 'Catatan kejadian nyata (anekdotal), observasi kebiasaan berbuat baik, dan refleksi diri siswa.',
      indikator: [
        'Terbiasa mengucapkan kalimat thayyibah (Alhamdulillah, Subhanallah) atas proses belajar',
        'Secara sukarela membantu sahabat sebangku yang mengalami kesulitan',
        'Merawat perlengkapan belajar dan lingkungan madrasah dengan penuh kepedulian',
      ],
    },
    umpanBalikStandar:
      'Kamu sudah berusaha dengan sungguh-sungguh dan tekun hari ini — itu sangat membanggakan. Bagian ini bisa kita perbaiki dan sempurnakan pelan-pelan bersama, bapak/ibu guru yakin kamu pasti bisa berkembang lebih baik lagi!',
    panduanEvaluasiDiri:
      'PRINSIP MUTLAK: Tidak ada pengumuman peringkat umum atau perbandingan antar-siswa di kelas. Kemajuan setiap anak dinilai dan dibandingkan HANYA dengan rekam jejak capaian dirinya sendiri sebelumnya (self-referenced growth). Berikan umpan balik yang membesarkan hati, memuat apresiasi usaha nyata, arah perbaikan yang jelas, dan keyakinan tulus bahwa sang anak mampu menuntaskannya.',
  };
}

function generateMediaLingkungan(mapel: MapelMI, topik: string) {
  return {
    alatBahanSederhana: [
      'Alat peraga manipulatif sederhana yang mudah didapat di madrasah (kartu gambar, wadah botol, kancing/batu bersih)',
      'Lembar aktivitas ramah lingkungan yang dapat dihias sendiri oleh siswa menggunakan bahan daur ulang',
      'Papan tulis kecil / kertas flipchart kelompok untuk menuliskan ide kebaikan',
    ],
    sumberBelajarLingkungan: [
      'Halaman dan pekarangan madrasah sebagai laboratorium alam dan tempat pengamatan nyata',
      'Musholla / masjid madrasah untuk penguatan ibadah dan pembiasaan adab mulia',
      'Interaksi nyata antarsahabat, ustadz/ustadzah, dan warga madrasah sekitar',
    ],
    papanHatiMulia:
      'Papan "Anak Berhati Mulia" dipajang di dinding kelas untuk menyematkan bintang apresiasi kebaikan (misal: "Hari ini Ananda meminjamkan pensil dengan senyum", "Ananda sabar menjelaskan materi pada temannya"). Bukan untuk peringkat angka akademis!',
    ruangKelasBerkarakter:
      'Ruang kelas berhiaskan kaligrafi Asmaul Husna, kutipan ayat kasih sayang, pajangan hasil karya seluruh siswa tanpa diskriminasi, serta pojok baca yang nyaman dan asri.',
  };
}

function generateRefleksiGuru(mapel: MapelMI, topik: string) {
  return {
    bagianMenyentuhHati: `Melihat sorot mata anak-anak yang berbinar penuh kelegaan ketika guru menguatkan bahwa tidak perlu takut salah dalam proses belajar ${topik}, serta menyaksikan momen siswa saling membantu sahabat sebangkunya dengan tulus.`,
    bagianPerluPerbaikan: `Pengaturan alokasi waktu pada fase elaborasi kelompok perlu dijaga lebih proporsional agar fase konfirmasi dan refleksi penutup tidak tergesa-gesa.`,
    tindakLanjut: `Menyediakan media belajar pendukung yang lebih bervariasi bagi siswa yang membutuhkan waktu lebih tenang, serta terus menyelipkan afirmasi kasih sayang dalam setiap teguran pembiasaan.`,
    refleksiBatin: `Apakah saya menjadi teladan kasih hari ini? — Saya telah berikhtiar menyambut anak-anak dengan senyum hangat, menahan amarah saat terjadi dinamika kelas, mendengarkan mereka dengan sabar, dan memperlakukan setiap anak sebagai titipan amanah yang mulia dari Allah SWT.`,
  };
}

export function formatModulAsMarkdown(modul: ModulAjarMIKBC): string {
  return `# ${modul.header}

## 📋 LANGKAH 1 — EKSTRAKSI KONTEKS
- **Nama Madrasah**: ${modul.konteks.namaMadrasah || 'Madrasah Ibtidaiyah'}
- **Penyusun**: ${modul.konteks.namaPenyusun || 'Pendidik MI Berbasis Cinta'}
- **Mata Pelajaran**: ${modul.konteks.mapel}
- **Fase / Kelas**: ${modul.konteks.fase} / ${modul.konteks.kelas}
- **Materi Pokok / Topik**: ${modul.konteks.topik}
- **Alokasi Waktu**: ${modul.konteks.alokasiWaktu}
- **Kebutuhan Khusus**: ${modul.konteks.kebutuhanKhusus || 'Diferensiasi proses dan pendampingan sebaya yang ramah'}
- **Tahun Ajaran / Semester**: ${modul.konteks.tahunAjaran || '2026/2027'} - ${modul.konteks.semester || 'Semester Ganjil'}

---

## 🎯 LANGKAH 2 — PERUMUSAN TUJUAN TERPADU (3 LAPIS)
1. **KOMPETENSI AKADEMIK**:  
   ${modul.tujuanTerpadu.kompetensiAkademik}

2. **PROFIL PELAJAR**:  
   - *Profil Pelajar Pancasila*: ${modul.tujuanTerpadu.profilPelajar.pancasila.join(', ')}  
   - *Profil Pelajar Rahmatan Lil ‘Alamin*: ${modul.tujuanTerpadu.profilPelajar.rahmatanLilAlamin.join(', ')}  
   - *Deskripsi*: ${modul.tujuanTerpadu.profilPelajar.deskripsi}

3. **NILAI KBC (Cabang Terpilih)**:  
   - *Cabang*: ${modul.tujuanTerpadu.nilaiKBC.cabangTerpilih.join(' | ')}  
   - *Deskripsi*: ${modul.tujuanTerpadu.nilaiKBC.deskripsi}

> **Rumusan Utuh Tujuan Pembelajaran**:  
> "${modul.tujuanTerpadu.rumusanUtuh}"

---

## ⏱️ LANGKAH 3 — ALUR KEGIATAN TERPADU (5 TAHAP)

| Bagian | Durasi | Isi Kegiatan & Penyisipan Nilai KBC |
| :--- | :--- | :--- |
${modul.kegiatanTerpadu
  .map(
    (k) =>
      `| **${k.bagian}** | ${k.durasi} | **Kegiatan**: ${k.isiKegiatan}<br>**Penyisipan KBC**: ${k.penyisipanKBC}<br>*Peran Guru*: ${k.aktivitasGuru}<br>*Aktivitas Siswa*: ${k.aktivitasSiswa} |`
  )
  .join('\n')}

---

## 🌿 LANGKAH 4 — INTEGRASI KBC PER MATA PELAJARAN
- **Mata Pelajaran**: ${modul.konteks.mapel}
- **Titik Integrasi KBC**: ${modul.integrasiKBCMapel.titikIntegrasi}
- **Penerapan Konkret**: ${modul.integrasiKBCMapel.penjelasanPenerapan}
- **Dalil / Nilai Hikmah**: ${modul.integrasiKBCMapel.dalilAtauNilaiHikmah}

---

## 📊 LANGKAH 5 — PENYUSUNAN PENILAIAN TERPADU (3 ASPEK)

| Aspek | Fokus Penilaian | Cara Penilaian & Indikator |
| :--- | :--- | :--- |
| **📝 Akademik** | ${modul.penilaian.akademik.fokus} | **Cara**: ${modul.penilaian.akademik.cara}<br>**Indikator**:<br>${modul.penilaian.akademik.indikator.map((i) => `- ${i}`).join('<br>')} |
| **💚 Sikap & Akhlak** | ${modul.penilaian.sikapAkhlak.fokus} | **Cara**: ${modul.penilaian.sikapAkhlak.cara}<br>**Indikator**:<br>${modul.penilaian.sikapAkhlak.indikator.map((i) => `- ${i}`).join('<br>')} |
| **💛 KBC (Nilai Kasih)** | ${modul.penilaian.kbc.fokus} | **Cara**: ${modul.penilaian.kbc.cara}<br>**Indikator**:<br>${modul.penilaian.kbc.indikator.map((i) => `- ${i}`).join('<br>')} |

### 🔒 Aturan Mutlak Penilaian MI-KBC:
1. **Tidak Ada Peringkat Umum**: Menghindarkan kecemasan dan persaingan tidak sehat antarsiswa.
2. **Evaluasi Diri Sendiri**: Membandingkan perkembangan capaian anak dengan dirinya pada periode sebelumnya.
3. **Umpan Balik Menguatkan (Standar)**:  
   > *"${modul.penilaian.umpanBalikStandar}"*
4. **Prinsip Evaluasi Diri**: ${modul.penilaian.panduanEvaluasiDiri}

---

## 📦 LANGKAH 6 — MEDIA & SUMBER BELAJAR
- **Alat & Bahan Sederhana**:
${modul.mediaSumberBelajar.alatBahanSederhana.map((m) => `  - ${m}`).join('\n')}
- **Sumber Belajar Lingkungan**:
${modul.mediaSumberBelajar.sumberBelajarLingkungan.map((s) => `  - ${s}`).join('\n')}
- **Papan "Anak Berhati Mulia"**: ${modul.mediaSumberBelajar.papanHatiMulia}
- **Suasana Ruang Kelas Berkarakter**: ${modul.mediaSumberBelajar.ruangKelasBerkarakter}

---

## ❤️ LANGKAH 7 — REFLEKSI GURU (WAJIB ADA DI SETIAP KELUARAN)
- **✅ Bagian yang menyentuh hati siswa**:  
  ${modul.refleksiGuru.bagianMenyentuhHati}
- **⚠️ Bagian perlu perbaikan**:  
  ${modul.refleksiGuru.bagianPerluPerbaikan}
- **💡 Tindak lanjut**:  
  ${modul.refleksiGuru.tindakLanjut}
- **❤️ Refleksi batin**:  
  *${modul.refleksiGuru.refleksiBatin}*

---

${modul.footer}
`;
}
