// This file contains the API endpoints for the frontend to call in order to access any business logic for account business objects.
// Each endpoint has an associated controller it calls to handle responses of each request.

const {registerAccountController, loginController} = require('../controllers/AccountController');

const accountRouter = require('express').Router();

accountRouter.post('/register', registerAccountController);
accountRouter.get('/login', loginController)

module.exports = accountRouter;