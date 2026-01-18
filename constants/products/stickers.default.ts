import { Sticker, PRODUCT_TYPE } from "@/@types";

const defaultStickers: Sticker[] = [
  // ALIEN STAGE
  { name: "Hyuna", keywords: ['hyuna', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ivan", keywords: ['ivan', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Luka", keywords: ['luka', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Mizi", keywords: ['mizi', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sua", keywords: ['sua', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Till", keywords: ['till', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // CASTLEVANIA
  { name: "Alucard", keywords: ['alucard', 'castlevania'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sypha", keywords: ['sypha', 'castlevania'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sypha Holo", keywords: ['sypha', 'castlevania', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.STICKER },
  { name: "Trevor", keywords: ['trevor', 'castlevania'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // FIVE NIGHTS AT FREDDY'S
  { name: "Freddy", keywords: ['fnaf', 'freddy'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Bonnie", keywords: ['fnaf', 'bonnie'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Chica", keywords: ['fnaf', 'chica'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Foxy", keywords: ['fnaf', 'foxy'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Golden Freddy", keywords: ['fnaf', 'golden', 'freddy'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // GENSHIN IMPACT
  { name: "Cat Venti", keywords: ['venti', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Venti Holo", keywords: ['venti', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Zhongli", keywords: ['zhongli', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Zhongli Holo", keywords: ['zhongli', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Raiden", keywords: ['raiden', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Raiden Holo", keywords: ['raiden', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Nahida", keywords: ['nahida', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Nahida Holo", keywords: ['nahida', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Furina", keywords: ['furina', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Furina Holo", keywords: ['furina', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Mauvika", keywords: ['mauvika', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Albedo", keywords: ['albedo', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Childe", keywords: ['childe', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Gorou", keywords: ['gorou', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Kokomi", keywords: ['kokomi', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Raiden", keywords: ['raiden', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Yae", keywords: ['yae', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // HONKAI STAR RAIL
  { name: "Anaxa", keywords: ['anaxa', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Argenti", keywords: ['argenti', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Aventurine", keywords: ['aventurine', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Blade", keywords: ['blade', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Boothill", keywords: ['boothill', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cipher", keywords: ['cipher', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Herta", keywords: ['herta', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jiaqiu", keywords: ['jiaqiu', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Kafka", keywords: ['kafka', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Moze", keywords: ['moze', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ratio", keywords: ['ratio', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Reca", keywords: ['reca', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Robin", keywords: ['robin', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sunday", keywords: ['sunday', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Topaz", keywords: ['topaz', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // HUNTIK
  { name: "Lok", keywords: ['lok', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Zhalia", keywords: ['zhalia', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Dante", keywords: ['dante', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cherit", keywords: ['cherit', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sophie", keywords: ['sophie', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // IB, OFF
  { name: "Ib", keywords: ['ib'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Mary", keywords: ['mary', 'ib'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Garry", keywords: ['garry', 'ib'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Batter", keywords: ['batter', 'off'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Zachary", keywords: ['zachary', 'off'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // LEAGUE OF LEGENDS
  { name: "Baron", keywords: ["lol", "baron"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Crab", keywords: ["lol", "crab"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Hwei", keywords: ["lol", "hwei"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jhin", keywords: ["lol", "jhin"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Mordekaiser", keywords: ["lol", "mordekaiser"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Naafiri", keywords: ["lol", "naafiri"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Pyke", keywords: ["lol", "pyke"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rakan", keywords: ["lol", "rakan"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Swain", keywords: ["lol", "swain"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Warwick", keywords: ["lol", "warwick"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Xayah", keywords: ["lol", "xayah"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "BA Ezreal", keywords: ["lol", "ezreal"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "BA Katarina", keywords: ["lol", "katarina"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "BA Jayce", keywords: ["lol", "jayce"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "BA Lux", keywords: ["lol", "lux"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "BA Yuumi", keywords: ["lol", "yumi"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // MONSTER HIGH
  { name: "Frankie", keywords: ['frankie', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Clawdeen", keywords: ['clawdeen', 'wolf', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Draculaura", keywords: ['draculaura', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cleo", keywords: ['cleo', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Lagoona", keywords: ['lagoona', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // MY LITTLE PONY
  { name: "Twilight", keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Pinkie", keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rarity", keywords: ['rarity', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Fluttershy", keywords: ['fluttershy', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Applejack", keywords: ['applejack', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rainbow Dash", keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // SONIC
  { name: "Sonic", keywords: ["sonic"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Shadow", keywords: ["sonic", "shadow"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Tails", keywords: ["sonic", "tails"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Knuckles", keywords: ["sonic", "knuckles"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Amy", keywords: ["sonic", "amy"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // ZODIAKARY
  { name: "Panna", keywords: ["zodiakary", "panna", "virgo"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Waga", keywords: ["zodiakary", "waga", "libra"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Skorpion", keywords: ["zodiakary", "skorpion", "scorpio"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Strzelec", keywords: ["zodiakary", "strzelec", "sagittarius"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Koziorożec", keywords: ["zodiakary", "koziorożec", "capricorn"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Wodnik", keywords: ["zodiakary", "wodnik", "aquarius"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ryby", keywords: ["zodiakary", "ryby", "pisces"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Baran", keywords: ["zodiakary", "baran", "aries"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Byk", keywords: ["zodiakary", "byk", "taurus"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Bliźnięta", keywords: ["zodiakary", "bliźnięta", "gemini"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rak", keywords: ["zodiakary", "rak", "cancer"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Lew", keywords: ["zodiakary", "lew", "leo"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
]

export default defaultStickers;