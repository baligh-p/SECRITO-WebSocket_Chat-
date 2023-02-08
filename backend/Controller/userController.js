const User = require("../Model/User")
const LinkChangePwd = require("../Model/LinkChangePwd")
const changePwdEmail = require("../Template/ChangePwdEmail")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mailer = require("../middleware/mailer")
const upload = require("../middleware/upload")
const { Link } = require("react-router-dom")
const mongoClient = require("mongodb").MongoClient;

const baseUrl = "http://localhost:4000/files/";


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
        // await upload(req, res)
        // console.log(req.file)
        // if (req.file == undefined) {
        //     res.send({
        //         message: "You must select a file."
        //     });
        // }
        // else if (req.file.bucketName == 'photos') {
        //     res.send({
        //         message: "File has been uploaded."
        //     })
        // } else {
        //     res.status(400).json({
        //         error: "Image Type should be (JPEG/PNG)"
        //     })
        // }
        const encryptedPassword = await bcrypt.hash(data.password.trim(), 10)
        const userInstance = await User.create({
            username: data.username.trim(),
            password: encryptedPassword,
            email: data.email.toLowerCase().trim(),
            name: data.name.trim(),
            // image: req.file.filename
        })

        await userInstance.save()
        const accessToken = jwt.sign(
            {
                userId: userInstance._id,
                email: userInstance.email,
                username: userInstance.username,
                name: userInstance.name,
                // image: userInstance.image ? baseUrl + userInstance.image : userInstance.image
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "15s"
            }
        )
        const refreshToken = jwt.sign(
            {
                userId: userInstance._id,
                email: userInstance.email,
                username: userInstance.username,
                name: userInstance.name,
                // image: baseUrl + userInstance.image
            },
            process.env.TOKEN_KEY,
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

        else {
            console.log(e)
            res.status(500).json({
                error: "server side"
            })
        }
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
                        name: userInstance.name,
                        // image: baseUrl + userInstance.image
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "15s"
                    }
                )
                const refreshToken = jwt.sign(
                    {
                        userId: userInstance._id,
                        email: userInstance.email,
                        username: userInstance.username,
                        name: userInstance.name,
                        // image: baseUrl + userInstance.image
                    },
                    process.env.TOKEN_KEY,
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
            jwt.verify(refreshToken, process.env.TOKEN_KEY, (err, decoded) => {
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
                            name: decoded.name,
                            // image: decoded.image
                        },
                        process.env.TOKEN_KEY,
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


const changePwd = async (req, res) => {
    try {
        var { email, password, code } = req.body
        email = email.trim()
        if (email && password?.trim().length >= 5 && code) {
            const deleteInfo = await LinkChangePwd.deleteOne({ email, code })
            if (deleteInfo.deletedCount) {
                const encryptedPassword = await bcrypt.hash(password.trim(), 10)
                const updateInfo = await User.updateOne({ email }, { password: encryptedPassword })
                if (updateInfo.modifiedCount) {
                    return res.status(200).json({ success: true })
                }
            }
        }
        return res.status(400).json({ error: "badRequest" })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "server side" })
    }
}


const generateCode = (nbr) => {
    var code = ""
    var type;
    for (var i = 0; i < nbr; i++) {
        type = parseInt(Math.random() * 2)
        switch (type) {
            case 0:
                code += parseInt(Math.random() * 10)
                break;
            case 1:
                code += String.fromCharCode(parseInt(Math.random() * 26) + 97)
                break;
        }
    }
    return code
}

const sendChangePwdLink = async (req, res) => {
    try {
        const email = req.params.email.trim()
        if (email) {
            const userInstance = await User.findOne({ email: email })
            if (userInstance) {
                const link = await LinkChangePwd.findOne({ "email": email }, "code")
                var code
                if (link) {
                    code = link.code
                } else {
                    code = generateCode(30)
                    const LinkPWD = await LinkChangePwd.create({
                        code: code,
                        email: email.toLowerCase()
                    })
                    await LinkPWD.save()
                }
                mailer({ isHtml: true, subject: "[Secrito] Reset your password", to: email, body: changePwdEmail(code, email) }, () => {
                    console.log("success")
                })
            }
            return res.status(200).json({ success: true })
        } else return res.status(400).json({ "error": "email required" })
    } catch (e) {
        console.log(e)
        if (e.errors?.email?.properties?.message === "bad email") res.status(400).json({
            error: "bad email"
        })
        else return res.status(500).json({
            error: "server side"
        })
    }
}

// // Retrieve and Return user Profile image
// const getImageByName = async (req, res) => {
//     try {
//         x = await getUserPhoto(req.params.imgName)
//         return res.status(200).json(x)
//     } catch (e) {
//         return res.status(500).send({
//             error: e.message
//         })
//     }
// }

// // Get UrlImage by ImageName
// async function getUserPhoto(imgName) {
//     try {
//         await mongoClient.connect()
//         const database = mongoClient.db(process.enc.databse)
//         const images = database.collection(process.enc.imgBucket + ".files")
//         cursor = images.find({ filename: imgName })
//         if (cursor.count == 0) {
//             return {
//                 message: "there is no image with the following name" + imgName
//             }
//         }
//         let fileInfos = [];
//         await cursor.forEach((doc) => {
//             fileInfos.push({
//                 url: baseUrl + doc.filename
//             });
//         });
//         return fileInfos[0]
//     } catch (e) {
//         return e.message
//     }
// }


const welcome = async (req, res) => {
    res.status(200).json(req.body)
}


module.exports = {
    createUser,
    refreshUserToken,
    login,
    welcome,
    verifyCredentials,
    changePwd,
    sendChangePwdLink
}

// get all images ( mazelt configuration feha)
// const getListFiles = async (req, res) => {
//     try {
//       await mongoClient.connect();

//       const database = mongoClient.db(dbConfig.database);
//       const images = database.collection(dbConfig.imgBucket + ".files");

//       const cursor = images.find({});

//       if ((await cursor.count()) === 0) {
//         return res.status(500).send({
//           message: "No files found!",
//         });
//       }

//       let fileInfos = [];
//       await cursor.forEach((doc) => {
//         fileInfos.push({
//           name: doc.filename,
//           url: baseUrl + doc.filename,
//         });
//       });

//       return res.status(200).send(fileInfos);
//     } catch (error) {
//       return res.status(500).send({
//         message: error.message,
//       });
//     }
//   };



//-------------------------------------------------------------------------------



// download from database a photo ( search by photo name)
//   const download = async (req, res) => {
//     try {
//       await mongoClient.connect();

//       const database = mongoClient.db(dbConfig.database);
//       const bucket = new GridFSBucket(database, {
//         bucketName: dbConfig.imgBucket,
//       });

//       let downloadStream = bucket.openDownloadStreamByName(req.params.name);

//       downloadStream.on("data", function (data) {
//         return res.status(200).write(data);
//       });

//       downloadStream.on("error", function (err) {
//         return res.status(404).send({ message: "Cannot download the Image!" });
//       });

//       downloadStream.on("end", () => {
//         return res.end();
//       });
//     } catch (error) {
//       return res.status(500).send({
//         message: error.message,
//       });
//     }
//   };
