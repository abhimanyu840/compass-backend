const userModel = require('../models/user.model')
const { SECRET } = require('../configs/secret.config')
const user_model = require('../models/user.model')
const jwt = require("jsonwebtoken")

const verifySignupBody = async (req, res, next) => {
    const { name, userId, password, email, mobileNo } = req.body
    try {

        // check if Name is present 
        if (!name) {
            return res.status(400).send({
                message: "Failed ! Name was not provied in request body"
            })
        }
        // check if userId is present 
        if (!userId) {
            return res.status(400).send({
                message: "Failed ! UserId was not provied in request body"
            })
        }
        // check if email is present 
        if (!email) {
            return res.status(400).send({
                message: "Failed ! Email was not provied in request body"
            })
        }
        //password check
        if (!password) {
            return res.status(400).send({
                message: "Failed ! Password was not provied in request body"
            })
        }

        //Phone check
        if (!mobileNo) {
            return res.status(400).send({
                message: "Failed ! Mobile Number was not provied in request body"
            })
        }
        //check if user is already present

        let user = await userModel.findOne({ userId })
        if (user) {
            return res.status(400).send({
                message: "Failed ! user with same userId is already present"
            })
        }

        let existingMail = await userModel.findOne({ email })
        if (existingMail) {
            return res.status(400).send({
                message: "Failed ! user with same Email is already present"
            })
        }

        let existingMobileNo = await userModel.findOne({ mobileNo })
        if (existingMobileNo) {
            return res.status(400).send({
                message: "Failed ! user with same Mobile Number is already present"
            })
        }

        next()

    } catch (err) {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}

const verifySignInBody = async (req, res, next) => {
    const { userId, email, mobileNo, password } = req.body
    let verifyInput = userId ? true : email ? true : mobileNo ? true : false
    if (!verifyInput) {
        return res.status(400).send({
            message: "Please Provide userId or Email or MobileNo"
        })
    }
    if (!password) {
        return res.status(400).send({
            message: "password is not provided"
        })
    }
    next()
}

const verifyToken = (req, res, next) => {
    //Check if the token is present in the header
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            message: "No token found : UnAuthorized"
        })
    }

    //If it's the valid token
    jwt.verify(token, SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "UnAuthorized !"
            })
        }
        const user = await user_model.findOne({ userId: decoded.id })
        if (!user) {
            return res.status(400).send({
                message: "UnAuthorized, this user for this token doesn't exist"
            })
        }
        //Set the user info in the req body
        req.user = user
        next()
    })



    //Then move to the next step
}

const isAdmin = (req, res, next) => {
    const user = req.user
    if (user && user.userType == "ADMIN") {
        next()
    } else {
        return res.status(403).send({
            message: "Only ADMIN users are allowed to access this endpoint"
        })
    }
}


module.exports = { verifySignupBody, verifySignInBody, verifyToken, isAdmin }
