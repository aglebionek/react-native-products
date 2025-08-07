import { Sticker } from "@/@types";

// TODO: change quantity to stock
const defaultStickers: Sticker[] = [
  // ALIEN STAGE
  { name: "Hyuna", keywords: ['hyuna', 'alien', 'stage'], quantity: 1, holo: false},
  { name: "Ivan", keywords: ['ivan', 'alien', 'stage'], quantity: 1, holo: false},
  { name: "Luka", keywords: ['luka', 'alien', 'stage'], quantity: 1, holo: false},
  { name: "Mizi", keywords: ['mizi', 'alien', 'stage'], quantity: 1, holo: false},
  { name: "Sua", keywords: ['sua', 'alien', 'stage'], quantity: 1, holo: false},
  { name: "Till", keywords: ['till', 'alien', 'stage'], quantity: 1, holo: false},

  // CASTLEVANIA
  { name: "Alucard", keywords: ['alucard', 'castlevania'], quantity: 1, holo: false},
  { name: "Sypha", keywords: ['sypha', 'castlevania'], quantity: 1, holo: false},
  { name: "Sypha Holo", keywords: ['sypha', 'castlevania', 'holo'], quantity: 1, holo: true},
  { name: "Trevor", keywords: ['trevor', 'castlevania'], quantity: 1, holo: false},

  // FIVE NIGHTS AT FREDDY'S
  { name: "Freddy", keywords: ['fnaf', 'freddy'], quantity: 1, holo: false},
  { name: "Bonnie", keywords: ['fnaf', 'bonnie'], quantity: 1, holo: false},
  { name: "Chica", keywords: ['fnaf', 'chica'], quantity: 1, holo: false},
  { name: "Foxy", keywords: ['fnaf', 'foxy'], quantity: 1, holo: false},
  { name: "Golden Freddy", keywords: ['fnaf', 'golden', 'freddy'], quantity: 1, holo: false},

  // GENSHIN IMPACT
  { name: "Cat Venti", keywords: ['venti', 'genshin'], quantity: 1, holo: false},
  { name: "Cat Venti Holo", keywords: ['venti', 'genshin', 'holo'], quantity: 1, holo: true},
  { name: "Cat Zhongli", keywords: ['zhongli', 'genshin'], quantity: 1, holo: false},
  { name: "Cat Zhongli Holo", keywords: ['zhongli', 'genshin', 'holo'], quantity: 1, holo: true},
  { name: "Cat Raiden", keywords: ['raiden', 'genshin'], quantity: 1, holo: false},
  { name: "Cat Raiden Holo", keywords: ['raiden', 'genshin', 'holo'], quantity: 1, holo: true},
  { name: "Cat Nahida", keywords: ['nahida', 'genshin'], quantity: 1, holo: false},
  { name: "Cat Nahida Holo", keywords: ['nahida', 'genshin', 'holo'], quantity: 1, holo: true},
  { name: "Cat Furina", keywords: ['furina', 'genshin'], quantity: 1, holo: false},
  { name: "Cat Furina Holo", keywords: ['furina', 'genshin', 'holo'], quantity: 1, holo: true},
  { name: "Cat Mauvika", keywords: ['mauvika', 'genshin'], quantity: 1, holo: false},
  { name: "Albedo", keywords: ['albedo', 'genshin'], quantity: 1, holo: false},
  { name: "Childe", keywords: ['childe', 'genshin'], quantity: 1, holo: false},
  { name: "Gorou", keywords: ['gorou', 'genshin'], quantity: 1, holo: false},
  { name: "Kokomi", keywords: ['kokomi', 'genshin'], quantity: 1, holo: false},
  { name: "Raiden", keywords: ['raiden', 'genshin'], quantity: 1, holo: false},
  { name: "Yae", keywords: ['yae', 'genshin'], quantity: 1, holo: false},

  // HONKAI STAR RAIL
  { name: "Anaxa", keywords: ['anaxa', 'honkai'], quantity: 1, holo: false},
  { name: "Argenti", keywords: ['argenti', 'honkai'], quantity: 1, holo: false},
  { name: "Aventurine", keywords: ['aventurine', 'honkai'], quantity: 1, holo: false},
  { name: "Blade", keywords: ['blade', 'honkai'], quantity: 1, holo: false},
  { name: "Boothill", keywords: ['boothill', 'honkai'], quantity: 1, holo: false},
  { name: "Cipher", keywords: ['cipher', 'honkai'], quantity: 1, holo: false},
  { name: "Herta", keywords: ['herta', 'honkai'], quantity: 1, holo: false},
  { name: "Jiaqiu", keywords: ['jiaqiu', 'honkai'], quantity: 1, holo: false},
  { name: "Kafka", keywords: ['kafka', 'honkai'], quantity: 1, holo: false},
  { name: "Moze", keywords: ['moze', 'honkai'], quantity: 1, holo: false},
  { name: "Ratio", keywords: ['ratio', 'honkai'], quantity: 1, holo: false},
  { name: "Reca", keywords: ['reca', 'honkai'], quantity: 1, holo: false},
  { name: "Robin", keywords: ['robin', 'honkai'], quantity: 1, holo: false},
  { name: "Sunday", keywords: ['sunday', 'honkai'], quantity: 1, holo: false},
  { name: "Topaz", keywords: ['topaz', 'honkai'], quantity: 1, holo: false},

  // HUNTIK
  { name: "Lok", keywords: ['lok', 'huntik'], quantity: 1, holo: false},
  { name: "Zhalia", keywords: ['zhalia', 'huntik'], quantity: 1, holo: false},
  { name: "Dante", keywords: ['dante', 'huntik'], quantity: 1, holo: false},
  { name: "Cherit", keywords: ['cherit', 'huntik'], quantity: 1, holo: false},
  { name: "Sophie", keywords: ['sophie', 'huntik'], quantity: 1, holo: false},

  // IB, OFF
  { name: "Ib", keywords: ['ib'], quantity: 1, holo: false},
  { name: "Mary", keywords: ['mary', 'ib'], quantity: 1, holo: false},
  { name: "Garry", keywords: ['garry', 'ib'], quantity: 1, holo: false},
  { name: "Batter", keywords: ['batter', 'off'], quantity: 1, holo: false},
  { name: "Zachary", keywords: ['zachary', 'off'], quantity: 1, holo: false},

  // LEAGUE OF LEGENDS
  { name: "Baron", keywords: ["lol", "baron"], quantity: 1, holo: false},
  { name: "Crab", keywords: ["lol", "crab"], quantity: 1, holo: false},
  { name: "Hwei", keywords: ["lol", "hwei"], quantity: 1, holo: false},
  { name: "Jhin", keywords: ["lol", "jhin"], quantity: 1, holo: false},
  { name: "Mordekaiser", keywords: ["lol", "mordekaiser"], quantity: 1, holo: false},
  { name: "Naafiri", keywords: ["lol", "naafiri"], quantity: 1, holo: false},
  { name: "Pyke", keywords: ["lol", "pyke"], quantity: 1, holo: false},
  { name: "Rakan", keywords: ["lol", "rakan"], quantity: 1, holo: false},
  { name: "Swain", keywords: ["lol", "swain"], quantity: 1, holo: false},
  { name: "Warwick", keywords: ["lol", "warwick"], quantity: 1, holo: false},
  { name: "Xayah", keywords: ["lol", "xayah"], quantity: 1, holo: false},
  { name: "BA Ezreal", keywords: ["lol", "ezreal"], quantity: 1, holo: false},
  { name: "BA Katarina", keywords: ["lol", "katarina"], quantity: 1, holo: false},
  { name: "BA Jayce", keywords: ["lol", "jayce"], quantity: 1, holo: false},
  { name: "BA Lux", keywords: ["lol", "lux"], quantity: 1, holo: false},
  { name: "BA Yuumi", keywords: ["lol", "yumi"], quantity: 1, holo: false},

  // MONSTER HIGH
  { name: "Frankie", keywords: ['frankie', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { name: "Clawdeen", keywords: ['clawdeen', 'wolf', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { name: "Draculaura", keywords: ['draculaura', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { name: "Cleo", keywords: ['cleo', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { name: "Lagoona", keywords: ['lagoona', 'monster', 'high', 'mh'], quantity: 1, holo: false},

  // MY LITTLE PONY
  { name: "Twilight", keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { name: "Pinkie", keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { name: "Rarity", keywords: ['rarity', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { name: "Fluttershy", keywords: ['fluttershy', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { name: "Applejack", keywords: ['applejack', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { name: "Rainbow Dash", keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], quantity: 1, holo: false},

  // SONIC
  { name: "Sonic", keywords: ["sonic"], quantity: 1, holo: false},
  { name: "Shadow", keywords: ["sonic", "shadow"], quantity: 1, holo: false},
  { name: "Tails", keywords: ["sonic", "tails"], quantity: 1, holo: false},
  { name: "Knuckles", keywords: ["sonic", "knuckles"], quantity: 1, holo: false},
  { name: "Amy", keywords: ["sonic", "amy"], quantity: 1, holo: false},

  // ZODIAKARY
  { name: "Panna", keywords: ["zodiakary", "panna", "virgo"], quantity: 1, holo: false},
  { name: "Waga", keywords: ["zodiakary", "waga", "libra"], quantity: 1, holo: false},
  { name: "Skorpion", keywords: ["zodiakary", "skorpion", "scorpio"], quantity: 1, holo: false},
  { name: "Strzelec", keywords: ["zodiakary", "strzelec", "sagittarius"], quantity: 1, holo: false},
  { name: "Koziorożec", keywords: ["zodiakary", "koziorożec", "capricorn"], quantity: 1, holo: false},
  { name: "Wodnik", keywords: ["zodiakary", "wodnik", "aquarius"], quantity: 1, holo: false},
  { name: "Ryby", keywords: ["zodiakary", "ryby", "pisces"], quantity: 1, holo: false},
  { name: "Baran", keywords: ["zodiakary", "baran", "aries"], quantity: 1, holo: false},
  { name: "Byk", keywords: ["zodiakary", "byk", "taurus"], quantity: 1, holo: false},
  { name: "Bliźnięta", keywords: ["zodiakary", "bliźnięta", "gemini"], quantity: 1, holo: false},
  { name: "Rak", keywords: ["zodiakary", "rak", "cancer"], quantity: 1, holo: false},
  { name: "Lew", keywords: ["zodiakary", "lew", "leo"], quantity: 1, holo: false},
]

export default defaultStickers;