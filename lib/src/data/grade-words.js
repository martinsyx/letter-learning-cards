"use strict";
/**
 * 沪教版 / 沪教牛津版 年级单词数据
 * 数据结构：Record<大写字母, 单词数组>
 * 每个单词：{ word, phonetic, icon }
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hujiaoGradeData = exports.oxfordGradeData = exports.hujiaoGrade6Words = exports.hujiaoGrade5Words = exports.hujiaoGrade4Words = exports.hujiaoGrade3Words = exports.hujiaoGrade2Words = exports.hujiaoGrade1Words = exports.oxfordGrade5Words = exports.oxfordGrade4Words = exports.oxfordGrade3Words = exports.oxfordGrade2Words = exports.oxfordGrade1Words = void 0;
// ============================================================
// 沪教牛津版 (Shanghai Oxford) — 5 个年级
// ============================================================
exports.oxfordGrade1Words = {
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
};
exports.oxfordGrade2Words = {
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
};
exports.oxfordGrade3Words = {
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
        { word: "eleven", phonetic: "/ɪˈlev.ən/", icon: "1️⃣" },
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
};
exports.oxfordGrade4Words = {
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
};
exports.oxfordGrade5Words = {
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
};
// ============================================================
// 沪教版 (Shanghai) — 6 个年级
// ============================================================
exports.hujiaoGrade1Words = {
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
};
exports.hujiaoGrade2Words = {
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
};
exports.hujiaoGrade3Words = {
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
};
exports.hujiaoGrade4Words = {
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
};
exports.hujiaoGrade5Words = {
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
};
exports.hujiaoGrade6Words = {
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
};
// ============================================================
// 便捷访问：按教材和年级获取数据
// ============================================================
exports.oxfordGradeData = {
    1: exports.oxfordGrade1Words,
    2: exports.oxfordGrade2Words,
    3: exports.oxfordGrade3Words,
    4: exports.oxfordGrade4Words,
    5: exports.oxfordGrade5Words,
};
exports.hujiaoGradeData = {
    1: exports.hujiaoGrade1Words,
    2: exports.hujiaoGrade2Words,
    3: exports.hujiaoGrade3Words,
    4: exports.hujiaoGrade4Words,
    5: exports.hujiaoGrade5Words,
    6: exports.hujiaoGrade6Words,
};
//# sourceMappingURL=grade-words.js.map