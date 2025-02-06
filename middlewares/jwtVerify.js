const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error", error);
        res.status(401).json({ error: true, message: 'Un-Authorized' });
    }
}

module.exports = jwtVerify;