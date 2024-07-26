const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://vijay1111mane:RW7MwYCopPqVokLR@cluster0.r0bfj9v.mongodb.net`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log(`Connected to Mongo! Database name: "${connection.connections[0].name}"`);
    } catch (err) {
        console.error('Error connecting to mongo', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
