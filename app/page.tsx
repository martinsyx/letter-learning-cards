"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react"

const grade1Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "and", phonetic: "/ænd/", icon: "🔗" },
    { word: "apple", phonetic: "/ˈæp.əl/", icon: "🍎" },
    { word: "ant", phonetic: "/ænt/", icon: "🐜" },
  ],
  B: [
    { word: "bee", phonetic: "/biː/", icon: "🐝" },
    { word: "bird", phonetic: "/bɜːrd/", icon: "🐦" },
    { word: "ball", phonetic: "/bɔːl/", icon: "⚽" },
    { word: "bicycle", phonetic: "/ˈbaɪ.sɪ.kəl/", icon: "🚲" },
    { word: "biscuit", phonetic: "/ˈbɪs.kɪt/", icon: "🍪" },
  ],
  C: [
    { word: "cat", phonetic: "/kæt/", icon: "🐱" },
    { word: "car", phonetic: "/kɑːr/", icon: "🚗" },
    { word: "computer", phonetic: "/kəmˈpjuː.tər/", icon: "💻" },
  ],
  D: [
    { word: "doll", phonetic: "/dɑːl/", icon: "🪆" },
    { word: "drink", phonetic: "/drɪŋk/", icon: "🥤" },
    { word: "desk", phonetic: "/desk/", icon: "🪑" },
    { word: "duck", phonetic: "/dʌk/", icon: "🦆" },
  ],
  E: [
    { word: "egg", phonetic: "/eɡ/", icon: "🥚" },
    { word: "elephant", phonetic: "/ˈel.ɪ.fənt/", icon: "🐘" },
    { word: "elbow", phonetic: "/ˈel.boʊ/", icon: "💪" },
    { word: "envelope", phonetic: "/ˈen.və.loʊp/", icon: "✉️" },
  ],
  F: [
    { word: "frog", phonetic: "/frɔːɡ/", icon: "🐸" },
    { word: "flower", phonetic: "/ˈflaʊ.ər/", icon: "🌸" },
    { word: "food", phonetic: "/fuːd/", icon: "🍱" },
    { word: "for", phonetic: "/fɔːr/", icon: "👉" },
    { word: "fish", phonetic: "/fɪʃ/", icon: "🐟" },
    { word: "fork", phonetic: "/fɔːrk/", icon: "🍴" },
  ],
  G: [
    { word: "gorilla", phonetic: "/ɡəˈrɪl.ə/", icon: "🦍" },
    { word: "girl", phonetic: "/ɡɜːrl/", icon: "👧" },
    { word: "gift", phonetic: "/ɡɪft/", icon: "🎁" },
  ],
  H: [
    { word: "hear", phonetic: "/hɪr/", icon: "👂" },
    { word: "hen", phonetic: "/hen/", icon: "🐔" },
    { word: "help", phonetic: "/help/", icon: "🆘" },
    { word: "hot dog", phonetic: "/hɑːt dɔːɡ/", icon: "🌭" },
  ],
  I: [{ word: "ice cream", phonetic: "/ˈaɪs kriːm/", icon: "🍦" }],
  J: [{ word: "jelly", phonetic: "/ˈdʒel.i/", icon: "🍮" }],
  K: [{ word: "kite", phonetic: "/kaɪt/", icon: "🪁" }],
  L: [
    { word: "listen", phonetic: "/ˈlɪs.ən/", icon: "👂" },
    { word: "like", phonetic: "/laɪk/", icon: "👍" },
  ],
  N: [{ word: "noodles", phonetic: "/ˈnuː.dəlz/", icon: "🍜" }],
  R: [
    { word: "rabbit", phonetic: "/ˈræb.ɪt/", icon: "🐰" },
    { word: "rice", phonetic: "/raɪs/", icon: "🍚" },
  ],
  S: [
    { word: "see", phonetic: "/siː/", icon: "👀" },
    { word: "smell", phonetic: "/smel/", icon: "👃" },
    { word: "sheep", phonetic: "/ʃiːp/", icon: "🐑" },
    { word: "sweet", phonetic: "/swiːt/", icon: "🍬" },
    { word: "soup", phonetic: "/suːp/", icon: "🍲" },
    { word: "sorry", phonetic: "/ˈsɑːr.i/", icon: "🙏" },
    { word: "stand up", phonetic: "/stænd ʌp/", icon: "🧍" },
    { word: "super", phonetic: "/ˈsuː.pər/", icon: "⭐" },
  ],
  T: [
    { word: "toy", phonetic: "/tɔɪ/", icon: "🧸" },
    { word: "taste", phonetic: "/teɪst/", icon: "👅" },
    { word: "teatime", phonetic: "/ˈtiː.taɪm/", icon: "☕" },
    { word: "toy shop", phonetic: "/tɔɪ ʃɑːp/", icon: "🏪" },
  ],
  V: [{ word: "very much", phonetic: "/ˈver.i mʌtʃ/", icon: "💯" }],
}

const grade2Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "autumn", phonetic: "/ˈɔː.təm/", icon: "🍂" },
    { word: "at", phonetic: "/æt/", icon: "📍" },
    { word: "are", phonetic: "/ɑːr/", icon: "✅" },
  ],
  B: [
    { word: "bag", phonetic: "/bæɡ/", icon: "🎒" },
    { word: "boy", phonetic: "/bɔɪ/", icon: "👦" },
    { word: "brown", phonetic: "/braʊn/", icon: "🟤" },
  ],
  C: [
    { word: "cool", phonetic: "/kuːl/", icon: "😎" },
    { word: "cold", phonetic: "/koʊld/", icon: "🥶" },
    { word: "can", phonetic: "/kæn/", icon: "✅" },
  ],
  D: [
    { word: "dog", phonetic: "/dɔːɡ/", icon: "🐕" },
    { word: "door", phonetic: "/dɔːr/", icon: "🚪" },
  ],
  F: [
    { word: "fly", phonetic: "/flaɪ/", icon: "🪰" },
    { word: "face", phonetic: "/feɪs/", icon: "😊" },
  ],
  G: [
    { word: "green", phonetic: "/ɡriːn/", icon: "💚" },
    { word: "go", phonetic: "/ɡoʊ/", icon: "▶️" },
  ],
  H: [
    { word: "hot", phonetic: "/hɑːt/", icon: "🔥" },
    { word: "house", phonetic: "/haʊs/", icon: "🏠" },
    { word: "hand", phonetic: "/hænd/", icon: "✋" },
  ],
  I: [
    { word: "is", phonetic: "/ɪz/", icon: "=" },
    { word: "in", phonetic: "/ɪn/", icon: "📥" },
  ],
  J: [{ word: "jump", phonetic: "/dʒʌmp/", icon: "🦘" }],
  M: [
    { word: "morning", phonetic: "/ˈmɔːr.nɪŋ/", icon: "🌅" },
    { word: "man", phonetic: "/mæn/", icon: "👨" },
  ],
  N: [
    { word: "no", phonetic: "/noʊ/", icon: "❌" },
    { word: "nine", phonetic: "/naɪn/", icon: "9️⃣" },
  ],
  O: [
    { word: "open", phonetic: "/ˈoʊ.pən/", icon: "🔓" },
    { word: "orange", phonetic: "/ˈɔːr.ɪndʒ/", icon: "🍊" },
  ],
  P: [
    { word: "park", phonetic: "/pɑːrk/", icon: "🏞️" },
    { word: "pig", phonetic: "/pɪɡ/", icon: "🐷" },
  ],
  R: [
    { word: "run", phonetic: "/rʌn/", icon: "🏃" },
    { word: "red", phonetic: "/red/", icon: "🔴" },
    { word: "rain", phonetic: "/reɪn/", icon: "🌧️" },
  ],
  S: [
    { word: "spring", phonetic: "/sprɪŋ/", icon: "🌱" },
    { word: "summer", phonetic: "/ˈsʌm.ər/", icon: "☀️" },
    { word: "sky", phonetic: "/skaɪ/", icon: "☁️" },
    { word: "sun", phonetic: "/sʌn/", icon: "☀️" },
  ],
  T: [
    { word: "tree", phonetic: "/triː/", icon: "🌳" },
    { word: "this", phonetic: "/ðɪs/", icon: "👉" },
  ],
  W: [
    { word: "warm", phonetic: "/wɔːrm/", icon: "🌡️" },
    { word: "winter", phonetic: "/ˈwɪn.tər/", icon: "❄️" },
    { word: "window", phonetic: "/ˈwɪn.doʊ/", icon: "🪟" },
  ],
  Y: [
    { word: "yellow", phonetic: "/ˈjel.oʊ/", icon: "💛" },
    { word: "yes", phonetic: "/jes/", icon: "✅" },
  ],
}

const grade3Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "animal", phonetic: "/ˈæn.ɪ.məl/", icon: "🦁" },
    { word: "afternoon", phonetic: "/ˌæf.tərˈnuːn/", icon: "🌅" },
  ],
  B: [
    { word: "bread", phonetic: "/bred/", icon: "🍞" },
    { word: "brother", phonetic: "/ˈbrʌð.ər/", icon: "👦" },
    { word: "breakfast", phonetic: "/ˈbrek.fəst/", icon: "🍳" },
  ],
  C: [
    { word: "cake", phonetic: "/keɪk/", icon: "🎂" },
    { word: "colour", phonetic: "/ˈkʌl.ər/", icon: "🎨" },
    { word: "child", phonetic: "/tʃaɪld/", icon: "🧒" },
  ],
  D: [
    { word: "draw", phonetic: "/drɔː/", icon: "✏️" },
    { word: "dance", phonetic: "/dæns/", icon: "💃" },
  ],
  E: [
    { word: "eleven", phonetic: "/ɪˈlev.ən/", icon: "1️⃣1️⃣" },
    { word: "eight", phonetic: "/eɪt/", icon: "8️⃣" },
  ],
  F: [
    { word: "father", phonetic: "/ˈfɑː.ðər/", icon: "👨" },
    { word: "friend", phonetic: "/frend/", icon: "👥" },
    { word: "four", phonetic: "/fɔːr/", icon: "4️⃣" },
  ],
  G: [
    { word: "grandmother", phonetic: "/ˈɡræn.mʌð.ər/", icon: "👵" },
    { word: "grandfather", phonetic: "/ˈɡræn.fɑː.ðər/", icon: "👴" },
  ],
  H: [
    { word: "happy", phonetic: "/ˈhæp.i/", icon: "😊" },
    { word: "house", phonetic: "/haʊs/", icon: "🏠" },
    { word: "how", phonetic: "/haʊ/", icon: "❓" },
  ],
  J: [{ word: "jump", phonetic: "/dʒʌmp/", icon: "🦘" }],
  L: [
    { word: "lemon", phonetic: "/ˈlem.ən/", icon: "🍋" },
    { word: "love", phonetic: "/lʌv/", icon: "❤️" },
  ],
  M: [
    { word: "mother", phonetic: "/ˈmʌð.ər/", icon: "👩" },
    { word: "milk", phonetic: "/mɪlk/", icon: "🥛" },
    { word: "mix", phonetic: "/mɪks/", icon: "🥣" },
  ],
  N: [
    { word: "nine", phonetic: "/naɪn/", icon: "9️⃣" },
    { word: "name", phonetic: "/neɪm/", icon: "📛" },
  ],
  P: [
    { word: "picture", phonetic: "/ˈpɪk.tʃər/", icon: "🖼️" },
    { word: "paint", phonetic: "/peɪnt/", icon: "🎨" },
  ],
  S: [
    { word: "sister", phonetic: "/ˈsɪs.tər/", icon: "👧" },
    { word: "school", phonetic: "/skuːl/", icon: "🏫" },
    { word: "sing", phonetic: "/sɪŋ/", icon: "🎤" },
  ],
  T: [
    { word: "ten", phonetic: "/ten/", icon: "🔟" },
    { word: "three", phonetic: "/θriː/", icon: "3️⃣" },
    { word: "two", phonetic: "/tuː/", icon: "2️⃣" },
  ],
  W: [
    { word: "window", phonetic: "/ˈwɪn.doʊ/", icon: "🪟" },
    { word: "what", phonetic: "/wʌt/", icon: "❓" },
  ],
}

