
const express = require('express');
const authRouter = express.Router();

const {getUserURL, confirmUserCredentials, userLocalSignUp, userLocalSignIn} = require("../controllers/auth/authController");

authRouter.post('/getAuthURL', getUserURL);
authRouter.get('/', confirmUserCredentials);
authRouter.post('/sign-up', userLocalSignUp);
authRouter.post('/sign-in', userLocalSignIn);

module.exports = authRouter;
