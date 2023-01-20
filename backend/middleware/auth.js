const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
        return res.status(403).json({
            "success": false,
            "erroMessage": "no token provided"
        })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.tokenKey)
            req.body = decoded;
        }
        catch (e) {
            return res.status(406).json({
                errorType: "unauthorized",
                Errormessage: "bad token"
            })
        }
    }
    return next();
}


module.exports = authMiddleWare