const express = require('express')
const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../configs/secret.config.js')


exports.signup = async (req, res) => {
    // Read the request body
    const { name, userId, password, email } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user_model({ name, userId, email, password: hashedPassword });
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
        const user = await user_model.findOne({ $or: [{ userId: req.body.userId }, { email: req.body.email }] });
        
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
            accessToken: token
        });
    } catch (err) {
        console.error("Error occurred during user signin:", err);
        res.status(500).json({ message: "An error occurred while signing in" });
    }
}