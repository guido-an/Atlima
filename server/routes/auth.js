const passport = require('passport')
const express = require('express')

const router = express.Router()
const User = require('../models/User')

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

/// POST SIGNUP
router.post('/signup', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Please provide credentials' })
    return
  }

  User.findOne({ email }, 'email', (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'The email already exists' })
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      email,
      password: hashPass
    })

    newUser
      .save()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(400).send({ message: 'Something went wrong' })
      })
  })
})

/// POST LOGIN
router.post('/login', (req, res) => {
  let currentUser
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          errorMessage: "The email doesn't exist."
        })
        return
      }
      currentUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(passwordCorrect => {
      if (passwordCorrect) {
        req.session.currentUser = currentUser
        console.log(req.session, 'testt')
        res.status(200).json({ message: 'Loggedin succesfully', currentUser })
      } else {
        res.status(401).send({
          errorMessage: 'Incorrect password'
        })
      }
    })
})

/// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.status(200).json({ message: 'Logged out' })
  })
})

/// LOGGEDIN
router.get('/loggedin', (req, res) => {
  if (req.session.currentUser.provider === 'facebook') {
    User.findOne({ facebookId: req.session.currentUser.id })
      .then(user => {
        res.status(200).json({ user })
      })
      .catch(err => {
        console.log(err)
      })
  } else if (req.session.currentUser) {
    res.status(200).json({ user: req.session.currentUser })
  } else {
    res.json({ message: 'Unauthorized' })
  }
})

// FACEBOOK
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      const message = 'Invalid credentials'
      return res.send(message)
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      req.session.currentUser = user
      res.redirect(process.env.CLIENT_URL)
    })
  })(req, res, next)
})

module.exports = router
