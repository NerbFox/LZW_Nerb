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
1. Open the terminal in the LZW_BE folder directory.
2. Enter the command `npm run dev` in the terminal.
3. Open the link "https://lzw-nerb.vercel.app" in your browser.
4. The program is now ready to use. There are two main input boxes: ASCII Input and Binary Input.
5. To perform compression, enter the text in ASCII format in the ASCII Input box and click the "Compress" button.
6. To perform decompression, enter the text in binary format in the Binary Input box and click the "Decompress" button.
7. The compression and decompression results will be displayed at the bottom of the input boxes. There is a "Copy Result" button to copy the compression or decompression result to the clipboard.
8. On the left side, there is a history box that contains the history of performed compressions and decompressions. To view the details of a compression or decompression, click on one of the history entries, and the details will be displayed in the input and output boxes according to their type (ASCII or Binary).
9. To delete a history entry, click the "Delete" button on the corresponding entry. To delete all history entries, click the "Delete All" button.
10. There is a message box in the bottom right corner to provide program status updates.


## Project Status
Project is: _complete_ 


## Room for Improvement

Room for improvement:
- speed up the algorithm
- improve user interface and user experience

