# ============================================
# AGRICHAIN FINAL STRATEGIC AI (CLEAN VERSION)
# Dataset-driven, no pesticide, no shelf life
# ============================================

import pandas as pd
import numpy as np

from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# ============================================
# LOAD DATASET (EXCEL)
# ============================================

df = pd.read_excel("C:\Users\HP\Downloads\final wala dataset.xlsx")

# ============================================
# FEATURE ENGINEERING
# ============================================

df["soil_score"] = (
    df["nitrogen"] +
    df["phosphorus"] +
    df["potassium"]
) / 3

df["spoilage_numeric"] = df["spoilage_risk"].map({
    "Low": 0,
    "Medium": 1,
    "High": 2
})

FEATURES = [
    "month",
    "temperature",
    "humidity",
    "rainfall",
    "soil_score",
    "transit_time"
]

X = df[FEATURES]

# ============================================
# TRAIN MODELS
# ============================================

price_model = RandomForestRegressor(n_estimators=200)
price_model.fit(X, df["price"])

spoil_model = RandomForestClassifier(n_estimators=200)
spoil_model.fit(X, df["spoilage_numeric"])

label_encoder = LabelEncoder()
df["mandi_encoded"] = label_encoder.fit_transform(df["mandi"])

market_model = RandomForestClassifier(n_estimators=200)
market_model.fit(X, df["mandi_encoded"])

# ============================================
# DATASET-DRIVEN PRESERVATION METHOD
# ============================================

def get_preservation(region, crop):

    data = df[
        (df["mandi"].str.lower() == region.lower()) &
        (df["crop"].str.lower() == crop.lower())
    ]

    if len(data) == 0:
        return "Standard cold storage recommended"

    for col in df.columns:

        if "preservation" in col.lower() or "storage" in col.lower():

            return data[col].mode()[0]

    return "Standard storage recommended"

# ============================================
# DISEASE RISK (from dataset spoilage_risk)
# ============================================

def disease_risk(region, crop):

    data = df[
        (df["mandi"].str.lower() == region.lower()) &
        (df["crop"].str.lower() == crop.lower())
    ]

    if len(data) == 0:
        return "Medium"

    return data["spoilage_risk"].mode()[0]

# ============================================
# STRATEGIC ENGINES
# ============================================

def risk_index(temp, humidity, rainfall, spoil_prob):

    risk = 0

    if temp > 35:
        risk += 20

    if humidity > 80:
        risk += 25

    if rainfall > 10:
        risk += 25

    risk += spoil_prob * 30

    return min(int(risk), 100)


def profit_simulator(price, transit):

    transport_cost = transit * 20
    spoilage_loss = price * 0.1

    return int(price - transport_cost - spoilage_loss)


def strategic_crop_switch(region):

    region_data = df[df["mandi"] == region]

    crop_profit = region_data.groupby("crop")["price"].mean()

    return crop_profit.idxmax()


def sell_strategy(spoilage_percent):

    if spoilage_percent > 70:
        return "Sell immediately to avoid heavy loss"

    elif spoilage_percent > 40:
        return "Sell within 2–3 days"

    else:
        return "You can wait for better price"

# ============================================
# MAIN AI FUNCTION
# ============================================

def agrichain_final_ai():

    print("\n====== AGRICHAIN STRATEGIC AI ======\n")

    region = input("Enter your region: ")

    crop = input("Enter your crop: ")

    region_data = df[df["mandi"] == region]

    if len(region_data) == 0:

        print("Region not found in dataset")

        return

    avg_features = region_data[FEATURES].mean().values.reshape(1,-1)

    predicted_price = price_model.predict(avg_features)[0]

    spoil_prob = spoil_model.predict_proba(avg_features)[0]

    spoil_percent = max(spoil_prob) * 100

    market_encoded = market_model.predict(avg_features)[0]

    best_market = label_encoder.inverse_transform([market_encoded])[0]

    risk = risk_index(

        avg_features[0][1],
        avg_features[0][2],
        avg_features[0][3],
        max(spoil_prob)
    )

    confidence = 100 - risk

    profit = profit_simulator(predicted_price, avg_features[0][5])

    sell = sell_strategy(spoil_percent)

    preservation = get_preservation(region, crop)

    disease = disease_risk(region, crop)

    best_crop = strategic_crop_switch(region)

    # ============================================
    # FINAL OUTPUT
    # ============================================

    print("\n========= STRATEGIC REPORT =========\n")

    print("Region:", region)

    print("Current Crop:", crop)

    print("\nMarket Intelligence:")

    print("Best Market:", best_market)

    print("Predicted Price:", int(predicted_price))

    print("Expected Profit:", profit)

    print("\nRisk Intelligence:")

    print("Risk Index:", risk, "/100")

    print("Model Confidence:", confidence, "%")

    print("Disease Risk Level:", disease)

    print("\nSell Strategy:")

    print(sell)

    print("\nPost-Harvest Preservation:")

    print(preservation)

    print("\nStrategic Recommendation:")

    print("Best Future Crop:", best_crop)

    print("\n====================================\n")


# ============================================
# RUN
# ============================================

agrichain_final_ai()