const grade4Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "afraid", phonetic: "/əˈfreɪd/", icon: "😨" },
    { word: "angry", phonetic: "/ˈæŋ.ɡri/", icon: "😠" },
    { word: "around", phonetic: "/əˈraʊnd/", icon: "🔄" },
  ],
  B: [
    { word: "beach", phonetic: "/biːtʃ/", icon: "🏖️" },
    { word: "because", phonetic: "/bɪˈkɔːz/", icon: "➡️" },
    { word: "behind", phonetic: "/bɪˈhaɪnd/", icon: "⬅️" },
  ],
  C: [
    { word: "cinema", phonetic: "/ˈsɪn.ə.mə/", icon: "🎬" },
    { word: "cloud", phonetic: "/klaʊd/", icon: "☁️" },
    { word: "country", phonetic: "/ˈkʌn.tri/", icon: "🌍" },
  ],
  D: [
    { word: "dream", phonetic: "/driːm/", icon: "💭" },
    { word: "driver", phonetic: "/ˈdraɪ.vər/", icon: "🚗" },
  ],
  E: [
    { word: "elephant", phonetic: "/ˈel.ɪ.fənt/", icon: "🐘" },
    { word: "evening", phonetic: "/ˈiːv.nɪŋ/", icon: "🌆" },
  ],
  F: [
    { word: "farmer", phonetic: "/ˈfɑːr.mər/", icon: "👨‍🌾" },
    { word: "feel", phonetic: "/fiːl/", icon: "🤚" },
    { word: "full", phonetic: "/fʊl/", icon: "🈵" },
  ],
  G: [
    { word: "garden", phonetic: "/ˈɡɑːr.dən/", icon: "🏡" },
    { word: "get", phonetic: "/ɡet/", icon: "✅" },
  ],
  H: [
    { word: "hungry", phonetic: "/ˈhʌŋ.ɡri/", icon: "🤤" },
    { word: "hundred", phonetic: "/ˈhʌn.drəd/", icon: "💯" },
  ],
  J: [
    { word: "join", phonetic: "/dʒɔɪn/", icon: "🤝" },
    { word: "juice", phonetic: "/dʒuːs/", icon: "🧃" },
  ],
  K: [
    { word: "king", phonetic: "/kɪŋ/", icon: "👑" },
    { word: "kitchen", phonetic: "/ˈkɪtʃ.ən/", icon: "🍳" },
  ],
  L: [
    { word: "library", phonetic: "/ˈlaɪ.brer.i/", icon: "📚" },
    { word: "lunch", phonetic: "/lʌntʃ/", icon: "🍱" },
  ],
  M: [
    { word: "moon", phonetic: "/muːn/", icon: "🌙" },
    { word: "music", phonetic: "/ˈmjuː.zɪk/", icon: "🎵" },
  ],
  N: [
    { word: "night", phonetic: "/naɪt/", icon: "🌃" },
    { word: "nurse", phonetic: "/nɜːrs/", icon: "👩‍⚕️" },
  ],
  P: [
    { word: "park", phonetic: "/pɑːrk/", icon: "🏞️" },
    { word: "photo", phonetic: "/ˈfoʊ.toʊ/", icon: "📷" },
  ],
  Q: [
    { word: "quick", phonetic: "/kwɪk/", icon: "⚡" },
    { word: "quiet", phonetic: "/ˈkwaɪ.ət/", icon: "🤫" },
  ],
  R: [
    { word: "river", phonetic: "/ˈrɪv.ər/", icon: "🏞️" },
    { word: "round", phonetic: "/raʊnd/", icon: "⭕" },
  ],
  S: [
    { word: "sky", phonetic: "/skaɪ/", icon: "☁️" },
    { word: "start", phonetic: "/stɑːrt/", icon: "▶️" },
    { word: "sun", phonetic: "/sʌn/", icon: "☀️" },
  ],
  T: [
    { word: "teacher", phonetic: "/ˈtiː.tʃər/", icon: "👨‍🏫" },
    { word: "thirsty", phonetic: "/ˈθɜːr.sti/", icon: "🥵" },
    { word: "tired", phonetic: "/ˈtaɪrd/", icon: "😴" },
  ],
  V: [{ word: "visit", phonetic: "/ˈvɪz.ɪt/", icon: "🏠" }],
  W: [
    { word: "weather", phonetic: "/ˈweð.ər/", icon: "🌤️" },
    { word: "work", phonetic: "/wɜːrk/", icon: "💼" },
  ],
}

const grade5Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "address", phonetic: "/əˈdres/", icon: "📮" },
    { word: "artist", phonetic: "/ˈɑːr.tɪst/", icon: "🎨" },
  ],
  B: [
    { word: "bedroom", phonetic: "/ˈbed.ruːm/", icon: "🛏️" },
    { word: "birthday", phonetic: "/ˈbɜːrθ.deɪ/", icon: "🎂" },
    { word: "build", phonetic: "/bɪld/", icon: "🏗️" },
  ],
  C: [
    { word: "careful", phonetic: "/ˈker.fəl/", icon: "⚠️" },
    { word: "circle", phonetic: "/ˈsɜːr.kəl/", icon: "⭕" },
    { word: "class", phonetic: "/klæs/", icon: "🏫" },
  ],
  D: [
    { word: "different", phonetic: "/ˈdɪf.ər.ənt/", icon: "↔️" },
    { word: "dining room", phonetic: "/ˈdaɪ.nɪŋ ruːm/", icon: "🍽️" },
  ],
  E: [
    { word: "email", phonetic: "/ˈiː.meɪl/", icon: "📧" },
    { word: "excited", phonetic: "/ɪkˈsaɪ.tɪd/", icon: "🤩" },
  ],
  F: [
    { word: "festival", phonetic: "/ˈfes.tɪ.vəl/", icon: "🎊" },
    { word: "future", phonetic: "/ˈfjuː.tʃər/", icon: "🔮" },
  ],
  G: [
    { word: "give", phonetic: "/ɡɪv/", icon: "🎁" },
    { word: "green", phonetic: "/ɡriːn/", icon: "💚" },
  ],
  H: [
    { word: "holiday", phonetic: "/ˈhɑː.lə.deɪ/", icon: "🏖️" },
    { word: "homework", phonetic: "/ˈhoʊm.wɜːrk/", icon: "📝" },
  ],
  I: [
    { word: "important", phonetic: "/ɪmˈpɔːr.tənt/", icon: "⭐" },
    { word: "interesting", phonetic: "/ˈɪn.trə.stɪŋ/", icon: "🤔" },
  ],
  J: [{ word: "jacket", phonetic: "/ˈdʒæk.ɪt/", icon: "🧥" }],
  K: [{ word: "know", phonetic: "/noʊ/", icon: "🧠" }],
  L: [
    { word: "language", phonetic: "/ˈlæŋ.ɡwɪdʒ/", icon: "🗣️" },
    { word: "living room", phonetic: "/ˈlɪv.ɪŋ ruːm/", icon: "🛋️" },
  ],
  M: [
    { word: "make", phonetic: "/meɪk/", icon: "🔨" },
    { word: "minute", phonetic: "/ˈmɪn.ɪt/", icon: "⏱️" },
    { word: "month", phonetic: "/mʌnθ/", icon: "📅" },
  ],
  N: [
    { word: "near", phonetic: "/nɪr/", icon: "📍" },
    { word: "noisy", phonetic: "/ˈnɔɪ.zi/", icon: "🔊" },
  ],
  O: [
    { word: "once", phonetic: "/wʌns/", icon: "1️⃣" },
    { word: "orange", phonetic: "/ˈɔːr.ɪndʒ/", icon: "🍊" },
  ],
  P: [
    { word: "place", phonetic: "/pleɪs/", icon: "📍" },
    { word: "present", phonetic: "/ˈprez.ənt/", icon: "🎁" },
  ],
  Q: [{ word: "question", phonetic: "/ˈkwes.tʃən/", icon: "❓" }],
  R: [
    { word: "relative", phonetic: "/ˈrel.ə.tɪv/", icon: "👨‍👩‍👧‍👦" },
    { word: "ready", phonetic: "/ˈred.i/", icon: "✅" },
  ],
  S: [
    { word: "study", phonetic: "/ˈstʌd.i/", icon: "📖" },
    { word: "square", phonetic: "/skwer/", icon: "⬜" },
    { word: "special", phonetic: "/ˈspeʃ.əl/", icon: "✨" },
  ],
  T: [
    { word: "travel", phonetic: "/ˈtræv.əl/", icon: "✈️" },
    { word: "triangle", phonetic: "/ˈtraɪ.æŋ.ɡəl/", icon: "🔺" },
  ],
  U: [
    { word: "understand", phonetic: "/ˌʌn.dərˈstænd/", icon: "💡" },
    { word: "useful", phonetic: "/ˈjuːs.fəl/", icon: "🔧" },
  ],
  V: [{ word: "vegetable", phonetic: "/ˈvedʒ.tə.bəl/", icon: "🥬" }],
  W: [
    { word: "week", phonetic: "/wiːk/", icon: "📅" },
    { word: "weekend", phonetic: "/ˌwiːkˈend/", icon: "🎉" },
  ],
  Y: [{ word: "year", phonetic: "/jɪr/", icon: "📆" }],
}

