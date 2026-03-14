$(document).ready(function() {
  let songsData = window.songbookData || {
    "albums": []
  };
  let currentAlbum = null;
  let currentSong = null;

  // Initialize the page
  initializePage();

  function initializePage() {
    populateAlbums();
    loadCachedState();
  }

  function populateAlbums() {
    const albumList = $('#album-list');
    albumList.empty();
    songsData.albums.forEach(album => {
      const button = $('<img>')
        .addClass('banana')
        .attr('src', album.cover)
        .attr('alt', album.title)
        .data('album-id', album.id)
        .click(function() {
          selectAlbum(album.id);
        });
      albumList.append(button);
    });
  }

  function selectAlbum(albumId) {
    currentAlbum = songsData.albums.find(a => a.id === albumId);
    currentSong = null;
    updateUI();
    localStorage.setItem('selectedAlbum', albumId);
    localStorage.removeItem('selectedSong');
  }

  function selectSong(songId) {
    currentSong = currentAlbum.songs.find(s => s.id === songId);
    updateUI();
    localStorage.setItem('selectedSong', songId);
  }

  function updateUI() {
    const content = $('#song-content');
    let html = `
      <div class="placeholder">
        <h2>Welcome to the Songbook</h2>
        <p>Please choose an album and then a song 👆</p>
        <div id="album-preview"></div>
      </div>
    `;

    html += `<div id="album-list" class="album-list-container"></div>`;

    if (currentAlbum) {
      html += `
        <div class="album-selector">
          <h3>Selected Album: ${currentAlbum.title}</h3>
          <img src="${currentAlbum.cover}" alt="${currentAlbum.title}" style="max-width: 200px;">
        </div>
      `;

      if (currentSong) {
        html += `
          <div class="song-display">
            <div class="song-title">${currentSong.title}</div>
            <div class="song-lyrics">${currentSong.lyrics}</div>
            <div class="song-iframe">${currentSong.iframe}</div>
            <div class="song-technical">
              <h4>Parte Técnica</h4>
              <p>${currentSong.technical}</p>
            </div>
            <div class="song-credits">
              <h4>Créditos</h4>
              <p>${currentSong.credits}</p>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="song-selector">
            <h4>Choose a song:</h4>
            <select id="song-select">
              <option value="">Select a song</option>
            </select>
          </div>
        `;
      }
    }

    content.html(html);
    populateAlbums();

    if (currentAlbum && !currentSong) {
      const songSelect = $('#song-select');
      currentAlbum.songs.forEach(song => {
        songSelect.append(`<option value="${song.id}">${song.title}</option>`);
      });
      songSelect.change(function() {
        const songId = $(this).val();
        if (songId) {
          selectSong(songId);
        }
      });
    }
  }

  function loadCachedState() {
    const cachedAlbum = localStorage.getItem('selectedAlbum');
    const cachedSong = localStorage.getItem('selectedSong');

    if (cachedAlbum) {
      selectAlbum(cachedAlbum);
      if (cachedSong) {
        selectSong(cachedSong);
      }
    }
  }
});