const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mob: {
        type: Number
    },
    caddress: {
        type: String
    },
    paddress: {
        type: String
    },
    info: {
        type: String
    },
    uname: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: Number
    },
}, {
    collection: 'users'
})
module.exports = mongoose.model('User', userSchema)