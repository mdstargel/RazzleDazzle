var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '', // business email
        pass: '' // business email password
    }
});

emailAppt = (email, title, notification) => {
    var emailOptions = {
        from: '', //business email
        to: email,
        subject: title,
        text: notification
    };

    transporter.sendMail(emailOptions, function(error) {
        if (error) throw error;
    })
};


textAppt = (phoneNumber, notification) => {
    // Code to text
}