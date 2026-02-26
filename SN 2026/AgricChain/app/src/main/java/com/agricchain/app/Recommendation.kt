package com.agricchain.app

data class Recommendation(
    val shouldSellToday: Boolean,
    val bestMandiName: String,
    val expectedPricePerKg: Double,
    val totalProfit: Double,
    val spoilageRiskPercent: Int,
    val nearestMandiPrice: Double,
    val suggestedMandiPrice: Double,
    val extraProfit: Double,
    val reasons: List<String>
)
