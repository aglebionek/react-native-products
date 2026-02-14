import { Keychain, PRODUCT_TYPE } from "@/@types";

const defaultKeychains: Keychain[] = [
  // INDIE
  { name: "Coffin", keywords: ['coffin', 'andy', 'leyley'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Kcalb", keywords: ["kcalb", "gray", "garden"], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Eithw", keywords: ["eithw", "gray", "garden"], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Ib", keywords: ['ib', 'ib'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Gary", keywords: ['gary', 'ib'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Mary", keywords: ['mary', 'ib'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Alice", keywords: ['alice', 'mare'], stock: 6, type: PRODUCT_TYPE.KEYCHAIN },

  // GENSHIN IMPACT
  { name: "Cat Venti", keywords: ['venti', 'genshin', 'impact'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Cat Zhongli", keywords: ['zhongli', 'genshin', 'impact'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Cat Raiden", keywords: ['raiden', 'shogun', 'genshin', 'impact'], stock: 4, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Cat Nahida", keywords: ['nahida', 'genshin', 'impact'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Cat Furina", keywords: ['furina', 'genshin', 'impact'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Cat Mauvika", keywords: ['mauvika', 'genshin', 'impact'], stock: 4, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Cat Columbina", keywords: ['columbina', 'genshin', 'impact'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },

  // HOMESTUCK
  { name: "Aradia", keywords: ['aradia', 'homestuck'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Tavros", keywords: ['tavros', 'homestuck'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Sollux", keywords: ['sollux', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Karkat", keywords: ['karkat', 'homestuck'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Nepeta", keywords: ['nepeta', 'homestuck'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Kanaya", keywords: ['kanaya', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Terezi", keywords: ['terezi', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Vriska", keywords: ['vriska', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Equius", keywords: ['equius', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Gamzee", keywords: ['gamzee', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Eridan", keywords: ['eridan', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Feferi", keywords: ['feferi', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "John", keywords: ['john', 'homestuck'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Dave", keywords: ['dave', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Rose", keywords: ['rose', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Jade", keywords: ['jade', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Jane", keywords: ['jane', 'homestuck'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Dirk", keywords: ['dirk', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Roxy", keywords: ['roxy', 'homestuck'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Jake", keywords: ['jake', 'homestuck'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },

  // LEAGUE OF LEGENDS
  { name: "Crab", keywords: ['crab', 'lol'], stock: 6, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Poro", keywords: ['poro', 'lol'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },

  // MIGHTY NEIN
  { name: "Caleb", keywords: ['caleb', 'mighty', 'nein'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Fjord", keywords: ['fjord', 'mighty', 'nein'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Jester", keywords: ['jester', 'mighty', 'nein'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Molly", keywords: ['molly', 'mighty', 'nein'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },

  // MY LITTLE PONY
  { name: "Twilight", keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], stock: 5, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Pinkie", keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Rarity", keywords: ['rarity', 'mlp', 'kucyki'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Fluttershy", keywords: ['fluttershy', 'mlp', 'kucyki'], stock: 5, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Applejack", keywords: ['applejack', 'mlp', 'kucyki'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Rainbow Dash", keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], stock: 0, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Discord", keywords: ["discord", "mlp", "kucyki"], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Celestia", keywords: ["celestia", "princess", "mlp", "kucyki"], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Luna", keywords: ["luna", "princess", "mlp", "kucyki"], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Cadance", keywords: ["cadance", "princess", "mlp", "kucyki"], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Chrysalis", keywords: ["chrysalis", "mlp", "kucyki"], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },

  // THE MAGNUS ARCHIVES
  { name: "Magnus Gatcha", keywords: ['magnus', 'gatcha', 'tma'], stock: 54, type: PRODUCT_TYPE.KEYCHAIN },

  // SONIC
  { name: "Sonic", keywords: ['sonic', 'hedgehog'], stock: 2, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Shadow", keywords: ['shadow', 'sonic'], stock: 5, type: PRODUCT_TYPE.KEYCHAIN },
];

export default defaultKeychains;