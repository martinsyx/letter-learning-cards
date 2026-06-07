import { Component } from "react"
import Taro from "@tarojs/taro"
import { View, Text, ScrollView, Input, Image } from "@tarojs/components"
import "./index.scss"
import { letterData } from "../../data/letters"
import { AudioManager } from "../../utils/audio"
import { checkWordAndGetPhonetic } from "../../utils/dictionary"
import { fetchWordImages, getIconForWord } from "../../utils/image"
import { oxfordGradeData, hujiaoGradeData } from "../../data/grade-words"

// Emoji categories data (from source emoji-picker.tsx)
const emojiCategories: Record<string, { name: string; emojis: string[] }> = {
  animals: {
    name: "动物",
    emojis: [
      "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
      "🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🐤","🦆",
      "🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🪱","🐛",
      "🦋","🐌","🐞","🐜","🪰","🪲","🪳","🦟","🦗","🕷️",
      "🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀",
      "🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆",
      "🦓","🦍","🦧","🐘","🦛","🦏","🐪","🐫","🦒","🦘",
      "🦬","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐",
      "🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐈‍⬛","🪶","🐓","🦃",
      "🦤","🦚","🦜","🦢","🦩","🕊️","🐇","🦝","🦨","🦡",
      "🦫","🦦","🦥","🐁","🐀","🐿️","🦔","🐉","🐲",
    ],
  },
  food: {
    name: "食物",
    emojis: [
      "🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈",
      "🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦",
      "🥬","🌶️","🫑","🌽","🥕","🫒","🧄","🧅","🥔","🍠",
      "🫘","🥐","🥯","🍞","🥖","🥨","🧀","🥚","🍳","🧈",
      "🥞","🧇","🥓","🥩","🍗","🍖","🦴","🌭","🍔","🍟",
      "🍕","🫓","🥪","🥙","🧆","🌮","🌯","🫔","🥗","🥘",
      "🫕","🥫","🍝","🍜","🍲","🍛","🍣","🍱","🥟","🦪",
      "🍤","🍙","🍚","🍘","🍥","🥠","🥮","🍢","🍡","🍧",
      "🍨","🍦","🥧","🧁","🍰","🎂","🍮","🍭","🍬","🍫",
      "🍿","🍩","🍪","🌰","🥜","🍯","🥛","🍼","🫖","☕",
      "🍵","🧃","🥤","🧋","🍺","🍷","🫗","🥣",
    ],
  },
  people: {
    name: "人物",
    emojis: [
      "👦","👧","👨","👩","👴","👵","👶","🧒","🧑","👱",
      "👨‍🦰","👩‍🦰","👨‍🦱","👩‍🦱","👨‍🦳","👩‍🦳","👨‍🦲","👩‍🦲","🧔","👼",
      "🎅","🤶","🦸","🦹","🧙","🧚","🧛","🧜","🧝","🧞",
      "🧟","🧌","💆","💇","🚶","🧍","🧎","🏃","💃","🕺",
      "🕴️","👯","🧖","🧗","🤸","⛹️","🏋️","🚴","🚵","🤽",
      "🤾","🤺","⛷️","🏂","🏌️","🏇","🏊","🤹","🧘","🛀",
      "🛌","👭","👫","👬","👨‍👩‍👦","👨‍👩‍👧","👨‍👩‍👦‍👦","👨‍👩‍👧‍👦","👨‍👩‍👧‍👧","👩‍👩‍👦",
      "👨‍👨‍👦","👮","🕵️","💂","🥷","👷","🫅","🤴","👸","👳",
      "👲","🧕","🤵","👰","🤰","🫄","🫃","🤱","👼","🎅",
      "🤶","🦸‍♂️","🦹‍♀️","🧙‍♂️","🧚‍♀️","🧛‍♂️","🧜‍♀️","🧝‍♂️",
    ],
  },
  body: {
    name: "身体",
    emojis: [
      "👋","🤚","🖐️","✋","🖖","🫱","🫲","🫳","🫴","👌",
      "🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","👈","👉",
      "👆","🖕","👇","☝️","🫵","👍","👎","✊","👊","🤛",
      "🤜","👏","🙌","🫶","👐","🤲","🤝","🙏","✍️","💅",
      "🤳","💪","🦾","🦿","🦵","🦶","👂","🦻","👃","🧠",
      "🫀","🫁","🦷","🦴","👀","👁️","👅","👄","🫦","💋",
      "🩸",
    ],
  },
  nature: {
    name: "自然",
    emojis: [
      "🌸","💮","🏵️","🌹","🥀","🌺","🌻","🌼","🌷","🪷",
      "🌱","🪴","🌲","🌳","🌴","🌵","🌾","🌿","☘️","🍀",
      "🍁","🍂","🍃","🪹","🪺","🍄","🌰","🪨","💎","⛰️",
      "🏔️","🗻","🌋","🏜️","🏖️","🏝️","🏞️","🏟️","🌊","💧",
      "💦","🫧","🌀","🌈","🌂","🔥","✨","⭐","🌟","💫",
      "☀️","🌤️","⛅","🌥️","☁️","🌦️","🌧️","🌩️","⛈️","🌨️",
      "❄️","☃️","⛄","🌬️","💨","🌪️","🌫️","🌊","🌊","🌍",
      "🌎","🌏","🪐","🌙","🌘","🌗","🌓","🌒","🌚","🌛",
      "🌜","🌞","🪩","💫","🌠",
    ],
  },
  objects: {
    name: "物品",
    emojis: [
      "⌚","📱","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️","🗜️",
      "💾","💿","📀","📼","📷","📸","📹","🎥","📽️","🎞️",
      "📞","☎️","📟","📠","📺","📻","🎙️","🎚️","🎛️","🧭",
      "⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🔋","🪫","🔌",
      "💡","🔦","🕯️","🪔","🧯","🛢️","💸","💵","💴","💶",
      "💷","🪙","💰","💳","💎","⚖️","🪜","🧰","🪛","🔧",
      "🔨","⚒️","🛠️","⛏️","🪚","🔩","⚙️","🪤","🧱","⛓️",
      "🧲","🔫","💣","🧨","🪓","🔪","🗡️","⚔️","🛡️","🚬",
      "⚰️","🪦","⚱️","🏺","🔮","📿","🧿","💈","⚗️","🔭",
      "🔬","🕳️","🩹","🩺","🩻","💊","💉","🩸","🧬","🦠",
      "🧫","🧪","🌡️","🧹","🪠","🧺","🧻","🚽","🚰","🚿",
      "🛁","🛀","🪥","🪒","🧴","🧷","🧹","🧺","🔑","🗝️",
      "🚪","🪑","🛋️","🛏️","🛌","🧸","🪆","🖼️","🪞","🪟",
      "📍","🔖","🏷️","📚","📖","📝","✏️","🖊️","🖋️","✒️",
      "🖍️","🪈","🍼","🎀","🎁","🎈","🎆","🎇","🧨","✨",
      "🎊","🎉","🎎","🎏","🎐","🎑","🧧","🎀","🎁","🎗️",
      "🎟️","🎫","🎖️","🏆","🏅","🥇","🥈","🥉","⚽","⚾",
      "🥎","🏀","🏐","🏈","🏉","🎾","🥏","🎳","🏏","🏑",
      "🏒","🥍","🏓","🏸","🥊","🥋","🥅","⛳","🪁","🏹",
      "🎣","🤿","🥌","🛷","🥌","🎯","🪀","🪁","🎱","🔮",
      "🪄","🎮","🕹️","🎰","🎲","🧩","🧸","🪆","♠️","♥️",
      "♦️","♣️","♟️","🃏","🀄","🎴","🎭","🖼️","🎨","🧵",
      "🪡","🧶","🪢",
    ],
  },
  transport: {
    name: "交通",
    emojis: [
      "🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐",
      "🛻","🚚","🚛","🚜","🏍️","🛵","🚲","🛴","🛹","🛼",
      "🚏","🛣️","🛤️","⛽","🛞","🚨","🚥","🚦","🛑","🚧",
      "⚓","🛟","⛵","🛶","🚤","🛳️","⛴️","🛥️","🚢","✈️",
      "🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️",
      "🚀","🛸","🎈","🎆","🎇","🧨","✨","🎉","🎊",
    ],
  },
  symbols: {
    name: "符号",
    emojis: [
      "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔",
      "❤️‍🔥","❤️‍🩹","❣️","💕","💞","💓","💗","💖","💘","💝",
      "💟","☮️","✝️","☪️","🕉️","☸️","✡️","🔯","🕎","☯️",
      "☦️","🛐","⛎","♈","♉","♊","♋","♌","♍","♎",
      "♏","♐","♑","♒","♓","🆔","⚛️","🉑","☢️","☣️",
      "📴","📳","🈶","🈚","🈸","🈺","🈷️","✴️","🆚","💮",
      "🉐","㊙️","㊗️","🈴","🈵","🈹","🈲","🅰️","🅱️","🆎",
      "🆑","🅾️","🆘","❌","⭕","🛑","⛔","📛","🚫","💯",
      "💢","♨️","🚷","🚯","🚳","🚱","🔞","📵","🚭","❗",
      "❕","❓","❔","‼️","⁉️","🔅","🔆","〽️","⚠️","🚸",
      "🔱","⚜️","🔰","♻️","✅","🈯","💹","❇️","✳️","❎",
      "🌐","💠","Ⓜ️","🌀","💤","🏧","🚾","♿","🅿️","🛗",
      "🈳","🈂️","🛂","🛃","🛄","🛅","🚹","🚺","🚼","⚧️",
      "🚻","🚮","🎦","📶","🈁","🔣","ℹ️","🔤","🔡","🔠",
      "🆖","🆗","🆙","🆒","🆕","🆓","0️⃣","1️⃣","2️⃣","3️⃣",
      "4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟","🔢","#️⃣","*️⃣",
      "⏏️","▶️","⏸️","⏯️","⏹️","⏺️","⏭️","⏮️","⏩","⏪",
      "⏫","⏬","◀️","🔼","🔽","➡️","⬅️","⬆️","⬇️","↗️",
      "↘️","↙️","↖️","↕️","↔️","↪️","↩️","⤴️","⤵️","🔀",
      "🔁","🔂","🔄","🔃","🎵","🎶","🎼","🎙️","🎚️","🎛️",
      "🎤","🎧","📻","🎷","🪗","🎸","🎹","🎺","🎻","🪕",
      "🥁","🪘","📱","📲","☎️","📞","📟","📠","🔋","🪫",
      "🔌","💻","🖥️","🖨️","⌨️","🖱️","🖲️","💽","💾","💿",
      "📀","🧮","🧿",
    ],
  },
}

