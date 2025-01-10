const {OAuth2Client} = require("google-auth-library");


exports.getUserURL = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("referrerPolicy", "no-referrer-when-downgrade");

        const redirectUrl = 'https://staging.zeeinvoices/oauth';

        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        )

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
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
        const redirectUrl = 'https://staging.zeeinvoices/oauth';

        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        )

        const resAuth = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(resAuth.tokens);

        const user = oAuth2Client.credentials;

        console.log("credentials", user);
        const userData = await getUserData(user.access_token);

        if (userData.error) {
            res.status(500).json({
                error: true,
                message: "Failed to get user data"
            })
        } else {
            console.log("UserData", userData.data);
        }
    } catch (err) {
        console.log("error", err);
        res.status(500).json({
            error: true,
            message: "Failed to get user url"
        })
    }
}