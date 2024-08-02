const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mob: {
        type: Number,
        required: true
    },
    caddress: {
        type: String,
        required: true
    },
    paddress: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    role: { type: Number, required: true },

}, {
    collection: 'users'
})
module.exports = mongoose.model('User', userSchema)