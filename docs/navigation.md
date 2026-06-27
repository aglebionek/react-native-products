# Navigation System

The app uses **expo-router** (file-based routing) for screen-level navigation, augmented by a custom `NavigationContext` for sub-screen view states that don't need their own route.

## Routes (`app/(tabs)/`)

| File | Route | Purpose |
|---|---|---|
| `index.tsx` | `/` | Transactions feed + new transaction input |
| `products.tsx` | `/(tabs)/products` | Product catalogue |
| `files.tsx` | `/(tabs)/files` | Historical transaction files list |
| `old_chat.tsx` | `/(tabs)/old_chat` | Read-only view of a past day's transactions |

The tab bar is defined in `app/(tabs)/_layout.tsx`. The root layout (`app/_layout.tsx`) wraps everything in a `<Stack>` with a single named screen `(tabs)` and a custom `Header`.

## NavigationContext (`contexts/NavigationContext.tsx`)

Tracks which "view" within the products tab is currently active. This is needed because `AddProductModal` and `EditProductModal` are full-screen modals rendered within the same route rather than as separate routes.

```ts
enum NAVIGATION_VIEWS {
  CURRENT_CHAT    = 0,  // default / home
  OLD_CHATS_LIST  = 1,  // files tab
  OLD_CHAT        = 2,  // old_chat tab
  PRODUCTS_LIST   = 3,  // products tab — list view
  EDIT_PRODUCT    = 4,  // products tab — edit modal open
  ADD_PRODUCT     = 5,  // products tab — add modal open
}
```

```ts
const { currentNavigationView, setCurrentNavigationView } = useNavigationContext();
```

### Programmatic Navigation

For route-level navigation, the app uses expo-router's `useRouter().navigate()`. Pre-defined path constants live in `NavigationContext`:

```ts
export const NAVIGATION_VIEW_PATHNAMES: Record<string, Href> = {
  CURRENT_CHAT:   '/',
  OLD_CHATS_LIST: '/(tabs)/files',
  OLD_CHAT:       '/(tabs)/old_chat',
  PRODUCTS_LIST:  '/(tabs)/products',
};
```

**Example (files screen → today's transactions):**
```ts
navigate(NAVIGATION_VIEW_PATHNAMES.CURRENT_CHAT);
setCurrentNavigationView(NAVIGATION_VIEWS.CURRENT_CHAT);
```

Both calls are typically made together: `navigate` changes the active route, `setCurrentNavigationView` updates the in-route view state.

## Focus Lifecycle

Screens use `useFocusEffect` (expo-router) to:
- Auto-focus the text input when the tab becomes active.
- Reset local state (selected product, search query, modals) when leaving the tab.

## Header (`components/navigation/Header.tsx`)

A custom header component rendered via the `header` option on the `(tabs)` Stack screen. It uses `ThemeContext` for colours.
