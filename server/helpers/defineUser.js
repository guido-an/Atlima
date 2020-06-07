const User = require('../models/User')

const defineUser = async myUser => {
  let user
  if (myUser && myUser.provider === 'facebook') {
    const userFromDB = await User.findOne({ facebookId: myUser.id }).populate('categories')
    user = userFromDB
  } else {
    user = myUser
  }
  return user
}
module.exports = defineUser
