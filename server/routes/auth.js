const passport = require('passport')
const express = require('express')

const router = express.Router()
const User = require('../models/User')

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

/// POST SIGNUP
router.post('/signup', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  if (username === '' || password === '') {
    res.status(400).json({ message: 'Please provide credentials' })
    return
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'The username already exists' })
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
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
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        res.status(401).json({
          errorMessage: "The username doesn't exist."
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
router.get('/loggedin', (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json({ user: req.session.currentUser })
  } else {
    res.json({ message: 'Unauthorized' })
  }
})

// FACEBOOK

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      console.log('2')
      const message = 'Invalid credentials'
      return res.send(message)
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      req.session.currentUser = user
      console.log('4', user, req.session.currentUser)
      res.redirect(process.env.CLIENT_URL)
    })
  })(req, res, next)
})

module.exports = router
