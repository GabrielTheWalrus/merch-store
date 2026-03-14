// ===== SONGBOOK DATA STRUCTURE =====
// This is the main data containing all albums and songs
// You can easily add new albums and songs here

const songbookData = [
  {
    id: 'get_born_stay_born',
    name: 'Get Born, Stay Born',
    description: 'Debut album, released in 2025',
    songs: [
      {
        id: 'dont_let_the_sun_go_down',
        title: 'Don\'t Let the Sun Go Down',
        artist: 'Gabriel Meale',
        spotifyIframe: '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2EKFIyXbnkd4oanTU8Nknr?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        duration: '3:21',
        key: 'Bb Major',
        bpm: 80,
        genre: 'Pop Rock',
        lyricsOriginal: `In the coldest morning
The birds don't sing
The flowers don't bloom
But when you appear
Everything begins to live again

Don't let the sun go down
That's the only thing I ask of you
Don't let the sun go down
Everything will be as we want it to

On the coldest day
I just can stay
Waiting for you
And when you appear
I feel happy and warm again

Don't let the sun go down
That's the only thing I ask of you
Don't let the sun go down
Everything will be as we want it to

In the lifeless evening
When I'm so tired
My eyes can't see
But when you appear
I feel safe with you again

Don't let the sun go down
That's the only thing I ask of you
Don't let the sun go down
Everything will be as we want it to

Don't let the sun go down
That's the only thing I ask of you
Don't let the sun go down
Everything will be as we want it to

Oooh
Oooh`,
        lyricsTranslated: `Na manhã mais fria
Os pássaros não cantam
As flores não desabrocham
Mas quando você aparece
Tudo começa a viver novamente

Não deixe o sol se pôr
É a única coisa que peço a você
Não deixe o sol se pôr
Tudo será como queremos

No dia mais frio
Eu simplesmente posso ficar
Esperando por você
E quando você aparece
Me sinto feliz e aquecido novamente

Não deixe o sol se pôr
É a única coisa que peço a você
Não deixe o sol se pôr
Tudo será como queremos

Em uma noite sem vida
Quando estou muito cansado
Meus olhos não conseguem ver
Mas quando você aparece
Eu me sinto segura com você novamente

Não deixe o sol se pôr
É a única coisa que peço a você
Não deixe o sol se pôr
Tudo será como queremos

Não deixe o sol se pôr
É a única coisa que peço a você
Não deixe o sol se pôr
Tudo será como queremos

Oooh
Oooh`,
        story: `<p>This is the story behind your first song. Tell the listeners where you got the inspiration, how you created it, and what it means to you.</p>
<p>You can add multiple paragraphs to make it more engaging and personal.</p>`,
        credits: [
          { role: 'Vocals', name: 'Gabriel Meale' },
          { role: 'Guitar', name: 'Your Guitarist' },
          { role: 'Drums', name: 'Your Drummer' },
          { role: 'Bass', name: 'Your Bassist' }
        ]
      },
      {
        id: 'song2',
        title: 'Another Song',
        artist: 'Gabriel Meale',
        spotifyIframe: '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2EKFIyXbnkd4oanTU8Nknr?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        duration: '4:12',
        key: 'G Major',
        bpm: 140,
        genre: 'Rock',
        lyricsOriginal: `Second song lyrics in English line 1
Second song lyrics in English line 2
Second song lyrics in English line 3`,
        lyricsTranslated: `Letra da segunda música em português linha 1
Letra da segunda música em português linha 2
Letra da segunda música em português linha 3`,
        story: `<p>This is the story of your second song.</p>`,
        credits: [
          { role: 'Vocals', name: 'Gabriel Meale' },
          { role: 'Guitar', name: 'Your Guitarist' }
        ]
      }
    ]
  },
  {
    id: 'album2',
    name: 'Example Album 2',
    description: 'Your second album',
    songs: [
      {
        id: 'song3',
        title: 'Third Song',
        artist: 'Gabriel Meale',
        spotifyIframe: '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2EKFIyXbnkd4oanTU8Nknr?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
        duration: '3:30',
        key: 'D Major',
        bpm: 100,
        genre: 'Soul',
        lyricsOriginal: `Third song lyrics in English line 1
Third song lyrics in English line 2`,
        lyricsTranslated: `Letra da terceira música em português linha 1
Letra da terceira música em português linha 2`,
        story: `<p>The story of your third song goes here.</p>`,
        credits: [
          { role: 'Vocals', name: 'Gabriel Meale' },
          { role: 'Piano', name: 'Your Pianist' }
        ]
      }
    ]
  }
];

