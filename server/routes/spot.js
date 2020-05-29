const express = require('express')
const router = express.Router()
const Spot = require('../models/Spot')
const defineUser = require('../helpers/defineUser')
const spotHelper = require('../helpers/spotFollowHelper')

// ALL SPOTS
router.get('/all', async (req, res) => {
  try {
    const spots = await Spot.find()
      .populate('post')
    res.status(200).send(spots)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
  }
})

// // SINGLE SPOT
// router.get('/:id', async (req, res) => {
//   try {
//     const spot = await Spot.find({ _id: req.params.id })
//     res.status(200).send(spot)
//   } catch (err) {
//     res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
//   }
// })

// SINGLE SPOT
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.find({ placeId: req.params.id })
    console.log(spot)
    res.status(200).send(spot)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
  }
})

router.post('/follow/:placeId', async (req, res) => {
  try {
    const user = await defineUser(req.session.currentUser)
    const filter = { placeId: req.params.placeId }
    let update
    const spot = await Spot.findOne(filter)
    const followIsPresent = await spotHelper.checkIfFollow(spot, user)
    if (!followIsPresent) {
      update = { $addToSet: { followedBy: user._id }, new: true }
    } else {
      update = { $pull: { followedBy: user._id }, new: true }
    }
    const updatedSpot = await Spot.findOneAndUpdate(filter, update)
    res.status(200).send({ message: `Follow/unfollow the spot ${updatedSpot}` })
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with following the spot 5000 /follow/:id' })
  }
})

module.exports = router
