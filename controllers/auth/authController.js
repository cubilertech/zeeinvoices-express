const {OAuth2Client} = require("google-auth-library");
const Service = require("../../services/user");
const {accountCreatedTemplate} = require("../../templates/email");
const NodemailerService = require("../../services/nodemailer");
const bcrypt = require("bcrypt");
const generateJwt = require("../../utils/generateJwt");

exports.getUserURL = async (req, res) => {
    try {
        const redirectUrl = `${process.env.GOOGLE_CALLBACK_URL}`;

        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        )

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
            prompt: 'consent'
        });
        res.status(200).json({url: authorizeUrl});
    } catch (err) {
        console.log("error", err);
        res.status(500).json({
            error: true,
            message: "Failed to get user url"
        })
    }
};

const getUserData = async (access_token) => {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

        const data = await response.json();
        return {error: false, data: data};
    } catch (err) {
        return {error: true}
    }
}

exports.confirmUserCredentials = async (req, res) => {
    try {
        const code = req.query.code;
        const redirectUrl = `${process.env.GOOGLE_CALLBACK_URL}`;

        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        )

        if (req.query.error === 'access_denied') {
            return res.redirect(`${process.env.FRONTEND_URL}`);
        }

        const resAuth = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(resAuth.tokens);

        const user = oAuth2Client.credentials;

        const userData = await getUserData(user.access_token);

        if (userData.error) {
            res.status(500).json({
                error: true,
                message: "Failed to get user data"
            })
        } else {

            let recordFound = await Service.findBy({ email: userData?.data?.email }, {
                $where: {
                    is_local_user: false
                }
            });

            if (!recordFound) {
                recordFound = await Service.create(userData?.data);
                const html = accountCreatedTemplate(recordFound);
                await NodemailerService.sendEmail(
                    userData?.data?.email,
                    "Welcome to ZeeInvoices!",
                    html,
                );

            } else {
                const currentTime = new Date();
                recordFound = await Service.update({_id:recordFound?._id},{lastLogin:currentTime});
            }

            const payload = {
                _id: recordFound._id,
                email: recordFound.email,
                is_local_user: recordFound.is_local_user,
                name: recordFound.name,
                image: recordFound.image,
                phone: recordFound.phone,
                city: recordFound.city,
                state: recordFound.state,
                address: recordFound.address,
                createdAt: recordFound.createdAt,
            }
            const response = await generateJwt(payload);

            if (response.error) {
               return res.redirect(`${process.env.FRONTEND_URL}/?error=${true}&error_msg=${response.message}`);
            } else {
                res.redirect(`${process.env.FRONTEND_URL}/create-new-invoice?error=${false}&token=${response.token}`);
            }
        }
    } catch (err) {
        console.log("error", err);
        res.redirect(`${process.env.FRONTEND_URL}/?error=${true}&error_msg=${err.message}`);
        // res.status(500).json({
        //     error: true,
        //     message: "Failed to get user url"
        // })
    }
}

exports.userLocalSignUp = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!email || email === "" || email.length <= 0) {
            return res.status(400).json({
                error: true,
                message: "Email and password are required"
            })
        }

        if (!password || password === "" || password.length <= 0) {
            return res.status(400).json({
                error: true,
                message: "Email and password are required"
            })
        }

        const recordFound = await Service.findBy({ email }, {
            $where: {
                is_local_user: true
            }
        });
        if (recordFound) {
            res.status(400).json({
                error: true,
                message: "User already signed up with this email",
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 11);
            const record = await Service.create({ name: `${first_name} ${last_name}`, email, password: hashedPassword, is_local_user: true });
            res.status(200).json({
                error: false,
                message: "User sign up successfully",
                data: record
            })
        }
    } catch (err) {
        console.log("error", err);
        res.status(500).json({
            error: true,
            message: "Failed to Sign up"
        })
    }
};

exports.userLocalSignIn = async (req, res) => {
    try {
        const {email, password, remember_me} = req.body;

        if (!email || email === '' || !password || password === '') {
            return res.status(400).json({error: true, message: 'Email or password is required'});
        }

        const user = await Service.findBy({email}, {
            $where: {
                is_local_user: true
            }
        });

        if (user && user._id) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    is_local_user: user.is_local_user,
                    name: user.name,
                    image: user.image,
                    phone: user.phone,
                    city: user.city,
                    state: user.state,
                    address: user.address,
                    createdAt: user.createdAt,
                }
                const response = await generateJwt(payload, remember_me);
                if (response.error) {
                    return res.status(500).json({error: true, message: 'Failed to sign in'});
                } else {
                    return res.status(200).json({error: false, message: 'User signed in successfully', data: user, token: response.token});
                }
            } else {
                return res.status(400).json({error: true, message: 'Invalid password'});
            }
        } else {
            return res.status(404).json({error: true, message: 'User not found'});
        }

    } catch (err) {
        console.log("Error", err);
        res.status(500).json({
            error: true,
            message: 'Failed to sign in'
        })
    }
}