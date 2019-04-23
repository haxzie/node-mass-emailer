const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')

module.exports.getTransporter = function (email, password) {
    return nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: email,
            pass: password
        }
    }));
}


module.exports.sendMail = async function(transporter, email, subject, contents) {
    let mailOptions = {
        to: email,
        subject: subject,
        html: contents,
    };

    transporter.sendMail(mailOptions, async function(error, info) {
        // something went wrong while sending the emails!
        if (error) {
            console.log(`Oops! Something went wrong!
                ${error}
            `);
        } else {
            console.log(`Email sent : ${email}`);
            //console.log(info);
        }
        return;
    });
}