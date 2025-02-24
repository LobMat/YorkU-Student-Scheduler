const { registerController } = require('../controllers/AccountController')

const accountRouter = require('express').Router();

accountRouter.post("/register", registerController)

module.exports = accountRouter;