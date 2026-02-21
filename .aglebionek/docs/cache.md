# Cache System

The app has no remote backend. All persistent data is stored in **Expo's file-system cache** (`expo-file-system` `cacheDirectory`).

## useCache Hook (`hooks/useCache.ts`)

```ts
const {
  checkIfFileExistsInCache,
  readFileFromCache,        // → Promise<string | null>
  saveDataToCache,          // (data: string) → Promise<boolean>
  readAllFilesFromDirectory,// → Promise<string[]>  (only when directory is set)
  readFileFromCacheByName,  // (fileName: string) → Promise<string | null>
} = useCache(cachedFileName, cachedFileDirectory?)
```

**Parameters:**
- `cachedFileName` — filename within the cache (e.g. `stickers.json`, `colormode.txt`).
- `cachedFileDirectory` — optional sub-directory (e.g. `chat_history`). When provided, the directory is created via `makeDirectoryAsync` on mount.

**Resolved path:** `<cacheDirectory>[cachedFileDirectory/]cachedFileName`

All operations are `useCallback`-memoised. Errors are logged to console and return a safe fallback (`null` / `false` / `[]`).

## What Is Cached

| File | Context | Content |
|---|---|---|
| `stickers.json` | ProductsContext | `Sticker[]` |
| `prints.json` | ProductsContext | `Print[]` |
| `keychains.json` | ProductsContext | `Keychain[]` |
| `pins.json` | ProductsContext | `Pin[]` |
| `bookmarks.json` | ProductsContext | `Bookmark[]` |
| `chat_history/chat_history_YYYY_MM_DD.json` | TransactionsContext | `Transaction[]` |
| `colormode.txt` | ThemeContext | `'light'` \| `'dark'` |
| `download_directory.txt` | PermissionsContext | SAF directory URI |

## Initialisation Pattern

Every context that uses `useCache` follows the same pattern:

1. Call `readFileFromCache()` in a `useEffect` on mount.
2. If data exists, parse and set state; otherwise fall back to defaults.
3. Set a `loaded` flag (`productsLoaded`, `transactionsLoaded`, etc.) in `finally`.
4. On any mutation, call `saveDataToCache(JSON.stringify(newState))` immediately after updating React state.

## Notes

- There is no migration or versioning of cached data formats. If the type shape changes, old cache files will be parsed as-is.
- Transactions are stored with `timestamp` as a serialised ISO string; `TransactionsContext` uses a `JSON.parse` reviver to convert it back to `Date`.
- `readAllFilesFromDirectory` only works when `cachedFileDirectory` is non-empty; it returns `[]` for flat file caches.