const hujiaoGrade1Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [{ word: "afternoon", phonetic: "/ˌæf.tərˈnuːn/", icon: "🌅" }],
  B: [
    { word: "banana", phonetic: "/bəˈnæn.ə/", icon: "🍌" },
    { word: "bag", phonetic: "/bæɡ/", icon: "🎒" },
    { word: "balloon", phonetic: "/bəˈluːn/", icon: "🎈" },
    { word: "blue", phonetic: "/bluː/", icon: "💙" },
    { word: "box", phonetic: "/bɑːks/", icon: "📦" },
  ],
  C: [
    { word: "can", phonetic: "/kæn/", icon: "✅" },
    { word: "cap", phonetic: "/kæp/", icon: "🧢" },
    { word: "cherry", phonetic: "/ˈtʃer.i/", icon: "🍒" },
    { word: "coat", phonetic: "/koʊt/", icon: "🧥" },
    { word: "cold", phonetic: "/koʊld/", icon: "🥶" },
    { word: "cook", phonetic: "/kʊk/", icon: "👨‍🍳" },
    { word: "cool", phonetic: "/kuːl/", icon: "😎" },
    { word: "count", phonetic: "/kaʊnt/", icon: "🔢" },
  ],
  D: [
    { word: "dad", phonetic: "/dæd/", icon: "👨" },
    { word: "dance", phonetic: "/dæns/", icon: "💃" },
    { word: "draw", phonetic: "/drɔː/", icon: "✏️" },
  ],
  E: [
    { word: "eight", phonetic: "/eɪt/", icon: "8️⃣" },
    { word: "evening", phonetic: "/ˈiːv.nɪŋ/", icon: "🌆" },
  ],
  F: [
    { word: "five", phonetic: "/faɪv/", icon: "5️⃣" },
    { word: "four", phonetic: "/fɔːr/", icon: "4️⃣" },
  ],
  G: [
    { word: "goodbye", phonetic: "/ɡʊdˈbaɪ/", icon: "👋" },
    { word: "grape", phonetic: "/ɡreɪp/", icon: "🍇" },
    { word: "great", phonetic: "/ɡreɪt/", icon: "👍" },
    { word: "green", phonetic: "/ɡriːn/", icon: "💚" },
  ],
  H: [
    { word: "hello", phonetic: "/heˈloʊ/", icon: "👋" },
    { word: "hi", phonetic: "/haɪ/", icon: "👋" },
    { word: "hot", phonetic: "/hɑːt/", icon: "🔥" },
    { word: "how many", phonetic: "/haʊ ˈmen.i/", icon: "❓" },
  ],
  I: [
    { word: "I", phonetic: "/aɪ/", icon: "👤" },
    { word: "I'm", phonetic: "/aɪm/", icon: "👤" },
    { word: "is", phonetic: "/ɪz/", icon: "=" },
    { word: "it's", phonetic: "/ɪts/", icon: "➡️" },
  ],
  L: [{ word: "look", phonetic: "/lʊk/", icon: "👀" }],
  M: [
    { word: "marble", phonetic: "/ˈmɑːr.bəl/", icon: "⚪" },
    { word: "Miss", phonetic: "/mɪs/", icon: "👩" },
    { word: "morning", phonetic: "/ˈmɔːr.nɪŋ/", icon: "🌅" },
    { word: "Mr", phonetic: "/ˈmɪs.tər/", icon: "👨" },
    { word: "mum", phonetic: "/mʌm/", icon: "👩" },
    { word: "my", phonetic: "/maɪ/", icon: "👈" },
  ],
  N: [
    { word: "nice", phonetic: "/naɪs/", icon: "😊" },
    { word: "night", phonetic: "/naɪt/", icon: "🌃" },
    { word: "nine", phonetic: "/naɪn/", icon: "9️⃣" },
    { word: "no", phonetic: "/noʊ/", icon: "❌" },
  ],
  O: [
    { word: "OK", phonetic: "/oʊˈkeɪ/", icon: "👌" },
    { word: "one", phonetic: "/wʌn/", icon: "1️⃣" },
    { word: "ouch", phonetic: "/aʊtʃ/", icon: "😣" },
  ],
  P: [
    { word: "peach", phonetic: "/piːtʃ/", icon: "🍑" },
    { word: "pencil", phonetic: "/ˈpen.səl/", icon: "✏️" },
    { word: "pink", phonetic: "/pɪŋk/", icon: "💗" },
    { word: "puppy", phonetic: "/ˈpʌp.i/", icon: "🐶" },
    { word: "put on", phonetic: "/pʊt ɑːn/", icon: "👕" },
  ],
  R: [
    { word: "red", phonetic: "/red/", icon: "🔴" },
    { word: "robot", phonetic: "/ˈroʊ.bɑːt/", icon: "🤖" },
  ],
  S: [
    { word: "scarf", phonetic: "/skɑːrf/", icon: "🧣" },
    { word: "seven", phonetic: "/ˈsev.ən/", icon: "7️⃣" },
    { word: "sing", phonetic: "/sɪŋ/", icon: "🎤" },
    { word: "six", phonetic: "/sɪks/", icon: "6️⃣" },
    { word: "sorry", phonetic: "/ˈsɑːr.i/", icon: "🙏" },
    { word: "sweater", phonetic: "/ˈswet.ər/", icon: "🧶" },
  ],
  T: [
    { word: "teddy", phonetic: "/ˈted.i/", icon: "🧸" },
    { word: "ten", phonetic: "/ten/", icon: "🔟" },
    { word: "thanks", phonetic: "/θæŋks/", icon: "🙏" },
    { word: "that", phonetic: "/ðæt/", icon: "👉" },
    { word: "these", phonetic: "/ðiːz/", icon: "👇" },
    { word: "this", phonetic: "/ðɪs/", icon: "👉" },
    { word: "those", phonetic: "/ðoʊz/", icon: "👉" },
    { word: "three", phonetic: "/θriː/", icon: "3️⃣" },
    { word: "two", phonetic: "/tuː/", icon: "2️⃣" },
  ],
  W: [{ word: "wow", phonetic: "/waʊ/", icon: "😲" }],
  Y: [
    { word: "yellow", phonetic: "/ˈjel.oʊ/", icon: "💛" },
    { word: "yes", phonetic: "/jes/", icon: "✅" },
    { word: "your", phonetic: "/jʊr/", icon: "👈" },
  ],
}

const hujiaoGrade2Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [{ word: "apple", phonetic: "/ˈæp.əl/", icon: "🍎" }],
  B: [
    { word: "bear", phonetic: "/ber/", icon: "🐻" },
    { word: "big", phonetic: "/bɪɡ/", icon: "⬆️" },
    { word: "bird", phonetic: "/bɜːrd/", icon: "🐦" },
    { word: "black", phonetic: "/blæk/", icon: "⬛" },
    { word: "brown", phonetic: "/braʊn/", icon: "🟤" },
  ],
  C: [
    { word: "cat", phonetic: "/kæt/", icon: "🐱" },
    { word: "climb", phonetic: "/klaɪm/", icon: "🧗" },
    { word: "colour", phonetic: "/ˈkʌl.ər/", icon: "🎨" },
    { word: "count", phonetic: "/kaʊnt/", icon: "🔢" },
  ],
  D: [
    { word: "dog", phonetic: "/dɔːɡ/", icon: "🐕" },
    { word: "don't", phonetic: "/doʊnt/", icon: "🚫" },
    { word: "duck", phonetic: "/dʌk/", icon: "🦆" },
  ],
  E: [{ word: "elephant", phonetic: "/ˈel.ɪ.fənt/", icon: "🐘" }],
  F: [
    { word: "farm", phonetic: "/fɑːrm/", icon: "🚜" },
    { word: "fast", phonetic: "/fæst/", icon: "⚡" },
    { word: "fish", phonetic: "/fɪʃ/", icon: "🐟" },
    { word: "fly", phonetic: "/flaɪ/", icon: "🪰" },
    { word: "fruit", phonetic: "/fruːt/", icon: "🍎" },
  ],
  G: [
    { word: "game", phonetic: "/ɡeɪm/", icon: "🎮" },
    { word: "glass ball", phonetic: "/ɡlæs bɔːl/", icon: "⚪" },
    { word: "good", phonetic: "/ɡʊd/", icon: "👍" },
    { word: "grape", phonetic: "/ɡreɪp/", icon: "🍇" },
    { word: "grey", phonetic: "/ɡreɪ/", icon: "⬜" },
  ],
  H: [
    { word: "happy", phonetic: "/ˈhæp.i/", icon: "😊" },
    { word: "hop", phonetic: "/hɑːp/", icon: "🦘" },
  ],
  J: [{ word: "jump", phonetic: "/dʒʌmp/", icon: "🦘" }],
  L: [
    { word: "let's", phonetic: "/lets/", icon: "👫" },
    { word: "like", phonetic: "/laɪk/", icon: "👍" },
    { word: "long", phonetic: "/lɔːŋ/", icon: "↔️" },
    { word: "look at", phonetic: "/lʊk æt/", icon: "👀" },
  ],
  M: [
    { word: "mango", phonetic: "/ˈmæŋ.ɡoʊ/", icon: "🥭" },
    { word: "marble", phonetic: "/ˈmɑːr.bəl/", icon: "⚪" },
    { word: "monkey", phonetic: "/ˈmʌŋ.ki/", icon: "🐵" },
    { word: "mouse", phonetic: "/maʊs/", icon: "🐭" },
  ],
  O: [{ word: "orange", phonetic: "/ˈɔːr.ɪndʒ/", icon: "🍊" }],
  P: [
    { word: "panda", phonetic: "/ˈpæn.də/", icon: "🐼" },
    { word: "peach", phonetic: "/piːtʃ/", icon: "🍑" },
    { word: "pear", phonetic: "/per/", icon: "🍐" },
    { word: "pineapple", phonetic: "/ˈpaɪ.næp.əl/", icon: "🍍" },
    { word: "pink", phonetic: "/pɪŋk/", icon: "💗" },
    { word: "play", phonetic: "/pleɪ/", icon: "⚽" },
    { word: "please", phonetic: "/pliːz/", icon: "🙏" },
    { word: "purple", phonetic: "/ˈpɜːr.pəl/", icon: "💜" },
  ],
  R: [
    { word: "rabbit", phonetic: "/ˈræb.ɪt/", icon: "🐰" },
    { word: "round", phonetic: "/raʊnd/", icon: "⭕" },
    { word: "run", phonetic: "/rʌn/", icon: "🏃" },
  ],
  S: [
    { word: "sad", phonetic: "/sæd/", icon: "😢" },
    { word: "short", phonetic: "/ʃɔːrt/", icon: "⬇️" },
    { word: "skip", phonetic: "/skɪp/", icon: "🦘" },
    { word: "slide", phonetic: "/slaɪd/", icon: "🛝" },
    { word: "slow", phonetic: "/sloʊ/", icon: "🐌" },
    { word: "small", phonetic: "/smɔːl/", icon: "⬇️" },
    { word: "strawberry", phonetic: "/ˈstrɔː.ber.i/", icon: "🍓" },
    { word: "strong", phonetic: "/strɔːŋ/", icon: "💪" },
    { word: "super", phonetic: "/ˈsuː.pər/", icon: "⭐" },
    { word: "swing", phonetic: "/swɪŋ/", icon: "🎢" },
    { word: "swim", phonetic: "/swɪm/", icon: "🏊" },
  ],
  T: [
    { word: "tall", phonetic: "/tɔːl/", icon: "⬆️" },
    { word: "thank you", phonetic: "/θæŋk juː/", icon: "🙏" },
    { word: "tiger", phonetic: "/ˈtaɪ.ɡər/", icon: "🐯" },
    { word: "toy", phonetic: "/tɔɪ/", icon: "🧸" },
  ],
  U: [{ word: "us", phonetic: "/ʌs/", icon: "👥" }],
  V: [{ word: "very", phonetic: "/ˈver.i/", icon: "💯" }],
  W: [
    { word: "walk", phonetic: "/wɔːk/", icon: "🚶" },
    { word: "watermelon", phonetic: "/ˈwɔː.tər.mel.ən/", icon: "🍉" },
    { word: "white", phonetic: "/waɪt/", icon: "⬜" },
  ],
  Z: [{ word: "zoo", phonetic: "/zuː/", icon: "🦁" }],
}

