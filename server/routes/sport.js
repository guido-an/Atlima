const express = require('express')
const router = express.Router()
const Sport = require('../models/Sport')

router.get('/all', async (req, res) => {
  try {
    const sports = await Sport.find()
    res.status(200).send(sports)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with sports 5000/all' })
  }
})

module.exports = route