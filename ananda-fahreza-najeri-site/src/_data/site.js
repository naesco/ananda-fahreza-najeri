const configuredUrl = process.env.SITE_URL;

if (process.env.VERCEL && !configuredUrl) {
  throw new Error(
    'Konfigurasi belum lengkap: atur environment variable SITE_URL di Vercel ke URL produksi, misalnya https://nama-proyek.vercel.app.'
  );
}

const url = (configuredUrl || 'http://localhost:8080').replace(/\/+$/, '');

export default {
  name: 'Ananda Fahreza Najeri',
  url,
  language: 'id-ID',
  year: new Date().getFullYear(),
  description: 'Portofolio akademik dan personal untuk menghimpun artikel, esai, opini, dan karya tulis Ananda Fahreza Najeri.',
  author: {
    name: 'Ananda Fahreza Najeri'
  },
  socialImage: '/assets/images/social-card.png',
  categories: [
    {
      name: 'Esai dan Opini',
      description: 'Gagasan, argumen, dan pembacaan kritis terhadap isu yang relevan.',
      cmsCategory: 'Opini'
    },
    {
      name: 'Jurnalistik',
      description: 'Artikel, laporan, dan catatan yang berangkat dari pengamatan serta sumber.',
      cmsCategory: 'Jurnalistik'
    },
    {
      name: 'Akademik',
      description: 'Karya dengan struktur yang tertata, rujukan yang jelas, dan konteks yang memadai.',
      cmsCategory: 'Akademik'
    },
    {
      name: 'Literasi Digital',
      description: 'Tulisan mengenai informasi, media, teknologi, dan masyarakat.',
      cmsCategory: 'Literasi Digital'
    }
  ]
};
