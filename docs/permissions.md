# Permissions & File Download System

Handles requesting Android storage access and writing files to a user-chosen directory outside the app sandbox.

## PermissionsContext (`contexts/PermissionsContext.tsx`)

```ts
const { permissionsLoaded, handleDownloadFile } = usePermissions();
```

| Value | Type | Description |
|---|---|---|
| `permissionsLoaded` | `boolean` | `true` once the cached download directory has been read |
| `handleDownloadFile(fileName, content, mimeType)` | `async (string, string, string) => string \| null` | Writes a file to the user's chosen directory; returns the file URI or `null` on failure |

## How It Works

The context uses Android's **Storage Access Framework (SAF)** via `expo-file-system`:

1. **On mount:** reads `download_directory.txt` from cache. If a URI is cached, it is used for all future downloads without re-prompting.

2. **On first download:** if no directory is cached, calls `FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()`. If the user grants access, the URI is saved to `download_directory.txt` for subsequent sessions.

3. **Writing:** uses `StorageAccessFramework.createFileAsync(directoryUri, fileName, mimeType)` then `writeAsStringAsync` with UTF-8 encoding.

## Notifications After Download

The **Files** screen (`app/(tabs)/files.tsx`) fires a local push notification after each download attempt using `useNotifications`:

- **Success:** title = `"File <name> downloaded"`, body = `"Tap to open."`, data includes `fileUri` and `mimetype`.
- **Failure:** title = `"File <name> download failed"`, body = `"Tap to retry."`.

Tapping the notification calls `startActivityAsync('android.intent.action.VIEW', ...)` to open the file with the system viewer.

## CSV Export Format

Transactions for a given day are exported as CSV via `convertChatHistoryToCSV`:

```
DD.MM.YYYY, HH:MM:SS, category, productName, quantity
```

One row per transaction, sorted in the order they were recorded.

## Notifications Hook (`hooks/useNotifications.ts`)

Thin wrapper around `expo-notifications`:

```ts
const { sendPushNotification } = useNotifications({ onNotificationClicked?, onNotificationShow? });

await sendPushNotification(content, trigger);
// content: NotificationContentInput
// trigger: NotificationTriggerInput (e.g. { seconds: 1, repeats: false })
```

Handles permission requesting on mount and registers an Android notification channel (`default`, max importance). Returns an Expo push token (used for remote push if needed).
