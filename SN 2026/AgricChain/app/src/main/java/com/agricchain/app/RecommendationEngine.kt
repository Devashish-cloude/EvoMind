package com.agricchain.app

import kotlin.random.Random

object RecommendationEngine {
    
    fun getRecommendation(cropName: String, quantity: Double, location: String): Recommendation {
        // Simulated logic - in production, this would call an API
        val nearestPrice = 35.0 + Random.nextDouble(0.0, 10.0)
        val suggestedPrice = nearestPrice + Random.nextDouble(3.0, 15.0)
        val shouldSell = Random.nextBoolean()
        val spoilageRisk = if (shouldSell) Random.nextInt(10, 25) else Random.nextInt(5, 15)
        
        val mandis = listOf("Azadpur Mandi", "Anaj Mandi", "Sabzi Mandi", "Kisan Mandi")
        val bestMandi = mandis.random()
        
        val totalProfit = quantity * suggestedPrice
        val extraProfit = quantity * (suggestedPrice - nearestPrice)
        
        val reasons = generateReasons(shouldSell, spoilageRisk)
        
        return Recommendation(
            shouldSellToday = shouldSell,
            bestMandiName = bestMandi,
            expectedPricePerKg = suggestedPrice,
            totalProfit = totalProfit,
            spoilageRiskPercent = spoilageRisk,
            nearestMandiPrice = nearestPrice,
            suggestedMandiPrice = suggestedPrice,
            extraProfit = extraProfit,
            reasons = reasons
        )
    }
    
    private fun generateReasons(shouldSell: Boolean, spoilageRisk: Int): List<String> {
        val allReasons = mutableListOf<String>()
        
        if (shouldSell) {
            allReasons.add("मूल्य बढ़ रहा है / Price trend increasing")
            allReasons.add("बारिश की संभावना कम / Rain forecast low")
            allReasons.add("मंडी में उच्च मांग / High demand in selected mandi")
            if (spoilageRisk > 15) {
                allReasons.add("देरी से खराब होने का खतरा / Delay increases spoilage risk")
            }
        } else {
            allReasons.add("कल बेहतर मूल्य मिलेगा / Better price expected tomorrow")
            allReasons.add("मंडी में कम भीड़ होगी / Less crowd at mandi later")
            allReasons.add("फसल ताजा रहेगी / Crop will stay fresh")
        }
        
        return allReasons.take(4)
    }
}
