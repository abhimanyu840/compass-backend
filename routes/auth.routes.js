const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { verifySignupBody } = require('../middleware/auth.mw')

router.post('/signup', [verifySignupBody], authController.signup)
router.post('/signin',authController.signin)


module.exports = router;
