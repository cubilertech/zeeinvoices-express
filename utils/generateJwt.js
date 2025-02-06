const jwt = require("jsonwebtoken");

const generateJwt = (data, is30Days) => {
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: is30Days ? "30d" : "1d"
        })
        return {token: token, error: false}
    } catch (err) {
        return {error: true, message: err.message}
    }
}

module.exports = generateJwt;