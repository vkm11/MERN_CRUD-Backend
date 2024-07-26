const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let teacherSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    teacherid: {
        type: Number
    },
    status: {
        type: Number
    }
}, {
    collection: 'Teacher'
})
module.exports = mongoose.model('Teacher', teacherSchema)