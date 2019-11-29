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
    token: {
        type: String,
        required: true,
        default: Date.now(),
        expires: 120
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

var user = mongoose.model('User', userSchema)
module.exports = user