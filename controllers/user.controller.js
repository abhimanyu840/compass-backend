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

exports.fetchProfile = async(req,res)=>{
    try {
        // Retrieve user profile from database
        const user = await User.findById(req.user.id).select('-password'); // Assuming you store user ID in req.user.id after authentication
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return user profile as response
        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Server Error' });
    }
}