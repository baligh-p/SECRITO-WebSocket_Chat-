const nodeMailer = require("nodemailer")
require("dotenv").config()


const mailer = ({ isHtml = false, to, subject = "", body = "" }, callback = () => { }) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS
        }
    })


    const mailOptions = isHtml ? {
        "from": "Secrito" + process.env.EMAIL_ADDRESS,
        "to": to,
        "subject": subject,
        "html": body
    } : {
        "from": "Secrito" + process.env.EMAIL_ADDRESS,
        "to": receiver,
        "subject": subject,
        "text": body
    }

    transporter.sendMail(mailOptions, callback);
}



module.exports = mailer