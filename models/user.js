const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

// const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        unique: true
    },
    twitterId: {
        type: String,
        required: [true, 'Please make sure you have twitter account'],
        unique: true
    },
    friends: [{
        username: {
            type: String,
            required: true,
            unique: true
        },
        twitterId: {
            type: String,
            required: true,
            unique: true
        },
    }],
    posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }]
}, {
    timestamps: true
})
  
userSchema.plugin(findOrCreate)

const User = mongoose.model('user', userSchema)
module.exports = User