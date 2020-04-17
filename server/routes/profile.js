const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).send(user)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' })
  }
})

module.exports = router
