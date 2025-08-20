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
adb pair <device-ip>:<pair-port>
# enter the pairing code when prompted
adb connect <device-ip>:<connect-port>
```
3. Verify the connection by running:
```bash
adb devices
```

# How to run
## For development
1. Run the following command in the terminal:
```bash
npm i && npm start
``` 
2. Open the Expo Go app on your Android device and select the project
