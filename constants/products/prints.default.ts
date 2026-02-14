import { Print, PRODUCT_TYPE } from "@/@types";

const defaultPrints: Print[] = [
  // ALIEN STAGE
  { name: "Hyuna", formats: ['A6', 'A5'], keywords: ['hyuna', 'alien', 'stage'], stock: 3, type: PRODUCT_TYPE.PRINT },
  { name: "Ivan", formats: ['A6', 'A5'], keywords: ['ivan', 'alien', 'stage'], stock: 3, type: PRODUCT_TYPE.PRINT },
  { name: "Luka", formats: ['A6', 'A5'], keywords: ['luka', 'alien', 'stage'], stock: 12, type: PRODUCT_TYPE.PRINT },
  { name: "Mizi", formats: ['A6', 'A5'], keywords: ['mizi', 'alien', 'stage'], stock: 7, type: PRODUCT_TYPE.PRINT },
  { name: "Sua", formats: ['A6', 'A5'], keywords: ['sua', 'alien', 'stage'], stock: 6, type: PRODUCT_TYPE.PRINT },
  { name: "Till", formats: ['A6', 'A5'], keywords: ['till', 'alien', 'stage'], stock: 8, type: PRODUCT_TYPE.PRINT },

  // BALDUR'S GATE 3
  { name: "Astarion", formats: ['A6'], keywords: ['astarion', 'baldur', 'bg3'], stock: 23, type: PRODUCT_TYPE.PRINT },

  // EVE
  { name: "Insomnia", formats: ['A4', 'A5'], keywords: ['insomnia', 'eve'], stock: 13, type: PRODUCT_TYPE.PRINT },
  { name: "Ghost Avenue", formats: ['A4', 'A5'], keywords: ['ghost', 'avenue', 'eve'], stock: 21, type: PRODUCT_TYPE.PRINT },
  { name: "How to Eat Life", formats: ['A4', 'A5'], keywords: ['how', 'to', 'eat', 'life', 'eve'], stock: 16, type: PRODUCT_TYPE.PRINT },
  { name: "Fight Song", formats: ['A4', 'A5'], keywords: ['fight', 'song', 'eve'], stock: 15, type: PRODUCT_TYPE.PRINT },

  // GENSHIN IMPACT
  { name: "Dottore", formats: ['A4', 'A5'], keywords: ['dottore', 'genshin', 'impact'], stock: 29, type: PRODUCT_TYPE.PRINT },
  { name: "Dottore Waifu", formats: ['A4', 'A5'], keywords: ['dottore', 'waifu', 'genshin', 'impact'], stock: 1, type: PRODUCT_TYPE.PRINT },
  { name: "Dottore Dress", formats: ['A5'], keywords: ['dottore', 'dress', 'genshin', 'impact'], stock: 1, type: PRODUCT_TYPE.PRINT },
  { name: "Columbina", formats: ['A4', 'A5'], keywords: ['columbina', 'genshin', 'impact'], stock: 33, type: PRODUCT_TYPE.PRINT },
  { name: "Kuki", formats: ['A6', 'A5'], keywords: ['kuki', 'genshin', 'impact'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Zhongli", formats: ['A6', 'A5'], keywords: ['zhongli', 'genshin', 'impact'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Rerir", formats: ['A4', 'A5'], keywords: ['rerir', 'genshin', 'impact'], stock: 15, type: PRODUCT_TYPE.PRINT },
  { name: "Flins", formats: ['A6', 'A5'], keywords: ['flins', 'genshin', 'impact'], stock: 37, type: PRODUCT_TYPE.PRINT },
  
  // HAZBIN HOTEL
  { name: "Angel Dust", formats: ['A5'], keywords: ['angel', 'dust', 'hazbin', 'hotel'], stock: 18, type: PRODUCT_TYPE.PRINT },

  // HONKAI STAR RAIL
  { name: "Blade", formats: ['A6'], keywords: ['blade', 'honkai', 'hsr'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Sparkle", formats: ['A6'], keywords: ['sparkle', 'honkai', 'hsr'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Boothill", formats: ['A6'], keywords: ['boothill', 'honkai', 'hsr'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Anaxa", formats: ['A6'], keywords: ['anaxa', 'honkai', 'hsr'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Phainon", formats: ['A6', 'A5', 'A4'], keywords: ['phainon', 'honkai', 'hsr'], stock: 23, type: PRODUCT_TYPE.PRINT },
  { name: "Reca", formats: ['A5'], keywords: ['reca', 'honkai', 'hsr'], stock: 10, type: PRODUCT_TYPE.PRINT },

  // IRON LUNG
  { name: "Iron Lung", formats: ['A4', 'A5'], keywords: ['iron', 'lung'], stock: 1, type: PRODUCT_TYPE.PRINT },

  // LEAGUE OF LEGENDS
  { name: "Viktor", formats: ['A6', 'A5', 'A4'], keywords: ['viktor', 'lol'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Rakan", formats: ['A6', 'A5', 'A4'], keywords: ['rakan', 'lol'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Xayah", formats: ['A6', 'A5', 'A4'], keywords: ['xayah', 'lol'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Jhin", formats: ['A6', 'A5', 'A4'], keywords: ['jhin', 'lol'], stock: 0, type: PRODUCT_TYPE.PRINT },

  // MY LITTLE PONY
  { name: "Twilight", formats: ['A6', 'A5'], keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Pinkie", formats: ['A6', 'A5'], keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Rarity", formats: ['A6', 'A5'], keywords: ['rarity', 'mlp', 'kucyki'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Fluttershy", formats: ['A6', 'A5'], keywords: ['fluttershy', 'mlp', 'kucyki'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Applejack", formats: ['A6', 'A5'], keywords: ['applejack', 'mlp', 'kucyki'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Rainbow Dash", formats: ['A6', 'A5'], keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], stock: 0, type: PRODUCT_TYPE.PRINT },

  // OC
  { name: "Chattur Valentine", formats: ['A5'], keywords: ['chattur', 'valentine', 'oc'], stock: 1, type: PRODUCT_TYPE.PRINT },

  // THE MAGNUS ARCHIVES
  { name: "Jonatan Sims Kanapa", formats: ['A6', 'A5', 'A4'], keywords: ['jonatan', 'sims', 'tma', 'kanapa'], stock: 13, type: PRODUCT_TYPE.PRINT },
  { name: "Jonatan Sims", formats: ['A6', 'A5'], keywords: ['jonatan', 'sims', 'tma'], stock: 11, type: PRODUCT_TYPE.PRINT },
  { name: "Martin Blackwood", formats: ['A6', 'A5'], keywords: ['martin', 'blackwood', 'tma'], stock: 10, type: PRODUCT_TYPE.PRINT },
  { name: "Tim Stoker", formats: ['A6', 'A5'], keywords: ['tim', 'stoker', 'tma'], stock: 17, type: PRODUCT_TYPE.PRINT },
  { name: "Elias Bouchard", formats: ['A6', 'A5'], keywords: ['elias', 'bouchard', 'tma'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Michael the Distortion", formats: ['A6', 'A5'], keywords: ['michael', 'distortion', 'tma'], stock: 8, type: PRODUCT_TYPE.PRINT },

  // TO BE HERO X
  { name: "Moon", formats: ['A6', 'A5'], keywords: ['moon', 'tbhx'], stock: 1, type: PRODUCT_TYPE.PRINT },
  { name: "Nice", formats: ['A6', 'A5'], keywords: ['nice', 'tbhx'], stock: 1, type: PRODUCT_TYPE.PRINT },

  // VOCALOIDS
  { name: "Echo", formats: ['A6', 'A5'], keywords: ['echo', 'vocaloid'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Angel Devil", formats: ['A6', 'A5'], keywords: ['angel', 'devil'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Miku", formats: ['A6', 'A5'], keywords: ['miku', 'hatsune', 'vocaloid'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Catgirl Miku", formats: ['A6', 'A5'], keywords: ['catgirl', 'miku', 'hatsune', 'vocaloid'], stock: 0, type: PRODUCT_TYPE.PRINT },
  { name: "Monitoring Miku", formats: ['A6', 'A5'], keywords: ['monitoring', 'miku', 'hatsune', 'vocaloid'], stock: 7, type: PRODUCT_TYPE.PRINT },
  { name: "Marshmallow Miku", formats: ['A6', 'A5'], keywords: ['marshmallow', 'miku', 'hatsune', 'vocaloid'], stock: 35, type: PRODUCT_TYPE.PRINT },
]

export default defaultPrints;