// ===== GLOBAL VARIABLES =====

let currentSong = null;
let currentAlbumId = null;
let allSongs = [];

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  initializeSongbook();
});

// Fallback in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSongbook);
} else {
  console.log('Initializing songbook immediately');
  initializeSongbook();
}

function initializeSongbook() {
  console.log('Initializing songbook...');
  const albumsList = document.getElementById('albumsList');
  console.log('Albums list element:', albumsList);
  
  renderAlbums();
  flattenAllSongs();
  
  // restore last selected song if available
  try {
    const lastAlbum = localStorage.getItem('lastAlbum');
    const lastSong = localStorage.getItem('lastSong');
    if (lastAlbum && lastSong) {
      // slightly delay until DOM elements exist
      setTimeout(() => loadSong(lastSong, lastAlbum), 100);
    }
  } catch (e) {
    console.warn('Could not retrieve last song from localStorage', e);
  }

  console.log('Songbook initialized. Albums:', songbookData.length, 'Total songs:', allSongs.length);
}

// ===== FLATTEN ALL SONGS FOR NAVIGATION =====

function flattenAllSongs() {
  allSongs = [];
  songbookData.forEach(album => {
    album.songs.forEach(song => {
      allSongs.push({...song, albumId: album.id});
    });
  });
}

// ===== RENDER ALBUMS AND SONGS =====

function renderAlbums() {
  console.log('renderAlbums called');
  const albumsList = document.getElementById('albumsList');
  if (!albumsList) {
    console.error('Could not find albumsList element!');
    return;
  }
  
  console.log('Found albumsList, clearing and rendering', songbookData.length, 'albums');
  albumsList.innerHTML = '';

  songbookData.forEach(album => {
    console.log('Rendering album:', album.name);
    const albumItem = document.createElement('div');
    albumItem.className = 'album-item';
    albumItem.innerHTML = `
      <button class="album-toggle" onclick="toggleAlbum('${album.id}')">
        <span>${album.name}</span>
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="songs-list" id="album-${album.id}">
        ${album.songs.map(song => `
          <div class="song-item" data-song-id="${song.id}" data-album-id="${album.id}" onclick="loadSong('${song.id}', '${album.id}')">
            <i class="fas fa-music"></i> ${song.title}
          </div>
        `).join('')}
      </div>
    `;
    albumsList.appendChild(albumItem);
  });
  
  console.log('Albums rendered successfully');
}

// ===== TOGGLE ALBUM DROPDOWN =====

function toggleAlbum(albumId) {
  const albumList = document.getElementById(`album-${albumId}`);
  const toggle = event.target.closest('.album-toggle');

  // Close all other albums
  document.querySelectorAll('.songs-list').forEach(list => {
    if (list.id !== `album-${albumId}`) {
      list.classList.remove('show');
    }
  });

  document.querySelectorAll('.album-toggle').forEach(btn => {
    if (btn !== toggle) {
      btn.classList.remove('active');
    }
  });

  // Toggle current album
  albumList.classList.toggle('show');
  toggle.classList.toggle('active');
}

// ===== LOAD AND DISPLAY SONG =====