const hujiaoGrade3Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "again", phonetic: "/əˈɡen/", icon: "🔄" },
    { word: "arm", phonetic: "/ɑːrm/", icon: "💪" },
  ],
  B: [
    { word: "bag", phonetic: "/bæɡ/", icon: "🎒" },
    { word: "behind", phonetic: "/bɪˈhaɪnd/", icon: "⬅️" },
    { word: "body", phonetic: "/ˈbɑː.di/", icon: "🧍" },
    { word: "book", phonetic: "/bʊk/", icon: "📚" },
    { word: "bowl", phonetic: "/boʊl/", icon: "🥣" },
    { word: "boy", phonetic: "/bɔɪ/", icon: "👦" },
    { word: "breakfast", phonetic: "/ˈbrek.fəst/", icon: "🍳" },
    { word: "brush", phonetic: "/brʌʃ/", icon: "🖌️" },
  ],
  C: [
    { word: "chair", phonetic: "/tʃer/", icon: "🪑" },
    { word: "chopsticks", phonetic: "/ˈtʃɑːp.stɪks/", icon: "🥢" },
    { word: "clap", phonetic: "/klæp/", icon: "👏" },
    { word: "classroom", phonetic: "/ˈklæs.ruːm/", icon: "🏫" },
    { word: "clean", phonetic: "/kliːn/", icon: "🧼" },
    { word: "close", phonetic: "/kloʊz/", icon: "❌" },
    { word: "crayon", phonetic: "/ˈkreɪ.ɑːn/", icon: "🖍️" },
    { word: "cup", phonetic: "/kʌp/", icon: "☕" },
  ],
  D: [
    { word: "desk", phonetic: "/desk/", icon: "🗂️" },
    { word: "dinner", phonetic: "/ˈdɪn.ər/", icon: "🍲" },
  ],
  E: [
    { word: "ear", phonetic: "/ɪr/", icon: "👂" },
    { word: "egg", phonetic: "/eɡ/", icon: "🥚" },
    { word: "eraser", phonetic: "/ɪˈreɪ.sər/", icon: "✏️" },
    { word: "eye", phonetic: "/aɪ/", icon: "👁️" },
  ],
  F: [
    { word: "face", phonetic: "/feɪs/", icon: "😊" },
    { word: "fish", phonetic: "/fɪʃ/", icon: "🐟" },
    { word: "foot", phonetic: "/fʊt/", icon: "🦶" },
    { word: "fork", phonetic: "/fɔːrk/", icon: "🍴" },
    { word: "friend", phonetic: "/frend/", icon: "👥" },
    { word: "full", phonetic: "/fʊl/", icon: "🈵" },
  ],
  G: [{ word: "girl", phonetic: "/ɡɜːrl/", icon: "👧" }],
  H: [
    { word: "hair", phonetic: "/her/", icon: "💇" },
    { word: "hand", phonetic: "/hænd/", icon: "✋" },
    { word: "head", phonetic: "/hed/", icon: "🧠" },
    { word: "hungry", phonetic: "/ˈhʌŋ.ɡri/", icon: "🤤" },
  ],
  I: [{ word: "in", phonetic: "/ɪn/", icon: "📥" }],
  K: [{ word: "knife", phonetic: "/naɪf/", icon: "🔪" }],
  L: [
    { word: "left", phonetic: "/left/", icon: "⬅️" },
    { word: "leg", phonetic: "/leɡ/", icon: "🦵" },
    { word: "listen", phonetic: "/ˈlɪs.ən/", icon: "👂" },
    { word: "look", phonetic: "/lʊk/", icon: "👀" },
    { word: "lunch", phonetic: "/lʌntʃ/", icon: "🍱" },
  ],
  M: [
    { word: "meat", phonetic: "/miːt/", icon: "🥩" },
    { word: "milk", phonetic: "/mɪlk/", icon: "🥛" },
    { word: "morning exercises", phonetic: "/ˈmɔːr.nɪŋ ˈek.sər.saɪ.zɪz/", icon: "🤸" },
    { word: "mouth", phonetic: "/maʊθ/", icon: "👄" },
  ],
  N: [
    { word: "need", phonetic: "/niːd/", icon: "❓" },
    { word: "next to", phonetic: "/nekst tuː/", icon: "➡️" },
    { word: "nod", phonetic: "/nɑːd/", icon: "👍" },
    { word: "noodles", phonetic: "/ˈnuː.dəlz/", icon: "🍜" },
    { word: "nose", phonetic: "/noʊz/", icon: "👃" },
  ],
  O: [
    { word: "on", phonetic: "/ɑːn/", icon: "⬆️" },
    { word: "open", phonetic: "/ˈoʊ.pən/", icon: "🔓" },
  ],
  P: [
    { word: "pencil", phonetic: "/ˈpen.səl/", icon: "✏️" },
    { word: "plate", phonetic: "/pleɪt/", icon: "🍽️" },
    { word: "put up", phonetic: "/pʊt ʌp/", icon: "⬆️" },
  ],
  R: [
    { word: "raise your hand", phonetic: "/reɪz jʊr hænd/", icon: "🙋" },
    { word: "read", phonetic: "/riːd/", icon: "📖" },
    { word: "rice", phonetic: "/raɪs/", icon: "🍚" },
    { word: "right", phonetic: "/raɪt/", icon: "➡️" },
    { word: "ruler", phonetic: "/ˈruː.lər/", icon: "📏" },
  ],
  S: [
    { word: "say", phonetic: "/seɪ/", icon: "🗣️" },
    { word: "school", phonetic: "/skuːl/", icon: "🏫" },
    { word: "shake", phonetic: "/ʃeɪk/", icon: "🖐️" },
    { word: "sit down", phonetic: "/sɪt daʊn/", icon: "🪑" },
    { word: "soup", phonetic: "/suːp/", icon: "🍲" },
    { word: "spell", phonetic: "/spel/", icon: "🔡" },
    { word: "spoon", phonetic: "/spuːn/", icon: "🥄" },
    { word: "stamp", phonetic: "/stæmp/", icon: "📮" },
    { word: "stand up", phonetic: "/stænd ʌp/", icon: "🧍" },
    { word: "student", phonetic: "/ˈstuː.dənt/", icon: "👨‍🎓" },
  ],
  T: [
    { word: "teacher", phonetic: "/ˈtiː.tʃər/", icon: "👨‍🏫" },
    { word: "thirsty", phonetic: "/ˈθɜːr.sti/", icon: "🥵" },
    { word: "tooth", phonetic: "/tuːθ/", icon: "🦷" },
    { word: "touch", phonetic: "/tʌtʃ/", icon: "👉" },
  ],
  U: [{ word: "under", phonetic: "/ˈʌn.dər/", icon: "⬇️" }],
  V: [{ word: "vegetable", phonetic: "/ˈvedʒ.tə.bəl/", icon: "🥬" }],
  W: [
    { word: "want", phonetic: "/wɑːnt/", icon: "✋" },
    { word: "wash", phonetic: "/wɑːʃ/", icon: "🧼" },
    { word: "water", phonetic: "/ˈwɔː.tər/", icon: "💧" },
    { word: "write", phonetic: "/raɪt/", icon: "✍️" },
  ],
}

const hujiaoGrade4Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "afternoon", phonetic: "/ˌæf.tərˈnuːn/", icon: "🌅" },
    { word: "aunt", phonetic: "/ænt/", icon: "👩‍👧‍👦" },
  ],
  B: [
    { word: "baby", phonetic: "/ˈbeɪ.bi/", icon: "👶" },
    { word: "bathroom", phonetic: "/ˈbæθ.ruːm/", icon: "🚽" },
    { word: "bed", phonetic: "/bed/", icon: "🛏️" },
    { word: "bedroom", phonetic: "/ˈbed.ruːm/", icon: "🛏️" },
    { word: "brother", phonetic: "/ˈbrʌð.ər/", icon: "👦" },
    { word: "brush teeth", phonetic: "/brʌʃ tiːθ/", icon: "🪥" },
  ],
  C: [
    { word: "clock", phonetic: "/klɑːk/", icon: "⏰" },
    { word: "cousin", phonetic: "/ˈkʌz.ən/", icon: "👨‍👩‍👧‍👦" },
  ],
  D: [
    { word: "day", phonetic: "/deɪ/", icon: "☀️" },
    { word: "do homework", phonetic: "/duː ˈhoʊm.wɜːrk/", icon: "📚" },
    { word: "door", phonetic: "/dɔːr/", icon: "🚪" },
  ],
  E: [
    { word: "early", phonetic: "/ˈɜːr.li/", icon: "🌅" },
    { word: "evening", phonetic: "/ˈiːv.nɪŋ/", icon: "🌆" },
    { word: "every", phonetic: "/ˈev.ri/", icon: "💯" },
  ],
  F: [
    { word: "family", phonetic: "/ˈfæm.əl.i/", icon: "👨‍👩‍👧‍👦" },
    { word: "father", phonetic: "/ˈfɑː.ðər/", icon: "👨" },
    { word: "fridge", phonetic: "/frɪdʒ/", icon: "🧊" },
  ],
  G: [
    { word: "get up", phonetic: "/ɡet ʌp/", icon: "⬆️" },
    { word: "go home", phonetic: "/ɡoʊ hoʊm/", icon: "🏠" },
    { word: "go to bed", phonetic: "/ɡoʊ tə bed/", icon: "🛏️" },
    { word: "go to school", phonetic: "/ɡoʊ tə skuːl/", icon: "🏫" },
    { word: "grandma", phonetic: "/ˈɡrænd.mɑː/", icon: "👵" },
    { word: "grandpa", phonetic: "/ˈɡrænd.pɑː/", icon: "👴" },
  ],
  H: [
    { word: "half", phonetic: "/hæf/", icon: "½" },
    { word: "have breakfast", phonetic: "/hæv ˈbrek.fəst/", icon: "🍳" },
    { word: "here", phonetic: "/hɪr/", icon: "📍" },
    { word: "home", phonetic: "/hoʊm/", icon: "🏠" },
  ],
  K: [{ word: "kitchen", phonetic: "/ˈkɪtʃ.ən/", icon: "🍳" }],
  L: [
    { word: "lamp", phonetic: "/læmp/", icon: "💡" },
    { word: "late", phonetic: "/leɪt/", icon: "⏳" },
    { word: "living room", phonetic: "/ˈlɪv.ɪŋ ruːm/", icon: "🛋️" },
  ],
  M: [
    { word: "minute", phonetic: "/ˈmɪn.ɪt/", icon: "⏱️" },
    { word: "morning", phonetic: "/ˈmɔːr.nɪŋ/", icon: "🌅" },
    { word: "mother", phonetic: "/ˈmʌð.ər/", icon: "👩" },
  ],
  N: [
    { word: "night", phonetic: "/naɪt/", icon: "🌃" },
    { word: "noon", phonetic: "/nuːn/", icon: "🕛" },
    { word: "now", phonetic: "/naʊ/", icon: "⏰" },
  ],
  O: [{ word: "o'clock", phonetic: "/əˈklɑːk/", icon: "⏰" }],
  P: [
    { word: "phone", phonetic: "/foʊn/", icon: "📱" },
    { word: "photo", phonetic: "/ˈfoʊ.toʊ/", icon: "📷" },
    { word: "play games", phonetic: "/pleɪ ɡeɪmz/", icon: "🎮" },
  ],
  Q: [{ word: "quarter", phonetic: "/ˈkwɔːr.tər/", icon: "¼" }],
  R: [{ word: "read books", phonetic: "/riːd bʊks/", icon: "📚" }],
  S: [
    { word: "sister", phonetic: "/ˈsɪs.tər/", icon: "👧" },
    { word: "sofa", phonetic: "/ˈsoʊ.fə/", icon: "🛋️" },
  ],
  T: [
    { word: "table", phonetic: "/ˈteɪ.bəl/", icon: "🪑" },
    { word: "then", phonetic: "/ðen/", icon: "➡️" },
    { word: "there", phonetic: "/ðer/", icon: "📍" },
    { word: "time", phonetic: "/taɪm/", icon: "⏰" },
    { word: "today", phonetic: "/təˈdeɪ/", icon: "📅" },
    { word: "tomorrow", phonetic: "/təˈmɑː.roʊ/", icon: "➡️" },
    { word: "TV", phonetic: "/ˌtiːˈviː/", icon: "📺" },
  ],
  U: [{ word: "uncle", phonetic: "/ˈʌŋ.kəl/", icon: "👨‍👧‍👦" }],
  W: [
    { word: "wash face", phonetic: "/wɑːʃ feɪs/", icon: "🧼" },
    { word: "watch TV", phonetic: "/wɑːtʃ ˌtiːˈviː/", icon: "📺" },
    { word: "where", phonetic: "/wer/", icon: "❓" },
    { word: "window", phonetic: "/ˈwɪn.doʊ/", icon: "🪟" },
  ],
  Y: [{ word: "yesterday", phonetic: "/ˈjes.tər.deɪ/", icon: "⬅️" }],
}

