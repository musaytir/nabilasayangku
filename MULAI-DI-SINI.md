# Tiga Tahun, Tetap Kamu ♡

Website anniversary 3 tahun yang sudah berisi keenam foto kamu, animasi bunga berjatuhan, galeri, surat cinta, dan kejutan romantis. Semua aset ada di dalam folder ini. Setelah Live Server terpasang, website tidak membutuhkan internet, npm, build, akun, atau database.

## Cara menjalankan di VS Code

1. Ekstrak ZIP terlebih dahulu. Jangan menjalankan file langsung dari dalam ZIP.
2. Buka **Visual Studio Code → File → Open Folder**, lalu pilih folder **anniversary-3-tahun** yang berisi `index.html`.
3. Buka **Extensions** (`Ctrl+Shift+X` di Windows/Linux, `Cmd+Shift+X` di Mac). Cari dan pasang **Live Server**, penerbit **Ritwick Dey**. Rekomendasi ekstensi juga disertakan di folder `.vscode`.
4. Klik kanan `index.html` di Explorer VS Code → **Open with Live Server**. Website akan terbuka di browser.
5. Edit file dan simpan untuk melihat perubahan lewat Live Server.

Ekstensi resmi: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Panduan penerbit: https://ritwickdey.github.io/vscode-live-server/

Jika menu belum terlihat, pastikan seluruh folder telah dibuka. Buka Command Palette dan jalankan **Live Server: Open With Live Server**. Untuk menghentikan server, jalankan **Live Server: Stop Live Server**.

Alternatif cepat: klik dua kali `index.html`. Situs juga dirancang berjalan langsung dari file lokal pada browser modern, tetapi Live Server lebih nyaman untuk mengedit.

## Ganti nama dan isi surat

Buka `config.js`. Ubah nilai di dalam tanda kutip:

```js
window.ANNIVERSARY_CONFIG = {
  namaPasangan: "Sayang",
  namaPengirim: "Aku",
  isiSurat: []
};
```

Nama akan berubah otomatis di seluruh halaman. Pakai nama atau panggilan kalian sendiri. Jangan hapus tanda kutip dan koma. Gunakan panggilan singkat untuk tampilan yang paling rapi.

Untuk mengganti surat bawaan, isi `isiSurat` dengan paragraf-paragrafmu sendiri:

```js
isiSurat: [
  "Hai sayang, selamat tiga tahun untuk kita.",
  "Terima kasih sudah jadi bagian paling hangat dari hari-hariku.",
  "Aku mau terus memilih kamu."
]
```

Biarkan `isiSurat: []` jika ingin memakai surat romantis bawaan. Teks utama, caption foto, dan rahasia di akhir surat bisa diedit langsung di `index.html`.

## Isi folder

| File | Kegunaan |
| --- | --- |
| `index.html` | Isi halaman, caption foto, dan surat bawaan |
| `style.css` | Warna pink/mawar, layout desktop/HP, dan animasi |
| `script.js` | Bunga, galeri, tombol surat, rahasia, dan peluk |
| `config.js` | Nama pasangan, pengirim, dan paragraf surat opsional |
| `assets/photos/foto-01.png` sampai `foto-06.png` | Keenam foto kirimanmu |
| `.vscode/extensions.json` | Rekomendasi ekstensi Live Server |

Untuk mengganti foto, gunakan nama file yang sama atau ubah jalurnya di `index.html`. Simpan seluruh folder bersama-sama agar foto, CSS, dan JavaScript tetap terbaca.

## Yang bisa dilakukan di halaman

- Bunga merah muda dan merah berjatuhan otomatis.
- Tombol **Jeda animasi** menghentikan gerakan. Situs juga mengikuti pengaturan kurangi gerakan pada perangkat.
- **Ada surat buat kamu** dan kartu surat membuka surat cinta.
- **Satu rahasia lagi…** menampilkan pesan tambahan di akhir surat.
- Ketuk foto untuk memperbesar. Gunakan tombol panah, tombol keyboard kiri/kanan, atau geser di HP untuk berpindah foto.
- Tutup galeri/surat dengan tombol **×**, tombol **Escape**, atau klik area di luar kotak.
- **Kirim peluk ke aku** menampilkan balasan romantis dan semburan bunga. Ini interaksi lokal di halaman, bukan pengiriman pesan ke orang lain.

## Dibuka di perangkat lain

Cara paling mudah tanpa hosting adalah mengirim ZIP ini, lalu penerima mengekstraknya dan membuka `index.html` di komputer. Alamat localhost dari Live Server hanya menunjuk ke perangkat yang menjalankannya; alamat itu bukan tautan publik untuk dikirim ke pasangan. Tampilan website sudah disesuaikan untuk layar HP jika nanti dipasang pada hosting statis.

## Catatan pemeriksaan

Struktur HTML, pasangan referensi file lokal, keenam gambar, sintaks JavaScript, dan CSS diperiksa saat paket dibuat. Tampilan belum diuji melalui browser interaktif di lingkungan pembuatannya. Gunakan browser modern yang mendukung elemen HTML `dialog`.
