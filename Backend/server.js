const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'your-url-mongo';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());

// Use routes
app.use('/', authRoutes);
app.use('/', userRoutes); // Make sure userRoutes are correctly added

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
