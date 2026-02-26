package com.agricchain.app

import android.graphics.Color
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import java.util.Locale

class RecommendationActivity : AppCompatActivity(), TextToSpeech.OnInitListener {
    
    private lateinit var decisionCard: CardView
    private lateinit var decisionText: TextView
    private lateinit var mandiName: TextView
    private lateinit var expectedPrice: TextView
    private lateinit var totalProfit: TextView
    private lateinit var spoilageRisk: TextView
    private lateinit var nearestMandiPrice: TextView
    private lateinit var suggestedMandiPrice: TextView
    private lateinit var extraProfit: TextView
    private lateinit var reasonsContainer: LinearLayout
    private lateinit var speakButton: Button
    
    private var tts: TextToSpeech? = null
    private lateinit var recommendation: Recommendation
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_recommendation)
        
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "सलाह / Recommendation"
        
        initViews()
        
        val cropName = intent.getStringExtra("CROP_NAME") ?: ""
        val quantity = intent.getDoubleExtra("QUANTITY", 0.0)
        val location = intent.getStringExtra("LOCATION") ?: ""
        
        recommendation = RecommendationEngine.getRecommendation(cropName, quantity, location)
        displayRecommendation(recommendation)
        
        tts = TextToSpeech(this, this)
        
        speakButton.setOnClickListener {
            speakRecommendation()
        }
    }
    
    private fun initViews() {
        decisionCard = findViewById(R.id.decisionCard)
        decisionText = findViewById(R.id.decisionText)
        mandiName = findViewById(R.id.mandiName)
        expectedPrice = findViewById(R.id.expectedPrice)
        totalProfit = findViewById(R.id.totalProfit)
        spoilageRisk = findViewById(R.id.spoilageRisk)
        nearestMandiPrice = findViewById(R.id.nearestMandiPrice)
        suggestedMandiPrice = findViewById(R.id.suggestedMandiPrice)
        extraProfit = findViewById(R.id.extraProfit)
        reasonsContainer = findViewById(R.id.reasonsContainer)
        speakButton = findViewById(R.id.speakButton)
    }
    
    private fun displayRecommendation(rec: Recommendation) {
        if (rec.shouldSellToday) {
            decisionCard.setCardBackgroundColor(getColor(R.color.green_primary))
            decisionText.text = getString(R.string.sell_today)
        } else {
            decisionCard.setCardBackgroundColor(getColor(R.color.red_primary))
            decisionText.text = getString(R.string.wait)
        }
        
        mandiName.text = rec.bestMandiName
        expectedPrice.text = "₹${String.format("%.1f", rec.expectedPricePerKg)}/kg"
        totalProfit.text = "कुल लाभ / Total: ₹${String.format("%.0f", rec.totalProfit)}"
        spoilageRisk.text = "खराब होने का जोखिम / Risk: ${rec.spoilageRiskPercent}%"
        
        nearestMandiPrice.text = "₹${String.format("%.1f", rec.nearestMandiPrice)}/kg"
        suggestedMandiPrice.text = "₹${String.format("%.1f", rec.suggestedMandiPrice)}/kg"
        extraProfit.text = "₹${String.format("%.0f", rec.extraProfit)}"
        
        reasonsContainer.removeAllViews()
        rec.reasons.forEach { reason ->
            val reasonView = TextView(this).apply {
                text = "• $reason"
                textSize = 16f
                setTextColor(getColor(R.color.text_primary))
                setPadding(0, 0, 0, 24)
            }
            reasonsContainer.addView(reasonView)
        }
    }
    
    private fun speakRecommendation() {
        val text = if (recommendation.shouldSellToday) {
            "आज बेचें. ${recommendation.bestMandiName} में ₹${recommendation.expectedPricePerKg.toInt()} प्रति किलो मिलेगा. कुल लाभ ₹${recommendation.totalProfit.toInt()}"
        } else {
            "प्रतीक्षा करें. बेहतर मूल्य मिलेगा"
        }
        
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
    }
    
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val result = tts?.setLanguage(Locale("hi", "IN"))
            if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                tts?.language = Locale.ENGLISH
            }
        }
    }
    
    override fun onDestroy() {
        tts?.stop()
        tts?.shutdown()
        super.onDestroy()
    }
    
    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
