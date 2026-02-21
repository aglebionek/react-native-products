# Repository Overview

**App name:** `szynszyla` (package name)  
**Type:** React Native / Expo mobile app (Android-first)  
**Purpose:** A point-of-sale / inventory tracking tool for a small seller. Logs product sales transactions and manages product stock.

## Tech Stack
- **Expo SDK 51** with **expo-router** (file-based routing)
- **React Native 0.82** + React 19
- **TypeScript**
- **expo-file-system** for local persistence (no remote database)
- **expo-notifications** for download notifications

## Directory Structure

```
/
├── app/                        # Expo Router screens
│   ├── _layout.tsx             # Root layout — mounts all context providers + SplashScreen
│   └── (tabs)/
│       ├── _layout.tsx         # Tab bar definition (3 tabs)
│       ├── index.tsx           # "Transactions" screen — log sales
│       ├── products.tsx        # "Products" screen — browse/add/edit products
│       ├── files.tsx           # "Files" screen — browse & export historical transactions
│       └── old_chat.tsx        # View transactions for a past date
│
├── components/                 # UI components
│   ├── (tabs)/
│   │   ├── index/              # Transaction screen components
│   │   │   ├── index.tsx
│   │   │   ├── EditTransactionModal.tsx
│   │   │   └── SuggestionButton.tsx
│   │   └── products/           # Product screen components
│   │       ├── AddProductModal.tsx
│   │       └── EditProductModal.tsx
│   ├── common/                 # Shared primitives: Button, Checkbox, Input, Text, ConfirmModal
│   ├── navigation/Header.tsx
│   ├── SplashScreen.tsx        # Waits for all contexts to finish loading before showing app
│   └── index.tsx               # Barrel re-exports
│
├── contexts/                   # Global React contexts (state management)
│   ├── ProductsContext.tsx
│   ├── TransactionsContext.tsx
│   ├── NavigationContext.tsx
│   ├── ThemeContext.tsx
│   └── PermissionsContext.tsx
│
├── hooks/
│   ├── useCache.ts             # Core file-system abstraction (read/write expo cache)
│   ├── useDebounce.ts
│   ├── useNotifications.ts     # Expo push notifications wrapper
│   └── useSelectStateAndSetterForProduct.ts
│
├── stories/                    # Complex business-logic hooks (named "stories" in this repo)
│   ├── useTransactionInput.tsx # Multi-step transaction entry state machine
│   └── useManageProducts.tsx   # CRUD operations for products
│
├── constants/
│   ├── Colors.ts               # Theme colour palettes
│   └── products/               # Default product lists (bookmarks, keychains, pins, prints, stickers)
│
├── @types/                     # Global TypeScript types
│   ├── index.ts
│   ├── products/index.ts
│   └── transactions/Transaction.ts
│
└── utils/common/index.tsx      # Date utilities + formatTransaction helper
```

## Provider Nesting Order (app/_layout.tsx)

```
PermissionsProvider
  ThemeProvider
    ProductsProvider
      TransactionsProvider
        NavigationProvider
          SplashScreen
```

All providers load their data from the Expo file-system cache on mount. `SplashScreen` waits until every context signals it is ready before rendering the app.

## Key Systems (see individual docs)

| System | Doc |
|---|---|
| Product data & CRUD | [products.md](products.md) |
| Transaction logging | [transactions.md](transactions.md) |
| File-system cache | [cache.md](cache.md) |
| Navigation / routing | [navigation.md](navigation.md) |
| Theming | [theming.md](theming.md) |
| File download / permissions | [permissions.md](permissions.md) |