const SLIDE_OUT_DURATION = 120
const SLIDE_IN_DURATION = 180
const SLIDE_RESET_DELAY = 20
const SLIDE_DISTANCE_FALLBACK = 280
const SLIDE_DISTANCE_MIN = 220
const SLIDE_DISTANCE_MAX = 360
const DRAG_LOCK_THRESHOLD = 10
const DRAG_BOUNDARY_DAMPING = 0.3
const DRAG_COMMIT_DISTANCE = 80
const DRAG_COMMIT_VELOCITY = 0.5
const SNAP_BACK_DURATION = 200

type WordSource = "default" | "custom" | "extra"

interface SlideshowWord {
  key: string
  source: WordSource
  sourceIndex: number
  word: string
  phonetic: string
  icon: string
  image?: string
}

interface PageState {
  currentPage: number
  cardStyle: string
  isSlowMode: boolean
  customWords: Record<string, Array<{ word: string; phonetic?: string; image?: string }>>
  activeElement: string | null
  showAddModal: boolean
  inputWord: string
  inputPhonetic: string
  tempAddedWords: Array<{ word: string; phonetic?: string; image?: string }>
  showImagePicker: boolean
  pickingIndex: number | null
  candidateImages: string[]
  isSearchingImages: boolean
  // New state fields
  selectedTextbook: string | null
  selectedGrade: number
  selectedExtraWords: Record<string, string[]>
  showEmojiPicker: boolean
  emojiSearchQuery: string
  activeEmojiCategory: string
  showSlideshow: boolean
  slideshowPage: number
  slideshowWordIndex: number
  slideshowCardStyle: string
}

export default class Index extends Component<{}, PageState> {
  audioManager: AudioManager | null = null
  touchStartX: number = 0
  touchStartY: number = 0
  slideTimers: Array<ReturnType<typeof setTimeout>> = []
  slideSequence: number = 0
  // Drag-follow state (instance variables to avoid extra renders)
  touchStartTime: number = 0
  isDragging: boolean = false
  currentDragX: number = 0
  pendingDragX: number | null = null
  dragFrameTimer: ReturnType<typeof setTimeout> | null = null
  isHorizontalDrag: boolean | null = null // null = undecided, true = horizontal, false = vertical
  isPageAnimating: boolean = false
  slideshowTouchStartX: number = 0
  slideshowTouchStartY: number = 0
  slideshowTouchStartTime: number = 0
  isSlideshowDragging: boolean = false
  slideshowDragX: number = 0
  isSlideshowHorizontalDrag: boolean | null = null
  isSlideshowAnimating: boolean = false
  slideshowTimers: Array<ReturnType<typeof setTimeout>> = []
  slideshowSequence: number = 0

  state: PageState = {
    currentPage: 0,
    cardStyle: "",
    isSlowMode: false,
    customWords: {},
    activeElement: null,
    showAddModal: false,
    inputWord: "",
    inputPhonetic: "",
    tempAddedWords: [],
    showImagePicker: false,
    pickingIndex: null,
    candidateImages: [],
    isSearchingImages: false,
    // New state
    selectedTextbook: null,
    selectedGrade: 1,
    selectedExtraWords: {},
    showEmojiPicker: false,
    emojiSearchQuery: "",
    activeEmojiCategory: "animals",
    showSlideshow: false,
    slideshowPage: 0,
    slideshowWordIndex: 0,
    slideshowCardStyle: "",
  }

  componentDidMount() {
    this.audioManager = new AudioManager()
    this.loadCustomWords()
    this.loadSelectedExtraWords()
  }

  componentWillUnmount() {
    this.clearSlideTimers()
    this.clearSlideshowTimers()

    if (this.audioManager) {
      this.audioManager.destroy()
    }
  }

  clearSlideTimers = () => {
    this.slideTimers.forEach((timer) => clearTimeout(timer))
    this.slideTimers = []
  }

  clearSlideshowTimers = () => {
    this.slideshowTimers.forEach((timer) => clearTimeout(timer))
    this.slideshowTimers = []
  }

  clearDragFrameTimer = () => {
    if (this.dragFrameTimer) {
      clearTimeout(this.dragFrameTimer)
      this.dragFrameTimer = null
    }
    this.pendingDragX = null
  }

  resetGestureState = () => {
    this.isDragging = false
    this.currentDragX = 0
    this.isHorizontalDrag = null
    this.clearDragFrameTimer()
  }

  resetSlideshowGestureState = () => {
    this.isSlideshowDragging = false
    this.slideshowDragX = 0
    this.isSlideshowHorizontalDrag = null
  }

