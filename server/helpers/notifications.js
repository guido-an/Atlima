const User = require('../models/User')
const Post = require('../models/Post')
var ObjectId = require('mongodb').ObjectID

const notificationLike = async (currentUserId, post, type, message) => {
  if (currentUserId == post.user) {

  } else {
    try {
      const filter = { _id: post.user }
      const postId = post._id
      const userId = currentUserId
      const update = { $addToSet: { notifications: { userId, postId, type, message } } }
    } catch (err) {
      console.log(err)
    }
  }
}

const notificationComments = async (currentUserId, post) => {
  const myUserId = ObjectId(currentUserId).toString()
  const postUserId = ObjectId(post.user._id).toString()

  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

  try {
    const usersToSendNotification = []
    post.comments.forEach(comment => {
      const userIdInComments = ObjectId(comment.user).toString()
      if (!usersToSendNotification.includes(userIdInComments)) {
        usersToSendNotification.push(userIdInComments)
      }
    })

    usersToSendNotification.forEach(async userId => {
      const commentInPostUserId = ObjectId(userId).toString()
      if (commentInPostUserId != myUserId) {
        console.log('SEND NOTIFICATION TO: ', userId)
        message = commentInPostUserId == postUserId ? 'had commented your post' : 'had also commented a post'
        await User.findOneAndUpdate({ _id: commentInPostUserId }, { $addToSet: { notifications: { userId: ObjectId(myUserId), postId: ObjectId(post._id), postUserId, type: 'comment', message, date: `${date} - ${time}` } } })
      }
    })
  } catch (err) {
    console.log(err, 'Err:')
  }
}

module.exports = {
  notificationLike,
  notificationComments
}
