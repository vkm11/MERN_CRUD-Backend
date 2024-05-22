const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let sectionSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Number
    },
}, {
    collection: 'section'
})
module.exports = mongoose.model('Section', sectionSchema)