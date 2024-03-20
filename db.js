const mongoose = require('mongoose')
const user_model = require('./models/user.model')
const bcrypt = require('bcryptjs')
// const { DB_NAME, MONGO_URI } = require('./configs/db.config')

// const connectToMongo = handler => async (req, res) => {
//     if (mongoose.connections[0].readyState) {
//         return handler(req, res)
//     }
//     console.log(MONGO_URI)
//     await mongoose.connect(`${MONGO_URI}`, () => {
//         console.log("Connected to Mongoose Successfully");
//     })
//     return handler(req, res);
// }

mongoose.connect(process.env.MONGO_URI)
// mongoose.connect(MONGO_URI)
// console.log(process.env.MONGO_URI)

const connectToMongo = mongoose.connection
connectToMongo.on("error", () => {
    console.log('Error while connecting to the mongoDB')
})
connectToMongo.once("open", () => {
    console.log("Connected to MongoDB")
    adminInit()
})

const adminInit = async () => {
    try {
        let user = await user_model.findOne({ userId: "admin" })

        if (user) {
            console.log("Admin is already present")
            return
        }

    } catch (err) {
        console.log("Error while reading the data", err)
    }


    try {
        user = await user_model.create({
            name: "Investment Compass",
            userId: "admin",
            email: "theinvestmentcompass@admin.com",
            userType: "ADMIN",
            mobileNo: 8825212001,
            password: bcrypt.hashSync("password", 10)
        })
        console.log("Admin created ", user)


    } catch (err) {
        console.log("Error while create admin", err)
    }
}

module.exports = connectToMongo;