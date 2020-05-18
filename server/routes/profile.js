const express = require('express')
const router = express.Router()
const User = require('../models/User')

/* GET USER */
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' })
  }
})

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
    const filter = { _id: req.session.currentUser._id }
    const update = { categories: categories }
    await User.findOneAndUpdate(filter, update, { new: true })
    res.status(200).json({ message: 'categories added to user. 5000 - /add-categories' })
  } catch (err) {
    console.log(err)
    res.json('something went wrong: 5000 - /add-categories' + err)
  }
})

module.exports = router
