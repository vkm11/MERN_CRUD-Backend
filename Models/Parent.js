const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let parentSchema = new Schema({
    firstName: {
        type: String
    },
    nickName: {
        type: String
    },
    status: {
        type: Number
    },
}, {
    collection: 'parent'
})
module.exports = mongoose.model('Parent', parentSchema)