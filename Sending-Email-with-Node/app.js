const express    = require('express')
const app        = express()
const exphbs     = require('express-handlebars')
const nodeMailer = require('nodemailer')
const path       = require('path')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine','hbs')
app.set('views', path.join(__dirname,'views'))

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('contact')
})


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })