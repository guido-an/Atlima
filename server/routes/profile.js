const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Category = require('../models/Category')
const defineUser = require('../helpers/defineUser')

/* GET USER */
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate('categories')
      .populate('followedSpots')
      .populate({
        path: 'posts',
        populate: {
          path: 'user'
        }
      })
    console.log(user.posts)
    res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with getting the user 5000/profile/:id' })
  }
})

/* EDIT USER */
router.post('/edit/:id', async (req, res) => {
  const { backgroundPicture, profilePicture, firstName, lastName, location, bio } = req.body
  try {
    const user = await defineUser(req.session.currentUser)
    const filter = { _id: user._id }
    const update = {
      backgroundPicture: backgroundPicture || user.backgroundPicture,
      profilePicture: profilePicture || user.profilePicture,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      location: location || user.location,
      bio: bio || user.bio
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
    const notifications = userFromDB.notifications.reverse()
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
    res.json('something went wrong: 5000 - /reset-unread-notifications' + err)
  }
})

router.post('/follow/:id', async (req, res) => {
  try {
    const currentUser = await defineUser(req.session.currentUser)
    const userToFollow = await User.findOne({ _id: req.params.id })

    if (!userToFollow.followedBy.includes(currentUser._id)) {
      const userToFollow = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { followedBy: currentUser._id } })
      const userWhichFollows = await User.findOneAndUpdate({ _id: currentUser._id }, { $addToSet: { followedUsers: userToFollow._id } })
      res.status(200).send({ message: `Follow the spot ${userWhichFollows}` })
    } else {
      const userToFollow = await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { followedBy: currentUser._id } })
      const userWhichFollows = await User.findOneAndUpdate({ _id: currentUser._id }, { $pull: { followedUsers: userToFollow._id } })
      res.status(200).send({ message: `Unfollow the spot ${userWhichFollows}` })
    }
  } catch (err) {
    console.log(err)
    res.json('something went wrong: 5000 - /follow/:id' + err)
  }
})

module.exports = router
