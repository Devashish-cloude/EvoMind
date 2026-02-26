# AgricChain – Smart Harvest Advisor

A simple Android app for Indian farmers to get smart recommendations on when to sell their crops.

## Features

- **Simple Input**: Crop name, quantity, and location
- **Auto Location Detection**: GPS-based location detection
- **Smart Recommendations**: Sell today or wait decision
- **Price Comparison**: Compare nearest vs suggested mandi prices
- **Profit Calculation**: See total and extra profit
- **Voice Output**: Hindi text-to-speech for recommendations
- **Bilingual UI**: Hindi and English labels

## Build Instructions

1. Open the project in Android Studio
2. Sync Gradle files
3. Run on an emulator or physical device (API 21+)

## Requirements

- Android Studio Arctic Fox or later
- Android SDK 21+ (Android 5.0 Lollipop)
- Kotlin 1.9.20

## Usage

1. Enter crop name (e.g., "Tomato", "Wheat")
2. Enter quantity in kg
3. Enter location manually or tap "Auto Detect"
4. Tap "Get Recommendation"
5. View recommendation and tap "Speak" for voice output

## Note

This is a demo app with simulated recommendation logic. In production, connect to a real API for market data, weather forecasts, and ML-based predictions.
