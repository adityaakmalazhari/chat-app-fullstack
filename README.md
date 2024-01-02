### Chat-App Fullstack React + Laravel + OPEN AI API (CHATGPT CLONE)
Aplikasi chat yang dibuat menggunakan react js untuk front-end dan laravel untuk back-end. Aplikasi ini diintegrasikan menggunakan OPENAI API sehingga dapat membuat CHATGPT kita sendiri

![1](https://github.com/adityaakmalazhari/chat-app-fullstack/assets/93767825/cfa7060e-bc9f-44e3-b0b8-a6d3e4a0bd84)

Tampilan login

![2](https://github.com/adityaakmalazhari/chat-app-fullstack/assets/93767825/6f0c2f4d-1221-4f6f-a7c7-6a0cd4e93cdc)

Tampilan Signup

![3](https://github.com/adityaakmalazhari/chat-app-fullstack/assets/93767825/7edbc2a7-898c-4fcb-9a5b-34a8ab8f9bd8)

![4](https://github.com/adityaakmalazhari/chat-app-fullstack/assets/93767825/aa5f185d-8041-4fe4-a6d7-c0d56e607378)

Tampilan Chat-App dengan AI

## Teknologi yang Digunakan
- React JS for front-end
- Laravel for backend REST API
- Docker for virtual development
- Mysql for database
- Openai for 3rd party AI API

## Fitur Utama
- Login
- Signup
- Logout
- Basic chat dengan ai

## Kekurangan
- Aplikasi tidak menggunakan websocket sehingga tidak realtime dan harus refresh halaman setiap mengirim/menerima pesan
- Error handling belum sempurna sehingga ketika terjadi error tidak terhandle
- Implementasi react framework belum sempurna

Saat ini aplikasi masih dalam tahap development dan akan diupdate secara berkala

## Limit
- Maksimal request/chat dengan ai 3x/menit dan 200x/hari, jika melebihi limit harus menunggu

# Getting Started
## Front-end
- Masuk ke directory front-end dan masukan command berikut di terminal
  ```
  npm install
  npm run dev
  ```
- Silahkan buka browser dengan url ```localhost:{YOUR_PORT}```
- Ganti {YOUR_PORT} dengan port pilihan anda, disini saya menggunakan default port 5179

## Back-end
### Using Docker
- Masuk ke directory back-end dan silahkan buat file .env menggunakan salinan .env-example
- Silahkan atur port, database host, name, password, dan user sesuai keinginan anda
- Selanjutnya masukan command berikut di terminal
```
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate:fresh
```
