// require('dotenv').config()

// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const express = require('express')
// const mongoose = require('mongoose')
// const logger = require('morgan')
// const session = require('express-session')
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook').Strategy
// const MongoStore = require('connect-mongo')(session)
// const flash = require('connect-flash')
// const cors = require('cors')

// mongoose
//   .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   })

// const app = express()

// // Middleware Setup
// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())

// app.use(cors({
//   origin: [process.env.CLIENT_URL],
//   credentials: true
// }))

// // ** test
// // Facebook Strategy

// const User = require('./models/User')
// passport.serializeUser((user, cb) => {
//   cb(null, user)
// })

// passport.deserializeUser((user, cb) => {
//   cb(null, user)
// })

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: '/auth/facebook/callback'
// },
// function (accessToken, refreshToken, profile, done) {
//   console.log(profile._json, 'test')
//   const { first_name } = profile._json
//   const userData = {
//     username: first_name
//   }
//   new User(userData).save()
//   done(null, profile)
// }
// ))

// app.use(passport.initialize())

// app.get('/auth/facebook', passport.authenticate('facebook'))

// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: 'http://localhost:3000/auth/facebook',
//     failureRedirect: '/fail'
//   })
// )
// // ** /test

// // Enable authentication using session + passport
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }))

// app.use(flash())
// require('./passport')(app)

// const authRoutes = require('./routes/auth')
// app.use('/auth', authRoutes)

// module.exports = app
require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const cors = require('cors')

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

const app = express()

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true
}))

// ** test
// Facebook Strategy

// const User = require('./models/User')
// passport.serializeUser((user, cb) => {
//   cb(null, user)
// })

// passport.deserializeUser((user, cb) => {
//   cb(null, user)
// })

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: '/auth/facebook/callback'
// },
// function (accessToken, refreshToken, profile, done) {
//   console.log(profile._json, 'test')
//   const { first_name } = profile._json
//   const userData = {
//     username: first_name
//   }
//   new User(userData).save()
//   done(null, profile)
// }
// ))

app.use(passport.initialize())

// app.get('/auth/facebook', passport.authenticate('facebook'))

// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: 'http://localhost:3000/success',
//     failureRedirect: 'http://localhost:3000/fail'
//   })
// )
// ** /test

// Enable authentication using session + passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(flash())
require('./passport')(app)

const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

module.exports = app
