import { rm } from 'node:fs/promises';

await rm(new URL('../_site', import.meta.url), { recursive: true, force: true });
console.log('Folder _site/ berhasil dibersihkan.');
