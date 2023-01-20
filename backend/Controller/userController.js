
const User = require("../Model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const createUser = async (req, res) => {
    try {
        const data = req.body
        if (!data.email || !data.username || !data.password) {
            return res.status(500).json({
                error: "all required",
                success: false
            })
        }
        const encryptedPassword = await bcrypt.hash(data.password, 5)
        const userInstance = await User.create({
            username: data.username,
            password: encryptedPassword,
            email: data.email.toLowerCase()
        })
        await userInstance.save()
        const accessToken = jwt.sign(
            {
                userId: userInstance._id,
                email: userInstance.email,
                username: userInstance.username
            },
            process.env.tokenKey,
            {
                expiresIn: "10m"
            }
        )
        const refreshToken = jwt.sign(
            {
                userId: userInstance._id,
                email: userInstance.email,
                username: userInstance.username
            },
            process.env.tokenKey,
            {
                expiresIn: "1d"
            }
        )
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(201).json({
            success: true,
            accessToken
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            error: e
        })
    }
}
const login = async (req, res) => {
    try {
        var data = req.body
        if (data.username && data.password) {
            var userInstance = await User.findOne(
                { username: data.username }
            )
            if (userInstance && (await bcrypt.compare(data.password, userInstance.password))) {
                const accessToken = jwt.sign(
                    {
                        userId: userInstance._id,
                        email: userInstance.email,
                        username: userInstance.username
                    },
                    process.env.tokenKey,
                    {
                        expiresIn: "10m"
                    }
                )
                const refreshToken = jwt.sign(
                    {
                        userId: userInstance._id,
                        email: userInstance.email,
                        username: userInstance.username
                    },
                    process.env.tokenKey,
                    {
                        expiresIn: "1d"
                    }
                )
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    sameSite: "Strict",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                return res.status(200).json({ success: true, accessToken })
            }
            else {
                return res.status(404).json({
                    "success": false,
                    "error": "bad crendentials",
                })
            }

        }
        else {
            return res.status(400).json({
                "success": false,
                "error": "credentials required",
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            "success": false,
        })
    }

}


const refreshUserToken = async (req, res) => {
    if (req.cookies?.jwt) {
        var refreshToken = req.cookies.jwt
        jwt.verify(refreshToken, process.env.tokenKey, (err, decoded) => {
            if (err) {
                console.log(err)
                res.status(406).json({
                    errorType: "unauthorized",
                    Errormessage: "bad token"
                })
            } else {
                var accesToken = jwt.sign(
                    {
                        userId: decoded._id,
                        email: decoded.email,
                        username: decoded.username
                    },
                    process.env.tokenKey,
                    {
                        expiresIn: "10m"
                    }
                )
                return res.status(200).json({ accesToken })
            }
        })
    } else {
        console.log(e)
        return res.status(406).json({
            errorType: "unauthorized",
            Errormessage: "no token provided"
        })
    }
}


module.exports = {
    createUser,
    refreshUserToken,
    login
}