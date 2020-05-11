const User = require('../models/User')
const Post = require('../models/Post')

async function likeAPost (postId, userId, like) {
  const likeToPost = like ? { $addToSet: { likes: { likedBy: userId } } } : { $pull: { likes: { likedBy: userId } } }
  try {
    const newPost = await Post.findOneAndUpdate({ _id: postId }, likeToPost, { new: true })
    const likeToUser = like ? { $addToSet: { likedPosts: newPost._id } } : { $pull: { likedPosts: newPost._id } }
    await User.findOneAndUpdate({ _id: userId }, likeToUser, { new: true })
  } catch (err) {
    console.log(err)
  }
}

async function checkIfLike (post, user) {
  let likeIsPresent
  try {
    post.likes.forEach(element => {
      if (user._id == element.likedBy.toString()) {
        likeIsPresent = true
      } else {
        likeIsPresent ? likeIsPresent = true : likeIsPresent = false
      }
    })
  } catch (err) {
    console.log(err)
  }
  return likeIsPresent
}

module.exports = {
  likeAPost,
  checkIfLike
}
