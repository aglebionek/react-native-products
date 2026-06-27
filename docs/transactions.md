# Transactions System

Records individual product sales. Transactions are stored in daily JSON files in the Expo file-system cache and displayed in a reverse-chronological feed on the home screen.

## Type (`@types/transactions/Transaction.ts`)

```ts
type Transaction = {
  productName:     Product['name'];   // string
  productQuantity: Product['stock'];  // number
  productCategory: ProductCategory;   // 'N' | 'A4' | 'A5' | 'A6' | 'B' | 'P' | 'Z'
  timestamp:       Date;
}
```

## Storage Layout

One JSON file per day, stored in the `chat_history/` sub-directory of the Expo cache:

```
<expo-cache>/chat_history/chat_history_YYYY_MM_DD.json
```

The active date is tracked in `TransactionsContext` as `_YYYY_MM_DD`. It defaults to the current date in the **Polish timezone** (Europe/Warsaw).

## TransactionsContext (`contexts/TransactionsContext.tsx`)

```ts
{
  transactions,              // currently displayed slice (last 20 for the active date)
  dateRange,                 // { start, end } – UI date filter (not yet fully wired up)
  handleAddTransaction,      // appends a Transaction and saves to cache
  handleDeleteTransaction,   // removes by timestamp equality and saves
  handleEditTransaction,     // replaces by timestamp equality and saves
  isLoadingMoreTransactions, // true while loadAnotherTransactionsBatch is running
  loadAnotherTransactionsBatch(lastTimestamp),  // loads the previous 20 before `lastTimestamp`
  readAllTransactionsFiles,  // lists all chat_history/*.json filenames
  readTransactionsByFilename,// reads a specific day's file as raw string
  setDateRange,
  _setYYYY_MM_DD,            // change the active date (used by files screen)
  transactionsLoaded,        // true once initial read completes
  _YYYY_MM_DD,               // currently viewed date string
}
```

**Pagination:** The context keeps only the most-recent 20 transactions in React state. Scrolling to the top of the list triggers `loadAnotherTransactionsBatch`, which prepends the previous 20 entries.

## Transaction Input State Machine (`stories/useTransactionInput.tsx`)

Used by both the Transactions screen (new entry) and `EditTransactionModal` (edit).

```
InputStates.SELECTING_CATEGORY → SELECTING_PRODUCT → SELECTING_QUANTITY
```

| State | User types… | Behaviour |
|---|---|---|
| `SELECTING_CATEGORY` | e.g. `N`, `A4`, `B` | Filters categories; auto-advances on exact match or space |
| `SELECTING_PRODUCT` | product keywords | Filters products in the selected category by keyword prefix |
| `SELECTING_QUANTITY` | a number | Parses quantity; backspace on quantity part returns to SELECTING_PRODUCT |

On submit (`onSubmitEditing`):
1. Validates that a product and category are selected.
2. Calls `productManager.mutations.handleUpdateStockForProduct` to decrement (or recalculate) stock.
3. Calls `handleAddTransaction` or `handleEditTransaction`.
4. Resets state.

Category → product mapping inside `useTransactionInput`:
```ts
{ A4: prints(A4), A5: prints(A5), A6: prints(A6), B: keychains, N: stickers, P: pins, Z: bookmarks }
```

Suggestion buttons (up to 3) are shown in a bar above the input for category and product steps.

## Files Screen (`app/(tabs)/files.tsx`)

Lists all `chat_history_*.json` files in reverse-chronological order. Each entry:
- **Tap** → navigates to that day's transactions (sets `_YYYY_MM_DD` and routes to `/` or `/(tabs)/old_chat`).
- **Download icon** → converts the day's transactions to CSV and calls `PermissionsContext.handleDownloadFile`, then fires a local notification.

### CSV Format
```
DD.MM.YYYY, HH:MM:SS, category, productName, quantity
```

## Date Utilities (`utils/common/index.tsx`)

| Function | Description |
|---|---|
| `getCurrentDateInPolishTimezone()` | Returns a `Date` set to the current Warsaw time (stored as UTC) |
| `getCurrentDateInYYYY_MM_DD()` | String like `2024_01_15` for today in Warsaw |
| `date2YYYY_MM_DD(date)` | Converts any Date to the `YYYY_MM_DD` string format |
| `YYYY_MM_DD2Date(str)` | Inverse: parses `YYYY_MM_DD` back to a UTC `Date` |
| `date2String(date)` | Returns `{ date, time, datetime, weekday }` formatted in Polish locale |
| `formatTransaction(t)` | `"HH:MM:SS - category name qty"` — used in the transaction list |
