const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Category = require('../models/Category')
const defineUser = require('../helpers/defineUser')

/* GET USER */
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id })
//     res.status(200).send(user)
//   } catch (err) {
//     res.status(400).send({ message: 'Something went wrong' })
//   }
// })

/* EDIT USER */
router.post('/edit/:id', async (req, res) => {
  const { mediaArray, firstName, lastName, team, country, hometown } = req.body
  try {
    const filter = { _id: req.params.id }
    const update = {
      mediaArray,
      firstName,
      lastName,
      team,
      country,
      hometown
    }
    await User.findOneAndUpdate(filter, update, {
      new: true
    })
    res.status(200).send({ message: 'user updated' })
  } catch (err) {
    console.log(err)
    res.json({ message: 'Something went wrong' })
  }
})

/* ADD CATEGORIES */
router.post('/add-categories', async (req, res) => {
  const { categories } = req.body
  try {
    const user = await defineUser(req.session.currentUser)
    const filter = { _id: user._id }
    const update = { categories: categories }
    const userUpdated = await User.findOneAndUpdate(filter, update, { new: true })
    req.session.currentUser = userUpdated
    categories.forEach(async categoryId => {
      await Category.findByIdAndUpdate({ _id: categoryId }, { $addToSet: { usersFollowing: user._id } })
    })
    res.status(200).json({ message: 'categories added to user. 5000 - /add-categories' })
  } catch (err) {
    console.log(err)
    res.json('something went wrong: 5000 - /add-categories' + err)
  }
})

/* USER NOTIFICATIONS */
router.get('/notifications/:id', async (req, res) => {
  try {
    const userFromDB = await User.findById({ _id: req.params.id })
    const notifications = userFromDB.notifications
    res.status(200).send(notifications)
  } catch (err) {
    res.json('something went wrong: 5000 - /:id/notifications' + err)
  }
})

/* USER UNREAD NOTIFICATIONS */
router.get('/unread-notifications', async (req, res) => {
  try {
    const user = await defineUser(req.session.currentUser)
    const userFromDB = await User.findOne({ _id: user._id })
    const unreadNotifications = userFromDB.unreadNotifications
    res.status(200).send({ unreadNotifications })
  } catch (err) {
    console.log(err)
    res.status(400).send('something went wrong: 5000 - /unread-notifications' + err)
  }
})

/* RESET NOTIFICATIONS */
router.get('/reset-unread-notifications', async (req, res) => {
  try {
    const user = await defineUser(req.session.currentUser)
    await User.findOneAndUpdate({ _id: user._id }, { unreadNotifications: 0 })
    res.status(200).send({ message: 'Notifications reset' })
  } catch (err) {
    res.json('something went wrong: 5000 - /:id/reset-unread-notifications' + err)
  }
})

module.exports = router
