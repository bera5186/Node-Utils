const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('contact')
})

app.post('/', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    var transporter = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        // port: 2525,
        service: 'gmail',
        auth: {
            user: "development.tests.rahul@gmail.com", // Sender's email address
            pass: "#rahul123" // password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Nodemailer Contact" <rbasu611@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', { msg: 'Email has been sent, Check You Email' });
    });


})
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })