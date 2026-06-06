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
exports.getIconForWord = getIconForWord;
exports.fetchWordImages = fetchWordImages;
/**
 * 常见单词到 Emoji 的映射表
 * 合并自 target 项目和 source (Next.js) 项目
 * 优先使用 Emoji，语义准确且无需网络请求
 */
const wordEmojiMap = {
    // ============================================================
    // Animals - 动物
    // ============================================================
    ant: '🐜', alligator: '🐊', bear: '🐻', bird: '🐦', bat: '🦇', bee: '🐝', butterfly: '🦋',
    cat: '🐱', cow: '🐄', camel: '🐫', chicken: '🐔', crab: '🦀', crocodile: '🐊',
    dog: '🐕', duck: '🦆', dolphin: '🐬', deer: '🦌', dragon: '🐉', donkey: '🫏',
    elephant: '🐘', eagle: '🦅',
    fish: '🐟', frog: '🐸', fox: '🦊', flamingo: '🦩',
    goat: '🐐', gorilla: '🦍', giraffe: '🦒',
    horse: '🐴', hamster: '🐹', hedgehog: '🦔', hippo: '🦛',
    insect: '🦗',
    jellyfish: '🪼',
    koala: '🐨', kangaroo: '🦘',
    lion: '🦁', leopard: '🐆', llama: '🦙', lizard: '🦎', lobster: '🦞',
    monkey: '🐵', mouse: '🐭', moose: '🫎',
    octopus: '🐙', owl: '🦉', otter: '🦦', ox: '🐂', oyster: '🦪',
    pig: '🐷', penguin: '🐧', panda: '🐼', parrot: '🦜', peacock: '🦚',
    rabbit: '🐰', rooster: '🐓', raccoon: '🦝', rat: '🐀',
    snake: '🐍', snail: '🐌', shark: '🦈', sheep: '🐑', shrimp: '🦐', spider: '🕷️', squid: '🦑', swan: '🦢', seal: '🦭', sloth: '🦥', skunk: '🦨',
    tiger: '🐯', turtle: '🐢', turkey: '🦃',
    unicorn: '🦄',
    whale: '🐋', wolf: '🐺', worm: '🪱',
    zebra: '🦓',
    hen: '🐔', ladybug: '🐞', dove: '🕊️', kitten: '🐱', puppy: '🐶',
    dinosaur: '🦕', bumblebee: '🐝', caterpillar: '🐛', salmon: '🐟', tadpole: '🐸',
    pony: '🐴', lamb: '🐑', cub: '🐻', fawn: '🦌', chick: '🐤',
    sparrow: '🐦', raven: '🐦‍⬛', seagull: '🐦', goose: '🪿',
    // ============================================================
    // Food & Drink - 水果蔬菜食物饮料
    // ============================================================
    apple: '🍎', avocado: '🥑',
    banana: '🍌', blueberry: '🫐', broccoli: '🥦', bread: '🍞', butter: '🧈',
    carrot: '🥕', cherry: '🍒', coconut: '🥥', corn: '🌽', cucumber: '🥒', cupcake: '🧁', cake: '🎂', candy: '🍬', cheese: '🧀', chocolate: '🍫', cookie: '🍪',
    donut: '🍩',
    eggplant: '🍆', egg: '🥚',
    grape: '🍇', garlic: '🧄', ginger: '🫚',
    hamburger: '🍔', honey: '🍯', hotdog: '🌭',
    ice: '🧊',
    kiwi: '🥝',
    lemon: '🍋', lettuce: '🥬', lime: '🍋‍🟩',
    mango: '🥭', melon: '🍈', mushroom: '🍄', milk: '🥛',
    nut: '🥜',
    olive: '🫒', onion: '🧅', orange: '🍊',
    peach: '🍑', pear: '🍐', pepper: '🫑', pineapple: '🍍', pizza: '🍕', potato: '🥔', pumpkin: '🎃', peanut: '🥜', popcorn: '🍿', pie: '🥧', pancake: '🥞', pretzel: '🥨',
    rice: '🍚',
    salad: '🥗', sandwich: '🥪', strawberry: '🍓', sushi: '🍣', spaghetti: '🍝', soup: '🍲', steak: '🥩',
    tomato: '🍅', taco: '🌮',
    watermelon: '🍉', waffle: '🧇',
    noodles: '🍜', sweet: '🍬', jelly: '🍮', biscuit: '🍪', food: '🍱', drink: '🥤',
    coffee: '☕', tea: '🍵', water: '💧', icecream: '🍦', lollipop: '🍭',
    meat: '🥩', sausage: '🌭', eggroll: '🥟', vegetable: '🥬', snack: '🍿', cereal: '🥣', porridge: '🥣',
    jam: '🫙', sugar: '🍬', salt: '🧂', spice: '🌶️',
    grapefruit: '🍊', bean: '🫘', pea: '🫛', plum: '🫐',
    dumpling: '🥟', pastry: '🥐', noodle: '🍜', tofu: '🧈',
    flour: '🌾', cream: '🥛', yogurt: '🥛', juice: '🧃',
    bacon: '🥓',
    // ============================================================
    // Nature - 自然
    // ============================================================
    cloud: '☁️', cactus: '🌵',
    fire: '🔥', flower: '🌸', forest: '🌲',
    leaf: '🍃', lightning: '⚡',
    moon: '🌙', mountain: '⛰️',
    ocean: '🌊',
    rain: '🌧️', rainbow: '🌈', river: '🏞️', rose: '🌹', rock: '🪨',
    snow: '❄️', star: '⭐', sun: '☀️', sunflower: '🌻', snowflake: '❄️',
    tree: '🌳', tornado: '🌪️', tulip: '🌷', thunder: '⛈️',
    volcano: '🌋',
    wave: '🌊', wind: '💨', wood: '🪵',
    sky: '☁️', grass: '🌿', lake: '🏞️', sea: '🌊', beach: '🏖️',
    island: '🏝️', garden: '🌷', earth: '🌍', desert: '🏜️', waterfall: '💧',
    mud: '🟤', sand: '🏖️', stone: '🪨', seed: '🌱', bud: '🌱',
    petal: '🌸', branch: '🌿', root: '🌿', trunk: '🌳', bush: '🌿',
    weed: '🌿', vine: '🍇', cave: '🕳️', cliff: '⛰️', valley: '⛰️',
    shore: '🏖️', coast: '🏖️', hill: '⛰️', swamp: '🌿', pond: '🏞️',
    stream: '💧', brook: '💧', puddle: '💧', bubble: '🫧', dew: '💧',
    mist: '🌫️', frost: '❄️', hail: '🌨️',
    sunrise: '🌅', sunset: '🌇', shade: '🌤️', shadow: '👤',
    // ============================================================
    // Objects - 物品
    // ============================================================
    airplane: '✈️', anchor: '⚓', axe: '🪓', ax: '🪓',
    ball: '🏀', balloon: '🎈', bed: '🛏️', bell: '🔔', bicycle: '🚲', bike: '🚴', book: '📖', bottle: '🍼', box: '📦', brush: '🖌️', bucket: '🪣', bus: '🚌', button: '🔘', boot: '🥾', bag: '👜', backpack: '🎒', battery: '🔋', basket: '🧺', bowl: '🥣', broom: '🧹', brick: '🧱', briefcase: '💼', bulb: '💡',
    camera: '📷', candle: '🕯️', car: '🚗', chair: '🪑', clock: '🕐', computer: '💻', crown: '👑', cup: '☕', couch: '🛋️', compass: '🧭', comb: '🪥', coin: '🪙', credit: '💳', cart: '🛒',
    desk: '🖥️', diamond: '💎', dice: '🎲', door: '🚪', doll: '🪆', drum: '🥁', dress: '👗',
    envelope: '✉️', eraser: '🧽',
    fan: '🪭', flag: '🚩', flashlight: '🔦', fork: '🍴',
    gift: '🎁', glasses: '👓', globe: '🌍', guitar: '🎸', glove: '🧤',
    hammer: '🔨', hat: '🎩', headphone: '🎧', heart: '❤️', helicopter: '🚁', hook: '🪝', house: '🏠', hose: '🧯',
    jar: '🫙', jet: '✈️', jeans: '👖',
    key: '🔑', keyboard: '⌨️', kite: '🪁', knife: '🔪', knot: '🪢',
    ladder: '🪜', lamp: '💡', laptop: '💻', letter: '✉️', lock: '🔒', luggage: '🧳',
    magnet: '🧲', map: '🗺️', medal: '🏅', microphone: '🎤', mirror: '🪞', money: '💰',
    nail: '🔩', needle: '🪡', nest: '🪺', notebook: '📓', necklace: '📿',
    package: '📦', paintbrush: '🖌️', palette: '🎨', pan: '🍳', paper: '📄', parachute: '🪂', pen: '🖊️', pencil: '✏️', phone: '📱', piano: '🎹', pillow: '🛋️', pin: '📍', pipe: '🪈', plate: '🍽️', plunger: '🪠', pot: '🍲', printer: '🖨️', purse: '👛', puzzle: '🧩',
    question: '❓', quilt: '🛏️',
    radio: '📻', ring: '💍', robot: '🤖', rocket: '🚀', rope: '🪢', ruler: '📏',
    saw: '🪚', scale: '⚖️', scarf: '🧣', scissors: '✂️', screw: '🔩', shield: '🛡️', ship: '🚢', shirt: '👕', shoe: '👟', skateboard: '🛹', skirt: '👗', sled: '🛷', sock: '🧦', sofa: '🛋️', spoon: '🥄', stapler: '🧷', stethoscope: '🩺', suitcase: '🧳', surfboard: '🏄', sweater: '🧥', sword: '⚔️', syringe: '💉',
    table: '🪑', tape: '📼', teddy: '🧸', telephone: '☎️', telescope: '🔭', tent: '⛺', thread: '🧵', ticket: '🎫', tire: '🛞', toilet: '🚽', toothbrush: '🪥', towel: '🧻', toy: '🧸', tractor: '🚜', train: '🚆', trash: '🗑️', trophy: '🏆', truck: '🚚', trumpet: '🎺', tv: '📺',
    ufo: '🛸', umbrella: '☂️', uniform: '👔',
    van: '🚐', vase: '🏺', vest: '🦺', violin: '🎻',
    wagon: '🛻', wallet: '👛', watch: '⌚', wheel: '🛞', whistle: '🎵', window: '🪟', wrench: '🔧',
    xray: '🩻',
    yacht: '🛥️', yarn: '🧶', yoyo: '🪀',
    zipper: '🤐',
    glue: '🧴', crayon: '🖍️', soap: '🧼', cap: '🧢', jacket: '🧥',
    coat: '🧥', belt: '👖', fridge: '🧊', oven: '🍳',
    blanket: '🛏️', chopsticks: '🥢', speaker: '🔊', tambourine: '🥁', harmonica: '🎵',
    magnifying: '🔍', lunchbox: '🍱', waterbottle: '🧴',
    boat: '⛵', taxi: '🚕', motorcycle: '🏍️', scooter: '🛴', stroller: '🚼',
    chain: '⛓️', microscope: '🔬', bin: '🗑️', mailbox: '📮', fence: '🏡', stairs: '🪜',
    // ============================================================
    // People & Body - 人物/身体
    // ============================================================
    baby: '👶', boy: '👦', girl: '👧', man: '👨', woman: '👩', king: '🤴', queen: '👸', prince: '🤴', princess: '👸', family: '👨‍👩‍👧‍👦', doctor: '👨‍⚕️', nurse: '👩‍⚕️', teacher: '👩‍🏫', farmer: '👨‍🌾', chef: '👨‍🍳', pilot: '👨‍✈️', police: '👮', firefighter: '🧑‍🚒', astronaut: '👨‍🚀', artist: '👨‍🎨', singer: '🎤', dancer: '💃', superhero: '🦸', wizard: '🧙', fairy: '🧚', angel: '👼', ghost: '👻', monster: '👹', zombie: '🧟', vampire: '🧛', mermaid: '🧜',
    arm: '💪', ear: '👂', elbow: '💪', eye: '👁️', face: '😊', finger: '👆', foot: '🦶', hair: '💇', hand: '✋', head: '🗣️', leg: '🦵', lip: '👄', mouth: '👄', muscle: '💪', neck: '🦒', nose: '👃', teeth: '🦷', thumb: '👍', toe: '🦶', tongue: '👅', tooth: '🦷',
    dad: '👨', mom: '👩', father: '👨', mother: '👩', brother: '👦',
    sister: '👧', grandfather: '👴', grandmother: '👵', grandpa: '👴',
    grandma: '👵', uncle: '🧔', aunt: '👩‍🦰', cousin: '🧒', friend: '👥',
    student: '👨‍🎓', driver: '🚗', cook: '👨‍🍳', clown: '🤡', pirate: '🏴‍☠️',
    alien: '👽', scientist: '🔬', runner: '🏃', swimmer: '🏊',
    soldier: '🎖️', neighbor: '🏘️', stranger: '👤',
    shoulder: '🤷', knee: '🦵', skin: '✋', bone: '🦴', brain: '🧠',
    blood: '🩸', stomach: '🤰', back: '🔙', chin: '😊', cheek: '😊',
    eyebrow: '👁️', eyelash: '👁️', chest: '🫁', wrist: '💪', ankle: '🦶',
    hip: '🦵', palm: '✋',
    // ============================================================
    // Sports & Activities - 运动/活动
    // ============================================================
    baseball: '⚾', basketball: '🏀', bowling: '🎳', boxing: '🥊', climbing: '🧗', cycling: '🚴', dance: '💃', diving: '🤿', football: '🏈', golf: '⛳', gymnastics: '🤸', hiking: '🥾', hockey: '🏒', karate: '🥋', running: '🏃', sailing: '⛵', skating: '⛸️', skiing: '🎿', snowboard: '🏂', soccer: '⚽', surfing: '🏄', swimming: '🏊', tennis: '🎾', volleyball: '🏐', wrestling: '🤼', yoga: '🧘',
    game: '🎮', magic: '🪄', music: '🎵', party: '🎉', reading: '📖', singing: '🎤', sleeping: '😴', studying: '📚', writing: '✍️',
    archery: '🏹', fencing: '🤺', camping: '⛺', fishing: '🎣', chess: '♟️',
    origami: '📄', knitting: '🧶', sewing: '🪡', pottery: '🏺',
    marbles: '⚪', cards: '🃏', lego: '🧱',
    // ============================================================
    // Buildings & Places - 建筑/地点
    // ============================================================
    bank: '🏦', bridge: '🌉', building: '🏢', castle: '🏰', church: '⛪', city: '🏙️', factory: '🏭', farm: '🌾', gym: '🏋️', hospital: '🏥', hotel: '🏨', igloo: '🛖', library: '📚', mall: '🏬', museum: '🏛️', office: '🏢', park: '🏞️', playground: '🛝', pool: '🏊', prison: '🏢', restaurant: '🍽️', school: '🏫', shop: '🏪', stadium: '🏟️', station: '🚉', store: '🏪', supermarket: '🛒', temple: '🛕', theater: '🎭', tower: '🗼', university: '🎓', village: '🏘️', zoo: '🦁',
    home: '🏠', kitchen: '🍳', bedroom: '🛏️', bathroom: '🚽', classroom: '🏫',
    cinema: '🎬', market: '🏪', airport: '✈️', road: '🛣️', street: '🛣️',
    palace: '🏛️', harbor: '⛵', port: '⛵', bakery: '🍞', pharmacy: '💊',
    aquarium: '🐠', greenhouse: '🏡', camp: '🏕️', cottage: '🏡', apartment: '🏢',
    mansion: '🏰', skatepark: '🛹', dojo: '🥋', arena: '🏟️',
    // ============================================================
    // Weather & Time - 天气/时间
    // ============================================================
    cloudy: '☁️', cold: '🥶', fog: '🌫️', hot: '🥵', rainy: '🌧️', snowy: '❄️', stormy: '⛈️', sunny: '☀️', warm: '🌡️', windy: '💨',
    morning: '🌅', noon: '☀️', afternoon: '🌤️', evening: '🌆', night: '🌙', midnight: '🌑',
    spring: '🌸', summer: '☀️', autumn: '🍂', fall: '🍂', winter: '❄️',
    season: '🌤️', weather: '🌦️', cool: '😎', dry: '🏜️', wet: '💦', storm: '⛈️',
    foggy: '🌫️', clear: '☀️', breezy: '🍃', humid: '💦', chilly: '🥶',
    boiling: '♨️', freezing: '🥶', scorching: '🥵', mild: '🌤️',
    thunderstorm: '⛈️', blizzard: '🌨️', drizzle: '🌧️',
    today: '📅', tomorrow: '➡️', yesterday: '⬅️', now: '⏰',
    day: '☀️', week: '📅', month: '📅', year: '📆', time: '⏰',
    hour: '⏱️', minute: '⏱️', second: '⏱️', monday: '🗓️',
    tuesday: '🗓️', wednesday: '🗓️', thursday: '🗓️', friday: '🗓️',
    saturday: '🗓️', sunday: '🗓️', weekend: '🎉', holiday: '🏖️',
    birthday: '🎂', christmas: '🎄', festival: '🎊',
    // ============================================================
    // Emotions & Adjectives - 情感/形容词
    // ============================================================
    angry: '😠', cry: '😢', happy: '😊', laugh: '😂', love: '❤️', sad: '😢', scared: '😨', shy: '😊', smile: '😊', surprise: '😮', tired: '😴', worried: '😟',
    hungry: '🤤', thirsty: '🥵', sick: '🤒', strong: '💪', weak: '😮‍💨',
    big: '⬆️', small: '⬇️', tall: '📏', short: '📏', long: '↔️',
    fast: '⚡', slow: '🐌', loud: '🔊', quiet: '🤫', dark: '🌑',
    bright: '💡', new: '🆕', old: '🏚️', good: '👍', bad: '👎',
    beautiful: '🌸', ugly: '🤮', funny: '😂', kind: '💝',
    cute: '🥰', nice: '😊', great: '🌟', wonderful: '✨', special: '⭐',
    super: '⭐', important: '❗', interesting: '🤔', afraid: '😨',
    excited: '🤩', careful: '⚠️', ready: '✅', busy: '😤', free: '🕊️',
    different: '🔄', same: '🟰', easy: '😌', hard: '💪', full: '🈵',
    empty: '🈳', dirty: '🤮', safe: '🛡️', dangerous: '⚠️',
    heavy: '🏋️', light: '💡', soft: '🧸', rough: '🪨', smooth: '🪞',
    thick: '📐', thin: '📐', wide: '↔️', narrow: '↔️',
    deep: '🌊', shallow: '🏖️', rich: '💰', poor: '😔',
    lucky: '🍀', silly: '🤪', clever: '🧠', smart: '🧠', lazy: '🦥',
    noisy: '🔊', calm: '😌', surprised: '😲', proud: '🏅',
    lonely: '😔', bored: '😐', grateful: '🙏', jealous: '😤',
    confused: '😵', amazed: '🤩', nervous: '😰', relieved: '😌',
    joyful: '😆', cheerful: '😄',
    // ============================================================
    // Colors - 颜色
    // ============================================================
    red: '🔴', blue: '🔵', green: '💚', yellow: '💛', brown: '🟤',
    pink: '💗', purple: '💜', white: '⬜', black: '⬛',
    grey: '🔘', gray: '🔘', gold: '🟡', silver: '⚪', violet: '💜',
    indigo: '💙', crimson: '🔴', scarlet: '🔴', beige: '🟤', tan: '🟤',
    // ============================================================
    // Numbers - 数字
    // ============================================================
    number: '🔢', zero: '0️⃣', one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣', six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟',
    eleven: '1️⃣', twelve: '1️⃣', hundred: '💯', thousand: '✨',
    twenty: '2️⃣', thirty: '3️⃣', fifty: '5️⃣', forty: '4️⃣', sixty: '6️⃣', seventy: '7️⃣', eighty: '8️⃣', ninety: '9️⃣',
    million: '🤑', billion: '🌌',
    // ============================================================
    // Symbols - 符号
    // ============================================================
    check: '✓', cross: '✗', dollar: '💵', euro: '💶', exclamation: '❗', minus: '➖', percent: '💯', plus: '➕', pound: '💷', yen: '💴',
    // ============================================================
    // Actions - 动作
    // ============================================================
    run: '🏃', jump: '🦘', fly: '✈️', go: '▶️', open: '🔓',
    close: '❌', read: '📖', write: '✍️', draw: '✏️', sing: '🎤',
    swim: '🏊', climb: '🧗', walk: '🚶', sleep: '😴',
    eat: '🍽️', clean: '🧹', wash: '🧼',
    play: '⚽', stop: '🛑', start: '▶️', begin: '▶️', finish: '🏁',
    push: '👊', pull: '🤲', cut: '✂️', build: '🏗️', make: '🔨',
    listen: '👂', hear: '👂', see: '👀',
    look: '👀', smell: '👃', taste: '👅', touch: '👉', feel: '🤚',
    think: '🤔', know: '🧠', learn: '📖', study: '📖', teach: '👨‍🏫',
    help: '🆘', give: '🎁', take: '🤲', put: '📥', get: '✅',
    stand: '🧍', sit: '🪑', turn: '↪️', move: '🏃', shake: '🤝',
    clap: '👏',
    hop: '🦘', skip: '🦘', swing: '🎢', slide: '🛝', ride: '🚗',
    throw: '🏀', catch: '🤲', kick: '⚽', punch: '👊', pick: '👆',
    choose: '👆', guess: '🤔', count: '🔢', share: '🤝',
    wait: '⏳', hide: '🙈', seek: '🔍', chase: '🏃',
    break: '💔', fix: '🔧', grow: '🌱', bloom: '🌸',
    dig: '🕳️', pour: '🫗', stir: '🥄', mix: '🥣', bake: '🧁',
    fry: '🍳', boil: '♨️', blend: '🥤', squeeze: '✊',
    wrap: '🎁', fold: '📄', tie: '🎀', spread: '🧈',
    score: '⚽', win: '🏆', lose: '😢',
    race: '🏃', fight: '⚔️', whisper: '🤫', shout: '📢', breathe: '🌬️',
    bite: '🦷', chew: '😋', swallow: '💧', drip: '💧', leak: '💧',
    snap: '📸', explode: '💥', pop: '🎈', crash: '💥', smash: '🔨',
    sweep: '🧹', scrub: '🧽', wipe: '🧻', dust: '💨', polish: '✨',
    borrow: '🤲', lend: '🤲', arrive: '🏁', depart: '🛫', return: '🔄',
    discover: '🔍', invent: '💡', explore: '🗺️', rescue: '🦸', protect: '🛡️',
    // ============================================================
    // School & Learning - 学校学习
    // ============================================================
    class: '🏫', lesson: '📚', homework: '📝', test: '📝', exam: '📝',
    subject: '📚', english: '🇬🇧', chinese: '🇨🇳', maths: '➕',
    math: '➕', science: '🔬', art: '🎨', PE: '🏃',
    sport: '⚽', story: '📖', word: '🔤',
    sentence: '📝', answer: '💡', name: '📛',
    picture: '🖼️', photo: '📷', spell: '🔤',
    alphabet: '🔤', paragraph: '📝',
    poem: '📜', riddle: '❓', dictionary: '📖', chalk: '🤍',
    blackboard: '🟫', whiteboard: '⬜', atlas: '🗺️',
    calculator: '🧮', experiment: '🔬', report: '📝',
    // ============================================================
    // Clothing - 服装
    // ============================================================
    clothes: '👕', tshirt: '👕', pants: '👖', shorts: '🩳',
    shoes: '👟', boots: '👢', slippers: '🩴',
    swimsuit: '👙', raincoat: '🧥',
    helmet: '⛑️', mask: '😷',
    pajamas: '🛏️', costume: '🎭',
    pocket: '👖', collar: '👔',
    mittens: '🧤', bowtie: '🎀',
    // ============================================================
    // Common Words - 常用词
    // ============================================================
    and: '🔗', but: '🔀', or: '❓', because: '➡️', if: '🤔',
    please: '🙏', thanks: '🙏', thank: '🙏', welcome: '👋', sorry: '🙏',
    yes: '✅', no: '❌', maybe: '🤷', OK: '👌', hello: '👋',
    hi: '👋', goodbye: '👋', bye: '👋',
    like: '👍', want: '🤲', need: '❓', have: '✅',
    can: '💪', will: '🔮', should: '👆', would: '🤔', must: '❗',
    am: '⬆️', is: '🟰', are: '✅', was: '⬅️', were: '⬅️',
    do: '✅', did: '⬅️', does: '❓', not: '🚫',
    this: '👉', that: '👉', these: '👇', those: '👇',
    here: '📍', there: '📍', where: '❓', when: '⏰', what: '❓',
    who: '👤', how: '❓', why: '❓', which: '❓',
    I: '👤', you: '👤', he: '👨', she: '👩', it: '👉',
    we: '👥', they: '👥', me: '👤', him: '👨', her: '👩',
    my: '👈', your: '👈', his: '👨', its: '👉', our: '👥',
    their: '👥', us: '👥',
    in: '📥', on: '⬆️', under: '⬇️', over: '⤴️', behind: '⬅️',
    next: '➡️', between: '↔️', around: '🔄', through: '🎯',
    with: '🤝', without: '🚫', from: '⬅️', to: '➡️', for: '👉',
    at: '📍', about: '💡', after: '⏭️', before: '⏮️', during: '⏳',
    up: '⬆️', down: '⬇️', out: '➡️', off: '🔌', away: '🏃',
    also: '➕', very: '💯', much: '💯', many: '💯', some: '🔢',
    all: '💯', every: '💯', each: '🔀', other: '👥', another: '➕',
    more: '➕', most: '🏆', least: '📉', well: '👍', so: '💯',
    just: '👌', still: '⏸️', already: '✅', yet: '⏳', again: '🔄',
    then: '➡️', soon: '🔜', always: '💯', usually: '✅',
    often: '🔄', sometimes: '🤔', never: '❌',
    right: '➡️', left: '⬅️', straight: '⬆️',
    let: '👫', say: '🗣️', tell: '🗣️', speak: '🗣️',
    talk: '🗣️', ask: '❓', show: '👀', try: '💪', use: '🔧',
    find: '🔍', keep: '🔒', bring: '🤲', hold: '✊', carry: '🏋️',
    place: '📍', room: '🏠', thing: '📦', world: '🌍',
    address: '📮', future: '🔮', language: '🗣️',
    travel: '✈️', work: '💼', present: '🎁',
    understand: '💡', join: '🤝',
    country: '🌍',
    side: '↔️', end: '🏁',
    part: '🧩', group: '👥', problem: '❓', idea: '💡',
    example: '📝', reason: '💡', step: '👣',
    list: '📝', rule: '📏', piece: '🧩', pair: '👫',
    set: '📦', level: '📊', area: '🗺️',
    center: '🎯', top: '⬆️', bottom: '⬇️', middle: '↔️',
    front: '⬆️', corner: '📐', edge: '📐', ground: '🌍',
    floor: '🏠', wall: '🏠', ceiling: '🏠', space: '🚀',
    shape: '🔷', size: '📏',
    path: '🛤️', mistake: '❌',
    joke: '😂', trick: '🃏',
    direction: '🧭', distance: '📏',
    weight: '⚖️', height: '📏', age: '📅', price: '💰',
    collection: '📦', hobby: '🎨', habit: '🔄', routine: '📋',
    planet: '🌍', continent: '🗺️', surface: '🔄',
    neighborhood: '🏘️', community: '🤝', tradition: '🏮', ceremony: '🎊',
    certificate: '📜',
    recipe: '📋', ingredient: '🧂', measurement: '📏',
    // ============================================================
    // Shapes & Math - 形状与数学
    // ============================================================
    circle: '⭕', square: '⬜', triangle: '🔺',
    rectangle: '🟦', oval: '🥚',
    arrow: '➡️', dot: '⚫', curve: '〰️',
    times: '✖️', divide: '➗', equal: '🟰',
    hexagon: '⬡', pentagon: '⬠', crescent: '🌙',
    // ============================================================
    // Household & Daily Life - 家居生活
    // ============================================================
    curtain: '🪟', carpet: '🏠', rug: '🏠',
    drawer: '🗄️', shelf: '📚', wardrobe: '🚪', closet: '🚪',
    faucet: '🚰', sink: '🚰', bathtub: '🛁',
    shower: '🚿', mat: '🏠',
    frame: '🖼️', painting: '🖼️', poster: '🖼️',
    switch: '🔌', plug: '🔌', wire: '🔌', remote: '📱',
    calendar: '📅', thermometer: '🌡️',
    cabinet: '🗄️', hinge: '🚪', handle: '🚪', knob: '🔘',
    // ============================================================
    // Vehicles & Transport - 交通工具
    // ============================================================
    ambulance: '🚑', firetruck: '🚒', policecar: '🚓',
    submarine: '🚢', spaceship: '🚀', canoe: '🛶',
    ferry: '⛴️', tram: '🚊', carriage: '🚃',
    jeep: '🚙', SUV: '🚙', tricycle: '🛺', rickshaw: '🛺',
    // ============================================================
    // Technology & Media - 科技媒体
    // ============================================================
    internet: '🌐', website: '🌐', email: '📧', password: '🔑',
    screen: '🖥️',
    video: '📹', movie: '🎬', song: '🎵', cartoon: '📺',
    channel: '📺', program: '📺', app: '📱',
    code: '💻', data: '💾', file: '📁', download: '📥', upload: '⬆️',
    // ============================================================
    // Descriptive Words - 描述词
    // ============================================================
    flat: '📏', pointed: '🔺', curved: '〰️',
    bent: '↩️', crooked: '〰️', tiny: '🤏',
    huge: '🤩', enormous: '🤩', little: '🤏',
    handsome: '😎', pretty: '💗',
    delicious: '😋', tasty: '😋', yummy: '😋', awful: '👎',
    amazing: '🌟', fantastic: '✨', terrible: '😡', horrible: '😱',
    excellent: '🌟', perfect: '💯',
    brave: '🦁', curious: '🧐', gentle: '🤗', fierce: '😈',
    fluffy: '🧸', fuzzy: '🧶', shiny: '✨', sparkling: '💫',
    // ============================================================
    // Abstract & Concepts - 抽象概念
    // ============================================================
    dream: '💭', wish: '🌟', hope: '🌈', luck: '🍀',
    peace: '☮️', power: '💪', energy: '⚡', speed: '💨',
    truth: '⚖️', secret: '🤫', mystery: '🔮', adventure: '🗺️',
    journey: '🧳', treasure: '💎', challenge: '🏔️', freedom: '🕊️',
    nature: '🌿', life: '🌱', death: '💀',
    wisdom: '🦉', knowledge: '📚', memory: '🧠', imagination: '💭',
    friendship: '🤝', happiness: '😊', sadness: '😢', anger: '😠',
    respect: '🙏', honesty: '⚖️', patience: '⏳', gratitude: '🙏',
    creativity: '🎨', fairness: '⚖️', responsibility: '📋', kindness: '💝',
};
/**
 * Multi-strategy icon lookup:
 * 1. Direct match (lowercase, spaces removed)
 * 2. Hyphenated match (spaces -> hyphens)
 * 3. Partial match (each word in multi-word phrase)
 * 4. Contains match (if word contains key or key contains word)
 * 5. Fallback: return { icon: "📝", matched: false }
 */
function getIconForWord(word) {
    if (!word || word.trim().length === 0) {
        return { icon: '📝', matched: false };
    }
    const lowerWord = word.toLowerCase().replace(/\s+/g, '');
    // Strategy 1: Direct match
    if (wordEmojiMap[lowerWord]) {
        return { icon: wordEmojiMap[lowerWord], matched: true };
    }
    // Strategy 2: Hyphenated match
    const lowerWordWithHyphens = word.toLowerCase().replace(/\s+/g, '-');
    if (wordEmojiMap[lowerWordWithHyphens]) {
        return { icon: wordEmojiMap[lowerWordWithHyphens], matched: true };
    }
    // Strategy 3: Partial match (each word in multi-word phrase)
    const words = word.toLowerCase().split(/\s+/);
    for (const w of words) {
        if (wordEmojiMap[w]) {
            return { icon: wordEmojiMap[w], matched: true };
        }
    }
    // Strategy 4: Contains match
    for (const [key, icon] of Object.entries(wordEmojiMap)) {
        if (lowerWord.includes(key) || key.includes(lowerWord)) {
            return { icon, matched: true };
        }
    }
    // Strategy 5: Fallback
    return { icon: '📝', matched: false };
}
/**
 * Async word-to-icon lookup (backward compatible)
 * @param word 单词
 * @returns 图标数组（emoji）
 */
function fetchWordImages(word) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!word || word.trim().length === 0) {
            return [];
        }
        const { icon, matched } = getIconForWord(word);
        if (matched) {
            return [`emoji:${icon}`];
        }
        return [];
    });
}
//# sourceMappingURL=image.js.map