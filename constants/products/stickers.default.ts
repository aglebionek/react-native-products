import { Sticker, PRODUCT_TYPE } from "@/@types";

const defaultStickers: Sticker[] = [
  // ALIEN STAGE
  { name: "Hyuna", keywords: ['hyuna', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Ivan", keywords: ['ivan', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Luka", keywords: ['luka', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Mizi", keywords: ['mizi', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Sua", keywords: ['sua', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Till", keywords: ['till', 'alien', 'stage'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // CASTLEVANIA
  { name: "Alucard", keywords: ['alucard', 'castlevania'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Sypha", keywords: ['sypha', 'castlevania'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Sypha Holo", keywords: ['sypha', 'castlevania', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Trevor", keywords: ['trevor', 'castlevania'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // FIVE NIGHTS AT FREDDY'S
  { name: "Freddy", keywords: ['fnaf', 'freddy'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Bonnie", keywords: ['fnaf', 'bonnie'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Chica", keywords: ['fnaf', 'chica'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Foxy", keywords: ['fnaf', 'foxy'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Golden Freddy", keywords: ['fnaf', 'golden', 'freddy'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // GENSHIN IMPACT
  { name: "Cat Venti", keywords: ['venti', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Venti Holo", keywords: ['venti', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Zhongli", keywords: ['zhongli', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Zhongli Holo", keywords: ['zhongli', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Raiden", keywords: ['raiden', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Raiden Holo", keywords: ['raiden', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Nahida", keywords: ['nahida', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Nahida Holo", keywords: ['nahida', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Furina", keywords: ['furina', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Furina Holo", keywords: ['furina', 'genshin', 'holo'], stock: 1, holo: true, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cat Mauvika", keywords: ['mauvika', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Albedo", keywords: ['albedo', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Childe", keywords: ['childe', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Gorou", keywords: ['gorou', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Kokomi", keywords: ['kokomi', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Raiden", keywords: ['raiden', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Yae", keywords: ['yae', 'genshin'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // HONKAI STAR RAIL
  { name: "Anaxa", keywords: ['anaxa', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Argenti", keywords: ['argenti', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Aventurine", keywords: ['aventurine', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Blade", keywords: ['blade', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Boothill", keywords: ['boothill', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cipher", keywords: ['cipher', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Herta", keywords: ['herta', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Jiaqiu", keywords: ['jiaqiu', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Kafka", keywords: ['kafka', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Moze", keywords: ['moze', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Ratio", keywords: ['ratio', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Reca", keywords: ['reca', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Robin", keywords: ['robin', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Sunday", keywords: ['sunday', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Topaz", keywords: ['topaz', 'honkai'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // HUNTIK
  { name: "Lok", keywords: ['lok', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Zhalia", keywords: ['zhalia', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Dante", keywords: ['dante', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cherit", keywords: ['cherit', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Sophie", keywords: ['sophie', 'huntik'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // IB, OFF
  { name: "Ib", keywords: ['ib'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Mary", keywords: ['mary', 'ib'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Garry", keywords: ['garry', 'ib'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Batter", keywords: ['batter', 'off'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Zachary", keywords: ['zachary', 'off'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // LEAGUE OF LEGENDS
  { name: "Baron", keywords: ["lol", "baron"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Crab", keywords: ["lol", "crab"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Hwei", keywords: ["lol", "hwei"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Jhin", keywords: ["lol", "jhin"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Mordekaiser", keywords: ["lol", "mordekaiser"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Naafiri", keywords: ["lol", "naafiri"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Pyke", keywords: ["lol", "pyke"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Rakan", keywords: ["lol", "rakan"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Swain", keywords: ["lol", "swain"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Warwick", keywords: ["lol", "warwick"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Xayah", keywords: ["lol", "xayah"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "BA Ezreal", keywords: ["lol", "ezreal"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "BA Katarina", keywords: ["lol", "katarina"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "BA Jayce", keywords: ["lol", "jayce"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "BA Lux", keywords: ["lol", "lux"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "BA Yuumi", keywords: ["lol", "yumi"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // MONSTER HIGH
  { name: "Frankie", keywords: ['frankie', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Clawdeen", keywords: ['clawdeen', 'wolf', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Draculaura", keywords: ['draculaura', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Cleo", keywords: ['cleo', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Lagoona", keywords: ['lagoona', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // MY LITTLE PONY
  { name: "Twilight", keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Pinkie", keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Rarity", keywords: ['rarity', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Fluttershy", keywords: ['fluttershy', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Applejack", keywords: ['applejack', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Rainbow Dash", keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // SONIC
  { name: "Sonic", keywords: ["sonic"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Shadow", keywords: ["sonic", "shadow"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Tails", keywords: ["sonic", "tails"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Knuckles", keywords: ["sonic", "knuckles"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Amy", keywords: ["sonic", "amy"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },

  // ZODIAKARY
  { name: "Panna", keywords: ["zodiakary", "panna", "virgo"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Waga", keywords: ["zodiakary", "waga", "libra"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Skorpion", keywords: ["zodiakary", "skorpion", "scorpio"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Strzelec", keywords: ["zodiakary", "strzelec", "sagittarius"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Koziorożec", keywords: ["zodiakary", "koziorożec", "capricorn"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Wodnik", keywords: ["zodiakary", "wodnik", "aquarius"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Ryby", keywords: ["zodiakary", "ryby", "pisces"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Baran", keywords: ["zodiakary", "baran", "aries"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Byk", keywords: ["zodiakary", "byk", "taurus"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Bliźnięta", keywords: ["zodiakary", "bliźnięta", "gemini"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Rak", keywords: ["zodiakary", "rak", "cancer"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
  { name: "Lew", keywords: ["zodiakary", "lew", "leo"], stock: 1, holo: false, type: PRODUCT_TYPE.NAKLEJKA },
]

export default defaultStickers;