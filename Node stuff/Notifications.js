var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'razzledazzle.notifications@gmail.com', // business email
        pass: 'RazzleDazzle1!' // business email password
    }
});

emailAppt = (email, title, notification) => {
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


textAppt = (phoneNumber, notification) => {
    // Code to text
}