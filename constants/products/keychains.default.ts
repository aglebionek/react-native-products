import { Keychain, PRODUCT_TYPE } from "@/@types";

const defaultKeychains: Keychain[] = [
  // COFFIN OF ANDY AND LEYLEY
  { name: "Coffin", keywords: ['coffin', 'andy', 'leyley'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },

  // LEAGUE OF LEGENDS
  { name: "Crab", keywords: ['crab', 'lol'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Poro", keywords: ['poro', 'lol'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },

  // MY LITTLE PONY
  { name: "Twilight", keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Pinkie", keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Rarity", keywords: ['rarity', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Fluttershy", keywords: ['fluttershy', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Applejack", keywords: ['applejack', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },
  { name: "Rainbow Dash", keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.KEYCHAIN },

];

export default defaultKeychains;