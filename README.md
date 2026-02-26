# NutriScan India 🥗

An offline-first React Native application designed specifically for scanning and logging Indian cuisine. Powered by a local TFLite ML model, Expo Camera, and a local IFCT-2017 SQLite database. 

## Features

- **📸 Instant Food Classification**: Uses an on-device TFLite Image Classification model via `react-native-fast-tflite` to detect Indian dishes from the live camera feed in < 50ms. No cloud API required.
- **🥘 IFCT-2017 Nutritional Database**: Ships with an offline local SQLite database (`op-sqlite`) derived from the Indian Food Composition Tables, ensuring accurate macro mapping for Indian context.
- **📊 Daily Tracking & Dashboard**: Uses Zustand for offline secure meal tracking, featuring highly native 60fps visualizations built with Shopify Skia.
- **🧠 Continuous On-Device Learning**: Integrated with Native Nitro modules (`react-native-retraining` Kotlin/Swift implementation) to cache unknown dishes into `expo-file-system` and fine-tune the model off-peak overnight.

## Tech Stack

*   **Framework**: [Expo](https://expo.dev/) (React Native) with [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
*   **Camera Integration**: [React Native Vision Camera](https://mrousavy.com/react-native-vision-camera/docs/guides) with Frame Processors (`react-native-worklets-core`)
*   **Machine Learning**: [React Native Fast Tflite](https://mrousavy.com/react-native-fast-tflite/) (Hardware accelerated Object Detection & Classification)
*   **Native Module Architecture / C++**: [React Native Nitro Modules](https://nitro.margelo.com/)
*   **Database**: `@op-engineering/op-sqlite`
*   **Graphics & Animations**: `@shopify/react-native-skia` and `react-native-reanimated`
*   **State Management**: `zustand`

## Project Structure

*   `app/`: Expo Router screens (Tabs, Modals, Details).
*   `assets/`: Static assets including `indian_food.tflite` model and `ifct2017.db`.
*   `components/`: Reusable React Native UI modules (`FoodCard`, `MacroBars`, `CalorieRing`).
*   `data/`: SQLite repositories and schema (`NutritionRepository.ts`).
*   `ml/`: TypeScript wrappers for ML processes (`TrainingBuffer.ts`).
*   `modules/`: Custom natively compiled libraries (e.g. `react-native-retraining` Swift/Kotlin workers).
*   `stores/`: Zustand global state slices.

## Getting Started

### Prerequisites

*   Node.js (>= 18)
*   CocoaPods (for iOS)
*   Xcode / Android Studio

### Installation

1. Install JS dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Scaffolding iOS / Android native directories:
   ```bash
   npx expo prebuild --clean
   ```

3. Start Metro Dev Server:
   ```bash
   # Clear cache to ensure babel plugins load properly
   npx expo start -c
   ```

4. Build App natively on device / emulator:
   ```bash
   npx expo run:ios
   # OR
   npx expo run:android
   ```

## Development & Testing

Due to the heavy usage of Native APIs (VisionCamera, custom Nitro C++ modules, fast-tflite), this app **cannot** be run completely in the standard Expo Go client. You must compile the application locally using `npx expo run:[ios|android]` or set up EAS Build profiles for development clients.
