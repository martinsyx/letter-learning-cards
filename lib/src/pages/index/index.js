"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
require("./index.scss");
const letters_1 = require("../../data/letters");
const audio_1 = require("../../utils/audio");
const dictionary_1 = require("../../utils/dictionary");
const image_1 = require("../../utils/image");
const grade_words_1 = require("../../data/grade-words");
// Emoji categories data (from source emoji-picker.tsx)
const emojiCategories = {
    animals: {
        name: "动物",
        emojis: [
            "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
            "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦆",
            "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛",
            "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️",
            "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀",
            "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆",
            "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘",
            "🦬", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐",
            "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🪶", "🐓", "🦃",
            "🦤", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡",
            "🦫", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔", "🐉", "🐲",
        ],
    },
    food: {
        name: "食物",
        emojis: [
            "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈",
            "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦",
            "🥬", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠",
            "🫘", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈",
            "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟",
            "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗", "🥘",
            "🫕", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪",
            "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧",
            "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫",
            "🍿", "🍩", "🍪", "🌰", "🥜", "🍯", "🥛", "🍼", "🫖", "☕",
            "🍵", "🧃", "🥤", "🧋", "🍺", "🍷", "🫗", "🥣",
        ],
    },
    people: {
        name: "人物",
        emojis: [
            "👦", "👧", "👨", "👩", "👴", "👵", "👶", "🧒", "🧑", "👱",
            "👨‍🦰", "👩‍🦰", "👨‍🦱", "👩‍🦱", "👨‍🦳", "👩‍🦳", "👨‍🦲", "👩‍🦲", "🧔", "👼",
            "🎅", "🤶", "🦸", "🦹", "🧙", "🧚", "🧛", "🧜", "🧝", "🧞",
            "🧟", "🧌", "💆", "💇", "🚶", "🧍", "🧎", "🏃", "💃", "🕺",
            "🕴️", "👯", "🧖", "🧗", "🤸", "⛹️", "🏋️", "🚴", "🚵", "🤽",
            "🤾", "🤺", "⛷️", "🏂", "🏌️", "🏇", "🏊", "🤹", "🧘", "🛀",
            "🛌", "👭", "👫", "👬", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦",
            "👨‍👨‍👦", "👮", "🕵️", "💂", "🥷", "👷", "🫅", "🤴", "👸", "👳",
            "👲", "🧕", "🤵", "👰", "🤰", "🫄", "🫃", "🤱", "👼", "🎅",
            "🤶", "🦸‍♂️", "🦹‍♀️", "🧙‍♂️", "🧚‍♀️", "🧛‍♂️", "🧜‍♀️", "🧝‍♂️",
        ],
    },
    body: {
        name: "身体",
        emojis: [
            "👋", "🤚", "🖐️", "✋", "🖖", "🫱", "🫲", "🫳", "🫴", "👌",
            "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉",
            "👆", "🖕", "👇", "☝️", "🫵", "👍", "👎", "✊", "👊", "🤛",
            "🤜", "👏", "🙌", "🫶", "👐", "🤲", "🤝", "🙏", "✍️", "💅",
            "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠",
            "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "🫦", "💋",
            "🩸",
        ],
    },
    nature: {
        name: "自然",
        emojis: [
            "🌸", "💮", "🏵️", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🪷",
            "🌱", "🪴", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀",
            "🍁", "🍂", "🍃", "🪹", "🪺", "🍄", "🌰", "🪨", "💎", "⛰️",
            "🏔️", "🗻", "🌋", "🏜️", "🏖️", "🏝️", "🏞️", "🏟️", "🌊", "💧",
            "💦", "🫧", "🌀", "🌈", "🌂", "🔥", "✨", "⭐", "🌟", "💫",
            "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "🌩️", "⛈️", "🌨️",
            "❄️", "☃️", "⛄", "🌬️", "💨", "🌪️", "🌫️", "🌊", "🌊", "🌍",
            "🌎", "🌏", "🪐", "🌙", "🌘", "🌗", "🌓", "🌒", "🌚", "🌛",
            "🌜", "🌞", "🪩", "💫", "🌠",
        ],
    },
    objects: {
        name: "物品",
        emojis: [
            "⌚", "📱", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️",
            "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️",
            "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭",
            "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🪫", "🔌",
            "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶",
            "💷", "🪙", "💰", "💳", "💎", "⚖️", "🪜", "🧰", "🪛", "🔧",
            "🔨", "⚒️", "🛠️", "⛏️", "🪚", "🔩", "⚙️", "🪤", "🧱", "⛓️",
            "🧲", "🔫", "💣", "🧨", "🪓", "🔪", "🗡️", "⚔️", "🛡️", "🚬",
            "⚰️", "🪦", "⚱️", "🏺", "🔮", "📿", "🧿", "💈", "⚗️", "🔭",
            "🔬", "🕳️", "🩹", "🩺", "🩻", "💊", "💉", "🩸", "🧬", "🦠",
            "🧫", "🧪", "🌡️", "🧹", "🪠", "🧺", "🧻", "🚽", "🚰", "🚿",
            "🛁", "🛀", "🪥", "🪒", "🧴", "🧷", "🧹", "🧺", "🔑", "🗝️",
            "🚪", "🪑", "🛋️", "🛏️", "🛌", "🧸", "🪆", "🖼️", "🪞", "🪟",
            "📍", "🔖", "🏷️", "📚", "📖", "📝", "✏️", "🖊️", "🖋️", "✒️",
            "🖍️", "🪈", "🍼", "🎀", "🎁", "🎈", "🎆", "🎇", "🧨", "✨",
            "🎊", "🎉", "🎎", "🎏", "🎐", "🎑", "🧧", "🎀", "🎁", "🎗️",
            "🎟️", "🎫", "🎖️", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "⚾",
            "🥎", "🏀", "🏐", "🏈", "🏉", "🎾", "🥏", "🎳", "🏏", "🏑",
            "🏒", "🥍", "🏓", "🏸", "🥊", "🥋", "🥅", "⛳", "🪁", "🏹",
            "🎣", "🤿", "🥌", "🛷", "🥌", "🎯", "🪀", "🪁", "🎱", "🔮",
            "🪄", "🎮", "🕹️", "🎰", "🎲", "🧩", "🧸", "🪆", "♠️", "♥️",
            "♦️", "♣️", "♟️", "🃏", "🀄", "🎴", "🎭", "🖼️", "🎨", "🧵",
            "🪡", "🧶", "🪢",
        ],
    },
    transport: {
        name: "交通",
        emojis: [
            "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐",
            "🛻", "🚚", "🚛", "🚜", "🏍️", "🛵", "🚲", "🛴", "🛹", "🛼",
            "🚏", "🛣️", "🛤️", "⛽", "🛞", "🚨", "🚥", "🚦", "🛑", "🚧",
            "⚓", "🛟", "⛵", "🛶", "🚤", "🛳️", "⛴️", "🛥️", "🚢", "✈️",
            "🛩️", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛰️",
            "🚀", "🛸", "🎈", "🎆", "🎇", "🧨", "✨", "🎉", "🎊",
        ],
    },
    symbols: {
        name: "符号",
        emojis: [
            "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
            "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝",
            "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️",
            "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎",
            "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️",
            "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮",
            "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎",
            "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯",
            "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗",
            "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸",
            "🔱", "⚜️", "🔰", "♻️", "✅", "🈯", "💹", "❇️", "✳️", "❎",
            "🌐", "💠", "Ⓜ️", "🌀", "💤", "🏧", "🚾", "♿", "🅿️", "🛗",
            "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "⚧️",
            "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤", "🔡", "🔠",
            "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣",
            "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "#️⃣", "*️⃣",
            "⏏️", "▶️", "⏸️", "⏯️", "⏹️", "⏺️", "⏭️", "⏮️", "⏩", "⏪",
            "⏫", "⏬", "◀️", "🔼", "🔽", "➡️", "⬅️", "⬆️", "⬇️", "↗️",
            "↘️", "↙️", "↖️", "↕️", "↔️", "↪️", "↩️", "⤴️", "⤵️", "🔀",
            "🔁", "🔂", "🔄", "🔃", "🎵", "🎶", "🎼", "🎙️", "🎚️", "🎛️",
            "🎤", "🎧", "📻", "🎷", "🪗", "🎸", "🎹", "🎺", "🎻", "🪕",
            "🥁", "🪘", "📱", "📲", "☎️", "📞", "📟", "📠", "🔋", "🪫",
            "🔌", "💻", "🖥️", "🖨️", "⌨️", "🖱️", "🖲️", "💽", "💾", "💿",
            "📀", "🧮", "🧿",
        ],
    },
};
const SLIDE_OUT_DURATION = 120;
const SLIDE_IN_DURATION = 180;
const SLIDE_RESET_DELAY = 20;
const SLIDE_DISTANCE_FALLBACK = 280;
const SLIDE_DISTANCE_MIN = 220;
const SLIDE_DISTANCE_MAX = 360;
const DRAG_LOCK_THRESHOLD = 10;
const DRAG_BOUNDARY_DAMPING = 0.3;
const DRAG_COMMIT_DISTANCE = 80;
const DRAG_COMMIT_VELOCITY = 0.5;
const SNAP_BACK_DURATION = 200;
class Index extends react_1.Component {
    constructor() {
        super(...arguments);
        this.audioManager = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.slideTimers = [];
        this.slideSequence = 0;
        // Drag-follow state (instance variables to avoid extra renders)
        this.touchStartTime = 0;
        this.isDragging = false;
        this.currentDragX = 0;
        this.pendingDragX = null;
        this.dragFrameTimer = null;
        this.isHorizontalDrag = null; // null = undecided, true = horizontal, false = vertical
        this.isPageAnimating = false;
        this.state = {
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
        };
        this.clearSlideTimers = () => {
            this.slideTimers.forEach((timer) => clearTimeout(timer));
            this.slideTimers = [];
        };
        this.clearDragFrameTimer = () => {
            if (this.dragFrameTimer) {
                clearTimeout(this.dragFrameTimer);
                this.dragFrameTimer = null;
            }
            this.pendingDragX = null;
        };
        this.resetGestureState = () => {
            this.isDragging = false;
            this.currentDragX = 0;
            this.isHorizontalDrag = null;
            this.clearDragFrameTimer();
        };
        this.getSlideDistance = () => {
            try {
                const { windowWidth } = taro_1.default.getSystemInfoSync();
                if (windowWidth) {
                    return Math.max(SLIDE_DISTANCE_MIN, Math.min(SLIDE_DISTANCE_MAX, Math.round(windowWidth * 0.78)));
                }
            }
            catch (_a) {
                return SLIDE_DISTANCE_FALLBACK;
            }
            return SLIDE_DISTANCE_FALLBACK;
        };
        this.getCardTransformStyle = (translateX, duration = 0, opacity = 1) => (`transform: translate3d(${translateX}px, 0, 0); ` +
            `opacity: ${opacity}; ` +
            `transition: transform ${duration}ms ease-out, opacity ${duration}ms ease-out;`);
        this.updateDragStyle = (translateX) => {
            this.pendingDragX = translateX;
            if (this.dragFrameTimer)
                return;
            this.dragFrameTimer = setTimeout(() => {
                const nextX = this.pendingDragX;
                this.dragFrameTimer = null;
                if (nextX === null)
                    return;
                this.pendingDragX = null;
                this.setState({ cardStyle: this.getCardTransformStyle(nextX) });
            }, 16);
        };
        this.loadCustomWords = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield taro_1.default.getStorage({ key: "customWords" });
                if (res.data) {
                    this.setState({ customWords: JSON.parse(res.data) });
                }
            }
            catch (error) {
                console.log("No saved custom words");
            }
        });
        this.loadSelectedExtraWords = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield taro_1.default.getStorage({ key: "selectedExtraWords" });
                if (res.data) {
                    this.setState({ selectedExtraWords: JSON.parse(res.data) });
                }
            }
            catch (error) {
                console.log("No saved selected extra words");
            }
        });
        this.saveCustomWords = (words) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield taro_1.default.setStorage({
                    key: "customWords",
                    data: JSON.stringify(words),
                });
            }
            catch (error) {
                console.error("Failed to save custom words", error);
            }
        });
        this.saveSelectedExtraWords = (words) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield taro_1.default.setStorage({
                    key: "selectedExtraWords",
                    data: JSON.stringify(words),
                });
            }
            catch (error) {
                console.error("Failed to save selected extra words", error);
            }
        });
        this.playAudio = (text, elementId) => __awaiter(this, void 0, void 0, function* () {
            if (!this.audioManager)
                return;
            this.setState({ activeElement: elementId });
            try {
                yield this.audioManager.playAudio(text, this.state.isSlowMode);
            }
            catch (error) {
                console.error("Audio playback failed:", error);
            }
            finally {
                this.setState({ activeElement: null });
            }
        });
        this.changePage = (nextPage) => {
            const { currentPage } = this.state;
            if (nextPage < 0 || nextPage >= letters_1.letterData.length || nextPage === currentPage)
                return;
            if (this.isPageAnimating)
                return;
            this.isPageAnimating = true;
            this.clearSlideTimers();
            const slideSequence = this.slideSequence + 1;
            this.slideSequence = slideSequence;
            const isForward = nextPage > currentPage;
            const slideDistance = this.getSlideDistance();
            const exitOffset = isForward ? -slideDistance : slideDistance;
            const enterOffset = isForward ? slideDistance : -slideDistance;
            this.setState({
                cardStyle: this.getCardTransformStyle(exitOffset, SLIDE_OUT_DURATION, 0),
            });
            const switchTimer = setTimeout(() => {
                if (this.slideSequence !== slideSequence)
                    return;
                this.setState({
                    currentPage: nextPage,
                    cardStyle: this.getCardTransformStyle(enterOffset, 0, 0),
                }, () => {
                    const enterTimer = setTimeout(() => {
                        if (this.slideSequence !== slideSequence)
                            return;
                        this.setState({ cardStyle: this.getCardTransformStyle(0, SLIDE_IN_DURATION, 1) });
                        const doneTimer = setTimeout(() => {
                            if (this.slideSequence !== slideSequence)
                                return;
                            this.setState({
                                cardStyle: "",
                            });
                            this.resetGestureState();
                            this.isPageAnimating = false;
                        }, SLIDE_IN_DURATION);
                        this.slideTimers.push(doneTimer);
                    }, SLIDE_RESET_DELAY);
                    this.slideTimers.push(enterTimer);
                });
            }, SLIDE_OUT_DURATION);
            this.slideTimers.push(switchTimer);
        };
        this.nextPage = () => {
            this.changePage(this.state.currentPage + 1);
        };
        this.prevPage = () => {
            this.changePage(this.state.currentPage - 1);
        };
        this.goToPage = (index) => {
            this.changePage(index);
        };
        this.toggleSlowMode = () => {
            this.setState({ isSlowMode: !this.state.isSlowMode });
        };
        this.handleTouchStart = (e) => {
            var _a;
            (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
            if (this.isPageAnimating)
                return;
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.touchStartTime = Date.now();
            this.resetGestureState();
        };
        this.handleTouchMove = (e) => {
            var _a, _b, _c;
            (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
            if (this.isPageAnimating)
                return;
            if (this.isHorizontalDrag === false)
                return;
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const deltaX = currentX - this.touchStartX;
            const deltaY = currentY - this.touchStartY;
            if (this.isHorizontalDrag === null) {
                if (Math.abs(deltaX) > DRAG_LOCK_THRESHOLD || Math.abs(deltaY) > DRAG_LOCK_THRESHOLD) {
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        this.isHorizontalDrag = true;
                        this.clearSlideTimers();
                        (_b = e.preventDefault) === null || _b === void 0 ? void 0 : _b.call(e);
                    }
                    else {
                        this.isHorizontalDrag = false;
                        return;
                    }
                }
                else {
                    return;
                }
            }
            const { currentPage } = this.state;
            const isAtStart = currentPage === 0;
            const isAtEnd = currentPage === letters_1.letterData.length - 1;
            let adjustedDeltaX = deltaX;
            if ((isAtStart && deltaX > 0) || (isAtEnd && deltaX < 0)) {
                adjustedDeltaX = deltaX * DRAG_BOUNDARY_DAMPING;
            }
            this.isDragging = true;
            this.currentDragX = adjustedDeltaX;
            (_c = e.preventDefault) === null || _c === void 0 ? void 0 : _c.call(e);
            this.updateDragStyle(adjustedDeltaX);
        };
        this.handleTouchEnd = (e) => {
            var _a;
            (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
            if (this.isPageAnimating)
                return;
            if (!this.isDragging) {
                const touchEndX = e.changedTouches[0].clientX;
                const deltaX = touchEndX - this.touchStartX;
                const deltaY = (e.changedTouches[0].clientY || 0) - this.touchStartY;
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                    if (deltaX < 0) {
                        this.nextPage();
                    }
                    else {
                        this.prevPage();
                    }
                }
                this.resetGestureState();
                return;
            }
            const { currentPage } = this.state;
            const isAtStart = currentPage === 0;
            const isAtEnd = currentPage === letters_1.letterData.length - 1;
            const dragX = this.currentDragX;
            const elapsed = Date.now() - this.touchStartTime;
            const velocity = Math.abs(dragX) / Math.max(elapsed, 1);
            const draggingIntoBoundary = (isAtStart && dragX > 0) || (isAtEnd && dragX < 0);
            const shouldCommit = !draggingIntoBoundary && (Math.abs(dragX) > DRAG_COMMIT_DISTANCE || velocity > DRAG_COMMIT_VELOCITY);
            if (shouldCommit) {
                const isForward = dragX < 0;
                const nextPage = isForward ? currentPage + 1 : currentPage - 1;
                if (nextPage >= 0 && nextPage < letters_1.letterData.length) {
                    this.commitDragPageChange(nextPage, isForward, dragX);
                }
                else {
                    this.snapBack();
                }
            }
            else {
                this.snapBack();
            }
            this.resetGestureState();
        };
        this.handleTouchCancel = (e) => {
            var _a;
            (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
            if (this.isDragging) {
                this.snapBack();
            }
            this.resetGestureState();
        };
        this.snapBack = () => {
            this.clearSlideTimers();
            this.setState({ cardStyle: this.getCardTransformStyle(0, SNAP_BACK_DURATION) });
            const timer = setTimeout(() => {
                this.setState({ cardStyle: "" });
            }, SNAP_BACK_DURATION);
            this.slideTimers.push(timer);
        };
        this.commitDragPageChange = (nextPage, isForward, currentOffset) => {
            this.isPageAnimating = true;
            this.clearSlideTimers();
            const slideSequence = this.slideSequence + 1;
            this.slideSequence = slideSequence;
            const slideDistance = this.getSlideDistance();
            const exitTarget = isForward
                ? Math.min(-slideDistance, currentOffset - 40)
                : Math.max(slideDistance, currentOffset + 40);
            const remainingDistance = Math.abs(exitTarget - currentOffset);
            const exitDuration = Math.max(80, Math.min(SLIDE_OUT_DURATION, remainingDistance * 1.2));
            this.setState({ cardStyle: this.getCardTransformStyle(exitTarget, exitDuration, 0) });
            const switchTimer = setTimeout(() => {
                if (this.slideSequence !== slideSequence)
                    return;
                const enterOffset = isForward ? slideDistance : -slideDistance;
                this.setState({
                    currentPage: nextPage,
                    cardStyle: this.getCardTransformStyle(enterOffset, 0, 0),
                }, () => {
                    const enterTimer = setTimeout(() => {
                        if (this.slideSequence !== slideSequence)
                            return;
                        this.setState({ cardStyle: this.getCardTransformStyle(0, SLIDE_IN_DURATION, 1) });
                        const doneTimer = setTimeout(() => {
                            if (this.slideSequence !== slideSequence)
                                return;
                            this.setState({ cardStyle: "" });
                            this.resetGestureState();
                            this.isPageAnimating = false;
                        }, SLIDE_IN_DURATION);
                        this.slideTimers.push(doneTimer);
                    }, SLIDE_RESET_DELAY);
                    this.slideTimers.push(enterTimer);
                });
            }, exitDuration);
            this.slideTimers.push(switchTimer);
        };
        // ============ Textbook & Grade Methods ============
        this.selectTextbook = (textbook) => {
            this.setState({ selectedTextbook: textbook, selectedGrade: 1 });
        };
        this.backToTextbookList = () => {
            this.setState({ selectedTextbook: null });
        };
        this.selectGrade = (grade) => {
            this.setState({ selectedGrade: grade });
        };
        this.getCurrentGradeWords = () => {
            const { selectedTextbook, selectedGrade, currentPage } = this.state;
            const currentLetter = letters_1.letterData[currentPage].letter;
            const gradeData = selectedTextbook === "沪教" ? grade_words_1.hujiaoGradeData : grade_words_1.oxfordGradeData;
            const data = gradeData[selectedGrade];
            if (!data)
                return [];
            return data[currentLetter] || [];
        };
        this.toggleExtraWord = (word) => {
            const { selectedExtraWords, currentPage } = this.state;
            const currentLetter = letters_1.letterData[currentPage].letter;
            const currentWords = selectedExtraWords[currentLetter] || [];
            let newWords;
            if (currentWords.includes(word)) {
                newWords = currentWords.filter((w) => w !== word);
            }
            else {
                newWords = [...currentWords, word];
            }
            const newSelectedExtraWords = Object.assign(Object.assign({}, selectedExtraWords), { [currentLetter]: newWords });
            this.setState({ selectedExtraWords: newSelectedExtraWords });
            this.saveSelectedExtraWords(newSelectedExtraWords);
        };
        this.findWordData = (wordText, pageIndex = this.state.currentPage) => {
            const { selectedTextbook, customWords } = this.state;
            const currentLetter = letters_1.letterData[pageIndex].letter;
            // Search in grade data across all grades for the current textbook
            const gradeData = selectedTextbook === "沪教" ? grade_words_1.hujiaoGradeData : grade_words_1.oxfordGradeData;
            for (const gradeKey of Object.keys(gradeData)) {
                const data = gradeData[Number(gradeKey)];
                if (data && data[currentLetter]) {
                    const found = data[currentLetter].find((w) => w.word.toLowerCase() === wordText.toLowerCase());
                    if (found) {
                        return { icon: found.icon, phonetic: found.phonetic };
                    }
                }
            }
            // Search in both textbooks if no textbook selected
            for (const gd of [grade_words_1.hujiaoGradeData, grade_words_1.oxfordGradeData]) {
                for (const gradeKey of Object.keys(gd)) {
                    const data = gd[Number(gradeKey)];
                    if (data && data[currentLetter]) {
                        const found = data[currentLetter].find((w) => w.word.toLowerCase() === wordText.toLowerCase());
                        if (found) {
                            return { icon: found.icon, phonetic: found.phonetic };
                        }
                    }
                }
            }
            // Search in custom words
            const cw = customWords[currentLetter] || [];
            const customFound = cw.find((w) => w.word.toLowerCase() === wordText.toLowerCase());
            if (customFound) {
                return {
                    icon: customFound.image ? customFound.image.replace("emoji:", "") : "📝",
                    phonetic: customFound.phonetic || "",
                };
            }
            // Use icon lookup
            const { icon } = (0, image_1.getIconForWord)(wordText);
            return { icon, phonetic: "" };
        };
        // ============ Emoji Picker Methods ============
        this.selectEmoji = (emoji) => {
            const { inputWord, inputPhonetic, tempAddedWords } = this.state;
            const word = inputWord.trim();
            if (!word) {
                this.setState({ showEmojiPicker: false });
                return;
            }
            const newWord = {
                word,
                phonetic: inputPhonetic.trim() || undefined,
                image: `emoji:${emoji}`,
            };
            this.setState({
                tempAddedWords: [...tempAddedWords, newWord],
                inputWord: "",
                inputPhonetic: "",
                showEmojiPicker: false,
            });
        };
        this.closeEmojiPicker = () => {
            this.setState({ showEmojiPicker: false });
        };
        // ============ Modal Methods ============
        this.openAddModal = () => {
            const { currentPage, customWords } = this.state;
            const currentLetter = letters_1.letterData[currentPage].letter;
            const existingWords = customWords[currentLetter] || [];
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
            });
        };
        this.closeAddModal = () => {
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
            });
        };
        // 输入单词
        this.onWordInput = (e) => {
            this.setState({ inputWord: e.detail.value });
        };
        // 输入音标
        this.onPhoneticInput = (e) => {
            this.setState({ inputPhonetic: e.detail.value });
        };
        // 单词输入框失焦时自动获取音标
        this.onWordBlur = () => __awaiter(this, void 0, void 0, function* () {
            const { inputWord, inputPhonetic, tempAddedWords } = this.state;
            const word = inputWord.trim();
            if (!word || inputPhonetic.trim()) {
                return;
            }
            if (tempAddedWords.some(item => item.word.toLowerCase() === word.toLowerCase())) {
                return;
            }
            taro_1.default.showLoading({ title: '获取音标...', mask: true });
            try {
                const phonetic = yield (0, dictionary_1.checkWordAndGetPhonetic)(word);
                if (phonetic) {
                    this.setState({ inputPhonetic: phonetic });
                    taro_1.default.showToast({ title: '已自动填充音标', icon: 'success' });
                }
                else {
                    taro_1.default.showToast({ title: '未找到该单词', icon: 'none' });
                }
            }
            catch (error) {
                console.error('Failed to get phonetic:', error);
            }
            finally {
                taro_1.default.hideLoading();
            }
        });
        // 添加单词到临时列表
        this.addWordToList = () => {
            const { inputWord, inputPhonetic, tempAddedWords, currentPage } = this.state;
            const currentLetter = letters_1.letterData[currentPage].letter;
            const word = inputWord.trim();
            if (!word) {
                taro_1.default.showToast({ title: "请输入单词", icon: "none" });
                return;
            }
            if (!word.toUpperCase().startsWith(currentLetter)) {
                taro_1.default.showToast({ title: `请输入 ${currentLetter} 开头的单词`, icon: "none" });
                return;
            }
            if (tempAddedWords.some(item => item.word.toLowerCase() === word.toLowerCase())) {
                taro_1.default.showToast({ title: "单词已存在", icon: "none" });
                return;
            }
            // Try to find an icon automatically
            const { icon, matched } = (0, image_1.getIconForWord)(word);
            if (matched) {
                // Auto-fill the icon and add to list
                const newWord = {
                    word,
                    phonetic: inputPhonetic.trim() || undefined,
                    image: `emoji:${icon}`,
                };
                this.setState({
                    tempAddedWords: [...tempAddedWords, newWord],
                    inputWord: "",
                    inputPhonetic: "",
                });
            }
            else {
                // Show emoji picker for user to pick an icon
                this.setState({ showEmojiPicker: true, emojiSearchQuery: word });
            }
        };
        // 删除临时列表中的单词
        this.removeTempWord = (index) => {
            const { tempAddedWords } = this.state;
            const newList = tempAddedWords.filter((_, i) => i !== index);
            this.setState({ tempAddedWords: newList });
        };
        // 搜索单词图片
        this.searchImages = (index, word) => __awaiter(this, void 0, void 0, function* () {
            this.setState({
                isSearchingImages: true,
                pickingIndex: index,
                showImagePicker: true,
                candidateImages: []
            });
            taro_1.default.showLoading({ title: '搜索图片...', mask: true });
            try {
                const images = yield (0, image_1.fetchWordImages)(word);
                if (images && images.length > 0) {
                    this.setState({ candidateImages: images });
                }
                else {
                    taro_1.default.showToast({ title: '未找到相关图片', icon: 'none' });
                }
            }
            catch (error) {
                console.error('Failed to search images:', error);
                taro_1.default.showToast({ title: '搜索失败', icon: 'none' });
            }
            finally {
                this.setState({ isSearchingImages: false });
                taro_1.default.hideLoading();
            }
        });
        // 选择图片
        this.selectImage = (url) => {
            const { tempAddedWords, pickingIndex } = this.state;
            if (pickingIndex === null)
                return;
            const newList = [...tempAddedWords];
            newList[pickingIndex] = Object.assign(Object.assign({}, newList[pickingIndex]), { image: url });
            this.setState({
                tempAddedWords: newList,
                showImagePicker: false,
                pickingIndex: null,
                candidateImages: []
            });
        };
        // 关闭图片选择器
        this.closeImagePicker = () => {
            this.setState({
                showImagePicker: false,
                pickingIndex: null,
                candidateImages: []
            });
        };
        // 完成添加
        this.confirmAdd = () => {
            const { tempAddedWords, customWords, currentPage } = this.state;
            const currentLetter = letters_1.letterData[currentPage].letter;
            const newCustomWords = Object.assign(Object.assign({}, customWords), { [currentLetter]: tempAddedWords });
            this.setState({ customWords: newCustomWords });
            this.saveCustomWords(newCustomWords);
            this.closeAddModal();
        };
        // 删除已保存的单词
        this.deleteWord = (letter, index) => {
            taro_1.default.showModal({
                title: "删除单词",
                content: "确定删除这个单词吗？",
                success: (res) => {
                    if (res.confirm) {
                        const { customWords } = this.state;
                        const currentWords = customWords[letter] || [];
                        const newWords = currentWords.filter((_, i) => i !== index);
                        const newCustomWords = Object.assign(Object.assign({}, customWords), { [letter]: newWords });
                        this.setState({ customWords: newCustomWords });
                        this.saveCustomWords(newCustomWords);
                    }
                },
            });
        };
        // ============ Emoji Search Input ============
        this.onEmojiSearchInput = (e) => {
            this.setState({ emojiSearchQuery: e.detail.value });
        };
        // Get filtered emojis for current category/search
        this.getFilteredEmojis = () => {
            const { activeEmojiCategory, emojiSearchQuery } = this.state;
            const cat = emojiCategories[activeEmojiCategory];
            if (!cat)
                return [];
            if (emojiSearchQuery && emojiSearchQuery.trim()) {
                // When searching, show all categories' results
                const allEmojis = Object.values(emojiCategories).flatMap((c) => c.emojis);
                // Deduplicate
                return [...new Set(allEmojis)];
            }
            return cat.emojis;
        };
        this.renderCardContent = (pageIndex, paneKey) => {
            const { activeElement, customWords, selectedExtraWords, cardStyle } = this.state;
            const pageData = letters_1.letterData[pageIndex];
            const pageCustomWords = customWords[pageData.letter] || [];
            return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: "card-content", onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, onTouchCancel: this.handleTouchCancel, children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: `letter-section ${activeElement === "letter" ? "active" : ""}`, style: cardStyle, onClick: () => this.playAudio(pageData.letter, "letter"), children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "letter-text", children: pageData.letter }) }), (0, jsx_runtime_1.jsx)(components_1.ScrollView, { className: "words-section", scrollY: true, enhanced: true, bounces: false, onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, onTouchCancel: this.handleTouchCancel, children: (0, jsx_runtime_1.jsxs)(components_1.View, { className: "words-grid", style: cardStyle, children: [pageData.words.map((item, index) => ((0, jsx_runtime_1.jsxs)(components_1.View, { className: `word-card ${activeElement === `word-${index}` ? "active" : ""}`, onClick: () => this.playAudio(item.word, `word-${index}`), children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-emoji", children: item.emoji }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-text", children: item.word }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-phonetic", children: item.phonetic })] }, index))), pageCustomWords.map((item, index) => ((0, jsx_runtime_1.jsxs)(components_1.View, { className: `word-card custom ${activeElement === `custom-${index}` ? "active" : ""}`, onClick: () => this.playAudio(item.word, `custom-${index}`), onLongPress: () => this.deleteWord(pageData.letter, index), children: [item.image ? (item.image.startsWith('emoji:') ? ((0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-emoji", children: item.image.replace('emoji:', '') })) : ((0, jsx_runtime_1.jsx)(components_1.Image, { className: "word-icon-img", src: item.image, mode: "aspectFill" }))) : ((0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-emoji", children: "\u2728" })), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-text", children: item.word }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-phonetic", children: item.phonetic || "" })] }, `custom-${index}`))), (selectedExtraWords[pageData.letter] || []).map((wordText, index) => {
                                    const wordData = this.findWordData(wordText, pageIndex);
                                    return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: `word-card extra ${activeElement === `extra-${index}` ? "active" : ""}`, onClick: () => this.playAudio(wordText, `extra-${index}`), onLongPress: () => this.toggleExtraWord(wordText), children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-emoji", children: wordData.icon || "📝" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-text", children: wordText }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "word-phonetic", children: wordData.phonetic || "" })] }, `extra-${index}`));
                                })] }) })] }, paneKey));
        };
    }
    componentDidMount() {
        this.audioManager = new audio_1.AudioManager();
        this.loadCustomWords();
        this.loadSelectedExtraWords();
    }
    componentWillUnmount() {
        this.clearSlideTimers();
        if (this.audioManager) {
            this.audioManager.destroy();
        }
    }
    render() {
        const { currentPage, isSlowMode, customWords, showAddModal, inputWord, inputPhonetic, tempAddedWords, showImagePicker, selectedTextbook, selectedGrade, selectedExtraWords, showEmojiPicker, activeEmojiCategory, emojiSearchQuery, } = this.state;
        const currentData = letters_1.letterData[currentPage];
        const hasCustomWords = (customWords[currentData.letter] || []).length > 0 || (selectedExtraWords[currentData.letter] || []).length > 0;
        const gradeWords = this.getCurrentGradeWords();
        const filteredEmojis = this.getFilteredEmojis();
        const categoryKeys = Object.keys(emojiCategories);
        return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: "container", children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "header", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "title", children: "ABC Learning" }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "header-actions", children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "more-btn", onClick: this.openAddModal, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "more-icon", children: "+" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "more-text", children: "\u6DFB\u52A0" })] }), (0, jsx_runtime_1.jsx)(components_1.View, { className: `slow-mode-btn ${isSlowMode ? "active" : ""}`, onClick: this.toggleSlowMode, children: (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "btn-text", children: ["\u6162\u653E ", isSlowMode ? "✓" : ""] }) }), (0, jsx_runtime_1.jsx)(components_1.View, { className: `nav-btn ${currentPage === 0 ? "disabled" : ""}`, onClick: this.prevPage, children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "nav-icon", children: "\u2039" }) }), (0, jsx_runtime_1.jsx)(components_1.View, { className: `nav-btn ${currentPage === letters_1.letterData.length - 1 ? "disabled" : ""}`, onClick: this.nextPage, children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "nav-icon", children: "\u203A" }) })] })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "main-card", children: [this.renderCardContent(currentPage, `current-${currentPage}`), (0, jsx_runtime_1.jsx)(components_1.View, { className: "footer-row", children: (0, jsx_runtime_1.jsx)(components_1.View, { className: "page-indicator", children: letters_1.letterData.map((_, index) => ((0, jsx_runtime_1.jsx)(components_1.View, { className: `indicator-dot ${index === currentPage ? "active" : ""}`, onClick: () => this.goToPage(index) }, index))) }) }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "hint-text", children: hasCustomWords ? "左右滑动切换 · 长按删除" : "左右滑动切换 · 点击发音" })] }), showAddModal && ((0, jsx_runtime_1.jsx)(components_1.View, { className: "modal-overlay", onClick: this.closeAddModal, children: (0, jsx_runtime_1.jsxs)(components_1.View, { className: "modal-container", onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "modal-header", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "modal-cancel", onClick: this.closeAddModal, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "modal-title", children: selectedTextbook === "自定义" ? "自定义单词" : selectedTextbook ? "选择单词" : "选择教材" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "modal-done", onClick: this.confirmAdd, children: "\u5B8C\u6210" })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "modal-content", children: [!selectedTextbook && ((0, jsx_runtime_1.jsxs)(components_1.View, { className: "textbook-section", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-hint", children: "\u8BF7\u9009\u62E9\u6559\u6750\u7248\u672C" }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "textbook-item", onClick: () => this.selectTextbook("沪教"), children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "textbook-info", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-name", children: "\u6CAA\u6559\u7248" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-desc", children: "\u4E0A\u6D77\u5C0F\u5B66\u82F1\u8BED 1-6\u5E74\u7EA7" })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-chevron", children: "\u203A" })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "textbook-item", onClick: () => this.selectTextbook("沪教牛津"), children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "textbook-info", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-name", children: "\u6CAA\u6559\u725B\u6D25\u7248" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-desc", children: "\u4E0A\u6D77\u5C0F\u5B66\u82F1\u8BED 1-5\u5E74\u7EA7" })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-chevron", children: "\u203A" })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "textbook-item", onClick: () => this.selectTextbook("自定义"), children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "textbook-info", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-name", children: "\u81EA\u5B9A\u4E49" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-desc", children: "\u6DFB\u52A0\u81EA\u5DF1\u7684\u5355\u8BCD" })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "textbook-chevron", children: "\u203A" })] })] })), selectedTextbook === "自定义" && ((0, jsx_runtime_1.jsxs)(components_1.View, { children: [(0, jsx_runtime_1.jsxs)(components_1.Text, { className: "form-hint", children: ["\u4E3A\u5B57\u6BCD ", (0, jsx_runtime_1.jsx)(components_1.Text, { className: "letter-highlight", children: currentData.letter }), " \u6DFB\u52A0\u5355\u8BCD"] }), !showEmojiPicker ? ((0, jsx_runtime_1.jsxs)(components_1.View, { children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "form-section", children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "form-group", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "form-label", children: "\u5355\u8BCD" }), (0, jsx_runtime_1.jsx)(components_1.Input, { className: "form-input", placeholder: "\u8F93\u5165\u5355\u8BCD", value: inputWord, onInput: this.onWordInput, onBlur: this.onWordBlur, focus: true })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "form-group", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "form-label", children: "\u97F3\u6807" }), (0, jsx_runtime_1.jsx)(components_1.Input, { className: "form-input", placeholder: "/\u02C8\u00E6pl/\uFF08\u53EF\u9009\uFF09", value: inputPhonetic, onInput: this.onPhoneticInput })] })] }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "add-btn-row", children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: "add-btn", onClick: this.addWordToList, children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "add-btn-text", children: "\u52A0\u5165\u9884\u89C8\u5217\u8868" }) }), (0, jsx_runtime_1.jsx)(components_1.View, { className: "emoji-pick-btn", onClick: () => this.setState({ showEmojiPicker: true }), children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "emoji-pick-btn-text", children: "\u9009\u56FE\u6807" }) })] })] })) : ((0, jsx_runtime_1.jsxs)(components_1.View, { className: "emoji-picker-inline", children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: "emoji-search-bar", children: (0, jsx_runtime_1.jsx)(components_1.Input, { className: "emoji-search", placeholder: "\u641C\u7D22 emoji...", value: emojiSearchQuery, onInput: this.onEmojiSearchInput }) }), (0, jsx_runtime_1.jsx)(components_1.ScrollView, { className: "emoji-category-tabs", scrollX: true, children: categoryKeys.map((key) => ((0, jsx_runtime_1.jsx)(components_1.View, { className: `emoji-category-tab ${activeEmojiCategory === key && !emojiSearchQuery ? "active" : ""}`, onClick: () => this.setState({ activeEmojiCategory: key, emojiSearchQuery: "" }), children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "emoji-category-tab-text", children: emojiCategories[key].name }) }, key))) }), (0, jsx_runtime_1.jsx)(components_1.ScrollView, { className: "emoji-grid-scroll", scrollY: true, children: (0, jsx_runtime_1.jsx)(components_1.View, { className: "emoji-grid", children: filteredEmojis.map((emoji, idx) => ((0, jsx_runtime_1.jsx)(components_1.View, { className: "emoji-item", onClick: () => this.selectEmoji(emoji), children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "emoji-item-text", children: emoji }) }, `${emoji}-${idx}`))) }) }), (0, jsx_runtime_1.jsx)(components_1.View, { className: "emoji-picker-footer", onClick: this.closeEmojiPicker, children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "emoji-picker-cancel", children: "\u53D6\u6D88" }) })] })), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "added-section", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "added-title", children: "\u5F85\u4FDD\u5B58\u5217\u8868" }), tempAddedWords.length === 0 ? ((0, jsx_runtime_1.jsx)(components_1.Text, { className: "empty-text", children: "\u5217\u8868\u4E3A\u7A7A\uFF0C\u70B9\u51FB\u4E0A\u65B9\u6DFB\u52A0" })) : ((0, jsx_runtime_1.jsx)(components_1.View, { className: "added-list", children: tempAddedWords.map((item, index) => ((0, jsx_runtime_1.jsxs)(components_1.View, { className: "added-item", children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "added-content", children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: "added-icon-box", onClick: () => this.searchImages(index, item.word), children: item.image ? (item.image.startsWith('emoji:') ? ((0, jsx_runtime_1.jsx)(components_1.Text, { className: "added-emoji", children: item.image.replace('emoji:', '') })) : ((0, jsx_runtime_1.jsx)(components_1.Image, { className: "added-image", src: item.image, mode: "aspectFill" }))) : ((0, jsx_runtime_1.jsxs)(components_1.View, { className: "added-add-icon-btn", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "added-add-icon", children: "+" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "added-add-text", children: "\u56FE\u6807" })] })) }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "added-info", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "added-word", children: item.word }), item.phonetic && (0, jsx_runtime_1.jsx)(components_1.Text, { className: "added-phonetic", children: item.phonetic })] })] }), (0, jsx_runtime_1.jsx)(components_1.View, { className: "remove-btn", onClick: () => this.removeTempWord(index), children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "remove-icon", children: "-" }) })] }, index))) }))] })] })), (selectedTextbook === "沪教" || selectedTextbook === "沪教牛津") && ((0, jsx_runtime_1.jsxs)(components_1.View, { children: [(0, jsx_runtime_1.jsx)(components_1.View, { className: "grade-back-btn", onClick: this.backToTextbookList, children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "grade-back-text", children: "\u2039 \u8FD4\u56DE\u6559\u6750\u9009\u62E9" }) }), (0, jsx_runtime_1.jsx)(components_1.ScrollView, { className: "grade-tabs", scrollX: true, children: (selectedTextbook === "沪教" ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]).map((grade) => ((0, jsx_runtime_1.jsx)(components_1.View, { className: `grade-tab ${selectedGrade === grade ? "active" : ""}`, onClick: () => this.selectGrade(grade), children: (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "grade-tab-text", children: [grade, "\u5E74\u7EA7"] }) }, grade))) }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "grade-word-hint", children: ["\u4E3A\u5B57\u6BCD ", (0, jsx_runtime_1.jsx)(components_1.Text, { className: "letter-highlight", children: currentData.letter }), " \u9009\u62E9", selectedGrade, "\u5E74\u7EA7\u5355\u8BCD"] }), (0, jsx_runtime_1.jsx)(components_1.View, { className: "grade-word-list", children: gradeWords.length > 0 ? gradeWords.map((item, index) => {
                                                    const isSelected = (selectedExtraWords[currentData.letter] || []).includes(item.word);
                                                    return ((0, jsx_runtime_1.jsxs)(components_1.View, { className: `grade-word-item ${isSelected ? "selected" : ""}`, onClick: () => this.toggleExtraWord(item.word), children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "grade-word-content", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "grade-word-icon", children: item.icon || "📝" }), (0, jsx_runtime_1.jsxs)(components_1.View, { className: "grade-word-info", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: `grade-word-text ${isSelected ? "selected" : ""}`, children: item.word }), item.phonetic && ((0, jsx_runtime_1.jsx)(components_1.Text, { className: `grade-word-phonetic ${isSelected ? "selected" : ""}`, children: item.phonetic }))] })] }), isSelected && ((0, jsx_runtime_1.jsx)(components_1.View, { className: "grade-word-check", children: (0, jsx_runtime_1.jsx)(components_1.View, { className: "grade-word-check-dot" }) }))] }, index));
                                                }) : ((0, jsx_runtime_1.jsxs)(components_1.Text, { className: "grade-word-empty", children: ["\u8BE5\u5B57\u6BCD\u6682\u65E0", selectedGrade, "\u5E74\u7EA7\u5355\u8BCD"] })) })] }))] })] }) })), showImagePicker && ((0, jsx_runtime_1.jsx)(components_1.View, { className: "image-picker-overlay", onClick: this.closeImagePicker, children: (0, jsx_runtime_1.jsxs)(components_1.View, { className: "image-picker-container", onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsxs)(components_1.View, { className: "picker-header", children: [(0, jsx_runtime_1.jsx)(components_1.Text, { className: "picker-title", children: "\u63A8\u8350\u56FE\u6807" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "picker-close", onClick: this.closeImagePicker, children: "\u2715" })] }), (0, jsx_runtime_1.jsx)(components_1.View, { className: "picker-grid", children: this.state.isSearchingImages ? ((0, jsx_runtime_1.jsx)(components_1.View, { className: "picker-status", children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "picker-loading", children: "\u641C\u7D22\u63A8\u8350\u4E2D..." }) })) : this.state.candidateImages.length > 0 ? (this.state.candidateImages.map((url, idx) => ((0, jsx_runtime_1.jsx)(components_1.View, { className: "picker-item", onClick: () => this.selectImage(url), children: url.startsWith('emoji:') ? ((0, jsx_runtime_1.jsx)(components_1.Text, { className: "picker-emoji", children: url.replace('emoji:', '') })) : ((0, jsx_runtime_1.jsx)(components_1.Image, { className: "picker-img", src: url, mode: "aspectFill" })) }, idx)))) : ((0, jsx_runtime_1.jsx)(components_1.View, { className: "picker-status", children: (0, jsx_runtime_1.jsx)(components_1.Text, { className: "picker-empty", children: "\u65E0\u63A8\u8350\u56FE\u7247" }) })) })] }) }))] }));
    }
}
exports.default = Index;
//# sourceMappingURL=index.js.map