const hujiaoGrade5Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "afternoon", phonetic: "/ˌæf.tərˈnuːn/", icon: "🌅" },
    { word: "am", phonetic: "/æm/", icon: "⬆️" },
    { word: "an", phonetic: "/æn/", icon: "🅰️" },
    { word: "apple", phonetic: "/ˈæp.əl/", icon: "🍎" },
    { word: "are", phonetic: "/ɑːr/", icon: "✅" },
    { word: "art", phonetic: "/ɑːrt/", icon: "🎨" },
  ],
  B: [
    { word: "banana", phonetic: "/bəˈnæn.ə/", icon: "🍌" },
    { word: "black", phonetic: "/blæk/", icon: "⬛" },
    { word: "blue", phonetic: "/bluː/", icon: "💙" },
    { word: "brown", phonetic: "/braʊn/", icon: "🟤" },
  ],
  C: [
    { word: "cake", phonetic: "/keɪk/", icon: "🎂" },
    { word: "chinese", phonetic: "/tʃaɪˈniːz/", icon: "🇨🇳" },
    { word: "close", phonetic: "/kloʊz/", icon: "❌" },
    { word: "colour", phonetic: "/ˈkʌl.ər/", icon: "🎨" },
    { word: "computer", phonetic: "/kəmˈpjuː.tər/", icon: "💻" },
  ],
  D: [
    { word: "down", phonetic: "/daʊn/", icon: "⬇️" },
    { word: "draw", phonetic: "/drɔː/", icon: "✏️" },
  ],
  E: [
    { word: "egg", phonetic: "/eɡ/", icon: "🥚" },
    { word: "english", phonetic: "/ˈɪŋ.ɡlɪʃ/", icon: "🇬🇧" },
    { word: "evening", phonetic: "/ˈiːv.nɪŋ/", icon: "🌆" },
    { word: "excuse me", phonetic: "/ɪkˈskjuːz miː/", icon: "🙏" },
  ],
  F: [{ word: "fan", phonetic: "/fæn/", icon: "🌬️" }],
  G: [
    { word: "good", phonetic: "/ɡʊd/", icon: "👍" },
    { word: "goodbye", phonetic: "/ɡʊdˈbaɪ/", icon: "👋" },
    { word: "green", phonetic: "/ɡriːn/", icon: "💚" },
    { word: "grey", phonetic: "/ɡreɪ/", icon: "⬜" },
  ],
  H: [
    { word: "he", phonetic: "/hiː/", icon: "👨" },
    { word: "hello", phonetic: "/heˈloʊ/", icon: "👋" },
    { word: "her", phonetic: "/hɜːr/", icon: "👩" },
    { word: "hi", phonetic: "/haɪ/", icon: "👋" },
    { word: "his", phonetic: "/hɪz/", icon: "👨" },
    { word: "how", phonetic: "/haʊ/", icon: "❓" },
  ],
  I: [
    { word: "I", phonetic: "/aɪ/", icon: "👤" },
    { word: "ice cream", phonetic: "/ˈaɪs kriːm/", icon: "🍦" },
    { word: "in", phonetic: "/ɪn/", icon: "📥" },
    { word: "in front of", phonetic: "/ɪn frʌnt əv/", icon: "➡️" },
    { word: "is", phonetic: "/ɪz/", icon: "=" },
  ],
  L: [
    { word: "left", phonetic: "/left/", icon: "⬅️" },
    { word: "let's", phonetic: "/lets/", icon: "👫" },
    { word: "light", phonetic: "/laɪt/", icon: "💡" },
    { word: "listen", phonetic: "/ˈlɪs.ən/", icon: "👂" },
    { word: "look", phonetic: "/lʊk/", icon: "👀" },
    { word: "love", phonetic: "/lʌv/", icon: "❤️" },
  ],
  M: [
    { word: "map", phonetic: "/mæp/", icon: "🗺️" },
    { word: "maths", phonetic: "/mæθs/", icon: "➕" },
    { word: "morning", phonetic: "/ˈmɔːr.nɪŋ/", icon: "🌅" },
    { word: "music", phonetic: "/ˈmjuː.zɪk/", icon: "🎵" },
    { word: "my", phonetic: "/maɪ/", icon: "👈" },
  ],
  N: [
    { word: "name", phonetic: "/neɪm/", icon: "📛" },
    { word: "next to", phonetic: "/nekst tuː/", icon: "➡️" },
    { word: "no", phonetic: "/noʊ/", icon: "❌" },
    { word: "not", phonetic: "/nɑːt/", icon: "🚫" },
  ],
  O: [
    { word: "OK", phonetic: "/oʊˈkeɪ/", icon: "👌" },
    { word: "on", phonetic: "/ɑːn/", icon: "⬆️" },
    { word: "open", phonetic: "/ˈoʊ.pən/", icon: "🔓" },
    { word: "orange", phonetic: "/ˈɔːr.ɪndʒ/", icon: "🍊" },
    { word: "our", phonetic: "/aʊr/", icon: "👥" },
    { word: "out", phonetic: "/aʊt/", icon: "➡️" },
  ],
  P: [
    { word: "PE", phonetic: "/ˌpiːˈiː/", icon: "🏃" },
    { word: "pear", phonetic: "/per/", icon: "🍐" },
    { word: "picture", phonetic: "/ˈpɪk.tʃər/", icon: "🖼️" },
    { word: "pie", phonetic: "/paɪ/", icon: "🥧" },
    { word: "pink", phonetic: "/pɪŋk/", icon: "💗" },
    { word: "please", phonetic: "/pliːz/", icon: "🙏" },
    { word: "purple", phonetic: "/ˈpɜːr.pəl/", icon: "💜" },
  ],
  R: [
    { word: "read", phonetic: "/riːd/", icon: "📖" },
    { word: "red", phonetic: "/red/", icon: "🔴" },
    { word: "right", phonetic: "/raɪt/", icon: "➡️" },
  ],
  S: [
    { word: "science", phonetic: "/ˈsaɪ.əns/", icon: "🔬" },
    { word: "she", phonetic: "/ʃiː/", icon: "👩" },
    { word: "shelf", phonetic: "/ʃelf/", icon: "📚" },
    { word: "sit", phonetic: "/sɪt/", icon: "🪑" },
    { word: "sorry", phonetic: "/ˈsɑːr.i/", icon: "🙏" },
    { word: "stand", phonetic: "/stænd/", icon: "🧍" },
    { word: "sweet", phonetic: "/swiːt/", icon: "🍬" },
  ],
  T: [
    { word: "thanks", phonetic: "/θæŋks/", icon: "🙏" },
    { word: "that", phonetic: "/ðæt/", icon: "👉" },
    { word: "the", phonetic: "/ðə/", icon: "➡️" },
    { word: "their", phonetic: "/ðer/", icon: "👨‍👩‍👧‍👦" },
    { word: "these", phonetic: "/ðiːz/", icon: "👇" },
    { word: "they", phonetic: "/ðeɪ/", icon: "👥" },
    { word: "this", phonetic: "/ðɪs/", icon: "👉" },
    { word: "those", phonetic: "/ðoʊz/", icon: "👉" },
    { word: "turn", phonetic: "/tɜːrn/", icon: "↪️" },
  ],
  U: [
    { word: "under", phonetic: "/ˈʌn.dər/", icon: "⬇️" },
    { word: "up", phonetic: "/ʌp/", icon: "⬆️" },
    { word: "us", phonetic: "/ʌs/", icon: "👥" },
  ],
  W: [
    { word: "we", phonetic: "/wiː/", icon: "👥" },
    { word: "what", phonetic: "/wʌt/", icon: "❓" },
    { word: "white", phonetic: "/waɪt/", icon: "⬜" },
    { word: "window", phonetic: "/ˈwɪn.doʊ/", icon: "🪟" },
    { word: "write", phonetic: "/raɪt/", icon: "✍️" },
  ],
  Y: [
    { word: "yellow", phonetic: "/ˈjel.oʊ/", icon: "💛" },
    { word: "yes", phonetic: "/jes/", icon: "✅" },
    { word: "you", phonetic: "/juː/", icon: "👤" },
    { word: "your", phonetic: "/jʊr/", icon: "👈" },
  ],
}

const hujiaoGrade6Words: Record<string, Array<{ word: string; phonetic: string; icon: string }>> = {
  A: [
    { word: "always", phonetic: "/ˈɔːl.weɪz/", icon: "💯" },
    { word: "art", phonetic: "/ɑːrt/", icon: "🎨" },
    { word: "autumn", phonetic: "/ˈɔː.təm/", icon: "🍂" },
  ],
  C: [
    { word: "class", phonetic: "/klæs/", icon: "🏫" },
    { word: "cloudy", phonetic: "/ˈklaʊ.di/", icon: "☁️" },
    { word: "cold", phonetic: "/koʊld/", icon: "🥶" },
    { word: "computer", phonetic: "/kəmˈpjuː.tər/", icon: "💻" },
    { word: "cool", phonetic: "/kuːl/", icon: "😎" },
  ],
  D: [{ word: "day", phonetic: "/deɪ/", icon: "☀️" }],
  E: [
    { word: "early", phonetic: "/ˈɜːr.li/", icon: "🌅" },
    { word: "every", phonetic: "/ˈev.ri/", icon: "💯" },
  ],
  F: [{ word: "friday", phonetic: "/ˈfraɪ.deɪ/", icon: "🗓️" }],
  G: [
    { word: "get up", phonetic: "/ɡet ʌp/", icon: "⬆️" },
    { word: "go home", phonetic: "/ɡoʊ hoʊm/", icon: "🏠" },
    { word: "go to bed", phonetic: "/ɡoʊ tə bed/", icon: "🛏️" },
    { word: "go to school", phonetic: "/ɡoʊ tə skuːl/", icon: "🏫" },
  ],
  H: [
    { word: "half past", phonetic: "/hæf pæst/", icon: "🕒" },
    { word: "has", phonetic: "/hæz/", icon: "✅" },
    { word: "have", phonetic: "/hæv/", icon: "✅" },
    { word: "have breakfast", phonetic: "/hæv ˈbrek.fəst/", icon: "🍳" },
    { word: "have dinner", phonetic: "/hæv ˈdɪn.ər/", icon: "🍲" },
    { word: "have lessons", phonetic: "/hæv ˈles.ənz/", icon: "📚" },
    { word: "have lunch", phonetic: "/hæv lʌntʃ/", icon: "🍱" },
    { word: "hour", phonetic: "/aʊr/", icon: "⏱️" },
    { word: "hot", phonetic: "/hɑːt/", icon: "🔥" },
  ],
  L: [
    { word: "late", phonetic: "/leɪt/", icon: "⏳" },
    { word: "lesson", phonetic: "/ˈles.ən/", icon: "📚" },
  ],
  M: [
    { word: "maths", phonetic: "/mæθs/", icon: "➕" },
    { word: "minute", phonetic: "/ˈmɪn.ɪt/", icon: "⏱️" },
    { word: "monday", phonetic: "/ˈmʌn.deɪ/", icon: "🗓️" },
    { word: "month", phonetic: "/mʌnθ/", icon: "📅" },
    { word: "morning", phonetic: "/ˈmɔːr.nɪŋ/", icon: "🌅" },
    { word: "music", phonetic: "/ˈmjuː.zɪk/", icon: "🎵" },
  ],
  N: [
    { word: "never", phonetic: "/ˈnev.ər/", icon: "❌" },
    { word: "night", phonetic: "/naɪt/", icon: "🌃" },
  ],
  O: [
    { word: "o'clock", phonetic: "/əˈklɑːk/", icon: "⏰" },
    { word: "often", phonetic: "/ˈɔː.fən/", icon: "🔄" },
  ],
  P: [{ word: "PE", phonetic: "/ˌpiːˈiː/", icon: "🏃" }],
  Q: [{ word: "quarter", phonetic: "/ˈkwɔːr.tər/", icon: "¼" }],
  R: [{ word: "rainy", phonetic: "/ˈreɪ.ni/", icon: "🌧️" }],
  S: [
    { word: "saturday", phonetic: "/ˈsæt.ər.deɪ/", icon: "🗓️" },
    { word: "science", phonetic: "/ˈsaɪ.əns/", icon: "🔬" },
    { word: "season", phonetic: "/ˈsiː.zən/", icon: "☀️" },
    { word: "snowy", phonetic: "/ˈsnoʊ.i/", icon: "❄️" },
    { word: "sometimes", phonetic: "/ˈsʌm.taɪmz/", icon: "🤔" },
    { word: "spring", phonetic: "/sprɪŋ/", icon: "🌱" },
    { word: "subject", phonetic: "/ˈsʌb.dʒekt/", icon: "📚" },
    { word: "summer", phonetic: "/ˈsʌm.ər/", icon: "☀️" },
    { word: "sunday", phonetic: "/ˈsʌn.deɪ/", icon: "🗓️" },
    { word: "sunny", phonetic: "/ˈsʌn.i/", icon: "☀️" },
  ],
  T: [
    { word: "thursday", phonetic: "/ˈθɜːrz.deɪ/", icon: "🗓️" },
    { word: "timetable", phonetic: "/ˈtaɪm.teɪ.bəl/", icon: "🗓️" },
    { word: "today", phonetic: "/təˈdeɪ/", icon: "📅" },
    { word: "tomorrow", phonetic: "/təˈmɑː.roʊ/", icon: "➡️" },
    { word: "tuesday", phonetic: "/ˈtuːz.deɪ/", icon: "🗓️" },
  ],
  U: [{ word: "usually", phonetic: "/ˈjuː.ʒu.ə.li/", icon: "✅" }],
  W: [
    { word: "warm", phonetic: "/wɔːrm/", icon: "🌡️" },
    { word: "watch", phonetic: "/wɑːtʃ/", icon: "⌚" },
    { word: "wednesday", phonetic: "/ˈwenz.deɪ/", icon: "🗓️" },
    { word: "week", phonetic: "/wiːk/", icon: "📅" },
    { word: "weekend", phonetic: "/ˌwiːkˈend/", icon: "🎉" },
    { word: "windy", phonetic: "/ˈwɪn.di/", icon: "💨" },
    { word: "winter", phonetic: "/ˈwɪn.tər/", icon: "❄️" },
  ],
  Y: [
    { word: "year", phonetic: "/jɪr/", icon: "📆" },
    { word: "yesterday", phonetic: "/ˈjes.tər.deɪ/", icon: "⬅️" },
  ],
}

