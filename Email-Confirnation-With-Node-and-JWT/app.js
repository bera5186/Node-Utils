const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express')
const nodeMailer = require('nodemailer')
const user = require('./models/User')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/email-verification')
    .then(() => {
        console.log('db Connected 🔥')
    })
    .catch(() => {
        console.log('db Fucked up 😛')
    })

const PORT = process.env.PORT || 5000
app.post('/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    let token = jwt.sign({ data: email }, '!@#$%^&*', { expiresIn: '1h' })
    const userdata = new user({
        email,
        password,
        token
    })

    await userdata.save((err, response) => {
        if (err) res.status(500).json({ 'message': 'Server Fucked Up 😑😢' })
        res.status(200).json({ 'message': 'SignUp successful', 'User': userdata })
    })
})




app.listen(PORT, () => { console.log(`Server running at http://localhost:` + PORT) })