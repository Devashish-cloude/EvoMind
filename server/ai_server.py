# ai_server.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

# ==============================
# LOAD + TRAIN MODEL (once)
# ==============================

df = pd.read_excel("final wala dataset.xlsx")

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

price_model = RandomForestRegressor(n_estimators=200)
price_model.fit(X, df["price"])

spoil_model = RandomForestClassifier(n_estimators=200)
spoil_model.fit(X, df["spoilage_numeric"])

label_encoder = LabelEncoder()
df["mandi_encoded"] = label_encoder.fit_transform(df["mandi"])

market_model = RandomForestClassifier(n_estimators=200)
market_model.fit(X, df["mandi_encoded"])


# ==============================
# API ROUTE
# ==============================
@app.route("/")
def home():
    return "AgriChain AI Server Running 🚀"

@app.route("/predict-test")
def test():
    return {"message": "Predict route working"}

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    input_features = [[
        data["month"],
        data["temperature"],
        data["humidity"],
        data["rainfall"],
        data["soil_score"],
        data["transit_time"]
    ]]

    predicted_price = price_model.predict(input_features)[0]
    spoil_prob = spoil_model.predict_proba(input_features)[0]
    spoil_percent = max(spoil_prob) * 100

    market_encoded = market_model.predict(input_features)[0]
    best_market = label_encoder.inverse_transform([market_encoded])[0]

    return jsonify({
        "predicted_price": int(predicted_price),
        "best_market": best_market,
        "spoilage_risk": round(spoil_percent, 2)
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)