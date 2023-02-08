
require("dotenv").config()
const changePwdEmail = (code, email) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
        p {
              color :#404040;
        }
        body{
            height: 100%; 
            width : 100%;
            box-sizing: content-box; 
            padding: 0;
            margin: 0;
        }
        html{
            box-sizing: content-box; 
            padding: 0;
            margin: 0;
            height: 100%; 
            width : 100%;
        }
        .bg {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #fafafa; 
            min-height: 100%; 
            width : 100%;
            padding: 0;
            margin: 0;
        }
        @media screen and (min-width:700px) {
          .card {
            padding-top: 5px;
            padding-bottom: 5px;
            background-color:white;
            border: 0 solid transparent;
            border-radius: 4px;
            width:70%; 
            height:60%;
            box-shadow: 1px 10px 15px rgb(240, 239, 239);
            margin-left: auto;
            margin-right: auto;
        }  
        .card .firstP{
            margin-bottom:50px;
            text-align: center;
            margin-right: auto;
            margin-left: auto;
            width: 80%;
            font-size:17px;
        }
        .card .secondP{
            width: 80%;
            text-align: center;
            margin-right: auto;
            margin-left: auto;
            font-size:17px;
        }
        .card h2 {
            font-size: 30px;
            color :#404040;
            margin-bottom:50px;
            width: 100%;
            text-align: center;
        }
        }
        @media screen and (max-width:699px) {
          .card {
            padding-top: 5px;
            padding-bottom: 5px;
            background-color:white;
            border: 0 solid transparent;
            border-radius: 4px;
            width:100%; 
            height:80%;
            box-shadow: 1px 10px 15px rgb(240, 239, 239);
            margin-left: auto;
            margin-right: auto;
        }  
        .card .firstP{
            margin-bottom:50px;
            text-align: center;
            margin-right: auto;
            margin-left: auto;
            width: 95%;
            font-size:17px;
        }
        .card .secondP{
            width: 95%;
            text-align: center;
            margin-right: auto;
            margin-left: auto;
            font-size:17px;
        }
        .card h2 {
            font-size: 25px;
            color :#404040;
            margin-bottom:50px;
            width: 100%;
            text-align: center;
        }
        }
        .title{
            width: 100%;
        }
        .title h1 {
            padding-top: 50px;
            margin-top: 50px;
            color : #ec4899 ; 
            font-size: 43px;
            letter-spacing: 2px; 
            width: 100%;
            text-align: center;
            margin-bottom: 25px;
            font-family: cursive;
        } 
        .card div 
        {
            width: 100%;
            text-align: center;
        }
        .card div a
        {
            text-decoration:none ;
            color : white ;
        }
        .card div .btn{
            padding-left:12px;
            padding-right:12px; 
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom:50px;
            background-color : #ec4899;
            font-size: 20px;
            cursor: pointer;
            border: 0 solid transparent; 
            color : white ;
            border-radius: 5px;
            box-shadow: 1px 10px 15px rgb(221, 221, 221);
        } 
        .aboutSection{
            margin-top: 50px;
            padding-bottom: 50px;
            width : fit-content;
            margin-left: auto;
            margin-right: auto;
        }
        .aboutSection a {
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            color : #171717;
        }
        .aboutSection .firstA {
            margin-right: 20px;
        }
        .aboutSection .firstA:hover {
            color :#ec4899;
        }
        .aboutSection .secondA{
            margin-left: 20px;
        }
        .aboutSection .secondA:hover{
            color :#ec4899;
        }
        .aboutSection p {
            font-size: 20px;
            font-weight: 700;
        }
    </style>
    </head>
    <body>
        <div class="bg">
            <div class="title">
                <h1>Secrito</h1>
            </div>
            <div class="card">
                <h2>Need a new password?</h2>
                <p class="firstP">No worries. Click the button below to reset and choose a new one.</p>
                <div><button class="btn"><a href="${process.env.BASE_URL}/auth/change-password/${email}/${code}">Reset Password</a></button></div>
                <p class="secondP">Didn’t request this change? You can ignore this email and get back to business as usual.</p>
            </div>
            <div class="aboutSection">
                <a class="firstA" href="${process.env.BASE_URL}/about">About Secrito</a>
                <a class="secondA" href="${process.env.BASE_URL}/support">Support</a>
            </div>
        </div>
    </body>
    </html>
    `
}






module.exports = changePwdEmail