// controllers/user.controller.js

const User = require('../models/user.model');

// Controller method to generate and save referral link for a user
exports.generateReferralLink = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate unique referral link (you can customize this logic as needed)
        const referralLink = `http://yourdomain.com/signup?ref=${userId}`;

        // Save referral link in user document
        user.referralLink = referralLink;
        await user.save();

        res.status(200).json({ referralLink });
    } catch (error) {
        console.error('Error generating referral link:', error);
        res.status(500).json({ message: 'Failed to generate referral link' });
    }
};
