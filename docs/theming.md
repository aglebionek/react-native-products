# Theming System

The app supports **light** and **dark** themes. The active theme is persisted in the file-system cache and provided globally via `ThemeContext`.

## Colour Palettes (`constants/Colors.ts`)

```ts
const Colors = {
  light: {
    text: '#cdcdcd',
    backgroundStart: '#802363',
    backgroundMiddle: '#802363',
    backgroundEnd:   '#C33593',
    borderColor:     '#1B2746',
    tabIconDefault:  '#1B2746',
    tabIconSelected: '#F4C45D',   // gold accent
  },
  dark: {
    text: '#efefef',
    backgroundStart: '#2B2746',
    backgroundMiddle: '#221D40',
    backgroundEnd:   '#05040C',
    borderColor:     '#802363',
    tabIconDefault:  '#C33593',
    tabIconSelected: '#F4C45D',   // gold accent
  },
};
```

`MainThemeColorsDark` is a `@react-navigation/native` `Theme` object used with `NativeThemeProvider` to keep React Navigation UI elements consistent.

## ThemeContext (`contexts/ThemeContext.tsx`)

```ts
const { COLORS, handleChangeTheme, theme, themeLoaded } = useTheme();
```

| Value | Type | Description |
|---|---|---|
| `COLORS` | `typeof Colors.light \| typeof Colors.dark` | Active colour set |
| `theme` | `'light' \| 'dark'` | Active theme name |
| `themeLoaded` | `boolean` | `true` once cache read completes |
| `handleChangeTheme()` | `() => void` | Toggles theme and persists to `colormode.txt` |

**Initialisation:**
1. Reads `colormode.txt` from cache; if absent, seeds it with the device's `useColorScheme()` value.
2. Sets `themeLoaded = true` after the attempt (success or failure).

## Usage Pattern

Every component that needs styling imports `useTheme`:

```ts
const { COLORS } = useTheme();
// then use COLORS.text, COLORS.backgroundStart, etc. in StyleSheet or inline styles
```

Background gradients use `expo-linear-gradient` with `[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]`.

## SplashScreen Dependency

`SplashScreen` (`components/SplashScreen.tsx`) waits for `themeLoaded`, `productsLoaded`, and `permissionsLoaded` before showing the app content, preventing a flash of unstyled or default-coloured UI.
