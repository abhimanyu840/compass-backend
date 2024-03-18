const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes'); // Import product routes
const adminRoutes = require('./routes/admin.routes'); // Import admin routes
const { PORT } = require('./configs/sever.config');
const paymentRoutes = require('./routes/payment.routes');
const orderRoutes = require('./routes/order.route')
const { KEY_ID } = require('./configs/razorpay.config');
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectToMongo;



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/compass/api/v1/auth', authRoutes);
app.use('/compass/api/v1/products', productRoutes); // Use product routes
app.use('/compass/api/v1/admin', adminRoutes); // Use admin routes
app.use('/compass/api/v1/payment', paymentRoutes);
app.use('/compass/api/v1/orders', orderRoutes);

app.get('/compass/api/v1/getkey', (req, res) => { res.status(200).json({ key: KEY_ID }) })

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
