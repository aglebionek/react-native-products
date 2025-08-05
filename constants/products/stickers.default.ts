import { Sticker } from "@/@types";

const defaultStickers: Sticker[] = [
  // ALIEN STAGE
  { id: 'as_sticker_hyuna', name: "Hyuna", keywords: ['hyuna', 'alien', 'stage'], quantity: 1, holo: false},
  { id: 'as_sticker_ivan', name: "Ivan", keywords: ['ivan', 'alien', 'stage'], quantity: 1, holo: false},
  { id: 'as_sticker_luka', name: "Luka", keywords: ['luka', 'alien', 'stage'], quantity: 1, holo: false},
  { id: 'as_sticker_mizi', name: "Mizi", keywords: ['mizi', 'alien', 'stage'], quantity: 1, holo: false},
  { id: 'as_sticker_sua', name: "Sua", keywords: ['sua', 'alien', 'stage'], quantity: 1, holo: false},
  { id: 'as_sticker_till', name: "Till", keywords: ['till', 'alien', 'stage'], quantity: 1, holo: false},

  // CASTLEVANIA
  { id: 'cas_sticker_alucard', name: "Alucard", keywords: ['alucard', 'castlevania'], quantity: 1, holo: false},
  { id: 'cas_sticker_sypha', name: "Sypha", keywords: ['sypha', 'castlevania'], quantity: 1, holo: false},
  { id: 'cas_sticker_sypha_holo', name: "Sypha Holo", keywords: ['sypha', 'castlevania', 'holo'], quantity: 1, holo: true},
  { id: 'cas_sticker_trevor', name: "Trevor", keywords: ['trevor', 'castlevania'], quantity: 1, holo: false},

  // FIVE NIGHTS AT FREDDY'S
  { id: 'fnaf_sticker_freddy', name: "Freddy", keywords: ['fnaf', 'freddy'], quantity: 1, holo: false},
  { id: 'fnaf_sticker_bonnie', name: "Bonnie", keywords: ['fnaf', 'bonnie'], quantity: 1, holo: false},
  { id: 'fnaf_sticker_chica', name: "Chica", keywords: ['fnaf', 'chica'], quantity: 1, holo: false},
  { id: 'fnaf_sticker_foxy', name: "Foxy", keywords: ['fnaf', 'foxy'], quantity: 1, holo: false},
  { id: 'fnaf_sticker_golden_freddy', name: "Golden Freddy", keywords: ['fnaf', 'golden', 'freddy'], quantity: 1, holo: false},

  // GENSHIN IMPACT
  { id: 'gi_sticker_cat_venti', name: "Cat Venti", keywords: ['venti', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_cat_venti_holo', name: "Cat Venti Holo", keywords: ['venti', 'genshin', 'holo'], quantity: 1, holo: true},
  { id: 'gi_sticker_cat_zhongli', name: "Cat Zhongli", keywords: ['zhongli', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_cat_zhongli_holo', name: "Cat Zhongli Holo", keywords: ['zhongli', 'genshin', 'holo'], quantity: 1, holo: true},
  { id: 'gi_sticker_cat_raiden', name: "Cat Raiden", keywords: ['raiden', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_cat_raiden_holo', name: "Cat Raiden Holo", keywords: ['raiden', 'genshin', 'holo'], quantity: 1, holo: true},
  { id: 'gi_sticker_cat_nahida', name: "Cat Nahida", keywords: ['nahida', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_cat_nahida_holo', name: "Cat Nahida Holo", keywords: ['nahida', 'genshin', 'holo'], quantity: 1, holo: true},
  { id: 'gi_sticker_cat_furina', name: "Cat Furina", keywords: ['furina', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_cat_furina_holo', name: "Cat Furina Holo", keywords: ['furina', 'genshin', 'holo'], quantity: 1, holo: true},
  { id: 'gi_sticker_cat_mauvika', name: "Cat Mauvika", keywords: ['mauvika', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_albedo', name: "Albedo", keywords: ['albedo', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_childe', name: "Childe", keywords: ['childe', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_gorou', name: "Gorou", keywords: ['gorou', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_kokomi', name: "Kokomi", keywords: ['kokomi', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_raiden', name: "Raiden", keywords: ['raiden', 'genshin'], quantity: 1, holo: false},
  { id: 'gi_sticker_yae', name: "Yae", keywords: ['yae', 'genshin'], quantity: 1, holo: false},

  // HONKAI STAR RAIL
  { id: 'hsr_sticker_anaxa', name: "Anaxa", keywords: ['anaxa', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_argenti', name: "Argenti", keywords: ['argenti', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_aventurine', name: "Aventurine", keywords: ['aventurine', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_blade', name: "Blade", keywords: ['blade', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_boothill', name: "Boothill", keywords: ['boothill', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_cipher', name: "Cipher", keywords: ['cipher', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_herta', name: "Herta", keywords: ['herta', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_jiaqiu', name: "Jiaqiu", keywords: ['jiaqiu', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_kafka', name: "Kafka", keywords: ['kafka', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_moze', name: "Moze", keywords: ['moze', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_ratio', name: "Ratio", keywords: ['ratio', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_reca', name: "Reca", keywords: ['reca', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_robin', name: "Robin", keywords: ['robin', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_sunday', name: "Sunday", keywords: ['sunday', 'honkai'], quantity: 1, holo: false},
  { id: 'hsr_sticker_topaz', name: "Topaz", keywords: ['topaz', 'honkai'], quantity: 1, holo: false},

  // HUNTIK
  { id: 'huntik_sticker_lok', name: "Lok", keywords: ['lok', 'huntik'], quantity: 1, holo: false},
  { id: 'huntik_sticker_zhalia', name: "Zhalia", keywords: ['zhalia', 'huntik'], quantity: 1, holo: false},
  { id: 'huntik_sticker_dante', name: "Dante", keywords: ['dante', 'huntik'], quantity: 1, holo: false},
  { id: 'huntik_sticker_cherit', name: "Cherit", keywords: ['cherit', 'huntik'], quantity: 1, holo: false},
  { id: 'huntik_sticker_sophie', name: "Sophie", keywords: ['sophie', 'huntik'], quantity: 1, holo: false},

  // IB, OFF
  { id: 'ib_sticker_ib', name: "Ib", keywords: ['ib'], quantity: 1, holo: false},
  { id: 'ib_sticker_mary', name: "Mary", keywords: ['mary', 'ib'], quantity: 1, holo: false},
  { id: 'ib_sticker_garry', name: "Garry", keywords: ['garry', 'ib'], quantity: 1, holo: false},
  { id: 'ib_sticker_batter', name: "Batter", keywords: ['batter', 'off'], quantity: 1, holo: false},
  { id: 'ib_sticker_zachary', name: "Zachary", keywords: ['zachary', 'off'], quantity: 1, holo: false},

  // LEAGUE OF LEGENDS
  { id: 'lol_sticker_baron', name: "Baron", keywords: ["lol", "baron"], quantity: 1, holo: false},
  { id: 'lol_sticker_crab', name: "Crab", keywords: ["lol", "crab"], quantity: 1, holo: false},
  { id: 'lol_sticker_hwei', name: "Hwei", keywords: ["lol", "hwei"], quantity: 1, holo: false},
  { id: 'lol_sticker_jhin', name: "Jhin", keywords: ["lol", "jhin"], quantity: 1, holo: false},
  { id: 'lol_sticker_mordekaiser', name: "Mordekaiser", keywords: ["lol", "mordekaiser"], quantity: 1, holo: false},
  { id: 'lol_sticker_naafiri', name: "Naafiri", keywords: ["lol", "naafiri"], quantity: 1, holo: false},
  { id: 'lol_sticker_pyke', name: "Pyke", keywords: ["lol", "pyke"], quantity: 1, holo: false},
  { id: 'lol_sticker_rakan', name: "Rakan", keywords: ["lol", "rakan"], quantity: 1, holo: false},
  { id: 'lol_sticker_swain', name: "Swain", keywords: ["lol", "swain"], quantity: 1, holo: false},
  { id: 'lol_sticker_warwick', name: "Warwick", keywords: ["lol", "warwick"], quantity: 1, holo: false},
  { id: 'lol_sticker_xayah', name: "Xayah", keywords: ["lol", "xayah"], quantity: 1, holo: false},
  { id: 'lol_sticker_ba_ezreal', name: "BA Ezreal", keywords: ["lol", "ezreal"], quantity: 1, holo: false},
  { id: 'lol_sticker_ba_katarina', name: "BA Katarina", keywords: ["lol", "katarina"], quantity: 1, holo: false},
  { id: 'lol_sticker_ba_jayce', name: "BA Jayce", keywords: ["lol", "jayce"], quantity: 1, holo: false},
  { id: 'lol_sticker_ba_lux', name: "BA Lux", keywords: ["lol", "lux"], quantity: 1, holo: false},
  { id: 'lol_sticker_ba_yuumi', name: "BA Yuumi", keywords: ["lol", "yumi"], quantity: 1, holo: false},

  // MONSTER HIGH
  { id: 'mh_sticker_frankie', name: "Frankie", keywords: ['frankie', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { id: 'mh_sticker_clawdeen', name: "Clawdeen", keywords: ['clawdeen', 'wolf', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { id: 'mh_sticker_draculaura', name: "Draculaura", keywords: ['draculaura', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { id: 'mh_sticker_cleo', name: "Cleo", keywords: ['cleo', 'monster', 'high', 'mh'], quantity: 1, holo: false},
  { id: 'mh_sticker_lagoona', name: "Lagoona", keywords: ['lagoona', 'monster', 'high', 'mh'], quantity: 1, holo: false},

  // MY LITTLE PONY
  { id: 'mlp_sticker_twilight', name: "Twilight", keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { id: 'mlp_sticker_pinkie', name: "Pinkie", keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { id: 'mlp_sticker_rarity', name: "Rarity", keywords: ['rarity', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { id: 'mlp_sticker_fluttershy', name: "Fluttershy", keywords: ['fluttershy', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { id: 'mlp_sticker_applejack', name: "Applejack", keywords: ['applejack', 'mlp', 'kucyki'], quantity: 1, holo: false},
  { id: 'mlp_sticker_rainbow_dash', name: "Rainbow Dash", keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], quantity: 1, holo: false},

  // SONIC
  { id: 'sonic_sticker_sonic', name: "Sonic", keywords: ["sonic"], quantity: 1, holo: false},
  { id: 'sonic_sticker_shadow', name: "Shadow", keywords: ["sonic", "shadow"], quantity: 1, holo: false},
  { id: 'sonic_sticker_tails', name: "Tails", keywords: ["sonic", "tails"], quantity: 1, holo: false},
  { id: 'sonic_sticker_knuckles', name: "Knuckles", keywords: ["sonic", "knuckles"], quantity: 1, holo: false},
  { id: 'sonic_sticker_amy', name: "Amy", keywords: ["sonic", "amy"], quantity: 1, holo: false},

  // ZODIAKARY
  { id: 'zodiac_sticker_panna', name: "Panna", keywords: ["zodiakary", "panna", "virgo"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_waga', name: "Waga", keywords: ["zodiakary", "waga", "libra"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_skorpion', name: "Skorpion", keywords: ["zodiakary", "skorpion", "scorpio"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_strzelec', name: "Strzelec", keywords: ["zodiakary", "strzelec", "sagittarius"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_koziorozec', name: "Koziorożec", keywords: ["zodiakary", "koziorożec", "capricorn"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_wodnik', name: "Wodnik", keywords: ["zodiakary", "wodnik", "aquarius"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_ryby', name: "Ryby", keywords: ["zodiakary", "ryby", "pisces"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_baran', name: "Baran", keywords: ["zodiakary", "baran", "aries"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_byk', name: "Byk", keywords: ["zodiakary", "byk", "taurus"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_bliznieta', name: "Bliźnięta", keywords: ["zodiakary", "bliźnięta", "gemini"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_rak', name: "Rak", keywords: ["zodiakary", "rak", "cancer"], quantity: 1, holo: false},
  { id: 'zodiac_sticker_lew', name: "Lew", keywords: ["zodiakary", "lew", "leo"], quantity: 1, holo: false},
]

export default defaultStickers;