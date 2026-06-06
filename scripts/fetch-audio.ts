/**
 * Script to fetch real human pronunciation audio for learning words
 * Run: node scripts/fetch-audio.ts
 */

const letterData = [
  {
    letter: "a",
    words: ["apple", "ant", "alligator", "astronaut"],
  },
  {
    letter: "b",
    words: ["bear", "bee", "ball", "banana"],
  },
  {
    letter: "c",
    words: ["cat", "car", "cupcake", "clown"],
  },
  {
    letter: "d",
    words: ["dog", "doughnut", "dinosaur", "dot"],
  },
  {
    letter: "e",
    words: ["elephant", "egg", "earthworm", "eye"],
  },
  {
    letter: "f",
    words: ["fox", "flower", "fire-truck", "frog"],
  },
  { letter: "g", words: ["giraffe"] },
  { letter: "h", words: ["hat"] },
  { letter: "i", words: ["ice-cream"] },
  { letter: "j", words: ["juice"] },
  { letter: "k", words: ["kite"] },
  { letter: "l", words: ["lion"] },
  { letter: "m", words: ["monkey"] },
  { letter: "n", words: ["nest"] },
  { letter: "o", words: ["orange"] },
  { letter: "p", words: ["penguin"] },
  { letter: "q", words: ["queen"] },
  { letter: "r", words: ["rabbit"] },
  { letter: "s", words: ["sun"] },
  { letter: "t", words: ["turtle"] },
  { letter: "u", words: ["umbrella"] },
  { letter: "v", words: ["violin"] },
  { letter: "w", words: ["watermelon"] },
  { letter: "x", words: ["xylophone"] },
  { letter: "y", words: ["yacht"] },
  { letter: "z", words: ["zebra"] },
]

interface AudioSource {
  name: string
  getUrl: (word: string) => string
  extractAudioUrl?: (data: any) => string | null
}

const audioSources: AudioSource[] = [
  {
    name: "Free Dictionary API",
    getUrl: (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    extractAudioUrl: (data) => {
      try {
        const phonetics = data[0]?.phonetics || []
        for (const phonetic of phonetics) {
          if (phonetic.audio && phonetic.audio.includes("us.mp3")) {
            return phonetic.audio
          }
        }
        for (const phonetic of phonetics) {
          if (phonetic.audio) {
            return phonetic.audio
          }
        }
        return null
      } catch {
        return null
      }
    },
  },
]

async function downloadAudio(url: string, outputPath: string): Promise<boolean> {
  try {
    const response = await fetch(url)
    if (!response.ok) return false

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fs = await import("fs")
    const path = await import("path")

    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(outputPath, buffer)
    console.log(`✓ Downloaded: ${outputPath}`)
    return true
  } catch (error) {
    console.error(`✗ Failed to download ${url}:`, error)
    return false
  }
}

async function fetchAudioForWord(word: string, outputFileName: string): Promise<boolean> {
  // Normalize word (remove hyphens for API calls)
  const searchWord = word.replace(/-/g, "")

  for (const source of audioSources) {
    try {
      console.log(`  Trying ${source.name} for "${word}"...`)
      const apiUrl = source.getUrl(searchWord)
      const response = await fetch(apiUrl)

      if (!response.ok) continue

      const data = await response.json()
      const audioUrl = source.extractAudioUrl?.(data)

      if (audioUrl) {
        const outputPath = `public/audio/${outputFileName}.mp3`
        const success = await downloadAudio(audioUrl, outputPath)
        if (success) return true
      }
    } catch (error) {
      console.error(`  Error with ${source.name}:`, error)
    }
  }

  return false
}

async function main() {
  console.log("🎵 Starting audio download...\n")

  let successCount = 0
  let failCount = 0

  // Download letter pronunciations
  console.log("📝 Downloading letter pronunciations...")
  for (const { letter } of letterData) {
    console.log(`\nProcessing letter: ${letter.toUpperCase()}`)
    const success = await fetchAudioForWord(letter, letter)
    if (success) successCount++
    else failCount++
  }

  // Download word pronunciations
  console.log("\n📚 Downloading word pronunciations...")
  for (const { words } of letterData) {
    for (const word of words) {
      console.log(`\nProcessing word: ${word}`)
      const success = await fetchAudioForWord(word, word)
      if (success) successCount++
      else failCount++
    }
  }

  console.log("\n" + "=".repeat(50))
  console.log(`✅ Successfully downloaded: ${successCount}`)
  console.log(`❌ Failed to download: ${failCount}`)
  console.log("=".repeat(50))

  if (failCount > 0) {
    console.log("\n💡 For missing audio files:")
    console.log("   1. You can manually download from Forvo.com or Cambridge Dictionary")
    console.log("   2. Record your own pronunciation")
    console.log("   3. Use paid services like ElevenLabs for high-quality TTS")
    console.log("   4. The app will fallback to browser TTS for missing files")
  }
}

main()
