// Songbook data - configurable here
const songbookData = {
  albums: [
    {
      title: "Get Born, Stay Born",
      image: "images/getbornstayborn.png", // Add your album cover image path
      songs: [
        {
          id: "song1",
          title: "Song 1",
          originalLyrics: `Verse 1
This is the original lyrics
In English or whatever language

Chorus
Some chorus here`,
          translatedLyrics: `Verso 1
Esta é a letra original
Em inglês ou qualquer idioma

Refrão
Algum refrão aqui`,
          embedUrl: "https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh?utm_source=generator",
          technical: "Vocals: Gabriel Meale<br>Guitar: Gabriel Meale<br>Drums: Programmed<br>Mixing: Gabriel Meale",
          history: "This song was written during a creative period in 2023. It reflects personal experiences and emotions."
        },
        {
          id: "song2",
          title: "Song 2",
          originalLyrics: "Another song lyrics...",
          translatedLyrics: "Outra letra de música...",
          embedUrl: "https://open.spotify.com/embed/track/example2",
          technical: "Details here...",
          history: "History here..."
        }
      ]
    },
    {
      title: "Album 2",
      image: "images/f1.png", // Add your album cover image path
      songs: [
        {
          id: "song3",
          title: "Song 3",
          originalLyrics: "Lyrics...",
          translatedLyrics: "Letra...",
          embedUrl: "https://open.spotify.com/embed/track/example3",
          technical: "Tech...",
          history: "Hist..."
        }
      ]
    }
  ]
};

// Flatten songs for navigation
let allSongs = [];
let currentSongIndex = -1;

songbookData.albums.forEach(album => {
  allSongs = allSongs.concat(album.songs);
});

// Function to render album list in the sidebar
function renderAlbumList() {
  const list = document.getElementById('album-list');
  list.innerHTML = songbookData.albums.map((album, index) => `
    <div class="album-thumb" data-album-index="${index}">
      <img src="${album.image || 'https://via.placeholder.com/50x50?text=Cover'}" alt="${album.title} cover">
      <span>${album.title}</span>
      <ul class="song-dropdown" style="display: none;">
        ${album.songs.map(song => `<li class="song-item" data-song-id="${song.id}">${song.title}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  document.querySelectorAll('.album-thumb').forEach(el => {
    el.addEventListener('click', function() {
      const idx = this.dataset.albumIndex;
      toggleAlbumDropdown(idx);
    });
  });

  document.querySelectorAll('.song-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent album click
      const songId = this.dataset.songId;
      loadSong(songId);
    });
  });
}

// Toggle dropdown for a selected album
function toggleAlbumDropdown(albumIndex) {
  const album = songbookData.albums[albumIndex];
  const albumThumb = document.querySelector(`.album-thumb[data-album-index="${albumIndex}"]`);
  const dropdown = albumThumb.querySelector('.song-dropdown');
  const preview = document.getElementById('album-preview');

  // Hide all other dropdowns
  document.querySelectorAll('.song-dropdown').forEach(dd => {
    if (dd !== dropdown) dd.style.display = 'none';
  });
  document.querySelectorAll('.album-thumb').forEach(el => {
    el.classList.remove('active');
  });

  // Toggle this one
  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block';
    albumThumb.classList.add('active');
    // Show album preview
    preview.innerHTML = `
      <img src="${album.image || 'https://via.placeholder.com/150x150?text=Cover'}" alt="${album.title}">
      <h3>${album.title}</h3>
    `;
  } else {
    dropdown.style.display = 'none';
    albumThumb.classList.remove('active');
    // Hide preview
    preview.innerHTML = '';
  }
}

// Function to load song content
function loadSong(songId) {
  currentSongIndex = allSongs.findIndex(song => song.id === songId);
  const song = allSongs[currentSongIndex];

  if (song) {
    // Update hash for deep-linking
    if (window.location.hash.slice(1) !== song.id) {
      window.location.hash = song.id;
    }

    // Highlight active song
    document.querySelectorAll('.song-item').forEach(item => {
      item.classList.toggle('active', item.dataset.songId === song.id);
    });

    const content = document.getElementById('song-content');
    content.innerHTML = `
      <h2>${song.title}</h2>
      <div class="lyrics">
        <div class="original">
          <h3>Original Lyrics</h3>
          <pre>${song.originalLyrics}</pre>
        </div>
        <div class="translated">
          <h3>Portuguese Translation</h3>
          <pre>${song.portugueseLyrics}</pre>
        </div>
      </div>
      <div style="margin: 20px 0;">
        <iframe style="border-radius:12px" src="${song.embedUrl}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
      <h3>Technical Details</h3>
      <p>${song.technical}</p>
      <h3>History</h3>
      <p>${song.history}</p>
      <div class="song-nav">
        <button class="btn btn-secondary" onclick="prevSong()" ${currentSongIndex === 0 ? 'disabled' : ''}>Previous</button>
        <button class="btn btn-secondary" onclick="nextSong()" ${currentSongIndex === allSongs.length - 1 ? 'disabled' : ''}>Next</button>
      </div>
    `;
  }
}

function prevSong() {
  if (currentSongIndex > 0) {
    loadSong(allSongs[currentSongIndex - 1].id);
  }
}

function nextSong() {
  if (currentSongIndex < allSongs.length - 1) {
    loadSong(allSongs[currentSongIndex + 1].id);
  }
}

// Initialize on page load
function findAlbumIndexBySongId(songId) {
  return songbookData.albums.findIndex(album =>
    album.songs.some(song => song.id === songId)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  renderAlbumList();
  // Handle deep link to a specific song
  const hash = window.location.hash.slice(1);
  if (hash) {
    const songExists = allSongs.find(s => s.id === hash);
    if (songExists) {
      const albumIdx = findAlbumIndexBySongId(hash);
      if (albumIdx !== -1) {
        toggleAlbumDropdown(albumIdx);
      }
      loadSong(hash);
    }
  }
});