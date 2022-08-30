const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    admin: {Boolean: false},
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserP7', userSchema);