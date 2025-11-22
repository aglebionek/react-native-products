# Development Environment
- WSL2 with Ubuntu 24.04 LTS
- Visual Studio Code with Remote - WSL extension
- Android Debug Bridge (ADB) for Android
- Android device with wireless debugging enabled

# ADB and SDK installation
sudo apt install adb
sudo apt install android-sdk
ANDROID_HOME=/usr/lib/android-sdk
export ANDROID_HOME=/usr/lib/android-sdk

# How to setup
1. In the wireless debugging setting click on "Pair device with pairing code"
2. Run the following command in the terminal:
```bash
adb kill-server # if needed
adb pair <device-ip>:<pair-port> <pairing-code>
adb connect <device-ip>:<connect-port>
# if adb connect fails, try restarting the wireless debugging on the device and run the command again
```
3. Verify the connection by running:
```bash
adb devices
```

# How to run
## For development
### Expo Go
1. Run the following command in the terminal:
```bash
npm i && npm start
``` 
2. Open the Expo Go app on your Android device and select the project

### Direct APK run
1. If the Expo Go app doesn't work, run:
```bash
npm i && npm run android
```
2. This will create an app on your device that you can use to run the project directly. Note that the app will only work if the Metro bundler is running on your development machine.

## For production
1. Run the following command in the terminal:
```bash
npm i && npm run build:android
```
2. This will create a production-ready APK file located at `./android/app/build/outputs/apk/release/app-release.apk` which you can install on your device and share with others. Note that the device will probably show a warning about installing apps from unknown sources. You might need to allow installing apps from unknown sources in your device settings to install the APK.
