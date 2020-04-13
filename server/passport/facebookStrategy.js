const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('./models/User')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback'
},
function (accessToken, refreshToken, profile, done) {
  console.log(profile._json, 'test')
  const { first_name } = profile._json
  const userData = {
    username: first_name
  }
  new User(userData).save()
  done(null, profile)
}
))