const letterData = [
  {
    letter: "A",
    words: [
      { word: "Apple", emoji: "🍎", phonetic: "/ˈæp.əl/" },
      { word: "Ant", emoji: "🐜", phonetic: "/ænt/" },
      { word: "Alligator", emoji: "🐊", phonetic: "/ˈæl.ɪ.ɡeɪ.tər/" },
      { word: "Ax", emoji: "🪓", phonetic: "/æks/" },
    ],
  },
  {
    letter: "B",
    words: [
      { word: "Bear", emoji: "🐻", phonetic: "/ber/" },
      { word: "Bird", emoji: "🐦", phonetic: "/bɜːrd/" },
      { word: "Ball", emoji: "🏀", phonetic: "/bɔːl/" },
      { word: "Banana", emoji: "🍌", phonetic: "/bəˈnæn.ə/" },
    ],
  },
  {
    letter: "C",
    words: [
      { word: "Cat", emoji: "🐱", phonetic: "/kæt/" },
      { word: "Car", emoji: "🚗", phonetic: "/kɑːr/" },
      { word: "Cupcake", emoji: "🧁", phonetic: "/ˈkʌp.keɪk/" },
      { word: "Computer", emoji: "💻", phonetic: "/kəmˈpjuː.tər/" },
    ],
  },
  {
    letter: "D",
    words: [
      { word: "Dog", emoji: "🐕", phonetic: "/dɔːɡ/" },
      { word: "Duck", emoji: "🦆", phonetic: "/dʌk/" },
      { word: "Doll", emoji: "🪆", phonetic: "/dɑːl/" },
      { word: "Desk", emoji: "🪑", phonetic: "/desk/" },
    ],
  },
  {
    letter: "E",
    words: [
      { word: "Elephant", emoji: "🐘", phonetic: "/ˈel.ɪ.fənt/" },
      { word: "Egg", emoji: "🥚", phonetic: "/eɡ/" },
      { word: "Envelope", emoji: "✉️", phonetic: "/ˈen.və.loʊp/" },
      { word: "Elbow", emoji: "💪", phonetic: "/ˈel.boʊ/" },
    ],
  },
  {
    letter: "F",
    words: [
      { word: "Fish", emoji: "🐟", phonetic: "/fɪʃ/" },
      { word: "Flower", emoji: "🌸", phonetic: "/ˈflaʊ.ər/" },
      { word: "Fork", emoji: "🍴", phonetic: "/fɔːrk/" },
      { word: "Frog", emoji: "🐸", phonetic: "/frɔːɡ/" },
    ],
  },
  {
    letter: "G",
    words: [
      { word: "Goat", emoji: "🐐", phonetic: "/ɡoʊt/" },
      { word: "Gorilla", emoji: "🦍", phonetic: "/ɡəˈrɪl.ə/" },
      { word: "Girl", emoji: "👧", phonetic: "/ɡɜːrl/" },
      { word: "Gift", emoji: "🎁", phonetic: "/ɡɪft/" },
    ],
  },
  {
    letter: "H",
    words: [
      { word: "Horse", emoji: "🐴", phonetic: "/hɔːrs/" },
      { word: "Hat", emoji: "🎩", phonetic: "/hæt/" },
      { word: "House", emoji: "🏠", phonetic: "/haʊs/" },
      { word: "Hot dog", emoji: "🌭", phonetic: "/ˈhɑːt dɔːɡ/" },
    ],
  },
  {
    letter: "I",
    words: [
      { word: "Ice cream", emoji: "🍦", phonetic: "/ˈaɪs kriːm/" },
      { word: "Insect", emoji: "🦗", phonetic: "/ˈɪn.sekt/" },
      { word: "Igloo", emoji: "🏔️", phonetic: "/ˈɪɡ.luː/" },
      { word: "Island", emoji: "🏝️", phonetic: "/ˈaɪ.lənd/" },
    ],
  },
  {
    letter: "J",
    words: [
      { word: "Jellyfish", emoji: "🪼", phonetic: "/ˈdʒel.i.fɪʃ/" },
      { word: "Juice", emoji: "🧃", phonetic: "/dʒuːs/" },
      { word: "Jet", emoji: "✈️", phonetic: "/dʒet/" },
      { word: "Jar", emoji: "🫙", phonetic: "/dʒɑːr/" },
    ],
  },
  {
    letter: "K",
    words: [
      { word: "Koala", emoji: "🐨", phonetic: "/koʊˈɑː.lə/" },
      { word: "Kite", emoji: "🪁", phonetic: "/kaɪt/" },
      { word: "Key", emoji: "🔑", phonetic: "/kiː/" },
      { word: "King", emoji: "🤴", phonetic: "/kɪŋ/" },
    ],
  },
  {
    letter: "L",
    words: [
      { word: "Lion", emoji: "🦁", phonetic: "/ˈlaɪ.ən/" },
      { word: "Leaf", emoji: "🍃", phonetic: "/liːf/" },
      { word: "Lemon", emoji: "🍋", phonetic: "/ˈlem.ən/" },
      { word: "Lamp", emoji: "💡", phonetic: "/læmp/" },
    ],
  },
  {
    letter: "M",
    words: [
      { word: "Monkey", emoji: "🐵", phonetic: "/ˈmʌŋ.ki/" },
      { word: "Moon", emoji: "🌙", phonetic: "/muːn/" },
      { word: "Mouse", emoji: "🐭", phonetic: "/maʊs/" },
      { word: "Milk", emoji: "🥛", phonetic: "/mɪlk/" },
    ],
  },
  {
    letter: "N",
    words: [
      { word: "Nest", emoji: "🪺", phonetic: "/nest/" },
      { word: "Nose", emoji: "👃", phonetic: "/noʊz/" },
      { word: "Nut", emoji: "🥜", phonetic: "/nʌt/" },
      { word: "Notebook", emoji: "📓", phonetic: "/ˈnoʊt.bʊk/" },
    ],
  },
  {
    letter: "O",
    words: [
      { word: "Octopus", emoji: "🐙", phonetic: "/ˈɑːk.tə.pəs/" },
      { word: "Orange", emoji: "🍊", phonetic: "/ˈɔːr.ɪndʒ/" },
      { word: "Owl", emoji: "🦉", phonetic: "/aʊl/" },
      { word: "Olive", emoji: "🫒", phonetic: "/ˈɑː.lɪv/" },
    ],
  },
  {
    letter: "P",
    words: [
      { word: "Pig", emoji: "🐷", phonetic: "/pɪɡ/" },
      { word: "Pizza", emoji: "🍕", phonetic: "/ˈpiːt.sə/" },
      { word: "Penguin", emoji: "🐧", phonetic: "/ˈpeŋ.ɡwɪn/" },
      { word: "Peach", emoji: "🍑", phonetic: "/piːtʃ/" },
    ],
  },
  {
    letter: "Q",
    words: [
      { word: "Queen", emoji: "👑", phonetic: "/kwiːn/" },
      { word: "Quilt", emoji: "🛏️", phonetic: "/kwɪlt/" },
      { word: "Quail", emoji: "🐦", phonetic: "/kweɪl/" },
      { word: "Question", emoji: "❓", phonetic: "/ˈkwes.tʃən/" },
    ],
  },
  {
    letter: "R",
    words: [
      { word: "Rabbit", emoji: "🐰", phonetic: "/ˈræb.ɪt/" },
      { word: "Rainbow", emoji: "🌈", phonetic: "/ˈreɪn.boʊ/" },
      { word: "Robot", emoji: "🤖", phonetic: "/ˈroʊ.bɑːt/" },
      { word: "Rose", emoji: "🌹", phonetic: "/roʊz/" },
    ],
  },
  {
    letter: "S",
    words: [
      { word: "Snake", emoji: "🐍", phonetic: "/sneɪk/" },
      { word: "Sun", emoji: "☀️", phonetic: "/sʌn/" },
      { word: "Star", emoji: "⭐", phonetic: "/stɑːr/" },
      { word: "Snail", emoji: "🐌", phonetic: "/sneɪl/" },
    ],
  },
  {
    letter: "T",
    words: [
      { word: "Tiger", emoji: "🐯", phonetic: "/ˈtaɪ.ɡər/" },
      { word: "Tree", emoji: "🌳", phonetic: "/triː/" },
      { word: "Turtle", emoji: "🐢", phonetic: "/ˈtɜːr.t̬əl/" },
      { word: "Tomato", emoji: "🍅", phonetic: "/təˈmeɪ.toʊ/" },
    ],
  },
  {
    letter: "U",
    words: [
      { word: "Umbrella", emoji: "☂️", phonetic: "/ʌmˈbrel.ə/" },
      { word: "Unicorn", emoji: "🦄", phonetic: "/ˈjuː.nɪ.kɔːrn/" },
      { word: "UFO", emoji: "🛸", phonetic: "/ˌjuː.ef.ˈoʊ/" },
      { word: "Uniform", emoji: "👔", phonetic: "/ˈjuː.nɪ.fɔːrm/" },
    ],
  },
  {
    letter: "V",
    words: [
      { word: "Volcano", emoji: "🌋", phonetic: "/vɑːlˈkeɪ.noʊ/" },
      { word: "Van", emoji: "🚐", phonetic: "/væn/" },
      { word: "Violin", emoji: "🎻", phonetic: "/ˌvaɪ.əˈlɪn/" },
      { word: "Vase", emoji: "🏺", phonetic: "/veɪs/" },
    ],
  },
  {
    letter: "W",
    words: [
      { word: "Whale", emoji: "🐋", phonetic: "/weɪl/" },
      { word: "Watermelon", emoji: "🍉", phonetic: "/ˈwɔː.tər.mel.ən/" },
      { word: "Watch", emoji: "⌚", phonetic: "/wɑːtʃ/" },
      { word: "Wolf", emoji: "🐺", phonetic: "/wʊlf/" },
    ],
  },
  {
    letter: "X",
    words: [
      { word: "Xylophone", emoji: "🎵", phonetic: "/ˈzaɪ.lə.foʊn/" },
      { word: "X-ray", emoji: "🩻", phonetic: "/ˈeks.reɪ/" },
      { word: "Box", emoji: "📦", phonetic: "/bɑːks/" },
      { word: "Fox", emoji: "🦊", phonetic: "/fɑːks/" },
    ],
  },
  {
    letter: "Y",
    words: [
      { word: "Yacht", emoji: "⛵", phonetic: "/jɑːt/" },
      { word: "Yo-yo", emoji: "🪀", phonetic: "/ˈjoʊ.joʊ/" },
      { word: "Yak", emoji: "🦬", phonetic: "/jæk/" },
      { word: "Yellow", emoji: "💛", phonetic: "/ˈjel.oʊ/" },
    ],
  },
  {
    letter: "Z",
    words: [
      { word: "Zebra", emoji: "🦓", phonetic: "/ˈziː.brə/" },
      { word: "Zoo", emoji: "🦁", phonetic: "/zuː/" },
      { word: "Zipper", emoji: "🤐", phonetic: "/ˈzɪp.ər/" },
      { word: "Zero", emoji: "0️⃣", phonetic: "/ˈzɪr.oʊ/" },
    ],
  },
]