  getSlideDistance = () => {
    try {
      const { windowWidth } = Taro.getSystemInfoSync()
      if (windowWidth) {
        return Math.max(
          SLIDE_DISTANCE_MIN,
          Math.min(SLIDE_DISTANCE_MAX, Math.round(windowWidth * 0.78)),
        )
      }
    } catch {
      return SLIDE_DISTANCE_FALLBACK
    }

    return SLIDE_DISTANCE_FALLBACK
  }

  getCardTransformStyle = (translateX: number, duration = 0, opacity = 1) => (
    `transform: translate3d(${translateX}px, 0, 0); ` +
    `opacity: ${opacity}; ` +
    `transition: transform ${duration}ms ease-out, opacity ${duration}ms ease-out;`
  )

  updateDragStyle = (translateX: number) => {
    this.pendingDragX = translateX

    if (this.dragFrameTimer) return

    this.dragFrameTimer = setTimeout(() => {
      const nextX = this.pendingDragX
      this.dragFrameTimer = null

      if (nextX === null) return

      this.pendingDragX = null
      this.setState({ cardStyle: this.getCardTransformStyle(nextX) })
    }, 16)
  }

  loadCustomWords = async () => {
    try {
      const res = await Taro.getStorage({ key: "customWords" })
      if (res.data) {
        this.setState({ customWords: JSON.parse(res.data) })
      }
    } catch (error) {
      console.log("No saved custom words")
    }
  }

  loadSelectedExtraWords = async () => {
    try {
      const res = await Taro.getStorage({ key: "selectedExtraWords" })
      if (res.data) {
        this.setState({ selectedExtraWords: JSON.parse(res.data) })
      }
    } catch (error) {
      console.log("No saved selected extra words")
    }
  }

  saveCustomWords = async (words: Record<string, Array<{ word: string; phonetic?: string; image?: string }>>) => {
    try {
      await Taro.setStorage({
        key: "customWords",
        data: JSON.stringify(words),
      })
    } catch (error) {
      console.error("Failed to save custom words", error)
    }
  }

  saveSelectedExtraWords = async (words: Record<string, string[]>) => {
    try {
      await Taro.setStorage({
        key: "selectedExtraWords",
        data: JSON.stringify(words),
      })
    } catch (error) {
      console.error("Failed to save selected extra words", error)
    }
  }

  playAudio = async (text: string, elementId: string) => {
    if (!this.audioManager) return

    this.setState({ activeElement: elementId })

    try {
      await this.audioManager.playAudio(text, this.state.isSlowMode)
    } catch (error) {
      console.error("Audio playback failed:", error)
    } finally {
      this.setState({ activeElement: null })
    }
  }

  changePage = (nextPage: number) => {
    const { currentPage } = this.state
    if (nextPage < 0 || nextPage >= letterData.length || nextPage === currentPage) return
    if (this.isPageAnimating) return

    this.isPageAnimating = true
    this.clearDragFrameTimer()
    this.clearSlideTimers()
    const slideSequence = this.slideSequence + 1
    this.slideSequence = slideSequence
    const isForward = nextPage > currentPage
    const slideDistance = this.getSlideDistance()
    const exitOffset = isForward ? -slideDistance : slideDistance
    const enterOffset = isForward ? slideDistance : -slideDistance
    this.setState({
      cardStyle: this.getCardTransformStyle(exitOffset, SLIDE_OUT_DURATION, 0),
    })

    const switchTimer = setTimeout(() => {
      if (this.slideSequence !== slideSequence) return

      this.setState({
        currentPage: nextPage,
        cardStyle: this.getCardTransformStyle(enterOffset, 0, 0),
      }, () => {
        const enterTimer = setTimeout(() => {
          if (this.slideSequence !== slideSequence) return

          this.setState({ cardStyle: this.getCardTransformStyle(0, SLIDE_IN_DURATION, 1) })

          const doneTimer = setTimeout(() => {
            if (this.slideSequence !== slideSequence) return

            this.setState({
              cardStyle: "",
            })
            this.resetGestureState()
            this.isPageAnimating = false
          }, SLIDE_IN_DURATION)
          this.slideTimers.push(doneTimer)
        }, SLIDE_RESET_DELAY)
        this.slideTimers.push(enterTimer)
      })
    }, SLIDE_OUT_DURATION)
    this.slideTimers.push(switchTimer)
  }

  nextPage = () => {
    this.changePage(this.state.currentPage + 1)
  }

  prevPage = () => {
    this.changePage(this.state.currentPage - 1)
  }

  goToPage = (index: number) => {
    this.changePage(index)
  }

  toggleSlowMode = () => {
    this.setState({ isSlowMode: !this.state.isSlowMode })
  }

  handleTouchStart = (e: any) => {
    e.stopPropagation?.()
    if (this.state.showSlideshow) return
    if (this.isPageAnimating) return

    this.touchStartX = e.touches[0].clientX
    this.touchStartY = e.touches[0].clientY
    this.touchStartTime = Date.now()
    this.resetGestureState()
  }

