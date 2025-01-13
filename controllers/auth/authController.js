const {OAuth2Client} = require("google-auth-library");
const Service = require("../../services/user");
const {accountCreatedTemplate} = require("../../templates/email");
const NodemailerService = require("../../services/nodemailer");

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

            const recordFound = await Service.findBy({ email: userData?.data?.email });

            if (!recordFound) {
                const record = await Service.create(userData?.data);
                const html = accountCreatedTemplate(record);
                await NodemailerService.sendEmail(
                    userData?.data?.email,
                    "Welcome to ZeeInvoices!",
                    html,
                );

            } else {
                const currentTime = new Date();
                await Service.update({_id:recordFound?._id},{lastLogin:currentTime});
            }

            res.redirect(`${process.env.FRONTEND_URL}/create-new-invoice?error=${false}&token=${user.access_token}`);
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