# Cache System

The app has no remote backend. All persistent data is stored in **Expo's file-system cache** using `expo-file-system` (`File`, `Directory`, `Paths` API).

## useCache Hook (`hooks/useCache.ts`)

```ts
const {
  checkIfFileExistsInCache,  // → boolean (sync)
  readFileFromCache,         // → Promise<string | null>
  saveDataToCache,           // (data: string) → boolean (sync)
  appendLineToFile,          // (line: string) → boolean (sync) — appends without reading
  readAllFilesFromDirectory, // → string[] (sync, only when directory is set)
  readFileFromCacheByName,   // (fileName: string) → Promise<string | null>
} = useCache(cachedFileName, cachedFileDirectory?)
```

**Parameters:**
- `cachedFileName` — filename within the cache (e.g. `stickers.json`, `colormode.txt`).
- `cachedFileDirectory` — optional sub-directory (e.g. `chat_history`). When provided, the directory is created synchronously via `Directory.create()` on first render.

**Resolved path:** `Paths.cache / [cachedFileDirectory /] cachedFileName`

**Sync vs Async:** Most operations are **synchronous** thanks to the new `expo-file-system` JSI-based API. Only `readFileFromCache` and `readFileFromCacheByName` remain async (they use `File.text()`). All operations are `useCallback`/`useMemo`-memoised. Errors are logged to console and return a safe fallback (`null` / `false` / `[]`).

### appendLineToFile

Appends a single line to the file using `File.write(content, { append: true })`. This is O(1) — no need to read the file first. Prepends a newline separator if the file already exists.

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
