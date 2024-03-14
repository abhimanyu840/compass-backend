const mongoose = require('mongoose')
const { Schema } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unique: true
    },
    mobileNo: {
        type: Number,
        required: true,
        min: 10,
        unique: true
    },
    userType: {
        type: String,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    },
    referralCode: {
        type: String,
        unique: true
    },
    referralCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const User = mongoose.model('user', userSchema);
module.exports = User;