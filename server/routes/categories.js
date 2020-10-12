const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const RequestedSport = require('../models/RequestedSport')

router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).send(categories)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
  }
})

router.post('/new-sport', async (req, res) => {
  console.log(req.body)
  const { newSport } = req.body
  try {
    await RequestedSport.create({ name: newSport, user: req.session.currentUser._id })
    res.status(200).send({ message: 'New sport requested' })
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
  }
})

module.exports = router
