const Post = require('../models/posts');
const request = require('request')
const User = require('../models/user')

getFriends = (req)=> {
    const url = 'https://api.twitter.com/1.1/friends/list?screen_name='+req.user.username

    const options = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET
    };

    request.get({url, oauth:options, json:true}, async function (e, r, friends) {
        try {
            const newFriends=  []
            friends.users.forEach((friend)=> {
                newFriends.push({
                    username: friend.screen_name,
                    twitterId: friend.id
                })
            })
            req.user.friends = newFriends
            await User.findByIdAndUpdate(req.user._id, req.user)
        }
        catch(e)
        {
            console.log(e)
        }
    })
}

getPosts = (user)=> {
    const url = 'https://api.twitter.com/2/tweets/search/recent?query=from:'+user.username+'&tweet.fields=created_at'

    const options = {
        'auth': {
          'bearer': process.env.BEARER_TOKEN
        }
    }
    const newUser = user
    request.get(url, options, async function (e, r, posts) {
        try
        {
            const user = await User.findOne({userId: newUser.userId});
            posts = JSON.parse(posts)
            // console.log(posts)
            posts.data.forEach(async (post)=> {
                if(post.text.indexOf('https://t.co')!=-1)
                {
                    await Post.findOrCreate({ postId: post.id,userId: newUser.twitterId, text: post.text })
                }
            })
            console.log(newUser._id)
            const userPosts = []
            const newPosts = await Post.find({userId: newUser.twitterId})
            newPosts.forEach((post)=> {
                userPosts.push(post._id)
            })
            user.posts = userPosts
            console.log(user.posts, user)
            await User.findByIdAndUpdate(newUser._id, user)
        }
        catch(e) {
            console.log(e)            
        }
    })
}

module.exports = {
    getFriends,
    getPosts
}