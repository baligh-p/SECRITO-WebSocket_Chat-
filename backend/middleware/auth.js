const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
        return res.status(403).json({
            "name": "NoTokenProvided"
        })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY)
            req.body = decoded;
        }
        catch (e) {
            return res.status(406).json(e)
        }
    }
    return next();
}


module.exports = authMiddleWare