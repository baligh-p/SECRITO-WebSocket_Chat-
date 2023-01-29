const util = require("util")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")
const dbConfig = require("../db/connect")
var storage = new GridFsStorage({
    url : process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file : (req,file) =>{
        if (file.mimetype != "image/png" && file.mimetype != "image/jpeg") {
            res.status(400).json({
                error : "File Type should be (JPEG/PNG)"
            })
        }else{
            return {
                bucketName: process.env.imgBucket,
                filename: `${Date.now()}-bezkoder-${file.originalname}`
            }
        }
    }
})

var uploadFiles = multer({ storage: storage }).single("file")
var uploadFilesMiddleware = util.promisify(uploadFiles)
module.exports = uploadFilesMiddleware
