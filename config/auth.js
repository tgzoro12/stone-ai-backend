// auth.js - user authentication routes (email only)

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup / login (email only)
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    let user = await User.findOne({ email });

    if (!user) {
      // create new user with inactive subscription
      user = new User({ email, subscription_status: 'inactive' });
      await user.save();
    }

    res.json({
      success: true,
      message: 'User logged in',
      user: {
        email: user.email,
        subscription_status: user.subscription_status
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
