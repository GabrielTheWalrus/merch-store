# Songbook Configuration

This file contains the data for the songbook. Edit this to add your albums, songs, and information.

## Structure

The `songbookData` object has the following structure:

```javascript
const songbookData = {
  albums: [
    {
      title: "Album Title",
      image: "path/to/album-cover.jpg", // Add your album cover image to the images/ folder
      songs: [
        {
          id: "unique-song-id", // Must be unique across all songs
          title: "Song Title",
          originalLyrics: `Lyrics in original language`,
          translatedLyrics: `Letras traduzidas`,
          embedUrl: "https://open.spotify.com/embed/track/YOUR_TRACK_ID",
          technical: "Vocals: Artist<br>Guitar: Artist<br>etc.",
          history: "Story about the song..."
        },
        // More songs...
      ]
    },
    // More albums...
  ]
};
```

## How to Add Content

1. **Add album cover images** to the `images/` folder (e.g., `album1.jpg`, `album2.jpg`)
2. **Edit the `songbookData`** in `js/songbook.js` with your information
3. **For embed URLs**, use Spotify embed links or similar from your music platform
4. **Song IDs** should be unique and URL-friendly (no spaces, special characters)

## Example

```javascript
{
  title: "My First Album",
  image: "images/my-first-album.jpg",
  songs: [
    {
      id: "song1",
      title: "Amazing Song",
      originalLyrics: `Verse 1\nAmazing lyrics here`,
      translatedLyrics: `Verso 1\nLetras incríveis aqui`,
      embedUrl: "https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh",
      technical: "Vocals: Me<br>Guitar: Me<br>Drums: Programmed",
      history: "Written during a rainy day in 2023."
    }
  ]
}
```

## Notes

- If no image is provided, a placeholder will be used
- Lyrics can use `\n` for line breaks
- HTML is allowed in technical and history fields for formatting