import { NextResponse } from "next/server"

// List of all words and letters that need audio
const wordsToDownload = [
  // Letters
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  // Words
  "apple",
  "ant",
  "alligator",
  "astronaut",
  "bear",
  "bee",
  "ball",
  "banana",
  "cat",
  "car",
  "cupcake",
  "clown",
  "dog",
  "doughnut",
  "dinosaur",
  "dot",
  "elephant",
  "egg",
  "earthworm",
  "eye",
  "fox",
  "flower",
  "fire-truck",
  "frog",
]

async function fetchAudioFromAPI(word: string): Promise<ArrayBuffer | null> {
  try {
    // Try Free Dictionary API
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    if (!response.ok) return null

    const data = await response.json()

    // Find audio URL (prefer US pronunciation)
    let audioUrl = null
    for (const entry of data) {
      if (entry.phonetics) {
        const usAudio = entry.phonetics.find((p: any) => p.audio && p.audio.includes("-us"))
        if (usAudio?.audio) {
          audioUrl = usAudio.audio
          break
        }
        // Fallback to any audio
        const anyAudio = entry.phonetics.find((p: any) => p.audio)
        if (anyAudio?.audio) {
          audioUrl = anyAudio.audio
        }
      }
    }

    if (!audioUrl) return null

    // Download the audio file
    const audioResponse = await fetch(audioUrl)
    if (!audioResponse.ok) return null

    return await audioResponse.arrayBuffer()
  } catch (error) {
    console.error(`Failed to fetch audio for "${word}":`, error)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const word = searchParams.get("word")

  if (!word) {
    return NextResponse.json({ error: "Word parameter required" }, { status: 400 })
  }

  const audioBuffer = await fetchAudioFromAPI(word)

  if (!audioBuffer) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 })
  }

  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}

export async function POST() {
  const results = {
    success: [] as string[],
    failed: [] as string[],
  }

  for (const word of wordsToDownload) {
    try {
      const audioBuffer = await fetchAudioFromAPI(word)

      if (audioBuffer) {
        results.success.push(word)
        console.log(`Downloaded audio for: ${word}`)
      } else {
        results.failed.push(word)
        console.log(`No audio found for: ${word}`)
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (error) {
      results.failed.push(word)
      console.error(`Error downloading ${word}:`, error)
    }
  }

  return NextResponse.json(results)
}
