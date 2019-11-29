const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

var user = mongoose.model('User', userSchema)
module.exports = user