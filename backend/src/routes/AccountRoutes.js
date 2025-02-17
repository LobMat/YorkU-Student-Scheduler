
const AccountController = require('../controllers/AccountController')
const router = require('express').Router();

router.post("/register", AccountController.registerController)

module.exports = router;