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
    // {
    //   title: "Album 2",
    //   image: "images/album2.jpg", // Add your album cover image path
    //   songs: [
    //     {
    //       id: "song3",
    //       title: "Song 3",
    //       originalLyrics: "Lyrics...",
    //       translatedLyrics: "Letra...",
    //       embedUrl: "https://open.spotify.com/embed/track/example3",
    //       technical: "Tech...",
    //       history: "Hist..."
    //     }
    //   ]
    // }
  ]
};

// Flatten songs for navigation
let allSongs = [];
let currentSongIndex = -1;

songbookData.albums.forEach(album => {
  allSongs = allSongs.concat(album.songs);
});

// Function to render album grid
function renderAlbumGrid() {
  const grid = document.getElementById('album-grid');
  grid.innerHTML = songbookData.albums.map((album, index) => `
    <div class="album-card" data-album-index="${index}">
      <img src="${album.image || 'https://via.placeholder.com/250x200?text=Album+Cover'}" alt="${album.title} cover">
      <div class="card-body">
        <h5>${album.title}</h5>
      </div>
      <div class="song-list" style="display: none;">
        ${album.songs.map(song => `<div class="song-item" data-song-id="${song.id}">${song.title}</div>`).join('')}
      </div>
    </div>
  `).join('');

  // Add click handlers for albums
  document.querySelectorAll('.album-card').forEach(card => {
    card.addEventListener('click', function() {
      const albumIndex = this.dataset.albumIndex;
      const songList = this.querySelector('.song-list');
      const isExpanded = this.classList.contains('album-expanded');

      // Hide all other song lists
      document.querySelectorAll('.song-list').forEach(list => list.style.display = 'none');
      document.querySelectorAll('.album-card').forEach(c => c.classList.remove('album-expanded'));

      if (!isExpanded) {
        songList.style.display = 'block';
        this.classList.add('album-expanded');
      }
    });
  });

  // Add click handlers for songs
  document.querySelectorAll('.song-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent album click
      const songId = this.dataset.songId;
      loadSong(songId);
    });
  });
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
          <h3>Translated Lyrics</h3>
          <pre>${song.translatedLyrics}</pre>
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
document.addEventListener('DOMContentLoaded', () => {
  renderAlbumGrid();
  // Handle deep link
  const hash = window.location.hash.slice(1);
  if (hash) {
    const songExists = allSongs.find(s => s.id === hash);
    if (songExists) {
      loadSong(hash);
    }
  }
});