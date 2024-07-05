const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/user-info')

connect.then(() => {
    console.log('Connected to data Successfully');
})
.catch(() => {
    console.log('Could not Find Database')
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }

});

const collection = new mongoose.model('users', LoginSchema)

module.exports = collection;