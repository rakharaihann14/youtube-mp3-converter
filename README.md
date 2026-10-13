# 🎵 YouTube to MP3 & MP4 Converter (Web Tool)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://en.wikipedia.org/wiki/HTML5)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com)

A lightweight, high-performance, and responsive web application designed to convert and download YouTube videos into **MP3 (Audio up to 320kbps)** and **MP4 (Video up to 1080p)** formats. 

Built with clean semantic HTML5, vanilla CSS, and client-side JavaScript with zero heavyweight dependencies.

---

## 🌐 Live Demo & Powered By

Experience the full live version and high-speed music search engine:

👉 **Official Live Demo & Engine:** [**KK Motors MP3Juice - Free MP3 Music Download**](https://kkmotors.co.za)  
*(High-speed music search engine supporting 320kbps MP3 audio downloads, fast indexing, and multi-language support)*

---

## ✨ Features

- 🎧 **Dual Format Conversion:** Seamless one-click switching between **MP3 audio** and **MP4 video**.
- ⚡ **Instant Metadata Extraction:** Uses YouTube's official oEmbed API for instant title, creator, and thumbnail preview without requiring API keys.
- 🌓 **Light / Dark Mode:** Built-in theme switcher with persistent local storage state.
- 📱 **Mobile-First & Responsive:** Clean vintage Web 2.0 interface optimized for smartphones, tablets, and desktop browsers.
- 🚀 **Zero Backend Required:** 100% static client-ready — deployable directly to **GitHub Pages**, **Vercel**, **Netlify**, or standard web servers (Apache / Nginx).
- 🌐 **Multilingual Ready:** Navigation and text prepared for international localization (ID, EN, ES, DE, FR, PT, VI).

---

## 🛠️ Project Structure

```text
├── assets/
│   ├── css/
│   │   └── style.css       # Clean responsive styling & dark theme tokens
│   ├── images/
│   │   └── logo.svg        # Scalable YouTube MP3 Shark vector logo
│   └── js/
│       └── app.js          # Converter client engine & URL parsing logic
├── index.html              # Main converter application
├── faq.html                # Frequently Asked Questions (Tanya Jawab)
├── terms.html              # Terms of Use page
├── README.md               # Documentation & repository guide
└── .gitignore
```

---

## 🚀 Quick Start / Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/youtube-mp3-converter.git
   cd youtube-mp3-converter
   ```

2. **Run locally:**
   Because this is a pure client-side project, you can simply open `index.html` in your web browser:
   - Double click `index.html`, OR
   - Serve using PHP built-in server:
     ```bash
     php -S localhost:8000
     ```
   - Serve using Node.js:
     ```bash
     npx serve .
     ```

3. **Deploy to GitHub Pages:**
   - Go to your repository **Settings** > **Pages**.
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Select `main` branch and `/ (root)` folder.
   - Click **Save**. Your converter is now live!

---

## 🔗 Supported YouTube URL Formats

- Standard: `https://www.youtube.com/watch?v=KMU0tzLwhbE`
- Shortened: `https://youtu.be/KMU0tzLwhbE`
- Shorts: `https://www.youtube.com/shorts/KMU0tzLwhbE`
- Embed: `https://www.youtube.com/embed/KMU0tzLwhbE`
- Direct Video ID: `KMU0tzLwhbE`

---

## 🤝 Sponsorship & Partner Links

This open-source project is maintained and sponsored by:
- [**KK Motors**](https://kkmotors.co.za) — Free MP3 Juice Music Downloader & Online Audio Converter.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
