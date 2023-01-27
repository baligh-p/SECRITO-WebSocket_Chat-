const User = require("../Model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mailer = require("../middleware/mailer")
const upload = require("../middleware/upload")
// const MongoClient = require("mongodb").MongoClient;
// const GridFSBucket = require("mongodb").GridFSBucket;
// const nodeMailer = require("nodemailer")

const baseUrl = "http://localhost:4000/files/";


const createUser = async (req, res) => {
    try {
        const data = req.body
        if (!data.email || !data.username || !data.password) {
            return res.status(500).json({
                error: "all required", 
            })
        }
        await upload(req.file, res)
        if (req.file == undefined) {
            res.send({
              message: "You must select a file."
            });
        }
        else if (req.file.bucketName=='photos'){
            res.send({
                message: "File has been uploaded."
            })
        }else{
            res.status(400).json({
                error : "Image Type should be (JPEG/PNG)"
            })
        }
        const encryptedPassword = await bcrypt.hash(data.password, 5)
        const userInstance = await User.create({
            username: data.username,
            password: encryptedPassword,
            email: data.email.toLowerCase(),
            image: req.file.filename
        })
        await userInstance.save()
        const accessToken = jwt.sign(
            {
                userId: userInstance._id,
                email: userInstance.email,
                username: userInstance.username
            },
            process.env.TOKEN_KEY,
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
        mailer({
            isHtml: true,
            to: "raed.bouaafif@gmail.com",
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
            to: "raed.bouaafif@@gmail.com",
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
        res.status(500).json({
            error: e.message
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
                    process.env.TOKEN_KEY,
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

const welcome = async (req, res) => {
    res.status(200).json(req.body)
}


module.exports = {
    createUser,
    refreshUserToken,
    login,
    welcome
}