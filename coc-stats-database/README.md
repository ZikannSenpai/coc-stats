# Clash Intel - CoC Stats Database

Dashboard Next.js untuk riset statistik Hero Gear, Spell, Troop, Hero, pencarian, filter kategori, level selector, dan kalkulator Earthquake.

## Jalankan di Termux / PC
```bash
npm install
npm run dev
```
Buka `http://localhost:3000`.

## Struktur
- `app/`: halaman dan styling
- `components/Dashboard.tsx`: UI, pencarian, level selector, kalkulator
- `data/items.json`: dataset yang bisa diedit
- `lib/`: tipe dan helper data

## Catatan dataset
Dataset bawaan ini adalah starter/demo dataset, bukan daftar statistik resmi lengkap atau terverifikasi untuk patch game terkini. Beberapa level hanya titik referensi. Verifikasi angka sebelum dipakai saat war. UI membaca titik level yang ada di `data/items.json`, jadi tambahkan baris untuk setiap level yang ingin tersedia.

Contoh format:
```json
{
  "id": "example-item",
  "name": "Example Item",
  "category": "gear",
  "rarity": "Epic",
  "hero": "Archer Queen",
  "maxLevel": 27,
  "description": "Deskripsi item.",
  "stats": [{"level": 1, "damage": 100}, {"level": 2, "damage": 110}],
  "tags": ["damage"]
}
```
Kategori: `gear`, `spell`, `troop`, `hero`.

Kalkulator Earthquake saat ini menghitung damage satu cast berdasarkan persentase HP awal. Field jumlah cast belum menerapkan aturan diminishing returns.