export default function LetterLearningCards() {
  const [audioCache, setAudioCache] = useState<Record<string, HTMLAudioElement>>({})
  const [activeElement, setActiveElement] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isSlowMode, setIsSlowMode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedTextbook, setSelectedTextbook] = useState<string | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3 | 4 | 5 | 6>(1)
  const [selectedExtraWords, setSelectedExtraWords] = useState<Record<string, string[]>>({})
  const [customWords, setCustomWords] = useState<
    Record<string, Array<{ word: string; phonetic: string; icon: string }>>
  >({})
  const [customInputWord, setCustomInputWord] = useState("")
  const [customInputPhonetic, setCustomInputPhonetic] = useState("")
  const [searchingImages, setSearchingImages] = useState(false)
  const [imageOptions, setImageOptions] = useState<string[]>([])
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [selectedCustomIcon, setSelectedCustomIcon] = useState<string>("")

  useEffect(() => {
    const saved = localStorage.getItem("customWords")
    if (saved) {
      setCustomWords(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("customWords", JSON.stringify(customWords))
  }, [customWords])

  const currentData = letterData[currentPage]
  const currentExtraWords = selectedExtraWords[currentData.letter] || []

  const getIconForWord = (word: string): string => {
    const iconMap: Record<string, string> = {
      // Animals
      ant: "🐜",
      bear: "🐻",
      bee: "🐝",
      bird: "🐦",
      cat: "🐱",
      dog: "🐕",
      duck: "🦆",
      elephant: "🐘",
      fish: "🐟",
      frog: "🐸",
      gorilla: "🦍",
      hen: "🐔",
      pig: "🐷",
      rabbit: "🐰",
      sheep: "🐑",
      tiger: "🐯",
      zebra: "🦓",

      // Food
      apple: "🍎",
      banana: "🍌",
      bread: "🍞",
      cake: "🍰",
      egg: "🥚",
      ice: "🧊",
      noodles: "🍜",
      rice: "🍚",
      soup: "🍲",
      sweet: "🍬",
      jelly: "🍮",
      biscuit: "🍪",
      fork: "🍴",
      food: "🍱",
      drink: "🥤",

      // Objects
      ball: "⚽",
      bicycle: "🚲",
      book: "📚",
      car: "🚗",
      computer: "💻",
      desk: "🪑",
      doll: "🪆",
      door: "🚪",
      gift: "🎁",
      house: "🏠",
      kite: "🪁",
      toy: "🧸",
      window: "🪟",
      envelope: "✉️",

      // Nature
      flower: "🌸",
      tree: "🌳",
      rain: "🌧️",
      sun: "☀️",
      sky: "☁️",

      // Body parts
      ear: "👂",
      elbow: "💪",
      face: "😊",
      hand: "✋",
      eye: "👁️",

      // People
      boy: "👦",
      girl: "👧",
      man: "👨",
      woman: "👩",

      // Colors
      red: "🔴",
      blue: "🔵",
      green: "💚",
      yellow: "💛",
      brown: "🟤",
      orange: "🍊",

      // Numbers
      one: "1️⃣",
      two: "2️⃣",
      three: "3️⃣",
      four: "4️⃣",
      five: "5️⃣",
      six: "6️⃣",
      seven: "7️⃣",
      eight: "8️⃣",
      nine: "9️⃣",
      ten: "🔟",

      // Actions
      run: "🏃",
      jump: "🦘",
      fly: "✈️",
      go: "▶️",
      open: "🔓",

      // Seasons
      spring: "🌱",
      summer: "☀️",
      autumn: "🍂",
      winter: "❄️",

      // Others
      park: "🏞️",
      hot: "🔥",
      cold: "🥶",
      warm: "🌡️",
      cool: "😎",
      help: "🆘",
      like: "👍",
      sorry: "🙏",
      yes: "✅",
      no: "❌",
    }

    const lowerWord = word.toLowerCase().replace(/\s+/g, "")

    // Direct match
    if (iconMap[lowerWord]) return iconMap[lowerWord]

    // Partial match
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerWord.includes(key) || key.includes(lowerWord)) {
        return icon
      }
    }

    // Default icons based on first letter
    return "📝"
  }

  const addCustomWord = () => {
    if (!customInputWord.trim()) return

    const currentLetter = letterData[currentPage].letter.toLowerCase()
    const newWord = {
      word: customInputWord.trim(),
      phonetic: customInputPhonetic.trim() || "/" + customInputWord.trim() + "/",
      icon: selectedCustomIcon || getIconForWord(customInputWord.trim()),
    }

    console.log("[v0] Adding custom word:", newWord)
    console.log("[v0] Selected custom icon:", selectedCustomIcon)

    setCustomWords((prev) => ({
      ...prev,
      [currentLetter]: [...(prev[currentLetter] || []), newWord],
    }))

    setCustomInputWord("")
    setCustomInputPhonetic("")
    setShowImagePicker(false)
    setImageOptions([])
    setSelectedCustomIcon("")
  }

  const searchImages = async () => {
    if (!customInputWord.trim()) return

    setSearchingImages(true)
    // Generate 3 placeholder images based on word meaning
    const images = [
      `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(customInputWord + " icon")}`,
      `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(customInputWord + " illustration")}`,
      `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(customInputWord + " picture")}`,
    ]
    setImageOptions(images)
    setShowImagePicker(true)
    setSearchingImages(false)
  }

  const selectImageIcon = (imageUrl: string) => {
    setSelectedCustomIcon(imageUrl)
    setShowImagePicker(false)
  }

  const useDefaultIcon = () => {
    setSelectedCustomIcon("")
    setShowImagePicker(false)
  }

  const removeCustomWord = (word: string) => {
    const currentLetter = letterData[currentPage].letter.toLowerCase()
    setCustomWords((prev) => ({
      ...prev,
      [currentLetter]: (prev[currentLetter] || []).filter((w) => w.word !== word),
    }))
  }

  const findWordData = (wordText: string) => {
    const currentLetter = letterData[currentPage].letter.toLowerCase()
    // Check custom words first
    const customWordData = (customWords[currentLetter] || []).find(
      (w) => w.word.toLowerCase() === wordText.toLowerCase(),
    )
    if (customWordData) return customWordData

    // Check grade-specific words
    const gradeWords = getCurrentGradeWords()
    return gradeWords.find((w) => w.word.toLowerCase() === wordText.toLowerCase())
  }

  const getCurrentGradeWords = () => {
    if (selectedTextbook === "自定义") {
      const currentLetter = letterData[currentPage].letter.toLowerCase()
      return customWords[currentLetter] || []
    }

    if (selectedTextbook === "沪教") {
      const hujiaoGradeData = {
        1: hujiaoGrade1Words,
        2: hujiaoGrade2Words,
        3: hujiaoGrade3Words,
        4: hujiaoGrade4Words,
        5: hujiaoGrade5Words,
        6: hujiaoGrade6Words,
      }
      return hujiaoGradeData[selectedGrade]?.[currentData.letter] || []
    } else {
      // Default to Shanghai Oxford (沪教牛津)
      const gradeData = {
        1: grade1Words,
        2: grade2Words,
        3: grade3Words,
        4: grade4Words,
        5: grade5Words,
        6: grade5Words, // Oxford only has 5 grades
      }
      return gradeData[selectedGrade]?.[currentData.letter] || []
    }
  }

  const toggleExtraWord = (word: string) => {
    const letter = currentData.letter
    const currentWords = selectedExtraWords[letter] || []

    if (currentWords.includes(word)) {
      setSelectedExtraWords({
        ...selectedExtraWords,
        [letter]: currentWords.filter((w) => w !== word),
      })
    } else {
      setSelectedExtraWords({
        ...selectedExtraWords,
        [letter]: [...currentWords, word],
      })
    }
  }

  const playAudio = (text: string, elementId: string) => {
    const audioKey = text.toLowerCase().replace(/\s+/g, "-")

    // Check cache first
    if (audioCache[audioKey]) {
      setActiveElement(elementId)
      setIsSpeaking(true)

      const audio = audioCache[audioKey]
      audio.currentTime = 0
      audio.playbackRate = isSlowMode ? 0.5 : 1.0
      audio.play()

      audio.onended = () => {
        setIsSpeaking(false)
        setActiveElement(null)
      }
      return // Exit if audio from cache is played
    }

    // Try to fetch from API
    const apiUrl = `/api/download-audio?word=${encodeURIComponent(audioKey)}`
    const staticAudioPath = `/audio/${audioKey}.mp3`

    const loadAudio = (src: string, isApi: boolean) => {
      const audio = new Audio(src)

      audio.addEventListener(
        "canplaythrough",
        () => {
          setAudioCache((prev) => ({ ...prev, [audioKey]: audio }))
          setActiveElement(elementId)
          setIsSpeaking(true)
          audio.playbackRate = isSlowMode ? 0.5 : 1.0
          audio.play()

          audio.onended = () => {
            setIsSpeaking(false)
            setActiveElement(null)
          }
        },
        { once: true },
      )

      audio.addEventListener(
        "error",
        () => {
          console.error(`[v0] Failed to load audio from ${src} for "${text}"`)
          if (isApi) {
            // If API failed, try static file
            loadAudio(staticAudioPath, false)
          } else {
            // If static file also failed, use TTS
            console.log(`[v0] Audio not available for "${text}", using TTS`)
            speakWithTTS(text, elementId)
          }
        },
        { once: true },
      )
      audio.load()
    }

    // Attempt to load from API first
    loadAudio(apiUrl, true)
  }

  const speakWithTTS = (text: string, elementId: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)

      const voices = window.speechSynthesis.getVoices()
      const englishVoice =
        voices.find(
          (voice) =>
            voice.lang.startsWith("en-") &&
            (voice.name.includes("Premium") ||
              voice.name.includes("Enhanced") ||
              voice.name.includes("Natural") ||
              voice.name.includes("Google") ||
              voice.name.includes("Microsoft")),
        ) || voices.find((voice) => voice.lang.startsWith("en-US"))

      if (englishVoice) {
        utterance.voice = englishVoice
      }

      utterance.lang = "en-US"
      utterance.rate = isSlowMode ? 0.25 : 0.5
      utterance.pitch = 1.0
      utterance.volume = 1.0

      setActiveElement(elementId)
      setIsSpeaking(true)

      utterance.onend = () => {
        setIsSpeaking(false)
        setActiveElement(null)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const speak = (text: string) => {
    const elementId = `speak-${text.replace(/\s+/g, "-")}`
    playAudio(text, elementId)
  }

  const nextPage = () => {
    if (currentPage < letterData.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (index: number) => {
    setCurrentPage(index)
  }

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices()

      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
      Object.values(audioCache).forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
    }
  }, [currentPage, audioCache])

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">ABC Learning</h1>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => setIsSlowMode(!isSlowMode)}
              className={`px-4 h-10 sm:h-11 rounded-full transition-all duration-200 flex items-center justify-center shadow-sm text-sm font-medium ${isSlowMode ? "bg-[#1d1d1f] text-white hover:bg-[#424245]" : "bg-white text-[#1d1d1f] hover:bg-[#e8e8ed]"
                }`}
              aria-label="Toggle slow mode"
            >
              <span className="whitespace-nowrap">慢放 {isSlowMode ? "✓" : ""}</span>
            </button>

            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#e8e8ed] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-[#1d1d1f]" />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === letterData.length - 1}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#e8e8ed] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-[#1d1d1f]" />
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
          {/* Letter Section */}
          <div
            onClick={() => playAudio(currentData.letter, "letter")}
            className={`bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] py-16 sm:py-24 cursor-pointer transition-all duration-300 hover:from-[#e8e8ed] hover:to-[#d2d2d7] ${activeElement === "letter" ? "scale-[0.98]" : ""
              }`}
          >
            <div className="text-center">
              <div className="text-[120px] sm:text-[160px] font-bold text-[#1d1d1f] tracking-tighter leading-none">
                {currentData.letter}
              </div>
            </div>
          </div>

          {/* Words Grid */}
          <div className="p-6 sm:p-10 relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {currentData.words.map((item, index) => (
                <div
                  key={index}
                  onClick={() => playAudio(item.word, `word-${index}`)}
                  className={`bg-[#f5f5f7] rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:bg-[#e8e8ed] hover:scale-[1.02] ${activeElement === `word-${index}` ? "scale-[0.98] bg-[#d2d2d7]" : ""
                    }`}
                >
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="text-5xl sm:text-6xl">{item.emoji}</div>
                    <div className="text-2xl sm:text-3xl font-medium text-[#1d1d1f] text-center">{item.word}</div>
                    <div className="text-xs sm:text-sm text-[#86868b] font-normal">{item.phonetic}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 bg-[#007AFF] hover:bg-[#0051D5] text-white px-4 py-2 rounded-full shadow-md transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              更多
            </button>

            {/* Extra Words Display */}
            {currentExtraWords.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#d2d2d7]">
                <h3 className="text-lg font-medium text-[#1d1d1f] mb-4">已选单词</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {currentExtraWords.map((wordText, index) => {
                    const wordData = findWordData(wordText)

                    console.log("[v0] Rendering extra word:", wordText, "Data:", wordData)

                    const icon = wordData?.icon || "📝"
                    const isImageIcon =
                      typeof icon === "string" && icon && (icon.startsWith("/") || icon.startsWith("http"))

                    console.log("[v0] Icon:", icon, "Is image:", isImageIcon)

                    return (
                      <div
                        key={index}
                        onClick={() => speak(wordText)}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-[#d2d2d7] hover:shadow-md transition-all duration-200 cursor-pointer hover:border-[#007AFF] group flex flex-col items-center justify-center min-h-[140px]"
                      >
                        {isImageIcon ? (
                          <img
                            src={icon || "/placeholder.svg"}
                            alt={wordData?.word || wordText}
                            className="w-16 h-16 mb-3 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="text-5xl mb-3">{icon}</div>
                        )}
                        <p className="text-xl font-medium text-[#1d1d1f] group-hover:text-[#007AFF] transition-colors text-center">
                          {wordText}
                        </p>
                        {wordData?.phonetic && <p className="text-xs text-[#86868b] mt-1">{wordData.phonetic}</p>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Page Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {letterData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentPage ? "w-8 bg-[#1d1d1f]" : "w-2 bg-[#d2d2d7] hover:bg-[#86868b]"
                  }`}
                aria-label={`Go to letter ${letterData[index].letter}`}
              />
            ))}
          </div>

          {/* Hint */}
          <p className="text-center text-sm text-[#86868b] pb-6">点击字母可听发音，点击卡片可听单词</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal header */}
            <div className="p-6 border-b border-[#d2d2d7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedTextbook && (
                  <button
                    onClick={() => setSelectedTextbook(null)}
                    className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#1d1d1f]" />
                  </button>
                )}
                <h2 className="text-xl font-semibold text-[#1d1d1f]">
                  {selectedTextbook === "自定义" ? "自定义单词" : selectedTextbook ? "选择单词" : "选择教材"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedTextbook(null)
                }}
                className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[#1d1d1f]" />
              </button>
            </div>

            {!selectedTextbook ? (
              // Level 1: Textbook selection
              <div className="p-6 overflow-y-auto flex-1">
                <p className="text-sm text-[#86868b] mb-4">请选择教材版本</p>

                <button
                  onClick={() => setSelectedTextbook("沪教")}
                  className="w-full p-6 rounded-xl bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-all duration-200 flex items-center justify-between group mb-3"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-[#1d1d1f] text-lg">沪教版</span>
                    <span className="text-sm text-[#86868b] mt-1">上海小学英语 1-6年级</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#86868b] group-hover:text-[#1d1d1f] transition-colors" />
                </button>

                <button
                  onClick={() => setSelectedTextbook("沪教牛津")}
                  className="w-full p-6 rounded-xl bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-all duration-200 flex items-center justify-between group mb-3"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-[#1d1d1f] text-lg">沪教牛津版</span>
                    <span className="text-sm text-[#86868b] mt-1">上海小学英语 1-5年级</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#86868b] group-hover:text-[#1d1d1f] transition-colors" />
                </button>

                <button
                  onClick={() => setSelectedTextbook("自定义")}
                  className="w-full p-6 rounded-xl bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-[#1d1d1f] text-lg">自定义</span>
                    <span className="text-sm text-[#86868b] mt-1">添加自己的单词</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#86868b] group-hover:text-[#1d1d1f] transition-colors" />
                </button>
              </div>
            ) : selectedTextbook === "自定义" ? (
              <>
                <div className="p-6 overflow-y-auto flex-1">
                  <p className="text-sm text-[#86868b] mb-4">
                    为字母 <span className="font-semibold text-[#1d1d1f]">{letterData[currentPage].letter}</span>{" "}
                    添加单词
                  </p>

                  {/* Input form */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <label className="text-sm text-[#86868b] mb-1 block">单词</label>
                      <input
                        type="text"
                        value={customInputWord}
                        onChange={(e) => setCustomInputWord(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addCustomWord()}
                        placeholder="输入单词"
                        className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#007AFF] text-[#1d1d1f]"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b] mb-1 block">音标（可选）</label>
                      <input
                        type="text"
                        value={customInputPhonetic}
                        onChange={(e) => setCustomInputPhonetic(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addCustomWord()}
                        placeholder="/ˈæpl/"
                        className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#007AFF] text-[#1d1d1f]"
                      />
                    </div>

                    {!showImagePicker ? (
                      <div className="flex gap-2">
                        <button
                          onClick={addCustomWord}
                          className="flex-1 bg-[#007AFF] hover:bg-[#0051D5] text-white py-3 rounded-full font-medium transition-colors"
                        >
                          添加1
                        </button>
                        <button
                          onClick={searchImages}
                          disabled={!customInputWord.trim() || searchingImages}
                          className="px-4 py-2 bg-[#f5f5f7] text-[#1d1d1f] rounded-xl hover:bg-[#e8e8ed] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          {searchingImages ? "搜索中..." : "搜索图片"}
                        </button>

                        {selectedCustomIcon && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl border border-green-200">
                            <img
                              src={selectedCustomIcon || "/placeholder.svg"}
                              alt="Selected"
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <span className="text-sm text-green-700">已选择图片</span>
                            <button
                              onClick={() => setSelectedCustomIcon("")}
                              className="text-red-500 hover:text-red-700 text-sm ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4 p-4 bg-[#f5f5f7] rounded-xl">
                        <p className="text-sm text-[#86868b] mb-3">选择图片作为图标：</p>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          {imageOptions.map((img, idx) => (
                            <div
                              key={idx}
                              onClick={() => selectImageIcon(img)}
                              className="cursor-pointer hover:scale-105 transition-transform border-2 border-transparent hover:border-[#007AFF] rounded-xl overflow-hidden"
                            >
                              <img
                                src={img || "/placeholder.svg"}
                                alt={`Option ${idx + 1}`}
                                className="w-full h-20 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={useDefaultIcon}
                          className="w-full py-2 text-sm text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                        >
                          使用默认图标
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Custom words list */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1d1d1f] mb-2">已添加的单词</p>
                    {(customWords[letterData[currentPage].letter.toLowerCase()] || []).length === 0 ? (
                      <p className="text-center text-[#86868b] py-8">还没有添加单词</p>
                    ) : (
                      (customWords[letterData[currentPage].letter.toLowerCase()] || []).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => toggleExtraWord(item.word)}
                          className={`w-full p-4 rounded-xl transition-all duration-200 flex items-center justify-between ${(selectedExtraWords[letterData[currentPage].letter] || []).includes(item.word)
                            ? "bg-[#007AFF] text-white hover:bg-[#0051D5]"
                            : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (item.icon.startsWith("/") || item.icon.startsWith("http")) ? (
                              <img
                                src={item.icon || "/placeholder.svg"}
                                alt={item.word}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="text-2xl">{item.icon || "📝"}</span>
                            )}
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{item.word}</span>
                              <span
                                className={`text-xs ${(selectedExtraWords[letterData[currentPage].letter] || []).includes(item.word) ? "text-white/80" : "text-[#86868b]"}`}
                              >
                                {item.phonetic}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeCustomWord(item.word)
                            }}
                            className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                          >
                            <X className="w-3 h-3 text-red-500" />
                          </button>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Modal footer */}
                <div className="p-6 border-t border-[#d2d2d7]">
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setSelectedTextbook(null)
                    }}
                    className="w-full bg-[#007AFF] hover:bg-[#0051D5] text-white py-3 rounded-full font-medium transition-colors"
                  >
                    完成
                  </button>
                </div>
              </>
            ) : (
              // Level 2: Grade and word selection
              <>
                <div className="px-6 pt-4 pb-2 border-b border-[#d2d2d7]">
                  <div className="flex gap-2 flex-wrap">
                    {(selectedTextbook === "沪教" ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade as 1 | 2 | 3 | 4 | 5 | 6)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedGrade === grade
                          ? "bg-[#007AFF] text-white"
                          : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
                          }`}
                      >
                        {grade}年级
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                  <p className="text-sm text-[#86868b] mb-4">
                    为字母 <span className="font-semibold text-[#1d1d1f]">{currentData.letter}</span> 选择
                    {selectedGrade}
                    年级单词
                  </p>

                  <div className="space-y-2">
                    {getCurrentGradeWords().map((item, index) => {
                      const isSelected = (selectedExtraWords[currentData.letter] || []).includes(item.word)
                      return (
                        <button
                          key={index}
                          onClick={() => toggleExtraWord(item.word)}
                          className={`px-6 py-4 rounded-2xl transition-all duration-200 text-left ${isSelected
                            ? "bg-[#007AFF] text-white hover:bg-[#0051D5]"
                            : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (item.icon.startsWith("/") || item.icon.startsWith("http")) ? (
                              <img
                                src={item.icon || "/placeholder.svg"}
                                alt={item.word}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="text-2xl">{item.icon || "📝"}</span>
                            )}
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{item.word}</span>
                              {item.phonetic && (
                                <span className={`text-sm ${isSelected ? "text-white/80" : "text-[#86868b]"}`}>
                                  {item.phonetic}
                                </span>
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {getCurrentGradeWords().length === 0 && (
                    <p className="text-center text-[#86868b] py-8">该字母暂无{selectedGrade}年级单词</p>
                  )}
                </div>

                {/* Modal footer */}
                <div className="p-6 border-t border-[#d2d2d7]">
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setSelectedTextbook(null)
                    }}
                    className="w-full bg-[#007AFF] hover:bg-[#0051D5] text-white py-3 rounded-full font-medium transition-colors"
                  >
                    完成
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
