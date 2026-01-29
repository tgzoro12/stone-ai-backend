// subscriptionCheck.js - Hard paywall middleware for Stone AI

const User = require('../models/User');

const subscriptionCheck = async (req, res, next) => {
  try {
    const { email } = req.body; // expects user email in request

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user || user.subscription_status !== 'active') {
      return res.status(403).json({ success: false, error: 'Subscription inactive. Access denied.' });
    }

    // user is active → proceed
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = subscriptionCheck;
