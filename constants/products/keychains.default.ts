import { Keychain, PRODUCT_TYPE } from "@/@types";

const defaultKeychains: Keychain[] = [
  // COFFIN OF ANDY AND LEYLEY
  { name: "Coffin", keywords: ['coffin', 'andy', 'leyley'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },

  // LEAGUE OF LEGENDS
  { name: "Crab", keywords: ['crab', 'lol'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },
  { name: "Poro", keywords: ['poro', 'lol'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },

  // MY LITTLE PONY
  { name: "Twilight", keywords: ['twilight', 'sparkle', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },
  { name: "Pinkie", keywords: ['pinkie', 'pie', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },
  { name: "Rarity", keywords: ['rarity', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },
  { name: "Fluttershy", keywords: ['fluttershy', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },
  { name: "Applejack", keywords: ['applejack', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },
  { name: "Rainbow Dash", keywords: ['rainbow', 'dash', 'mlp', 'kucyki'], stock: 1, type: PRODUCT_TYPE.BRELOCZEK },

];

export default defaultKeychains;