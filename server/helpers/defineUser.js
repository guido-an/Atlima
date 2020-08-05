const User = require('../models/User')

const defineUser = async myUser => {
  let user
  if (myUser && myUser.provider === 'facebook') {
    const userFromDB = await User.findOne({ facebookId: myUser.id }).populate('categories')
    if (userFromDB === null) {
      const myUserFromDb = await User.findOne({ _id: myUser._id }).populate('categories')
      user = myUserFromDb
    } else {
      user = userFromDB
    }
  } else {
    user = await User.findOne({ _id: myUser._id }).populate('categories')
  }
  return user
}
module.exports = defineUser
