const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
    name: {
        type: String
    },
    class: {
        type: String
    },
    desc: {
        type: String
    },
}, {
    collection: 'school'
})
module.exports = mongoose.model('School', studentSchema)