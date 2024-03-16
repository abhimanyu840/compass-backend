const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../configs/secret.config.js')


exports.signup = async (req, res) => {
    // Read the request body
    const { name, userId, password, email, mobileNo } = req.body;

    function generateRandomCode() {
        const chars = 'acdefhiklmnoqrstuvwxyz'; // Characters
        const numbers = '0123456789'; // Numbers
        let randomString = '';

        for (let i = 0; i < 3; i++) {
            const charIndex = Math.floor(Math.random() * chars.length);
            const numIndex = Math.floor(Math.random() * numbers.length);
            randomString += chars.charAt(charIndex) + numbers.charAt(numIndex);
        }

        return randomString;
    }


    try {

        let referralCodeTemp = generateRandomCode();
        let referralCode
        if (user_model.findOne({ referralCode: referralCodeTemp })) {

            referralCodeTemp = generateRandomCode();
            referralCode = referralCodeTemp
        } else {
            referralCode = referralCodeTemp
        }



        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user_model({ name, userId, email, mobileNo, password: hashedPassword, referralCode });
        const createdUser = await newUser.save();

        res.status(201).json(createdUser);
    } catch (err) {
        console.error("Error occurred during user registration:", err);
        res.status(500).json({ message: "An error occurred while registering the user" });
    }
}


exports.signin = async (req, res) => {
    try {
        // Find the user by userId or email
        const user = await user_model.findOne({ $or: [{ userId: req.body.userId }, { email: req.body.email }, { mobileNo: req.body.mobileNo }] });

        if (!user) {
            return res.status(400).send({
                message: 'Invalid user id or email'
            });
        }

        // Check password validity
        const isPassValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPassValid) {
            return res.status(400).send({
                message: "Invalid Credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.userId }, SECRET, { expiresIn: '10d' });

        // Send user information and token back to the client
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            referralCode: user.referralCode,
            mobileNo: user.mobileNo,
            accessToken: token
        });
    } catch (err) {
        console.error("Error occurred during user signin:", err);
        res.status(500).json({ message: "An error occurred while signing in" });
    }
}

exports.updateUser = async (req, res) => {
    const { userId, oldPassword, newPassword, email, mobileNo } = req.body;

    try {
        const user = await user_model.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If oldPassword and newPassword are provided, update the password
        if (oldPassword && newPassword) {
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid old password" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedNewPassword;
        }

        // Update email if provided
        if (email) {
            user.email = email;
        }

        // Update mobileNo if provided
        if (mobileNo !== undefined) {
            user.mobileNo = mobileNo;
        }

        const updatedUser = await user.save(); // Save the updated user

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error occurred while updating user:", err);
        res.status(500).json({ message: "An error occurred while updating user" });
    }
};