  handleTouchMove = (e: any) => {
    e.stopPropagation?.()
    if (this.state.showSlideshow) return
    if (this.isPageAnimating) return
    if (this.isHorizontalDrag === false) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - this.touchStartX
    const deltaY = currentY - this.touchStartY

    if (this.isHorizontalDrag === null) {
      if (Math.abs(deltaX) > DRAG_LOCK_THRESHOLD || Math.abs(deltaY) > DRAG_LOCK_THRESHOLD) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          this.isHorizontalDrag = true
          this.clearSlideTimers()
          e.preventDefault?.()
        } else {
          this.isHorizontalDrag = false
          return
        }
      } else {
        return
      }
    }

    const { currentPage } = this.state
    const isAtStart = currentPage === 0
    const isAtEnd = currentPage === letterData.length - 1
    let adjustedDeltaX = deltaX

    if ((isAtStart && deltaX > 0) || (isAtEnd && deltaX < 0)) {
      adjustedDeltaX = deltaX * DRAG_BOUNDARY_DAMPING
    }

    this.isDragging = true
    this.currentDragX = adjustedDeltaX

    e.preventDefault?.()
    this.updateDragStyle(adjustedDeltaX)
  }

  handleTouchEnd = (e: any) => {
    e.stopPropagation?.()
    if (this.state.showSlideshow) return
    if (this.isPageAnimating) return

    if (!this.isDragging) {
      if (this.isHorizontalDrag === false) {
        this.resetGestureState()
        return
      }

      const touchEndX = e.changedTouches[0].clientX
      const deltaX = touchEndX - this.touchStartX
      const deltaY = (e.changedTouches[0].clientY || 0) - this.touchStartY

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          this.nextPage()
        } else {
          this.prevPage()
        }
      }
      this.resetGestureState()
      return
    }

    const { currentPage } = this.state
    const isAtStart = currentPage === 0
    const isAtEnd = currentPage === letterData.length - 1
    const dragX = this.currentDragX
    const elapsed = Date.now() - this.touchStartTime
    const velocity = Math.abs(dragX) / Math.max(elapsed, 1)

    const draggingIntoBoundary = (isAtStart && dragX > 0) || (isAtEnd && dragX < 0)
    const shouldCommit = !draggingIntoBoundary && (
      Math.abs(dragX) > DRAG_COMMIT_DISTANCE || velocity > DRAG_COMMIT_VELOCITY
    )

    if (shouldCommit) {
      const isForward = dragX < 0
      const nextPage = isForward ? currentPage + 1 : currentPage - 1

      if (nextPage >= 0 && nextPage < letterData.length) {
        this.commitDragPageChange(nextPage, isForward, dragX)
      } else {
        this.snapBack()
      }
    } else {
      this.snapBack()
    }

    this.resetGestureState()
  }

  handleTouchCancel = (e: any) => {
    e.stopPropagation?.()
    if (this.state.showSlideshow) return

    if (this.isDragging) {
      this.snapBack()
    }

    this.resetGestureState()
  }

  snapBack = () => {
    this.clearSlideTimers()
    this.setState({ cardStyle: this.getCardTransformStyle(0, SNAP_BACK_DURATION) })

    const timer = setTimeout(() => {
      this.setState({ cardStyle: "" })
    }, SNAP_BACK_DURATION)
    this.slideTimers.push(timer)
  }

  commitDragPageChange = (nextPage: number, isForward: boolean, currentOffset: number) => {
    this.isPageAnimating = true
    this.clearSlideTimers()

    const slideSequence = this.slideSequence + 1
    this.slideSequence = slideSequence

    const slideDistance = this.getSlideDistance()
    const exitTarget = isForward
      ? Math.min(-slideDistance, currentOffset - 40)
      : Math.max(slideDistance, currentOffset + 40)
    const remainingDistance = Math.abs(exitTarget - currentOffset)
    const exitDuration = Math.max(80, Math.min(SLIDE_OUT_DURATION, remainingDistance * 1.2))

    this.setState({ cardStyle: this.getCardTransformStyle(exitTarget, exitDuration, 0) })

    const switchTimer = setTimeout(() => {
      if (this.slideSequence !== slideSequence) return

      const enterOffset = isForward ? slideDistance : -slideDistance
      this.setState({
        currentPage: nextPage,
        cardStyle: this.getCardTransformStyle(enterOffset, 0, 0),
      }, () => {
        const enterTimer = setTimeout(() => {
          if (this.slideSequence !== slideSequence) return

          this.setState({ cardStyle: this.getCardTransformStyle(0, SLIDE_IN_DURATION, 1) })

          const doneTimer = setTimeout(() => {
            if (this.slideSequence !== slideSequence) return
            this.setState({ cardStyle: "" })
            this.resetGestureState()
            this.isPageAnimating = false
          }, SLIDE_IN_DURATION)
          this.slideTimers.push(doneTimer)
        }, SLIDE_RESET_DELAY)
        this.slideTimers.push(enterTimer)
      })
    }, exitDuration)
    this.slideTimers.push(switchTimer)
  }

  // ============ Textbook & Grade Methods ============

  selectTextbook = (textbook: string) => {
    this.setState({ selectedTextbook: textbook, selectedGrade: 1 })
  }

  backToTextbookList = () => {
    this.setState({ selectedTextbook: null })
  }

  selectGrade = (grade: number) => {
    this.setState({ selectedGrade: grade })
  }

  getCurrentGradeWords = (): Array<{ word: string; phonetic: string; icon: string }> => {
    const { selectedTextbook, selectedGrade, currentPage } = this.state
    const currentLetter = letterData[currentPage].letter

    const gradeData = selectedTextbook === "沪教" ? hujiaoGradeData : oxfordGradeData
    const data = gradeData[selectedGrade]
    if (!data) return []

    return data[currentLetter] || []
  }

  toggleExtraWord = (word: string) => {
    const { selectedExtraWords, currentPage } = this.state
    const currentLetter = letterData[currentPage].letter
    const currentWords = selectedExtraWords[currentLetter] || []

    let newWords: string[]
    if (currentWords.includes(word)) {
      newWords = currentWords.filter((w) => w !== word)
    } else {
      newWords = [...currentWords, word]
    }

    const newSelectedExtraWords = {
      ...selectedExtraWords,
      [currentLetter]: newWords,
    }

    this.setState({ selectedExtraWords: newSelectedExtraWords })
    this.saveSelectedExtraWords(newSelectedExtraWords)
  }

  findWordData = (wordText: string, pageIndex = this.state.currentPage): { icon: string; phonetic: string } => {
    const { selectedTextbook, customWords } = this.state
    const currentLetter = letterData[pageIndex].letter

    // Search in grade data across all grades for the current textbook
    const gradeData = selectedTextbook === "沪教" ? hujiaoGradeData : oxfordGradeData
    for (const gradeKey of Object.keys(gradeData)) {
      const data = gradeData[Number(gradeKey)]
      if (data && data[currentLetter]) {
        const found = data[currentLetter].find((w) => w.word.toLowerCase() === wordText.toLowerCase())
        if (found) {
          return { icon: found.icon, phonetic: found.phonetic }
        }
      }
    }

    // Search in both textbooks if no textbook selected
    for (const gd of [hujiaoGradeData, oxfordGradeData]) {
      for (const gradeKey of Object.keys(gd)) {
        const data = gd[Number(gradeKey)]
        if (data && data[currentLetter]) {
          const found = data[currentLetter].find((w) => w.word.toLowerCase() === wordText.toLowerCase())
          if (found) {
            return { icon: found.icon, phonetic: found.phonetic }
          }
        }
      }
    }

    // Search in custom words
    const cw = customWords[currentLetter] || []
    const customFound = cw.find((w) => w.word.toLowerCase() === wordText.toLowerCase())
    if (customFound) {
      return {
        icon: customFound.image ? customFound.image.replace("emoji:", "") : "📝",
        phonetic: customFound.phonetic || "",
      }
    }

    // Use icon lookup
    const { icon } = getIconForWord(wordText)
    return { icon, phonetic: "" }
  }

  getPageSlideshowWords = (pageIndex: number): SlideshowWord[] => {
    const { customWords, selectedExtraWords } = this.state
    const pageData = letterData[pageIndex]
    if (!pageData) return []

    const letter = pageData.letter
    const defaultWords: SlideshowWord[] = pageData.words.map((item, index) => ({
      key: `word-${index}`,
      source: "default",
      sourceIndex: index,
      word: item.word,
      phonetic: item.phonetic,
      icon: item.emoji,
    }))

    const customWordItems: SlideshowWord[] = (customWords[letter] || []).map((item, index) => {
      const isEmoji = item.image?.startsWith("emoji:")

      return {
        key: `custom-${index}`,
        source: "custom",
        sourceIndex: index,
        word: item.word,
        phonetic: item.phonetic || "",
        icon: isEmoji && item.image ? item.image.replace("emoji:", "") : "✨",
        image: item.image && !isEmoji ? item.image : undefined,
      }
    })

    const extraWordItems: SlideshowWord[] = (selectedExtraWords[letter] || []).map((wordText, index) => {
      const wordData = this.findWordData(wordText, pageIndex)

      return {
        key: `extra-${index}`,
        source: "extra",
        sourceIndex: index,
        word: wordText,
        phonetic: wordData.phonetic || "",
        icon: wordData.icon || "📝",
      }
    })

    return [...defaultWords, ...customWordItems, ...extraWordItems]
  }

  renderWordVisual = (item: SlideshowWord, imageClassName: string, emojiClassName: string) => {
    if (item.image) {
      return <Image className={imageClassName} src={item.image} mode="aspectFill" />
    }

    return <Text className={emojiClassName}>{item.icon}</Text>
  }

  openSlideshow = (pageIndex: number, wordIndex: number, e?: any) => {
    e?.stopPropagation?.()

    const pageWords = this.getPageSlideshowWords(pageIndex)
    if (!pageWords[wordIndex]) return

    this.clearSlideshowTimers()
    this.slideshowSequence += 1
    this.isSlideshowAnimating = false
    this.resetSlideshowGestureState()
    this.setState({
      showSlideshow: true,
      slideshowPage: pageIndex,
      slideshowWordIndex: wordIndex,
      slideshowCardStyle: "",
    })
  }

  closeSlideshow = (e?: any) => {
    e?.stopPropagation?.()

    const { slideshowPage } = this.state
    this.clearSlideshowTimers()
    this.slideshowSequence += 1
    this.isSlideshowAnimating = false
    this.resetSlideshowGestureState()
    this.setState({
      showSlideshow: false,
      currentPage: slideshowPage,
      slideshowCardStyle: "",
      cardStyle: "",
    })
  }

  getSlideshowNeighbor = (
    pageIndex: number,
    wordIndex: number,
    isForward: boolean,
  ): { pageIndex: number; wordIndex: number } | null => {
    const pageWords = this.getPageSlideshowWords(pageIndex)

    if (isForward) {
      if (wordIndex < pageWords.length - 1) {
        return { pageIndex, wordIndex: wordIndex + 1 }
      }

      for (let nextPage = pageIndex + 1; nextPage < letterData.length; nextPage += 1) {
        const nextWords = this.getPageSlideshowWords(nextPage)
        if (nextWords.length > 0) {
          return { pageIndex: nextPage, wordIndex: 0 }
        }
      }

      return null
    }

    if (wordIndex > 0) {
      return { pageIndex, wordIndex: wordIndex - 1 }
    }

    for (let prevPage = pageIndex - 1; prevPage >= 0; prevPage -= 1) {
      const prevWords = this.getPageSlideshowWords(prevPage)
      if (prevWords.length > 0) {
        return { pageIndex: prevPage, wordIndex: prevWords.length - 1 }
      }
    }

    return null
  }

  handleSlideshowTouchStart = (e: any) => {
    e.stopPropagation?.()
    if (this.isSlideshowAnimating) return

    this.slideshowTouchStartX = e.touches[0].clientX
    this.slideshowTouchStartY = e.touches[0].clientY
    this.slideshowTouchStartTime = Date.now()
    this.resetSlideshowGestureState()
  }

  handleSlideshowTouchMove = (e: any) => {
    e.stopPropagation?.()
    if (this.isSlideshowAnimating) return
    if (this.isSlideshowHorizontalDrag === false) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - this.slideshowTouchStartX
    const deltaY = currentY - this.slideshowTouchStartY

    if (this.isSlideshowHorizontalDrag === null) {
      if (Math.abs(deltaX) > DRAG_LOCK_THRESHOLD || Math.abs(deltaY) > DRAG_LOCK_THRESHOLD) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          this.isSlideshowHorizontalDrag = true
          this.clearSlideshowTimers()
          e.preventDefault?.()
        } else {
          this.isSlideshowHorizontalDrag = false
          return
        }
      } else {
        return
      }
    }

    const { slideshowPage, slideshowWordIndex } = this.state
    const isForward = deltaX < 0
    const hasNeighbor = this.getSlideshowNeighbor(slideshowPage, slideshowWordIndex, isForward) !== null
    const adjustedDeltaX = hasNeighbor ? deltaX : deltaX * DRAG_BOUNDARY_DAMPING

    this.isSlideshowDragging = true
    this.slideshowDragX = adjustedDeltaX

    e.preventDefault?.()
    this.setState({ slideshowCardStyle: this.getCardTransformStyle(adjustedDeltaX) })
  }

  handleSlideshowTouchEnd = (e: any) => {
    e.stopPropagation?.()
    if (this.isSlideshowAnimating) return

    const { slideshowPage, slideshowWordIndex } = this.state

    if (!this.isSlideshowDragging) {
      if (this.isSlideshowHorizontalDrag === false) {
        this.resetSlideshowGestureState()
        return
      }

      const touchEndX = e.changedTouches[0].clientX
      const deltaX = touchEndX - this.slideshowTouchStartX
      const deltaY = (e.changedTouches[0].clientY || 0) - this.slideshowTouchStartY

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const isForward = deltaX < 0
        const neighbor = this.getSlideshowNeighbor(slideshowPage, slideshowWordIndex, isForward)
        if (neighbor) {
          this.commitSlideshowChange(neighbor, isForward, deltaX)
        } else {
          this.snapSlideshowBack()
        }
      }

      this.resetSlideshowGestureState()
      return
    }

    const dragX = this.slideshowDragX
    const isForward = dragX < 0
    const neighbor = this.getSlideshowNeighbor(slideshowPage, slideshowWordIndex, isForward)
    const elapsed = Date.now() - this.slideshowTouchStartTime
    const velocity = Math.abs(dragX) / Math.max(elapsed, 1)
    const shouldCommit = neighbor !== null && (
      Math.abs(dragX) > DRAG_COMMIT_DISTANCE || velocity > DRAG_COMMIT_VELOCITY
    )

    if (shouldCommit && neighbor) {
      this.commitSlideshowChange(neighbor, isForward, dragX)
    } else {
      this.snapSlideshowBack()
    }

    this.resetSlideshowGestureState()
  }

  handleSlideshowTouchCancel = (e: any) => {
    e.stopPropagation?.()

    if (this.isSlideshowDragging) {
      this.snapSlideshowBack()
    }

    this.resetSlideshowGestureState()
  }

  snapSlideshowBack = () => {
    this.clearSlideshowTimers()
    this.setState({ slideshowCardStyle: this.getCardTransformStyle(0, SNAP_BACK_DURATION) })

    const timer = setTimeout(() => {
      this.setState({ slideshowCardStyle: "" })
    }, SNAP_BACK_DURATION)
    this.slideshowTimers.push(timer)
  }

  commitSlideshowChange = (
    nextPosition: { pageIndex: number; wordIndex: number },
    isForward: boolean,
    currentOffset: number,
  ) => {
    this.isSlideshowAnimating = true
    this.clearSlideshowTimers()

    const slideshowSequence = this.slideshowSequence + 1
    this.slideshowSequence = slideshowSequence
    const slideDistance = this.getSlideDistance()
    const exitTarget = isForward
      ? Math.min(-slideDistance, currentOffset - 40)
      : Math.max(slideDistance, currentOffset + 40)
    const remainingDistance = Math.abs(exitTarget - currentOffset)
    const exitDuration = Math.max(80, Math.min(SLIDE_OUT_DURATION, remainingDistance * 1.2))

    this.setState({ slideshowCardStyle: this.getCardTransformStyle(exitTarget, exitDuration, 0) })

    const switchTimer = setTimeout(() => {
      if (this.slideshowSequence !== slideshowSequence) return

      const enterOffset = isForward ? slideDistance : -slideDistance
      this.setState({
        slideshowPage: nextPosition.pageIndex,
        slideshowWordIndex: nextPosition.wordIndex,
        slideshowCardStyle: this.getCardTransformStyle(enterOffset, 0, 0),
      }, () => {
        const enterTimer = setTimeout(() => {
          if (this.slideshowSequence !== slideshowSequence) return

          this.setState({ slideshowCardStyle: this.getCardTransformStyle(0, SLIDE_IN_DURATION, 1) })

          const doneTimer = setTimeout(() => {
            if (this.slideshowSequence !== slideshowSequence) return

            this.setState({ slideshowCardStyle: "" })
            this.resetSlideshowGestureState()
            this.isSlideshowAnimating = false
          }, SLIDE_IN_DURATION)
          this.slideshowTimers.push(doneTimer)
        }, SLIDE_RESET_DELAY)
        this.slideshowTimers.push(enterTimer)
      })
    }, exitDuration)
    this.slideshowTimers.push(switchTimer)
  }

  // ============ Emoji Picker Methods ============

  selectEmoji = (emoji: string) => {
    const { inputWord, inputPhonetic, tempAddedWords } = this.state
    const word = inputWord.trim()

    if (!word) {
      this.setState({ showEmojiPicker: false })
      return
    }

    const newWord = {
      word,
      phonetic: inputPhonetic.trim() || undefined,
      image: `emoji:${emoji}`,
    }

    this.setState({
      tempAddedWords: [...tempAddedWords, newWord],
      inputWord: "",
      inputPhonetic: "",
      showEmojiPicker: false,
    })
  }

  closeEmojiPicker = () => {
    this.setState({ showEmojiPicker: false })
  }

  // ============ Modal Methods ============

  openAddModal = () => {
    const { currentPage, customWords } = this.state
    const currentLetter = letterData[currentPage].letter
    const existingWords = customWords[currentLetter] || []

    this.setState({
      showAddModal: true,
      inputWord: "",
      inputPhonetic: "",
      tempAddedWords: [...existingWords],
      selectedTextbook: null,
      selectedGrade: 1,
      showEmojiPicker: false,
      emojiSearchQuery: "",
      activeEmojiCategory: "animals",
    })
  }

  closeAddModal = () => {
    this.setState({
      showAddModal: false,
      inputWord: "",
      inputPhonetic: "",
      tempAddedWords: [],
      showImagePicker: false,
      pickingIndex: null,
      candidateImages: [],
      isSearchingImages: false,
      selectedTextbook: null,
      showEmojiPicker: false,
    })
  }

  // 输入单词
  onWordInput = (e: any) => {
    this.setState({ inputWord: e.detail.value })
  }

  // 输入音标
  onPhoneticInput = (e: any) => {
    this.setState({ inputPhonetic: e.detail.value })
  }

  // 单词输入框失焦时自动获取音标
  onWordBlur = async () => {
    const { inputWord, inputPhonetic, tempAddedWords } = this.state
    const word = inputWord.trim()

    if (!word || inputPhonetic.trim()) {
      return
    }

    if (tempAddedWords.some(item => item.word.toLowerCase() === word.toLowerCase())) {
      return
    }

    Taro.showLoading({ title: '获取音标...', mask: true })

    try {
      const phonetic = await checkWordAndGetPhonetic(word)
      if (phonetic) {
        this.setState({ inputPhonetic: phonetic })
        Taro.showToast({ title: '已自动填充音标', icon: 'success' })
      } else {
        Taro.showToast({ title: '未找到该单词', icon: 'none' })
      }
    } catch (error) {
      console.error('Failed to get phonetic:', error)
    } finally {
      Taro.hideLoading()
    }
  }

  // 添加单词到临时列表
  addWordToList = () => {
    const { inputWord, inputPhonetic, tempAddedWords, currentPage } = this.state
    const currentLetter = letterData[currentPage].letter
    const word = inputWord.trim()

    if (!word) {
      Taro.showToast({ title: "请输入单词", icon: "none" })
      return
    }

    if (!word.toUpperCase().startsWith(currentLetter)) {
      Taro.showToast({ title: `请输入 ${currentLetter} 开头的单词`, icon: "none" })
      return
    }

    if (tempAddedWords.some(item => item.word.toLowerCase() === word.toLowerCase())) {
      Taro.showToast({ title: "单词已存在", icon: "none" })
      return
    }

    // Try to find an icon automatically
    const { icon, matched } = getIconForWord(word)

    if (matched) {
      // Auto-fill the icon and add to list
      const newWord = {
        word,
        phonetic: inputPhonetic.trim() || undefined,
        image: `emoji:${icon}`,
      }

      this.setState({
        tempAddedWords: [...tempAddedWords, newWord],
        inputWord: "",
        inputPhonetic: "",
      })
    } else {
      // Show emoji picker for user to pick an icon
      this.setState({ showEmojiPicker: true, emojiSearchQuery: word })
    }
  }

  // 删除临时列表中的单词
  removeTempWord = (index: number) => {
    const { tempAddedWords } = this.state
    const newList = tempAddedWords.filter((_, i) => i !== index)
    this.setState({ tempAddedWords: newList })
  }

  // 搜索单词图片
  searchImages = async (index: number, word: string) => {
    this.setState({
      isSearchingImages: true,
      pickingIndex: index,
      showImagePicker: true,
      candidateImages: []
    })

    Taro.showLoading({ title: '搜索图片...', mask: true })

    try {
      const images = await fetchWordImages(word)
      if (images && images.length > 0) {
        this.setState({ candidateImages: images })
      } else {
        Taro.showToast({ title: '未找到相关图片', icon: 'none' })
      }
    } catch (error) {
      console.error('Failed to search images:', error)
      Taro.showToast({ title: '搜索失败', icon: 'none' })
    } finally {
      this.setState({ isSearchingImages: false })
      Taro.hideLoading()
    }
  }

  // 选择图片
  selectImage = (url: string) => {
    const { tempAddedWords, pickingIndex } = this.state
    if (pickingIndex === null) return

    const newList = [...tempAddedWords]
    newList[pickingIndex] = {
      ...newList[pickingIndex],
      image: url
    }

    this.setState({
      tempAddedWords: newList,
      showImagePicker: false,
      pickingIndex: null,
      candidateImages: []
    })
  }

  // 关闭图片选择器
  closeImagePicker = () => {
    this.setState({
      showImagePicker: false,
      pickingIndex: null,
      candidateImages: []
    })
  }

  // 完成添加
  confirmAdd = () => {
    const { tempAddedWords, customWords, currentPage } = this.state
    const currentLetter = letterData[currentPage].letter

    const newCustomWords = {
      ...customWords,
      [currentLetter]: tempAddedWords,
    }

    this.setState({ customWords: newCustomWords })
    this.saveCustomWords(newCustomWords)
    this.closeAddModal()
  }

  // 删除已保存的单词
  deleteWord = (letter: string, index: number) => {
    Taro.showModal({
      title: "删除单词",
      content: "确定删除这个单词吗？",
      success: (res) => {
        if (res.confirm) {
          const { customWords } = this.state
          const currentWords = customWords[letter] || []
          const newWords = currentWords.filter((_, i) => i !== index)
          const newCustomWords = {
            ...customWords,
            [letter]: newWords,
          }
          this.setState({ customWords: newCustomWords })
          this.saveCustomWords(newCustomWords)
        }
      },
    })
  }

  // ============ Emoji Search Input ============
  onEmojiSearchInput = (e: any) => {
    this.setState({ emojiSearchQuery: e.detail.value })
  }

  // Get filtered emojis for current category/search
  getFilteredEmojis = (): string[] => {
    const { activeEmojiCategory, emojiSearchQuery } = this.state
    const cat = emojiCategories[activeEmojiCategory]
    if (!cat) return []

    if (emojiSearchQuery && emojiSearchQuery.trim()) {
      // When searching, show all categories' results
      const allEmojis = Object.values(emojiCategories).flatMap((c) => c.emojis)
      // Deduplicate
      return [...new Set(allEmojis)]
    }
    return cat.emojis
  }

  renderWordCard = (pageIndex: number, item: SlideshowWord, wordIndex: number) => {
    const { activeElement } = this.state
    const pageData = letterData[pageIndex]
    const sourceClass = item.source === "default" ? "" : item.source
    const cardClassName = [
      "word-card",
      sourceClass,
      activeElement === item.key ? "active" : "",
    ].filter(Boolean).join(" ")
    const handleLongPress = item.source === "custom"
      ? () => this.deleteWord(pageData.letter, item.sourceIndex)
      : item.source === "extra"
        ? () => this.toggleExtraWord(item.word)
        : undefined

    return (
      <View
        key={item.key}
        className={cardClassName}
        onClick={() => this.playAudio(item.word, item.key)}
        onLongPress={handleLongPress}
      >
        <View
          className="word-slideshow-entry"
          hoverClass="word-slideshow-entry-hover"
          onClick={(e) => this.openSlideshow(pageIndex, wordIndex, e)}
          onLongPress={(e) => e.stopPropagation?.()}
        >
          <Text className="word-slideshow-entry-icon">⛶</Text>
        </View>
        {this.renderWordVisual(item, "word-icon-img", "word-emoji")}
        <Text className="word-text">{item.word}</Text>
        <Text className="word-phonetic">{item.phonetic || ""}</Text>
      </View>
    )
  }

  renderSlideshow = () => {
    const {
      showSlideshow, slideshowPage, slideshowWordIndex,
      slideshowCardStyle, activeElement,
    } = this.state

    if (!showSlideshow) return null

    const pageData = letterData[slideshowPage]
    const pageWords = this.getPageSlideshowWords(slideshowPage)
    const item = pageWords[slideshowWordIndex]

    if (!pageData || !item) return null

    const activeId = `slideshow-${slideshowPage}-${item.key}`
    const hasPrevious = this.getSlideshowNeighbor(slideshowPage, slideshowWordIndex, false) !== null
    const hasNext = this.getSlideshowNeighbor(slideshowPage, slideshowWordIndex, true) !== null

    return (
      <View
        className="slideshow-overlay"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={this.handleSlideshowTouchStart}
        onTouchMove={this.handleSlideshowTouchMove}
        onTouchEnd={this.handleSlideshowTouchEnd}
        onTouchCancel={this.handleSlideshowTouchCancel}
      >
        <View className="slideshow-topbar">
          <View className="slideshow-position">
            <Text className="slideshow-letter">{pageData.letter}</Text>
            <Text className="slideshow-count">{slideshowWordIndex + 1}/{pageWords.length}</Text>
          </View>
          <View className="slideshow-close" hoverClass="slideshow-close-hover" onClick={this.closeSlideshow}>
            <Text className="slideshow-close-icon">✕</Text>
          </View>
        </View>

        <View className="slideshow-stage">
          <View
            className={[
              "slideshow-card",
              activeElement === activeId ? "active" : "",
              hasPrevious ? "" : "at-start",
              hasNext ? "" : "at-end",
            ].filter(Boolean).join(" ")}
            hoverClass="slideshow-card-hover"
            style={slideshowCardStyle}
            onClick={() => this.playAudio(item.word, activeId)}
          >
            <View className="slideshow-visual">
              {this.renderWordVisual(item, "slideshow-word-icon-img", "slideshow-word-emoji")}
            </View>
            <Text className="slideshow-word-text">{item.word}</Text>
            {!!item.phonetic && (
              <Text className="slideshow-word-phonetic">{item.phonetic}</Text>
            )}
          </View>
        </View>
      </View>
    )
  }

  renderCardContent = (pageIndex: number, paneKey: string) => {
    const { activeElement, cardStyle } = this.state
    const pageData = letterData[pageIndex]
    const pageWords = this.getPageSlideshowWords(pageIndex)

    return (
      <View
        key={paneKey}
        className="card-content"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchCancel}
      >
        <View
          className={`letter-section ${activeElement === "letter" ? "active" : ""}`}
          style={cardStyle}
          onClick={() => this.playAudio(pageData.letter, "letter")}
        >
          <Text className="letter-text">{pageData.letter}</Text>
        </View>

        <ScrollView
          className="words-section"
          scrollY
          enhanced
          bounces={false}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
        >
          <View className="words-grid" style={cardStyle}>
            {pageWords.map((item, index) => this.renderWordCard(pageIndex, item, index))}
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    const {
      currentPage, isSlowMode, customWords, showAddModal,
      inputWord, inputPhonetic, tempAddedWords, showImagePicker,
      selectedTextbook, selectedGrade, selectedExtraWords,
      showEmojiPicker, activeEmojiCategory, emojiSearchQuery,
    } = this.state
    const currentData = letterData[currentPage]
    const hasCustomWords = (customWords[currentData.letter] || []).length > 0 || (selectedExtraWords[currentData.letter] || []).length > 0
    const gradeWords = this.getCurrentGradeWords()
    const filteredEmojis = this.getFilteredEmojis()
    const categoryKeys = Object.keys(emojiCategories)

    return (
      <View className="container">
        <View className="header">
          <Text className="title">ABC Learning</Text>

          <View className="header-actions">
            <View className="more-btn" hoverClass="more-btn-hover" onClick={this.openAddModal}>
              <Text className="more-icon">+</Text>
              <Text className="more-text">添加</Text>
            </View>

            <View className={`slow-mode-btn ${isSlowMode ? "active" : ""}`} onClick={this.toggleSlowMode}>
              <Text className="btn-text">慢放 {isSlowMode ? "✓" : ""}</Text>
            </View>

            <View className={`nav-btn ${currentPage === 0 ? "disabled" : ""}`} onClick={this.prevPage}>
              <Text className="nav-icon">‹</Text>
            </View>

            <View
              className={`nav-btn ${currentPage === letterData.length - 1 ? "disabled" : ""}`}
              onClick={this.nextPage}
            >
              <Text className="nav-icon">›</Text>
            </View>
          </View>
        </View>

        <View className="main-card">
          {this.renderCardContent(currentPage, `current-${currentPage}`)}

          <View className="footer-row">
            <ScrollView
              className="page-indicator-scroll"
              scrollX
              scrollWithAnimation
              scrollIntoView={`indicator-hit-${currentPage}`}
            >
              <View className="page-indicator">
                {letterData.map((_, index) => (
                  <View
                    key={index}
                    id={`indicator-hit-${index}`}
                    className="indicator-hit-area"
                    hoverClass="indicator-hit-area-hover"
                    onClick={() => this.goToPage(index)}
                  >
                    <View className={`indicator-dot ${index === currentPage ? "active" : ""}`} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <Text className="hint-text">{hasCustomWords ? "左右滑动切换 · 长按删除" : "左右滑动切换 · 点击发音"}</Text>
        </View>

        {this.renderSlideshow()}

        {/* ============ Add Modal ============ */}
        {showAddModal && (
          <View className="modal-overlay" onClick={this.closeAddModal}>
            <View className="modal-container" onClick={(e) => e.stopPropagation()}>
              <View className="modal-header">
                <Text className="modal-cancel" onClick={this.closeAddModal}>取消</Text>
                <Text className="modal-title">
                  {selectedTextbook === "自定义" ? "自定义单词" : selectedTextbook ? "选择单词" : "选择教材"}
                </Text>
                <Text className="modal-done" onClick={this.confirmAdd}>完成</Text>
              </View>

              <View className="modal-content">
                {/* ===== Level 1: Textbook Selection ===== */}
                {!selectedTextbook && (
                  <View className="textbook-section">
                    <Text className="textbook-hint">请选择教材版本</Text>

                    <View className="textbook-item" hoverClass="textbook-item-hover" onClick={() => this.selectTextbook("沪教")}>
                      <View className="textbook-info">
                        <Text className="textbook-name">沪教版</Text>
                        <Text className="textbook-desc">上海小学英语 1-6年级</Text>
                      </View>
                      <Text className="textbook-chevron">›</Text>
                    </View>

                    <View className="textbook-item" hoverClass="textbook-item-hover" onClick={() => this.selectTextbook("沪教牛津")}>
                      <View className="textbook-info">
                        <Text className="textbook-name">沪教牛津版</Text>
                        <Text className="textbook-desc">上海小学英语 1-5年级</Text>
                      </View>
                      <Text className="textbook-chevron">›</Text>
                    </View>

                    <View className="textbook-item" hoverClass="textbook-item-hover" onClick={() => this.selectTextbook("自定义")}>
                      <View className="textbook-info">
                        <Text className="textbook-name">自定义</Text>
                        <Text className="textbook-desc">添加自己的单词</Text>
                      </View>
                      <Text className="textbook-chevron">›</Text>
                    </View>
                  </View>
                )}

                {/* ===== Level 2a: Custom Word Panel ===== */}
                {selectedTextbook === "自定义" && (
                  <View>
                    <Text className="form-hint">为字母 <Text className="letter-highlight">{currentData.letter}</Text> 添加单词</Text>

                    {!showEmojiPicker ? (
                      <View>
                        <View className="form-section">
                          <View className="form-group">
                            <Text className="form-label">单词</Text>
                            <Input
                              className="form-input"
                              placeholder="输入单词"
                              value={inputWord}
                              onInput={this.onWordInput}
                              onBlur={this.onWordBlur}
                              focus
                            />
                          </View>

                          <View className="form-group">
                            <Text className="form-label">音标</Text>
                            <Input
                              className="form-input"
                              placeholder="/ˈæpl/（可选）"
                              value={inputPhonetic}
                              onInput={this.onPhoneticInput}
                            />
                          </View>
                        </View>

                        <View className="add-btn-row">
                          <View className="add-btn" hoverClass="add-btn-hover" onClick={this.addWordToList}>
                            <Text className="add-btn-text">加入预览列表</Text>
                          </View>
                          <View className="emoji-pick-btn" hoverClass="emoji-pick-btn-hover" onClick={() => this.setState({ showEmojiPicker: true })}>
                            <Text className="emoji-pick-btn-text">选图标</Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View className="emoji-picker-inline">
                        {/* Search */}
                        <View className="emoji-search-bar">
                          <Input
                            className="emoji-search"
                            placeholder="搜索 emoji..."
                            value={emojiSearchQuery}
                            onInput={this.onEmojiSearchInput}
                          />
                        </View>

                        {/* Category tabs */}
                        <ScrollView className="emoji-category-tabs" scrollX>
                          {categoryKeys.map((key) => (
                            <View
                              key={key}
                              className={`emoji-category-tab ${activeEmojiCategory === key && !emojiSearchQuery ? "active" : ""}`}
                              hoverClass="emoji-category-tab-hover"
                              onClick={() => this.setState({ activeEmojiCategory: key, emojiSearchQuery: "" })}
                            >
                              <Text className="emoji-category-tab-text">
                                {emojiCategories[key].name}
                              </Text>
                            </View>
                          ))}
                        </ScrollView>

                        {/* Emoji grid */}
                        <ScrollView className="emoji-grid-scroll" scrollY>
                          <View className="emoji-grid">
                            {filteredEmojis.map((emoji, idx) => (
                              <View
                                key={`${emoji}-${idx}`}
                                className="emoji-item"
                                hoverClass="emoji-item-hover"
                                onClick={() => this.selectEmoji(emoji)}
                              >
                                <Text className="emoji-item-text">{emoji}</Text>
                              </View>
                            ))}
                          </View>
                        </ScrollView>

                        <View className="emoji-picker-footer" hoverClass="emoji-picker-footer-hover" onClick={this.closeEmojiPicker}>
                          <Text className="emoji-picker-cancel">取消</Text>
                        </View>
                      </View>
                    )}

                    <View className="added-section">
                      <Text className="added-title">待保存列表</Text>
                      {tempAddedWords.length === 0 ? (
                        <Text className="empty-text">列表为空，点击上方添加</Text>
                      ) : (
                        <View className="added-list">
                          {tempAddedWords.map((item, index) => (
                            <View key={index} className="added-item">
                              <View className="added-content">
                                <View className="added-icon-box" onClick={() => this.searchImages(index, item.word)}>
                                  {item.image ? (
                                    item.image.startsWith('emoji:') ? (
                                      <Text className="added-emoji">{item.image.replace('emoji:', '')}</Text>
                                    ) : (
                                      <Image className="added-image" src={item.image} mode="aspectFill" />
                                    )
                                  ) : (
                                    <View className="added-add-icon-btn">
                                      <Text className="added-add-icon">+</Text>
                                      <Text className="added-add-text">图标</Text>
                                    </View>
                                  )}
                                </View>
                                <View className="added-info">
                                  <Text className="added-word">{item.word}</Text>
                                  {item.phonetic && <Text className="added-phonetic">{item.phonetic}</Text>}
                                </View>
                              </View>
                              <View className="remove-btn" onClick={() => this.removeTempWord(index)}>
                                <Text className="remove-icon">-</Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                )}

                {/* ===== Level 2b: Grade Word Selection ===== */}
                {(selectedTextbook === "沪教" || selectedTextbook === "沪教牛津") && (
                  <View>
                    {/* Back button */}
                    <View className="grade-back-btn" onClick={this.backToTextbookList}>
                      <Text className="grade-back-text">‹ 返回教材选择</Text>
                    </View>

                    {/* Grade tabs */}
                    <ScrollView className="grade-tabs" scrollX>
                      {(selectedTextbook === "沪教" ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]).map((grade) => (
                        <View
                          key={grade}
                          className={`grade-tab ${selectedGrade === grade ? "active" : ""}`}
                          hoverClass="grade-tab-hover"
                          onClick={() => this.selectGrade(grade)}
                        >
                          <Text className="grade-tab-text">{grade}年级</Text>
                        </View>
                      ))}
                    </ScrollView>

                    <Text className="grade-word-hint">
                      为字母 <Text className="letter-highlight">{currentData.letter}</Text> 选择{selectedGrade}年级单词
                    </Text>

                    <View className="grade-word-list">
                      {gradeWords.length > 0 ? gradeWords.map((item, index) => {
                        const isSelected = (selectedExtraWords[currentData.letter] || []).includes(item.word)
                        return (
                          <View
                            key={index}
                            className={`grade-word-item ${isSelected ? "selected" : ""}`}
                            hoverClass="grade-word-item-hover"
                            onClick={() => this.toggleExtraWord(item.word)}
                          >
                            <View className="grade-word-content">
                              <Text className="grade-word-icon">{item.icon || "📝"}</Text>
                              <View className="grade-word-info">
                                <Text className={`grade-word-text ${isSelected ? "selected" : ""}`}>{item.word}</Text>
                                {item.phonetic && (
                                  <Text className={`grade-word-phonetic ${isSelected ? "selected" : ""}`}>{item.phonetic}</Text>
                                )}
                              </View>
                            </View>
                            {isSelected && (
                              <View className="grade-word-check">
                                <View className="grade-word-check-dot" />
                              </View>
                            )}
                          </View>
                        )
                      }) : (
                        <Text className="grade-word-empty">该字母暂无{selectedGrade}年级单词</Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* 图片选择器弹窗 (legacy - for custom word icon picking) */}
        {showImagePicker && (
          <View className="image-picker-overlay" onClick={this.closeImagePicker}>
            <View className="image-picker-container" onClick={(e) => e.stopPropagation()}>
              <View className="picker-header">
                <Text className="picker-title">推荐图标</Text>
                <Text className="picker-close" onClick={this.closeImagePicker}>✕</Text>
              </View>
              <View className="picker-grid">
                {this.state.isSearchingImages ? (
                  <View className="picker-status">
                    <Text className="picker-loading">搜索推荐中...</Text>
                  </View>
                ) : this.state.candidateImages.length > 0 ? (
                  this.state.candidateImages.map((url, idx) => (
                    <View key={idx} className="picker-item" hoverClass="picker-item-hover" onClick={() => this.selectImage(url)}>
                      {url.startsWith('emoji:') ? (
                        <Text className="picker-emoji">{url.replace('emoji:', '')}</Text>
                      ) : (
                        <Image className="picker-img" src={url} mode="aspectFill" />
                      )}
                    </View>
                  ))
                ) : (
                  <View className="picker-status">
                    <Text className="picker-empty">无推荐图片</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}
