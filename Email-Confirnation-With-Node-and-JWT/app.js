const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express')
const nodeMailer = require('nodemailer')
const user = require('./models/User')
const auth = require('./models/Auth')
const mailer = require('./utils/SendMail')
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

    let token = jwt.sign({ data: email }, '!@#$%^&*', { expiresIn: '5m' })

    const dbEmail = user.findOne({'email' : email})
    if(dbEmail){
        mailer.mailer(email, token)
        res.status(200).json({'message' : 'Email confirmation link has been sent again'})
    }
    
    const userdata = new user({
        email,
        password,
    })

    const authData = new auth({
        email,
        token
    })

    msg = mailer.mailer(email, token)
    if(msg){
        return res.status(400).json({'message' : 'Cannot Send activation mail ! Check your email and try again'})
    }
    await userdata.save(async (err, response) => {
        if (err) res.status(500).json({ 'message': 'Server Fucked Up 😑😢' })
        await authData.save((err, response) => {
            if (err) res.status(500).json({ 'message': 'Server Fucked Up 😑😢' })
            res.status(201).json({ 'message': 'SignUp successful', 'User': userdata })
        })
   })
})

app.get('/verify/', (req, res) => {
    const token = req.query.token
    const email = req.query.email

    console.log(email)

    jwt.verify(token, '!@#$%^&*', async(err, decoded) => {
        if(err) res.status(404).json({'message' : 'Cannot find requested token ! Your token may have expired'})
        console.log(decoded)
        await auth.findOneAndDelete({'token' : token})
        await user.findOneAndUpdate({'email' : email}, {'isVerified' : true})
    })

    return res.json({'message' : 'done'})
})

app.get('/login', (res, req) => {
    return res.json({'me' : 'lo'})
})




app.listen(PORT, () => { console.log(`Server running at http://localhost:` + PORT) })