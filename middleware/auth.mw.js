const userModel = require('../models/user.model')


const verifySignupBody = async (req, res, next) => {
    const { name, userId, password, email } = req.body
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
        //check if user is already present

        let user = await userModel.findOne({ userId })
        if (user) {
            return res.status(400).send({
                message: "Failed ! user with same userId is already present"
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

module.exports = { verifySignupBody }
