const express = require('express')
const router = express.Router()
const Spot = require('../models/Spot')
const User = require('../models/User')
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

// SINGLE SPOT
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const spot = await Spot.find({ placeId: req.params.id }).populate('followedBy')
    console.log(spot, 'spot')

    res.status(200).send(spot)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
  }
})

// FOLLOW SPOT
router.post('/follow', async (req, res) => {
  let update
  try {
    const user = await defineUser(req.session.currentUser)
    const filter = { placeId: req.body.spotPlaceId }
    const spot = await Spot.findOne(filter)
    if (!spot) {
      // create spot
      const newSpot = await spotHelper.createSpotWithFirstFollower(user, req.body)
      await User.findOneAndUpdate({ _id: user._id }, { $addToSet: { followedSpots: newSpot._id } })
      res.status(200).send({ message: 'Spot created' })
    } else {
      const followIsPresent = await spotHelper.checkIfFollow(spot, user)
      if (!followIsPresent) {
        // start to follow
        update = { $addToSet: { followedBy: user._id } }
        const updatedSpot = await Spot.findOneAndUpdate(filter, update)
        await User.findOneAndUpdate({ _id: user._id }, { $addToSet: { followedSpots: spot._id } })
        res.status(200).send({ message: `Follow the spot ${updatedSpot}` })
      } else {
        // unfollow
        update = { $pull: { followedBy: user._id } }
        const updatedSpot = await Spot.findOneAndUpdate(filter, update, { new: true })
        res.status(200).send({ message: `Follow the spot ${updatedSpot}` })
        await User.findOneAndUpdate({ _id: user._id }, { $pull: { followedSpots: spot._id } })
        // delete if no followers and posts
        if (updatedSpot.posts.length === 0 && updatedSpot.followedBy.length === 0) {
          await updatedSpot.delete()
        }
        res.status(200).send({ message: `Unfollow the spot ${updatedSpot}` })
      }
    }
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong in finding a spot 5000 /follow' })
  }
})

module.exports = router
