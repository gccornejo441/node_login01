const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
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