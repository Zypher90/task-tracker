const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: "https://https://task-tracker-snowy-sigma.vercel.app",
    credentials: true
}));
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));