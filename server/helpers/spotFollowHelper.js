const Spot = require('../models/Spot')

async function checkIfFollow (spot, user) {
  let followIsPresent
  try {
    spot.followedBy.forEach(userId => {
      if (user._id == userId.toString()) {
        followIsPresent = true
      } else {
        followIsPresent = false
      }
    })
  } catch (err) {
    console.log(err)
  }
  return followIsPresent
}

async function createSpotWithFirstFollower(user, reqBody){
  try {
    mySpot = new Spot({
      location: reqBody.location,
      placeId: reqBody.spotPlaceId,
      followedBy: [user._id]
    })
    mySpot = await mySpot.save()
  } catch(err){
    console.log(err)
  }
}

module.exports = {
  checkIfFollow,
  createSpotWithFirstFollower
}
