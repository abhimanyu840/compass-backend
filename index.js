const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth.routes');
const { PORT } = require('./configs/sever.config');

const app = express();

// Connect to MongoDB
connectToMongo;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/compass/api/v1/auth', authRoutes);
// app.use('/compass/api/v1/auth', authRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
