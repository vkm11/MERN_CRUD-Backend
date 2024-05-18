const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userroleSchema = new Schema({
    idrole: {
        type: Number
    },
    iduser: {
        type: Number
    },
}, {
    collection: 'userrole'
})
module.exports = mongoose.model('userrole', userroleSchema)