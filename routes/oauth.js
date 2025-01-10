
const express = require('express');
const authRouter = express.Router();

const {OAuth2Client} = require('google-auth-library');
const {getUserURL} = require("../controllers/auth/authController");

authRouter.post('/getAuthURL', getUserURL);
authRouter.get('/', )

module.exports = authRouter;
