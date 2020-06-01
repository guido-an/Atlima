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

// SINGLE SPOT
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.find({ placeId: req.params.id })
    res.status(200).send(spot)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong with categories 5000/all' })
  }
})


// FOLLOW SPOT
router.post('/follow', async (req, res) => {
  let update;
  try {
    const user = await defineUser(req.session.currentUser)
    const filter = { placeId: req.body.spotPlaceId }
    const spot = await Spot.findOne(filter)
    if(!spot){
      // create spot
      spotHelper.createSpotWithFirstFollower(user, req.body)
      res.status(200).send({ message: `Spot created` })
     }  else {
          const followIsPresent = await spotHelper.checkIfFollow(spot, user)
          if (!followIsPresent) {
            // start to follow
            update = { $addToSet: { followedBy: user._id } }
            const updatedSpot = await Spot.findOneAndUpdate(filter, update)
            res.status(200).send({ message: `Follow the spot ${updatedSpot}` })
          } else {
            // unfollow
            update = { $pull: { followedBy: user._id } }
            const updatedSpot = await Spot.findOneAndUpdate(filter, update, { new: true } )
            // delete if no followers and posts
            if(updatedSpot.posts.length === 0 && updatedSpot.followedBy.length === 0 ){
              updatedSpot.delete()
            } 
            res.status(200).send({ message: `Unfollow the spot ${updatedSpot}` })
          }
       }
    }
     catch(err){
      res.status(400).send({ message: 'Something went wrong in finding a spot 5000 /follow' })
    }
})

module.exports = router
