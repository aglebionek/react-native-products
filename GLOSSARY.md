# Glossary
This file holds stable terminology for this repo and its workflows. Keep entries short: one or two sentences per term, with links to notes or examples when useful.

## Entry format
Use one heading per term:
```md
## Term
Short canonical definition.
- Related: optional links to related files/directories.
```

# Terms

## Product
An item that can be stocked and sold.
- Related: [docs/products.md](docs/products.md), [@types/products/index.ts](@types/products/index.ts)

## Product type
The broad family a product belongs to, such as prints, stickers, keychains, pins, or bookmarks.
- Related: [docs/products.md](docs/products.md)

## Product category
The short code entered during transaction input to choose the product group or print format being sold.
- Related: [docs/transactions.md](docs/transactions.md)

## Print format
The size option for a print product, such as `A4`, `A5`, or `A6`.
- Related: [docs/products.md](docs/products.md)

## Keyword
A searchable alias for a product. Transaction input uses keywords to match typed product text to catalogue entries.
- Related: [docs/products.md](docs/products.md), [docs/transactions.md](docs/transactions.md)

## Stock
The current available quantity for a product. Stock changes when products are managed or when transactions are added or edited.
- Related: [docs/products.md](docs/products.md), [docs/transactions.md](docs/transactions.md)

## Default products
The bundled seed catalogue used when no cached product data exists yet.
- Related: [docs/products.md](docs/products.md), [constants/products](constants/products)

## Transaction
A record of a product movement containing the product, quantity, category, and timestamp.
- Related: [docs/transactions.md](docs/transactions.md), [@types/transactions/Transaction.ts](@types/transactions/Transaction.ts)

## Transaction input
The guided entry flow for selecting a category, selecting a product, entering quantity, updating stock, and creating or editing a transaction.
- Related: [docs/transactions.md](docs/transactions.md), [stories/useTransactionInput.tsx](stories/useTransactionInput.tsx)

## Suggestion
A category or product candidate shown while the user types in transaction input.
- Related: [docs/transactions.md](docs/transactions.md)

## Transaction batch
A page of transactions loaded from a daily transaction file. The app loads the newest batch first and can load earlier batches before a timestamp.
- Related: [docs/transactions.md](docs/transactions.md)

## Cache
Expo file-system cache storage used as the app's local persistence layer.
- Related: [docs/cache.md](docs/cache.md), [hooks/useCache.ts](hooks/useCache.ts)

## Daily transaction file
The per-day transaction history file stored under the cache `chat_history` directory.
- Related: [docs/transactions.md](docs/transactions.md), [docs/cache.md](docs/cache.md)

## Chat history file
Another name for a daily transaction file. The filename format is `chat_history_YYYY_MM_DD.json`.
- Related: [docs/transactions.md](docs/transactions.md), [docs/permissions.md](docs/permissions.md)

## CSV export
The download produced from a chat history file in the Files tab.
- Related: [docs/permissions.md](docs/permissions.md), [docs/transactions.md](docs/transactions.md)

## Current chat
The main transaction view for the current Polish-timezone date.
- Related: [docs/navigation.md](docs/navigation.md), [docs/transactions.md](docs/transactions.md)

## Old chat
A transaction view for a selected historical date.
- Related: [docs/navigation.md](docs/navigation.md), [docs/transactions.md](docs/transactions.md)

## Files tab
The history browser where users open past transaction days or export transaction files.
- Related: [docs/navigation.md](docs/navigation.md), [docs/permissions.md](docs/permissions.md)

## Products tab
The product management view where users browse, filter, add, and edit products.
- Related: [docs/navigation.md](docs/navigation.md), [docs/products.md](docs/products.md)

## Polish timezone date
The app's business date in `Europe/Warsaw`, formatted as `YYYY_MM_DD` for transaction filenames.
- Related: [docs/transactions.md](docs/transactions.md)
