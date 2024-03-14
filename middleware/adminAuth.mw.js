// adminAuthMiddleware.js

const jwt = require('jsonwebtoken');
const { SECRET } = require('../configs/secret.config');
const User = require('../models/user.model');

// Middleware function to authenticate admin
const adminAuthMiddleware = async (req, res, next) => {
    // Check if Authorization header is present
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    try {
        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, SECRET);

        // Check if user is an admin
        const user = await User.findById(decoded.id);
        if (!user || user.userType !== 'ADMIN') {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        // Store the user object in the request for further use
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error authenticating admin:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = adminAuthMiddleware;
