const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    postId : {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

postSchema.plugin(findOrCreate)

const Post = mongoose.model('post', postSchema)
module.exports = Post