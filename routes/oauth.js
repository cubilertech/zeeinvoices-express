
const express = require('express');
const authRouter = express.Router();

const {getUserURL, confirmUserCredentials, userLocalSignUp, userLocalSignIn, userForgetPassword, userVerifyToken,
    userResetPassword
} = require("../controllers/auth/authController");
const jwtVerify = require("../middlewares/jwtVerify");

authRouter.post('/getAuthURL', getUserURL);
authRouter.get('/', confirmUserCredentials);
authRouter.post('/sign-up', userLocalSignUp);
authRouter.post('/sign-in', userLocalSignIn);
authRouter.post('/forget-password', userForgetPassword);
authRouter.post('/verify-token', jwtVerify, userVerifyToken);
authRouter.put('/reset-password', jwtVerify, userResetPassword);

module.exports = authRouter;
