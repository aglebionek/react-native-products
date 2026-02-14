import { Sticker, PRODUCT_TYPE } from "@/@types";

const defaultStickers: Sticker[] = [
  // ALIEN STAGE
  { name: "Hyuna", keywords: ['hyuna', 'alien', 'stage'], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ivan", keywords: ['ivan', 'alien', 'stage'], stock: 26, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Luka", keywords: ['luka', 'alien', 'stage'], stock: 4, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Mizi", keywords: ['mizi', 'alien', 'stage'], stock: 19, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sua", keywords: ['sua', 'alien', 'stage'], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Till", keywords: ['till', 'alien', 'stage'], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },

  // CASTLEVANIA
  { name: "Alucard", keywords: ['alucard', 'castlevania'], stock: 21, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sypha", keywords: ['sypha', 'castlevania'], stock: 0, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Trevor", keywords: ['trevor', 'castlevania'], stock: 6, holo: false, type: PRODUCT_TYPE.STICKER },

  // FIVE NIGHTS AT FREDDY'S
  { name: "Freddy", keywords: ['fnaf', 'freddy'], stock: 28, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Bonnie", keywords: ['fnaf', 'bonnie'], stock: 16, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Chica", keywords: ['fnaf', 'chica'], stock: 7, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Foxy", keywords: ['fnaf', 'foxy'], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Golden Freddy", keywords: ['fnaf', 'golden', 'freddy'], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },

  // GENSHIN IMPACT
  { name: "Cat Venti", keywords: ['venti', 'genshin'], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Zhongli", keywords: ['zhongli', 'genshin'], stock: 5, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Raiden", keywords: ['raiden', 'genshin'], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Nahida", keywords: ['nahida', 'genshin'], stock: 16, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Furina", keywords: ['furina', 'genshin'], stock: 20, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Mauvika", keywords: ['mauvika', 'genshin'], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cat Columbina", keywords: ['columbina', 'genshin'], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },

  // HOMESTUCK
  { name: "Aradia", keywords: ["aradia", "homestuck"], stock: 25, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Tavros", keywords: ["tavros", "homestuck"], stock: 25, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sollux", keywords: ["sollux", "homestuck"], stock: 16, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Karkat", keywords: ["karkat", "homestuck"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Napeta", keywords: ["nepeta", "homestuck"], stock: 7, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Kanaya", keywords: ["kanaya", "homestuck"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Terezi", keywords: ["terezi", "homestuck"], stock: 4, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Vriska", keywords: ["vriska", "homestuck"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Eukuis", keywords: ["equius", "homestuck"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Gamzee", keywords: ["gamzee", "homestuck"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Eridan", keywords: ["eridan", "homestuck"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Feferi", keywords: ["feferi", "homestuck"], stock: 25, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "John", keywords: ["john", "homestuck"], stock: 21, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Dave", keywords: ["dave", "homestuck"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rose", keywords: ["rose", "homestuck"], stock: 23, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jade", keywords: ["jade", "homestuck"], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jane", keywords: ["jane", "homestuck"], stock: 30, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Dirk", keywords: ["dirk", "homestuck"], stock: 31, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Roxy", keywords: ["roxy", "homestuck"], stock: 34, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jake", keywords: ["jake", "homestuck"], stock: 26, holo: false, type: PRODUCT_TYPE.STICKER },

  // HONKAI STAR RAIL
  { name: "Boothill", keywords: ["boothill", "honkai", "hsr"], stock: 23, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Robin", keywords: ["robin", "honkai", "hsr"], stock: 16, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sunday", keywords: ["sunday", "honkai", "hsr"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Reca", keywords: ["reca", "honkai", "hsr"], stock: 16, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ratio", keywords: ["ratio", "honkai", "hsr"], stock: 0, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Aventurine", keywords: ["aventurine", "honkai", "hsr"], stock: 11, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Topaz", keywords: ["topaz", "honkai", "hsr"], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Blade", keywords: ["blade", "honkai", "hsr"], stock: 9, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Kafka", keywords: ["kafka", "honkai", "hsr"], stock: 4, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Herta", keywords: ["herta", "honkai", "hsr"], stock: 21, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Anaxa", keywords: ["anaxa", "honkai", "hsr"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cipher", keywords: ["cipher", "honkai", "hsr"], stock: 19, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Moze", keywords: ["moze", "honkai", "hsr"], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jiaoqiu", keywords: ["jiaoqiu", "honkai", "hsr"], stock: 19, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Evernight", keywords: ["evernight", "honkai", "hsr"], stock: 25, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cyrene", keywords: ["cyrene", "honkai", "hsr"], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sparxie", keywords: ["sparxie", "honkai", "hsr"], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Dhalia", keywords: ["dhalia", "honkai", "hsr"], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },

  // HUNTIK
  { name: "Lok", keywords: ['lok', 'huntik'], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Zhalia", keywords: ['zhalia', 'huntik'], stock: 9, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Dante", keywords: ['dante', 'huntik'], stock: 8, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cherit", keywords: ['cherit', 'huntik'], stock: 3, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sophie", keywords: ['sophie', 'huntik'], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },

  // TEMPORARY GENERAL CATEGORIES
  { name: "HSR General", keywords: ["honkai", "hsr", "general"], stock: 999, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Homestuck General", keywords: ["homestuck", "general"], stock: 999, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "LoL General", keywords: ["lol", "general"], stock: 999, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "MLP General", keywords: ["mlp", "kucyki", "general"], stock: 999, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Misc", keywords: ["misc"], stock: 999, holo: false, type: PRODUCT_TYPE.STICKER },

  // INDIE
  { name: "Andy", keywords: ["andy", "coffin"], stock: 0, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Leyley", keywords: ["leyley", "coffin"], stock: 11, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Aya", keywords: ["aya", "mad", "father"], stock: 2, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Kcalb A", keywords: ["kcalb", "gray", "garden"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Kcalb B", keywords: ["kcalb", "gray", "garden"], stock: 0, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Etihw A", keywords: ["etihw", "gray", "garden"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Etihw B", keywords: ["etihw", "gray", "garden"], stock: 5, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Madotsuki", keywords: ["madotsuki"], stock: 3, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Elen", keywords: ["elen", "witchs", "heart"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Viola", keywords: ["viola", "witchs", "house"], stock: 11, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Batter", keywords: ["batter", "off"], stock: 5, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Zachary", keywords: ["zachary", "off"], stock: 5, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Alice", keywords: ["alice", "mare"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ib", keywords: ["ib"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Mary", keywords: ["mary", "ib"], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Gary", keywords: ["gary", "ib"], stock: 4, holo: false, type: PRODUCT_TYPE.STICKER },

  // LEAGUE OF LEGENDS
  { name: "Twitch", keywords: ["twitch", "lol"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Warwick", keywords: ["warwick", "lol"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Naafiri", keywords: ["naafiri", "lol"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Pyke", keywords: ["pyke", "lol"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rakan", keywords: ["rakan", "lol"], stock: 24, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Xayah", keywords: ["xayah", "lol"], stock: 20, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Swain", keywords: ["swain", "noxus"], stock: 9, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jhin", keywords: ["jhin", "lol"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Hwei", keywords: ["hwei", "lol"], stock: 19, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Nidalee", keywords: ["nidalee", "lol"], stock: 19, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Neeko", keywords: ["neeko", "lol"], stock: 4, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Aphelios", keywords: ["aphelios", "lol"], stock: 29, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ashe", keywords: ["ashe", "lol"], stock: 9, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Sejuani", keywords: ["sejuani", "lol"], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Lissandra", keywords: ["lissandra", "lol"], stock: 5, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Yasuo", keywords: ["yasuo", "lol"], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Yone", keywords: ["yone", "lol"], stock: 22, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Mordekaiser", keywords: ["mordekaiser", "lol"], stock: 9, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Baron", keywords: ["baron", "lol"], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Crab", keywords: ["crab", "lol"], stock: 24, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Poro", keywords: ["poro", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Soraka", keywords: ["soraka", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Seraphine", keywords: ["seraphine", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Aurora", keywords: ["aurora", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Kayn", keywords: ["kayn", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Viego", keywords: ["viego", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ivern", keywords: ["ivern", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Briar", keywords: ["briar", "lol"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },

  // MONSTER HIGH
  { name: "Frankie", keywords: ['frankie', 'monster', 'high', 'mh'], stock: 23, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Clawdeen", keywords: ['clawdeen', 'wolf', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Draculaura", keywords: ['draculaura', 'monster', 'high', 'mh'], stock: 8, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cleo", keywords: ['cleo', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Lagoona", keywords: ['lagoona', 'monster', 'high', 'mh'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // MIGHTY NEIN
  { name: "Caleb", keywords: ['caleb', 'mighty', 'nein'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Fjord", keywords: ['fjord', 'mighty', 'nein'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Jester", keywords: ['jester', 'mighty', 'nein'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Molly", keywords: ['molly', 'mighty', 'nein'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // MY LITTLE PONY
  { name: "Twilight", keywords: ["twilight", "mlp", "kucyki"], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Apple jack", keywords: ["applejack", "mlp", "kucyki"], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rainbow dash", keywords: ["rainbow dash", "mlp", "kucyki"], stock: 6, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Fluttershy", keywords: ["fluttershy", "mlp", "kucyki"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Pinkie pie", keywords: ["pinkie pie", "mlp", "kucyki"], stock: 13, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rarity", keywords: ["rarity", "mlp", "kucyki"], stock: 19, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Discord", keywords: ["discord", "mlp", "kucyki"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Celestia", keywords: ["celestia", "princess", "mlp", "kucyki"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Luna", keywords: ["luna", "princess", "mlp", "kucyki"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Cadance", keywords: ["cadance", "princess", "mlp", "kucyki"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Chrysalis", keywords: ["chrysalis", "mlp", "kucyki"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },

  // SONIC
  { name: "Sonic", keywords: ["sonic"], stock: 23, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Shadow", keywords: ["sonic", "shadow"], stock: 19, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Tails", keywords: ["sonic", "tails"], stock: 8, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Knuckles", keywords: ["sonic", "knuckles"], stock: 9, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Amy", keywords: ["sonic", "amy"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },

  // TBHX
  { name: "X", keywords: ['X', 'tbhx'], stock: 1, holo: false, type: PRODUCT_TYPE.STICKER },

  // VOCALOID
  { name: "Miku", keywords: ['miku', 'hatsune'], stock: 23, holo: false, type: PRODUCT_TYPE.STICKER },

  // ZODIAKARY
  { name: "Baran", keywords: ["zodiakary", "baran", "aries"], stock: 9, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Byk", keywords: ["zodiakary", "byk", "taurus"], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Bliźnięta", keywords: ["zodiakary", "bliźnięta", "gemini"], stock: 24, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Rak", keywords: ["zodiakary", "rak", "cancer"], stock: 10, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Lew", keywords: ["zodiakary", "lew", "leo"], stock: 18, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Panna", keywords: ["zodiakary", "panna", "virgo"], stock: 7, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Waga", keywords: ["zodiakary", "waga", "libra"], stock: 24, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Skorpion", keywords: ["zodiakary", "skorpion", "scorpio"], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Strzelec", keywords: ["zodiakary", "strzelec", "sagittarius"], stock: 14, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Koziorożec", keywords: ["zodiakary", "koziorożec", "capricorn"], stock: 12, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Wodnik", keywords: ["zodiakary", "wodnik", "aquarius"], stock: 15, holo: false, type: PRODUCT_TYPE.STICKER },
  { name: "Ryby", keywords: ["zodiakary", "ryby", "pisces"], stock: 17, holo: false, type: PRODUCT_TYPE.STICKER },
]

export default defaultStickers;