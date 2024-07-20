const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    startdate:{
        type: Date,
        // default: Date.now, 
        required: true
    },
    status:{
        type: Number,
    }
}, {
    collection: 'school'
})
module.exports = mongoose.model('School', studentSchema)