const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    upload_id: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    }
});

module.exports = mongoose.model('Image', ImageSchema);