const User = require('../models/User')
var ObjectId = require('mongodb').ObjectID

const notificationLike = async (currentUser, post) => {
  if (currentUser._id.toString() == post.user.toString()) {

  } else {
    try {
      const url = post.mediaFile[0] ? post.mediaFile[0].url : ''
      const mediaType = post.mediaFile[0] ? post.mediaFile[0].type[0] : ''
      const filter = { _id: post.user }
      const update = {
        $addToSet: {
          notifications: {
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            action: 'had liked your post',
            postUrl: `/post/${post._id}/`,
            mediaFile: url,
            mediaType: mediaType,
            date: Date.now()
          }
        },
        $inc: { unreadNotifications: 1 }
      }
      await User.findOneAndUpdate(filter, update)
    } catch (err) {
      console.log(err)
    }
  }
}

const notificationComments = async (currentUser, post) => {
  const url = post.mediaFile[0] ? post.mediaFile[0].url : ''
  const myUserId = ObjectId(currentUser._id).toString()
  const postUserId = ObjectId(post.user._id).toString()
  try {
    if (myUserId == postUserId) {
      return
    }
    const usersToSendNotification = [postUserId]
    post.comments.forEach(comment => {
      const userIdInComments = ObjectId(comment.user).toString()
      if (!usersToSendNotification.includes(userIdInComments)) {
        usersToSendNotification.push(userIdInComments)
      }
    })

    usersToSendNotification.forEach(async userId => {
      const commentInPostUserId = ObjectId(userId).toString()
      if (commentInPostUserId != myUserId) {
        const filter = { _id: commentInPostUserId }
        const update = {
          $addToSet: {
            notifications: {
              name: `${currentUser.firstName} ${currentUser.lastName}`,
              action: commentInPostUserId == postUserId ? 'had commented your post' : 'had also commented the post',
              postUrl: `/post/${post._id}/`,
              mediaFile: url,
              date: Date.now()
            }
          },
          $inc: { unreadNotifications: 1 }
        }
        await User.findOneAndUpdate(filter, update)
      }
    })
  } catch (err) {
    console.log(err, 'Err:')
  }
}

const notificationUserTagged = async (currentUser, taggedUserId, post) => {
  if (currentUser._id.toString() == taggedUserId) {

  } else {
    try {
      const url = post.mediaFile[0] ? post.mediaFile[0].url : ''
      const filter = { _id: taggedUserId }
      const update = {
        $addToSet: {
          notifications: {
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            action: 'had tagged you in a post',
            postUrl: `/post/${post._id}/`,
            mediaFile: url,
            date: Date.now()
          }
        },
        $inc: { unreadNotifications: 1 }
      }
      await User.findOneAndUpdate(filter, update)
    } catch (err) {
      console.log(err)
    }
  }
}

const welcomeNotification = async (currentUser) => {
  try {
    // const url = post.mediaFile[0] ? post.mediaFile[0].url : ''
    const url = ''
    const filter = { _id: currentUser._id }
    const update = {
      $addToSet: {
        notifications: {
          name: `Welcome to Atlima ${currentUser.firstName} :)`,
          action: ' Happy to have you here, you can now start sharing your passion!',
          postUrl: '/create-post',
          mediaFile: url,
          date: Date.now()
        }
      },
      $inc: { unreadNotifications: 1 }
    }
    await User.findOneAndUpdate(filter, update)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  notificationLike,
  notificationComments,
  notificationUserTagged,
  welcomeNotification
}
