import Taro from "@tarojs/taro"

export class AudioManager {
  private innerAudioContext: Taro.InnerAudioContext | null = null
  private isPlaying = false

  constructor() {
    this.innerAudioContext = Taro.createInnerAudioContext()
  }

  async playAudio(text: string, isSlowMode = false): Promise<void> {
    if (this.isPlaying) {
      this.stop()
    }

    return new Promise((resolve, reject) => {
      if (!this.innerAudioContext) {
        reject(new Error("Audio context not available"))
        return
      }

      // 使用有道词典免费发音 API
      const audioUrl = this.getYoudaoAudioUrl(text)

      this.innerAudioContext.src = audioUrl
      this.innerAudioContext.playbackRate = isSlowMode ? 0.7 : 1.0
      this.isPlaying = true

      // 清除之前的事件监听
      this.innerAudioContext.offPlay()
      this.innerAudioContext.offError()
      this.innerAudioContext.offEnded()

      this.innerAudioContext.onPlay(() => {
        console.log("Playing audio:", text)
      })

      this.innerAudioContext.onError((res) => {
        console.error("Audio playback failed:", res)
        this.isPlaying = false
        // 尝试备用 API
        this.playWithBackupApi(text, isSlowMode).then(resolve).catch(reject)
      })

      this.innerAudioContext.onEnded(() => {
        this.isPlaying = false
        resolve()
      })

      this.innerAudioContext.play()
    })
  }

  // 有道词典发音 API（免费）
  private getYoudaoAudioUrl(text: string): string {
    const encodedText = encodeURIComponent(text.toLowerCase())
    return `https://dict.youdao.com/dictvoice?audio=${encodedText}&type=2`
  }

  // 备用：使用 Google Translate TTS（免费）
  private getGoogleTtsUrl(text: string): string {
    const encodedText = encodeURIComponent(text.toLowerCase())
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodedText}`
  }

  // 备用发音方案
  private async playWithBackupApi(text: string, isSlowMode: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.innerAudioContext) {
        reject(new Error("Audio context not available"))
        return
      }

      // 尝试使用备用 API
      const backupUrl = this.getGoogleTtsUrl(text)

      this.innerAudioContext.src = backupUrl
      this.innerAudioContext.playbackRate = isSlowMode ? 0.7 : 1.0
      this.isPlaying = true

      this.innerAudioContext.offPlay()
      this.innerAudioContext.offError()
      this.innerAudioContext.offEnded()

      this.innerAudioContext.onError((res) => {
        console.error("Backup audio also failed:", res)
        this.isPlaying = false
        Taro.showToast({
          title: "发音失败，请检查网络",
          icon: "none",
        })
        reject(new Error("All audio sources failed"))
      })

      this.innerAudioContext.onEnded(() => {
        this.isPlaying = false
        resolve()
      })

      this.innerAudioContext.play()
    })
  }

  stop() {
    if (this.innerAudioContext) {
      this.innerAudioContext.stop()
      this.isPlaying = false
    }
  }

  destroy() {
    if (this.innerAudioContext) {
      this.innerAudioContext.destroy()
      this.innerAudioContext = null
    }
  }
}
