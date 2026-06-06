# ABC Learning App

An Apple-inspired letter learning application for young children (ages 5+) from non-English speaking countries.

## Features

- 26 letters with example words
- Real human audio pronunciation (with TTS fallback)
- Apple-inspired minimalist design
- Touch-friendly interface for children
- Slow, clear pronunciation for non-native speakers

## Audio System

This app supports **real human audio files** for natural pronunciation. The system automatically:
1. Tries to fetch audio from the built-in API (dynamically downloads from free sources)
2. Falls back to static audio files (stored in `/public/audio/`)
3. Falls back to high-quality Text-to-Speech if audio isn't available

### How Audio Works

When you click on a letter or word, the app will:
1. **First**: Try to fetch audio from `/api/download-audio` which pulls from free dictionary APIs
2. **Second**: Try to load from `/public/audio/{word}.mp3` (static files you've added)
3. **Third**: Use browser Text-to-Speech as final fallback

This means **audio works immediately** without any setup! The app will dynamically fetch pronunciation from free online dictionaries.

### Quick Start: Download Audio Automatically

Run the built-in script to automatically download free human audio from online dictionaries:

```bash
npm run fetch-audio
```

This will download pronunciation files from Free Dictionary API and save them to `/public/audio/`.

### Manual Audio Setup

To use real human pronunciation (like Oxford phonics), place MP3 audio files in the `/public/audio/` directory with these naming conventions:

**For letters:**
- `a.mp3`, `b.mp3`, `c.mp3`, etc.

**For words (lowercase, hyphens for spaces):**
- `apple.mp3`
- `ball.mp3`
- `cat.mp3`
- `fire-truck.mp3` (note: hyphen for multi-word items)

### Where to Get Audio Files

1. **Built-in API** (free, automatic) - The app automatically fetches from free dictionary APIs when needed
2. **Automatic download** (free) - Run `npm run fetch-audio` to pre-download and cache files
3. **Purchase from educational publishers** - Oxford, Cambridge, Pearson provide licensed phonics materials
4. **Free resources** - Forvo.com, Cambridge Dictionary, Merriam-Webster
5. **Record yourself** - Have a native English speaker record the pronunciations
6. **Use AI voice services** - ElevenLabs, Azure Neural TTS for high-quality synthetic voices

### Example Directory Structure

```
public/
  audio/
    a.mp3
    b.mp3
    c.mp3
    apple.mp3
    ball.mp3
    cat.mp3
    ...
```

The app will automatically detect and use these files when users tap on letters or words.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Optional: Pre-download pronunciation audio for offline use
npm run fetch-audio
```

## Deployment

This app can be deployed to Vercel with one click. The API route will automatically fetch audio from free sources, no setup required!
