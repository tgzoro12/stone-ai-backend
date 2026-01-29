// server.js - Stone AI backend entry point

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const generateRoutes = require('./routes/generate');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Stone AI backend is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
