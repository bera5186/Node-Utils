const express    = require('express')
const app        = express()
const ehb        = require('express-handlebars')
const nodeMailer = require('nodemailer')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', ehb())
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })