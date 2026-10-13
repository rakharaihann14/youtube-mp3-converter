/**
 * YouTube MP3 - Online Video Converter
 * Standalone Client-side API & UI Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('converterForm');
  const input = document.getElementById('urlInput');
  const convertBtn = document.getElementById('convertBtn');
  const formatTabs = document.querySelectorAll('.format-tab');
  const statusMsg = document.getElementById('statusMessage');
  const resultCard = document.getElementById('resultCard');
  const resultThumb = document.getElementById('resultThumb');
  const resultTitle = document.getElementById('resultTitle');
  const resultAuthor = document.getElementById('resultAuthor');
  const downloadLink = document.getElementById('downloadLink');
  const alternativeLink = document.getElementById('alternativeLink');
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');

  let currentFormat = 'mp3';

  // 1. Dark Mode Management
  const savedTheme = localStorage.getItem('ytmp3_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('ytmp3_theme', 'light');
      updateThemeIcon(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('ytmp3_theme', 'dark');
      updateThemeIcon(true);
    }
  });

  function updateThemeIcon(isDark) {
    themeToggle.innerHTML = isDark 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // 2. Language Dropdown Toggle
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    langMenu.classList.remove('show');
  });

  // 3. Format Switch Tabs (mp3 / mp4)
  formatTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      formatTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFormat = tab.getAttribute('data-format');
      
      // If result is already showing, update the download action text
      if (resultCard.style.display === 'block') {
        updateDownloadButtons(currentFormat);
      }
    });
  });

  // 4. Form Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rawUrl = input.value.trim();

    if (!rawUrl) {
      showStatus('Harap masukkan URL video YouTube terlebih dahulu.', 'error');
      return;
    }

    const videoId = extractYouTubeId(rawUrl);
    if (!videoId) {
      showStatus('URL YouTube tidak valid. Contoh format: https://www.youtube.com/watch?v=KMU0tzLwhbE', 'error');
      return;
    }

    // UI Loading State
    setLoading(true);
    hideStatus();
    resultCard.style.display = 'none';

    try {
      // Step A: Fetch Video Meta via official YouTube oEmbed API (CORS-friendly, no API key needed)
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const metaResponse = await fetch(oembedUrl);
      
      let title = `YouTube Video (${videoId})`;
      let author = 'YouTube Creator';
      let thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      if (metaResponse.ok) {
        const metaData = await metaResponse.json();
        title = metaData.title || title;
        author = metaData.author_name || author;
        thumbUrl = metaData.thumbnail_url || thumbUrl;
      }

      // Step B: Set Card Content
      resultTitle.textContent = title;
      resultTitle.title = title;
      resultAuthor.textContent = author;
      resultThumb.src = thumbUrl;

      // Step C: Setup Download Links
      setupDownloadLinks(videoId, title, currentFormat);

      // Show Card
      resultCard.style.display = 'block';
      hideStatus();
    } catch (err) {
      console.error(err);
      showStatus('Terjadi kendala saat memproses video. Silakan coba kembali.', 'error');
    } finally {
      setLoading(false);
    }
  });

  // Helper: Extract YouTube ID
  function extractYouTubeId(url) {
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return url;
    }
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return (match && match[1]) ? match[1] : null;
  }

  // Setup Download Links with Multi-Endpoint Fallback
  function setupDownloadLinks(videoId, title, format) {
    const isAudio = format === 'mp3';
    
    // Primary Cobalt / Direct Endpoint
    const cleanTitle = encodeURIComponent(title.replace(/[\/\\?%*:|"<>]/g, ''));
    
    // Direct converter endpoints
    const converterUrl = isAudio 
      ? `https://api.vevioz.com/api/button/mp3/${videoId}` 
      : `https://api.vevioz.com/api/button/videos/${videoId}`;

    const secondaryUrl = `https://loader.to/api/card/?url=https://www.youtube.com/watch?v=${videoId}`;

    downloadLink.href = converterUrl;
    downloadLink.target = '_blank';
    downloadLink.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Unduh ${format.toUpperCase()}
    `;

    alternativeLink.href = secondaryUrl;
    alternativeLink.target = '_blank';
    alternativeLink.innerHTML = `Server Alternatif`;
  }

  function updateDownloadButtons(format) {
    const rawUrl = input.value.trim();
    const videoId = extractYouTubeId(rawUrl);
    if (videoId) {
      setupDownloadLinks(videoId, resultTitle.textContent, format);
    }
  }

  function setLoading(isLoading) {
    if (isLoading) {
      convertBtn.disabled = true;
      convertBtn.textContent = 'Memproses...';
      showStatus('<div class="spinner"></div> Menghubungkan ke server converter...', 'info');
    } else {
      convertBtn.disabled = false;
      convertBtn.textContent = 'Konversi';
    }
  }

  function showStatus(html, type) {
    statusMsg.className = `status-message ${type}`;
    statusMsg.innerHTML = html;
    statusMsg.style.display = type === 'info' ? 'flex' : 'block';
  }

  function hideStatus() {
    statusMsg.style.display = 'none';
    statusMsg.innerHTML = '';
  }
});
