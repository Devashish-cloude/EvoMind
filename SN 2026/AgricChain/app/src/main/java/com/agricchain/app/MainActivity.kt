package com.agricchain.app

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Geocoder
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.button.MaterialButton
import java.util.Locale

class MainActivity : AppCompatActivity() {
    
    private lateinit var cropNameInput: TextInputEditText
    private lateinit var quantityInput: TextInputEditText
    private lateinit var locationInput: TextInputEditText
    private lateinit var autoDetectButton: MaterialButton
    private lateinit var getRecommendationButton: MaterialButton
    
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private val LOCATION_PERMISSION_REQUEST = 1001
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        
        cropNameInput = findViewById(R.id.cropNameInput)
        quantityInput = findViewById(R.id.quantityInput)
        locationInput = findViewById(R.id.locationInput)
        autoDetectButton = findViewById(R.id.autoDetectButton)
        getRecommendationButton = findViewById(R.id.getRecommendationButton)
        
        autoDetectButton.setOnClickListener {
            detectLocation()
        }
        
        getRecommendationButton.setOnClickListener {
            getRecommendation()
        }
    }
    
    private fun detectLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) 
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                LOCATION_PERMISSION_REQUEST
            )
            return
        }
        
        fusedLocationClient.lastLocation.addOnSuccessListener { location ->
            if (location != null) {
                try {
                    val geocoder = Geocoder(this, Locale.getDefault())
                    val addresses = geocoder.getFromLocation(location.latitude, location.longitude, 1)
                    if (addresses?.isNotEmpty() == true) {
                        val city = addresses[0].locality ?: addresses[0].subAdminArea ?: "Unknown"
                        locationInput.setText(city)
                    }
                } catch (e: Exception) {
                    Toast.makeText(this, "स्थान प्राप्त नहीं हो सका / Could not get location", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(this, "स्थान प्राप्त नहीं हो सका / Could not get location", Toast.LENGTH_SHORT).show()
            }
        }
    }
    
    private fun getRecommendation() {
        val cropName = cropNameInput.text.toString().trim()
        val quantityStr = quantityInput.text.toString().trim()
        val location = locationInput.text.toString().trim()
        
        if (cropName.isEmpty()) {
            Toast.makeText(this, "कृपया फसल का नाम दर्ज करें / Please enter crop name", Toast.LENGTH_SHORT).show()
            return
        }
        
        if (quantityStr.isEmpty()) {
            Toast.makeText(this, "कृपया मात्रा दर्ज करें / Please enter quantity", Toast.LENGTH_SHORT).show()
            return
        }
        
        if (location.isEmpty()) {
            Toast.makeText(this, "कृपया स्थान दर्ज करें / Please enter location", Toast.LENGTH_SHORT).show()
            return
        }
        
        val quantity = quantityStr.toDoubleOrNull()
        if (quantity == null || quantity <= 0) {
            Toast.makeText(this, "कृपया मान्य मात्रा दर्ज करें / Please enter valid quantity", Toast.LENGTH_SHORT).show()
            return
        }
        
        val intent = Intent(this, RecommendationActivity::class.java).apply {
            putExtra("CROP_NAME", cropName)
            putExtra("QUANTITY", quantity)
            putExtra("LOCATION", location)
        }
        startActivity(intent)
    }
    
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == LOCATION_PERMISSION_REQUEST) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                detectLocation()
            } else {
                Toast.makeText(this, "स्थान अनुमति आवश्यक है / Location permission required", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
