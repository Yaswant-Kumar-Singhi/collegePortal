const express = require('express')

const router = express.Router();

//middleware
const  authChecker   = require ("../middlewares/auth_middleware")

//controllers
const authController = require('../controllers/auth_controller')

router.post('/create',authChecker.authcheck , authController.auth)
router.post('/current-user',authChecker.authcheck , authController.currentUser)
router.post('/current-admin',authChecker.authcheck ,authChecker.adminCheck, authController.currentUser)

module.exports = router;