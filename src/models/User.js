const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

UserSchema.virtual('name').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

module.exports = mongoose.model('User', UserSchema);