// generate.js - AI message generation route

const express = require('express');
const router = express.Router();
const subscriptionCheck = require('../middleware/subscriptionCheck');

// Dummy AI function (replace with real AI integration)
const generateMessage = ({ platform, language, tone, purpose }) => {
  return `Generated message for ${platform} in ${language} with ${tone} tone: "${purpose}"`;
};

// POST /api/generate
router.post('/', subscriptionCheck, (req, res) => {
  try {
    const { platform, language, tone, purpose } = req.body;

    if (!platform || !language || !tone || !purpose) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const message = generateMessage({ platform, language, tone, purpose });

    res.json({ success: true, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
