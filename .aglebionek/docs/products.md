# Products System

Manages the catalogue of sellable items. Products are persisted per-type in the Expo file-system cache and loaded into `ProductsContext` on startup.

## Types (`@types/products/index.ts`)

```ts
enum PRODUCT_TYPE { PRINT = 0, STICKER = 1, KEYCHAIN = 2, PIN = 3, BOOKMARK = 4 }

type PrintFormat = 'A4' | 'A5' | 'A6';
type ProductCategory = 'N' | PrintFormat;  // N = stickers, A4/A5/A6 = prints

type BaseProduct = { name: string; keywords: string[]; stock: number; }

type Print    = BaseProduct & { type: PRODUCT_TYPE.PRINT;    formats: PrintFormat[]; }
type Sticker  = BaseProduct & { type: PRODUCT_TYPE.STICKER;  holo: boolean; }
type Keychain = BaseProduct & { type: PRODUCT_TYPE.KEYCHAIN; }
type Pin      = BaseProduct & { type: PRODUCT_TYPE.PIN; }
type Bookmark = BaseProduct & { type: PRODUCT_TYPE.BOOKMARK; }

type Product = Print | Sticker | Keychain | Pin | Bookmark;
```

> **Note:** `ProductCategory` is used in transactions, not as an exhaustive type map. The full category → products mapping lives in `useTransactionInput` and includes `B` (keychains), `P` (pins), `Z` (bookmarks).

## ProductsContext (`contexts/ProductsContext.tsx`)

Provides per-type arrays and async setters that write through to the cache.

```ts
{
  keychains, setKeychains,
  prints,    setPrints,
  stickers,  setStickers,
  pins,      setPins,
  bookmarks, setBookmarks,
  productsLoaded,        // true once all 5 types have been read from cache
  productsLoadingError,  // set on any cache read failure
}
```

**Initialisation:** On mount, reads each type from its JSON cache file (e.g. `keychains.json`). Falls back to bundled defaults from `constants/products/` if no cache file exists yet.

**Setters** (`setKeychains`, etc.) are async: they update React state immediately and then write the serialised array to cache.

## Product Management (`stories/useManageProducts.tsx`)

Business-logic hook that wraps `ProductsContext` via `useSelectStateAndSetterForProduct`.

```ts
const productManager = useManageProducts();

productManager.getProductByName(name, type)         // → Product | null
productManager.handleAddNewProduct(product)          // → Promise<boolean> (false if name collision)
productManager.handleDeleteProduct(product)          // → Promise<void>
productManager.handleUpdateExistingProduct(old, new) // → Promise<boolean> (false if name collision)
productManager.mutations.handleChangePrintFormat(product, format)  // toggles format in formats[]
productManager.mutations.handleUpdateStockForProduct(product, newStock)
```

Name uniqueness is checked case-insensitively within the same type.

## Helper Hook (`hooks/useSelectStateAndSetterForProduct.ts`)

Maps a `PRODUCT_TYPE` enum value to the correct `[state, setState]` pair from `ProductsContext`. Used internally by `useManageProducts`.

## Default Data (`constants/products/`)

Five files export arrays of products pre-populated with real items. These are used as seed data the first time the app runs (before any cache file exists).

## UI

- **`app/(tabs)/products.tsx`** — search bar + scrollable product list; opens `AddProductModal` or `EditProductModal` via `NavigationContext`.
- **`components/(tabs)/products/AddProductModal.tsx`** — full-screen modal for creating a new product (name, keywords, stock, type, type-specific fields).
- **`components/(tabs)/products/EditProductModal.tsx`** — same layout for editing; also allows delete (with confirmation) and clone.

Keyword tags support inline editing via long-press.
