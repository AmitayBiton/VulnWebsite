var nodemailer = require('nodemailer');
const MAIL_CONFIG = require("../config/transporter.congif");

const transporter = nodemailer.createTransport(MAIL_CONFIG);

exports.notify = (emailAddress,message,subject) => {
    var mailOptions = {
        from: 'VulnNotifier@gmail.com',
        to: emailAddress,
        subject: subject,
        text: message
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}