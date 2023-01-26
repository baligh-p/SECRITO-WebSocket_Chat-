
const User = require("../Model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mailer = require("../middleware/mailer")

const createUser = async (req, res) => {
    try {
        const data = req.body
        if (!data.email || !data.username || !data.password) {
            return res.status(500).json({
                error: "all required",
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
                expiresIn: "7d"
            }
        )
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        mailer({
            isHtml: true,
            to: "belighzoughlemi8@gmail.com",
            subject: "test",
            body: "<strong>hello</strong>"
        }, (error, info) => {
            if (error) {
                console.log(error)
            }
            if (info) {
                console.log(info)
            }
        })
        res.status(201).json({
            accessToken
        })

    } catch (e) {
        mailer({
            isHtml: true,
            to: "belighzoughlemi8@gmail.com",
            subject: "test",

            body: "<strong>hello</strong>"
        }, (error, info) => {
            if (error) {
                console.log(error)
            }
            if (info) {
                console.log(info)
            }
        })
        console.log(e)
        res.status(500).json({
            error: e
        })
    }
}
const login = async (req, res) => {
    try {
        var data = req.body
        if (data.email && data.password) {
            var userInstance = await User.findOne(
                { email: data.email.toLowerCase() }
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
                        expiresIn: "15s"
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
                        expiresIn: "7d"
                    }
                )
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    sameSite: "Strict",
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                return res.status(200).json({ accessToken })
            }
            else {
                return res.status(401).json({
                    "error": "bad crendentials",
                })
            }

        }
        else {
            return res.status(400).json({
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
                    error: "unauthorized",
                    message: "bad token"
                })
            } else {
                var accessToken = jwt.sign(
                    {
                        userId: decoded._id,
                        email: decoded.email,
                        username: decoded.username
                    },
                    process.env.tokenKey,
                    {
                        expiresIn: "15s"
                    }
                )
                return res.status(200).json({ accessToken })
            }
        })
    } else {
        console.log(e)
        return res.status(406).json({
            error: "unauthorized",
            message: "no token provided"
        })
    }
}


const welcome = async (req, res) => {
    res.status(200).json(req.body)
}


module.exports = {
    createUser,
    refreshUserToken,
    login,
    welcome
}