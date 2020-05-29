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

module.exports = {
  checkIfFollow
}
