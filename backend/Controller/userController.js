
const User = require("../Model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mailer = require("../middleware/mailer")

const createUser = async (req, res) => {
    try {
        const data = req.body
        if (!data.email?.trim() || !data.username?.trim() || !data.password?.trim() || !data.name?.trim()) {
            return res.status(422).json({
                error: "all required",
            })
        }
        if (data.password?.trim().length < 5) {
            return res.status(400).json({
                error: "passwordLength",
                message: "password must have at least 5 characters"
            })
        }
        const encryptedPassword = await bcrypt.hash(data.password.trim(), 10)
        const userInstance = await User.create({
            username: data.username.trim(),
            password: encryptedPassword,
            email: data.email.toLowerCase().trim(),
            name: data.name.trim()
        })

        await userInstance.save()
        const accessToken = jwt.sign(
            {
                userId: userInstance._id,
                email: userInstance.email,
                username: userInstance.username,
                name: userInstance.name
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
                username: userInstance.username,
                name: userInstance.name
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

        res.status(200).json({
            accessToken
        })

    } catch (e) {
        if (e.keyValue?.email) res.status(409).json({
            error: "conflictEmail",
            message: "Email already used"
        })
        else if (e.keyValue?.username) res.status(409).json({
            error: "conflictUsername",
            message: "Username already used"
        })

        else if (e.errors?.email?.properties?.message === "bad email") res.status(400).json({
            error: "bad email"
        })

        else res.status(500).json({
            error: "server side"
        })
    }
}


const verifyCredentials = async (req, res) => {
    try {
        const data = req.body
        if (!data.email?.trim() || !data.username?.trim() || !data.password?.trim() || !data.name?.trim()) {
            return res.status(422).json({
                error: "all required",
            })
        }
        if (data.password?.trim().length < 5) {
            return res.status(400).json({
                error: "passwordLength",
                message: "password must have at least 5 characters"
            })
        }
        var errors = []

        const userInstance = await User.findOne({ email: data.email.toLowerCase().trim() })
        if (userInstance) {
            errors.push({
                error: "conflictEmail",
                message: "Email already used"
            })
        }
        const userInstanceUsername = await User.findOne({ username: data.username.trim() })
        if (userInstanceUsername) {
            errors.push({
                error: "conflictUsername",
                message: "Username already used"
            })
        }
        if (errors.length) {
            return res.status(409).json(errors)
        }
        const code = parseInt(Math.random() * 3 + 2)
        mailer({
            isHtml: true,
            from: "belighzoughlemi6@gmail.com",
            to: "belighzoughlemi8@gmail.com",
            subject: "Please Verify your account using this code",
            body: ((7 ** (Number(req.body.code) * code)) + "").substring(0, 4)
        })
        res.status(200).json({
            success: true,
            code: code
        })
    } catch (e) {
        res.status(500).json({
            error: "server side"
        })
    }
}

const login = async (req, res) => {
    try {
        var data = req.body
        if (data.email && data.password) {
            var userInstance = await User.findOne(
                { email: data.email.toLowerCase().trim() }
            )
            if (userInstance && (await bcrypt.compare(data.password.trim(), userInstance.password))) {
                const accessToken = jwt.sign(
                    {
                        userId: userInstance._id,
                        email: userInstance.email,
                        username: userInstance.username,
                        name: userInstance.name
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
                        username: userInstance.username,
                        name: userInstance.name
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
                return res.status(400).json({
                    "error": "bad crendentials",
                })
            }
        }
        else {
            return res.status(422).json({
                "error": "credentials required",
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "server side"
        })
    }

}


const refreshUserToken = async (req, res) => {
    try {
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
                            username: decoded.username,
                            name: decoded.name
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
    catch (e) {
        return res.status(500).json({
            error: "server side"
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
    welcome,
    verifyCredentials
}