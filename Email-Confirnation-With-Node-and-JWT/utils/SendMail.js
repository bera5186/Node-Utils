const nodemailer = require('nodemailer')

const mailer = (email, token) => {

    // The output message to be shown
    const output = `
        <p>You have signed up to my app, Next step is to verify your account</p>
        <p>Click on this link to activate your account <a href="http://localhost:5000/verify/?token=${token}&email=${email}">http://localhost:5000/verify/?token=${token}&email=${email}</a></p>
    `;

    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user: '', // Your Email
            pass: '' // your password
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: ' "Node Account Activation" <development.tests.rahul@gmail.com> ',
        to: email,
        subject: 'Account Activation',
        text: 'Account Activation',
        html: output
    }

    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) console.log(err)
    
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        })      
    } catch (error) {
       return 'Cannot send email' 
    }
}

module.exports = { mailer }