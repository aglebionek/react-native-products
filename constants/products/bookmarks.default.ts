import { Bookmark, PRODUCT_TYPE } from "@/@types";


const defaultBookmarks: Bookmark[] = [
    // HONKAI STAR RAIL
    { name: "Sparkle", keywords: ['sparkle', 'honkai', 'hsr'], stock: 1, type: PRODUCT_TYPE.BOOKMARK },

    // LEAGUE OF LEGENDS
    { name: "Xayah", keywords: ['xayah', 'lol'], stock: 1, type: PRODUCT_TYPE.BOOKMARK },
    { name: "Rakan", keywords: ['rakan', 'lol'], stock: 1, type: PRODUCT_TYPE.BOOKMARK },

    // OC
    { name: "Chattur", keywords: ['chattur', 'oc'], stock: 1, type: PRODUCT_TYPE.BOOKMARK },
    { name: "Mano", keywords: ['mano', 'oc'], stock: 1, type: PRODUCT_TYPE.BOOKMARK },
];

export default defaultBookmarks;