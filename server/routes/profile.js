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

router.post('/edit/:id', async (req, res) => {
  console.log(req.body, 'test')
  const { mediaArray,firstName, lastName, team, country, hometown } = req.body
  try {
  const filter = { _id: req.params.id }
  const update = { 
    mediaArray,
    firstName,
    lastName,
    team,
    country,
    hometown }
  await User.findOneAndUpdate(filter, update, {
  new: true
  })
  res.status(200).send({ message: 'user updated' })
  } catch (err) {
  console.log(err)
  res.json({ message: 'Something went wrong' })
  }
  })

module.exports = router
