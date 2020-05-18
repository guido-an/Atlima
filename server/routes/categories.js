const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).send(categories)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
  }
})

module.exports = router