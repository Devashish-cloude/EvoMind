const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ phone });
    if (user) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      user = new User({ phone, otp, otpExpiry, name: 'Farmer' });
      await user.save();
    }

    // In production, send OTP via SMS
    console.log(`📱 OTP for ${phone}: ${otp}`);
    
    res.json({ message: 'OTP sent successfully', otp: process.env.NODE_ENV === 'development' ? otp : undefined });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP & Login
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

    res.json({ token, user: { id: user._id, name: user.name, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete Registration
router.post('/register', async (req, res) => {
  try {
    const { phone, name, state, district, crops, language, mobileOrEmail, password, role } = req.body;

    // Check if this is the new registration format (from Login page)
    if (mobileOrEmail && password && role) {
      // Check if user already exists
      const existingUser = await User.findOne({ mobileOrEmail });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user
      const newUser = new User({
        name,
        role,
        mobileOrEmail,
        password, // In production, hash this password
        isVerified: true
      });
      await newUser.save();

      return res.json({ 
        message: 'Registration successful',
        user: { 
          id: newUser._id, 
          name: newUser.name, 
          role: newUser.role,
          mobileOrEmail: newUser.mobileOrEmail 
        } 
      });
    }

    // Old registration format (from Register page)
    const user = await User.findOneAndUpdate(
      { phone },
      { 
        name, 
        location: { state, district },
        crops,
        language
      },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    // Find user by mobileOrEmail
    const user = await User.findOne({ mobileOrEmail: identifier });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In production, compare hashed passwords
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Check if role matches
    if (user.role !== role) {
      return res.status(401).json({ error: 'Invalid role selected' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        role: user.role,
        mobileOrEmail: user.mobileOrEmail 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
