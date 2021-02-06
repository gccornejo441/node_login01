const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;