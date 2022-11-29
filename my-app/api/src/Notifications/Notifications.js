var nodemailer = require('nodejs-nodemailer-outlook');

function Email_Appointment(email, title, notification) {
    nodemailer.sendEmail({
        auth: {
            user: "REHarris@csustudent.net",
            pass: "password"
        },
        from: 'REHarris@csustudent.net',
        to: email,
        subject: title,
        text: notification
    })
};


function Text_Appointment(phoneNumber, notification) {
    // Code to text
}

module.exports = {
    Email_Appointment,
    Text_Appointment
}