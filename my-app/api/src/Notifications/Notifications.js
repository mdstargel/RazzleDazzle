var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'razzledazzle.notifications@gmail.com', // business email
        pass: 'RazzleDazzle1!' // business email password
    }
});

function Email_Appointment(email, title, notification) {
    var emailOptions = {
        from: 'razzledazzle.notifications@gmail.com', //business email
        to: email,
        subject: title,
        text: notification
    };

    transporter.sendMail(emailOptions, function(error) {
        if (error) throw error;
    })
};


function Text_Appointment(phoneNumber, notification) {
    // Code to text
}

module.exports = {
    Email_Appointment,
    Text_Appointment
}