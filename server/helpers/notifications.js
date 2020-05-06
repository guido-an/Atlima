const User = require('../models/User')
var ObjectId = require('mongodb').ObjectID

const notificationsHelper = async (currentUserId, post, type, message, commentUser) => {
  try {
    let filter
    if (commentUser) {
      filter = { _id: commentUser }
    } else {
      filter = { _id: post.user }
    }
    const postId = post._id
    const userId = ObjectId(currentUserId)
    const update = { $addToSet: { notifications: { userId, postId, type, message } } }
    await User.findOneAndUpdate(filter, update, { new: true })
  } catch (err) {
    console.log(err)
  }
}

const notificationsCommentHelper = async (currentUserId, post, type, message) => {
  console.log('users=', currentUserId, post.user)
  if (currentUserId != post.user) {
    notificationsHelper(currentUserId, post, 'comment', 'had commented your post', false)
  }
  if (type == 'comment') {
    post.comments.forEach(async comment => {
      console.log('coment user=', comment.user)
      if (comment.user != currentUserId && comment.user != post.user) {
        const user = await User.findOne({ _id: comment.user })
        console.log('in the if: ', user)
        notificationsHelper(currentUserId, user, 'comment', 'had also commented a post', comment.User)
      }
    })
  }
}

module.exports = {
  notificationsHelper,
  notificationsCommentHelper
}
