const express = require('express')
const session = require('express-session')
const request = require('request')

const passport = require('passport')
const authRoutes = require('./routes/authRoutes')
const indexRoutes = require('./routes/index')
require('./db/mongoose')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())

app.use(session({
    secret: "asjdsaldsa",
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// passport.use(User.createStrategy())

app.use('/', authRoutes)
app.use('/', indexRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=> {
    console.log('server')
})