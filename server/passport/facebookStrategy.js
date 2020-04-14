const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/User')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['emails', 'name']
},
function (accessToken, refreshToken, profile, done) {
  const { first_name, last_name, email } = profile._json
  const userData = {
    firstName: first_name,
    lastName: last_name,
    email,
    provider: 'facebook'
  }
  new User(userData).save()
  done(null, profile)
}
))