function loadSong(songId, albumId) {
  // Find the song in the data structure
  const album = songbookData.find(a => a.id === albumId);
  const song = album?.songs.find(s => s.id === songId);

  if (!song) return;

  currentSong = {...song, albumId: albumId};
  currentAlbumId = albumId;

  // Hide empty state and show song content
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('songContent').classList.remove('hidden');

  // on small screens hide sidebar automatically
  if (window.innerWidth <= 768) {
    document.querySelector('.songbook_sidebar').classList.add('sidebar-hidden');
    const btn = document.getElementById('showAlbumsBtn');
    if (btn) btn.style.display = 'block';
  }

  // Update active indicators by data attributes (handles calls without event)
  document.querySelectorAll('.song-item').forEach(item => {
    item.classList.remove('active');
  });
  const selector = `.song-item[data-song-id="${songId}"][data-album-id="${albumId}"]`;
  const activeItem = document.querySelector(selector);
  if (activeItem) activeItem.classList.add('active');

  // populate content
  populateSongContent(song);

  // Update buttons
  updateNavigationButtons();

  // Scroll to top
  document.querySelector('.songbook_content').scrollTop = 0;

  // persist selection in localStorage
  try {
    localStorage.setItem('lastSong', songId);
    localStorage.setItem('lastAlbum', albumId);
  } catch (e) {
    console.warn('Could not store last song in localStorage', e);
  }
}

// ===== POPULATE SONG DISPLAY =====

function populateSongContent(song) {
  // Title and Artist
  document.getElementById('songTitle').textContent = song.title;
  document.getElementById('songArtist').textContent = song.artist;

  // Spotify Iframe
  const spotifyContainer = document.getElementById('spotifyContainer');
  spotifyContainer.innerHTML = song.spotifyIframe;

  // Lyrics
  document.getElementById('lyricsOriginal').textContent = song.lyricsOriginal;
  document.getElementById('lyricsTranslated').textContent = song.lyricsTranslated;

  // Story
  document.getElementById('songStory').innerHTML = song.story;

  // Technical Details
  document.getElementById('songKey').textContent = song.key || '-';
  document.getElementById('songBPM').textContent = song.bpm || '-';
  document.getElementById('songDuration').textContent = song.duration || '-';
  document.getElementById('songGenre').textContent = song.genre || '-';

  // Credits
  const creditsContent = document.getElementById('songCredits');
  creditsContent.innerHTML = song.credits.map(credit => `
    <div class="credit-item">
      <div class="credit-role">${credit.role}</div>
      <div class="credit-name">${credit.name}</div>
    </div>
  `).join('');
}

// ===== NAVIGATION BETWEEN SONGS =====

function updateNavigationButtons() {
  const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
  
  const prevBtn = document.getElementById('prevSongBtn');
  const nextBtn = document.getElementById('nextSongBtn');

  // Disable/enable previous button
  if (currentIndex <= 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  // Disable/enable next button
  if (currentIndex >= allSongs.length - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

function playNextSong() {
  const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
  if (currentIndex < allSongs.length - 1) {
    const nextSong = allSongs[currentIndex + 1];
    loadSong(nextSong.id, nextSong.albumId);
  }
}

function playPreviousSong() {
  const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
  if (currentIndex > 0) {
    const prevSong = allSongs[currentIndex - 1];
    loadSong(prevSong.id, prevSong.albumId);
  }
}

// ===== EVENT LISTENERS =====

document.getElementById('nextSongBtn')?.addEventListener('click', playNextSong);
document.getElementById('prevSongBtn')?.addEventListener('click', playPreviousSong);

// sidebar toggle button
const showAlbumsBtn = document.getElementById('showAlbumsBtn');
if (showAlbumsBtn) {
  showAlbumsBtn.addEventListener('click', function() {
    document.querySelector('.songbook_sidebar').classList.toggle('sidebar-hidden');
    this.style.display = document.querySelector('.songbook_sidebar').classList.contains('sidebar-hidden') ? 'block' : 'none';
  });
}

// Optional: Auto-play next song when current finishes
document.getElementById('audioPlayer')?.addEventListener('ended', function() {
  // Uncomment the line below to auto-play next song
  // playNextSong();
});
