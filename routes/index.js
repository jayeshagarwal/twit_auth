const router = require('express').Router()
const Post = require('../models/posts')
const User = require('../models/user')
const { getFriends, getPosts } = require('../utils/apiRequests')

router.get('/', (req,res)=> {
    res.render('home')
})

function isLoggedIn (req,res,next) {
  if(req.isAuthenticated())
  {
    return next()
  }
  res.redirect('/')
}

router.get('/me', isLoggedIn ,async (req,res)=> {
   await getFriends(req)
   const user = await User.findOne({username: req.user.username})
   const post = await Post.find({userId: user.twitterId})
   await getPosts(user)
//    user.friends.forEach((friend)=> {
//        getPosts(friend)
//    })
  res.render('show', {
      user,
      posts
  });
})

module.exports = router