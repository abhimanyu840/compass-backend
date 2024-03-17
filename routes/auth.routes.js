const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const { verifySignupBody, verifySignInBody, verifyToken } = require('../middleware/auth.mw')

router.post('/signup', [verifySignupBody], authController.signup)
router.post('/signin', [verifySignInBody], authController.signin)
router.get('/profile', [verifyToken], userController.fetchProfile)
router.put('/updateUser', authController.updateUser)

router.get('/referral', userController.generateReferralLink);


module.exports = router;
