const nodemailer = require('nodemailer')

const mailer = (email, token) => {

    // The output message to be shown
    const output = `
        <p>You have signed up to my app, Next step is to verify your account</p>
        <p>Click on this link to activate your account <a href="http://localhost:500/?token=${token}&email=${email}">http://localhost:500/?token=${token}&email=${email}</a></p>
    `;

    var transporter = nodemailer.createTransport({
        
    })

}