# LZW_Nerb
Lempel-Ziv-Welch algorithm web application  

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [How to Run](#how-to-run)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
LZW Nerb is a web application that can be used to compress ASCII text into binary and decompress binary into ASCII text using LZW algorithm. LZW is Lemper-Ziv-Welch algorithm that is used to compress data. This web has a database for the history of compression and decompression. 


## Technologies Used
- ReactJS
- NodeJS
- ExpressJS
- MongoDB
- Vercel


## Features
List the ready features here:
- Input ASCII text and compress it into binary
- Input binary and decompress it into ASCII text
- Copy the result to clipboard
- See the history of compression and decompression
- See the detail of compression and decompression
- Delete the history of compression and decompression
- Delete all history of compression and decompression


## Screenshots
![Example screenshot](./img/example.jpg)


## How to Run
1. Buka terminal pada direktori folder LZW_BE
2. Ketikkan perintah `npm run dev` pada terminal
3. Buka tautan "https://lzw-nerb.vercel.app" pada browser
4. Program siap digunakan
5. Terdapat dua box input utama yaitu ASCII Input dan Binary Input
6. Untuk melakukan kompresi, masukkan teks dalam bentuk ASCII pada ASCII Input dan klik tombol "Compress"
7. Untuk melakukan dekompresi, masukkan teks dalam bentuk binary pada Binary Input dan klik tombol "Decompress"
8. Hasil kompresi dan dekompresi akan ditampilkan pada bagian bawah box input
9. Terdapat tombol "Copy Result" untuk menyalin hasil kompresi atau dekompresi ke clipboard
10. Pada sisi sebelah kiri terdapat box history yang berisi riwayat kompresi dan dekompresi yang telah dilakukan
11. Untuk melihat detail dari kompresi atau dekompresi, klik salah satu riwayat pada box history, maka akan muncul detail kompresi atau dekompresi pada box input dan output sesuai dengan jenisnya (ASCII atau Binary)
12. Untuk menghapus riwayat, klik tombol "Delete" pada riwayat yang ingin dihapus
13. Untuk menghapus semua riwayat, klik tombol "Delete All"
14. Tersedia kotak pesan di pojok kanan bawah untuk memberitahukan status program


## Project Status
Project is: _complete_ 


## Room for Improvement

Room for improvement:
- speed up the algorithm
- improve user interface and user experience

