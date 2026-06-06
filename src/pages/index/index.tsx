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

interface PageState {
  currentPage: number
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
}

export default class Index extends Component<{}, PageState> {
  audioManager: AudioManager | null = null
  touchStartX: number = 0
  touchStartY: number = 0
  isSwiping: boolean = false

  state: PageState = {
    currentPage: 0,
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
  }

  componentDidMount() {
    this.audioManager = new AudioManager()
    this.loadCustomWords()
    this.loadSelectedExtraWords()
  }

  componentWillUnmount() {
    if (this.audioManager) {
      this.audioManager.destroy()
    }
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

  nextPage = () => {
    if (this.state.currentPage < letterData.length - 1) {
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
  }

  prevPage = () => {
    if (this.state.currentPage > 0) {
      this.setState({ currentPage: this.state.currentPage - 1 })
    }
  }

  goToPage = (index: number) => {
    this.setState({ currentPage: index })
  }

  toggleSlowMode = () => {
    this.setState({ isSlowMode: !this.state.isSlowMode })
  }

  handleTouchStart = (e: any) => {
    this.touchStartX = e.touches[0].clientX
    this.touchStartY = e.touches[0].clientY
    this.isSwiping = false
  }

  handleTouchEnd = (e: any) => {
    if (this.isSwiping) return

    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const deltaX = touchEndX - this.touchStartX
    const deltaY = touchEndY - this.touchStartY

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      this.isSwiping = true
      if (deltaX < 0) {
        this.nextPage()
      } else {
        this.prevPage()
      }
    }
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

  findWordData = (wordText: string): { icon: string; phonetic: string } => {
    const { selectedTextbook, currentPage, customWords } = this.state
    const currentLetter = letterData[currentPage].letter

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

  render() {
    const {
      currentPage, isSlowMode, activeElement, customWords, showAddModal,
      inputWord, inputPhonetic, tempAddedWords, showImagePicker,
      selectedTextbook, selectedGrade, selectedExtraWords,
      showEmojiPicker, activeEmojiCategory, emojiSearchQuery,
    } = this.state
    const currentData = letterData[currentPage]
    const currentCustomWords = customWords[currentData.letter] || []
    const hasCustomWords = currentCustomWords.length > 0 || (selectedExtraWords[currentData.letter] || []).length > 0
    const gradeWords = this.getCurrentGradeWords()
    const filteredEmojis = this.getFilteredEmojis()
    const categoryKeys = Object.keys(emojiCategories)

    return (
      <View className="container">
        <View className="header">
          <Text className="title">ABC Learning</Text>

          <View className="header-actions">
            <View className="more-btn" onClick={this.openAddModal}>
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

        <View
          className="main-card"
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          <View
            className={`letter-section ${activeElement === "letter" ? "active" : ""}`}
            onClick={() => this.playAudio(currentData.letter, "letter")}
          >
            <Text className="letter-text">{currentData.letter}</Text>
          </View>

          <ScrollView className="words-section" scrollY>
            <View className="words-grid">
              {currentData.words.map((item, index) => (
                <View
                  key={index}
                  className={`word-card ${activeElement === `word-${index}` ? "active" : ""}`}
                  onClick={() => this.playAudio(item.word, `word-${index}`)}
                >
                  <Text className="word-emoji">{item.emoji}</Text>
                  <Text className="word-text">{item.word}</Text>
                  <Text className="word-phonetic">{item.phonetic}</Text>
                </View>
              ))}

              {currentCustomWords.map((item, index) => (
                <View
                  key={`custom-${index}`}
                  className={`word-card custom ${activeElement === `custom-${index}` ? "active" : ""}`}
                  onClick={() => this.playAudio(item.word, `custom-${index}`)}
                  onLongPress={() => this.deleteWord(currentData.letter, index)}
                >
                  {item.image ? (
                    item.image.startsWith('emoji:') ? (
                      <Text className="word-emoji">{item.image.replace('emoji:', '')}</Text>
                    ) : (
                      <Image className="word-icon-img" src={item.image} mode="aspectFill" />
                    )
                  ) : (
                    <Text className="word-emoji">✨</Text>
                  )}
                  <Text className="word-text">{item.word}</Text>
                  <Text className="word-phonetic">{item.phonetic || ""}</Text>
                </View>
              ))}

              {/* Extra words from grade selection */}
              {(selectedExtraWords[currentData.letter] || []).map((wordText, index) => {
                const wordData = this.findWordData(wordText)
                return (
                  <View
                    key={`extra-${index}`}
                    className={`word-card extra ${activeElement === `extra-${index}` ? "active" : ""}`}
                    onClick={() => this.playAudio(wordText, `extra-${index}`)}
                    onLongPress={() => this.toggleExtraWord(wordText)}
                  >
                    <Text className="word-emoji">{wordData.icon || "📝"}</Text>
                    <Text className="word-text">{wordText}</Text>
                    <Text className="word-phonetic">{wordData.phonetic || ""}</Text>
                  </View>
                )
              })}
            </View>
          </ScrollView>

          <View className="footer-row">
            <View className="page-indicator">
              {letterData.map((_, index) => (
                <View
                  key={index}
                  className={`indicator-dot ${index === currentPage ? "active" : ""}`}
                  onClick={() => this.goToPage(index)}
                />
              ))}
            </View>
          </View>

          <Text className="hint-text">{hasCustomWords ? "左右滑动切换 · 长按删除" : "左右滑动切换 · 点击发音"}</Text>
        </View>

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

              <ScrollView className="modal-content" scrollY>
                {/* ===== Level 1: Textbook Selection ===== */}
                {!selectedTextbook && (
                  <View className="textbook-section">
                    <Text className="textbook-hint">请选择教材版本</Text>

                    <View className="textbook-item" onClick={() => this.selectTextbook("沪教")}>
                      <View className="textbook-info">
                        <Text className="textbook-name">沪教版</Text>
                        <Text className="textbook-desc">上海小学英语 1-6年级</Text>
                      </View>
                      <Text className="textbook-chevron">›</Text>
                    </View>

                    <View className="textbook-item" onClick={() => this.selectTextbook("沪教牛津")}>
                      <View className="textbook-info">
                        <Text className="textbook-name">沪教牛津版</Text>
                        <Text className="textbook-desc">上海小学英语 1-5年级</Text>
                      </View>
                      <Text className="textbook-chevron">›</Text>
                    </View>

                    <View className="textbook-item" onClick={() => this.selectTextbook("自定义")}>
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
                          <View className="add-btn" onClick={this.addWordToList}>
                            <Text className="add-btn-text">加入预览列表</Text>
                          </View>
                          <View className="emoji-pick-btn" onClick={() => this.setState({ showEmojiPicker: true })}>
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
                                onClick={() => this.selectEmoji(emoji)}
                              >
                                <Text className="emoji-item-text">{emoji}</Text>
                              </View>
                            ))}
                          </View>
                        </ScrollView>

                        <View className="emoji-picker-footer" onClick={this.closeEmojiPicker}>
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
              </ScrollView>
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
                    <View key={idx} className="picker-item" onClick={() => this.selectImage(url)}>
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
