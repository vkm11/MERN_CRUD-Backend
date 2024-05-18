const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let roleSchema = new Schema({
    idrole: {  // Custom ID field named "_idrole"
        // type: Schema.Types.ObjectId,
        type: Schema.Types.ObjectId,
        auto: true, 
        required: true, 
        unique: true 
    },
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
    collection: 'roles'
})
module.exports = mongoose.model('Role', roleSchema)