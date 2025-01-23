
const express = require('express');
const authRouter = express.Router();

const {getUserURL, confirmUserCredentials} = require("../controllers/auth/authController");

authRouter.post('/getAuthURL', getUserURL);
authRouter.get('/', confirmUserCredentials);

module.exports = authRouter;
