const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: { type: String, required: true},
    message: { type: String, required: true},
    imageUrl: { type: String},
    likes: { type: Number},
    usersLiked: { type: [String]},
    createdOn: {type: Date}
});

module.exports = mongoose.model('Post', PostSchema);