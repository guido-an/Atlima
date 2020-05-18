const express = require('express')
const router = express.Router()
var ObjectId = require('mongodb').ObjectID
const Post = require('../models/Post')
const Spot = require('../models/Spot')
const defineUser = require('../helpers/defineUser')
const myNotifications = require('../helpers/notifications')
const myFunctions = require('../helpers/postLikes')
const newPostHelper = require('../helpers/newPostHelper')

// NEW POST
// router.post('/new', async (req, res) => {
//   let mySpot
//   const { content, mediaArray, location, categories } = req.body
//   const user = await defineUser(req.session.currentUser)
//   const newPost = new Post({
//     content,
//     user: user._id,
//     mediaArray,
//     location,
//     categories
//   })

//   // Creating or Updating Spots when the Post is created
//   if (newPost.location) {
//     const isThereASpot = await Spot.findOne({ placeId: location.id })
//     if (isThereASpot) {
//       try {
//         mySpot = await Spot.findOneAndUpdate({ placeId: location.id }, { $push: { posts: newPost._id } })
//         console.log(mySpot._id, 'mySpot')
//         // add location to newPost
//         newPost.location = mySpot._id
//       } catch (err) {
//         console.log(err)
//       }
//     } else {
//       mySpot = new Spot({
//         location,
//         placeId: location.id,
//         posts: newPost._id
//       })
//       try {
//         mySpot = await mySpot.save()
//         // add location to newPost
//         newPost.location = mySpot._id
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   }

//   // Save new post
//   try {
//     const post = await newPost.save()
//     // newPostHelper.addPostToCategories(categories, post)
//     res.status(200).json({ Message: `New post created ${post}` })
//   } catch (err) {
//     console.log(err)
//     res.json('something went wrong: ' + err)
//   }
// })

router.post('/new', async (req, res) => {
  let mySpot
  const { content, mediaArray, location, categories } = req.body
  const user = await defineUser(req.session.currentUser)
  const newPost = new Post({
    content,
    user: user._id,
    mediaArray,
    // location,
    categories
  })

  // Creating or Updating Spots when the Post is created
  if (req.body.location) {
    console.log('We have req.body.location')
    const isThereASpot = await Spot.findOne({ placeId: location.place_id })
    if (isThereASpot) {
      try {
        // UPDATE the spot
        mySpot = await Spot.findOneAndUpdate({ placeId: location.place_id }, { $push: { posts: newPost._id } })
        // add location to newPost
        newPost.spot = mySpot._id
      } catch (err) {
        console.log(err)
      }
    } else {
      mySpot = new Spot({
        location,
        placeId: location.place_id,
        posts: newPost._id
      })
      try {
        // CREATE the spot
        mySpot = await mySpot.save()
        // add location to newPost
        newPost.spot = mySpot._id
      } catch (err) {
        console.log(err)
      }
    }
  }

  try {
    // CREATE the post
    const post = await newPost.save()
    newPostHelper.addPostToCategory(categories, post)
    res.status(200).json({ Message: `New post created ${post}` })
  } catch (err) {
    console.log(err)
    res.json('something went wrong: ' + err)
  }
})

// GET ALL POSTS
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_at: -1 })
      .populate('spot').populate('user')
    res.status(200).send(posts)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' })
  }
})

// GET SINGLE POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate('user')
    res.status(200).send(post)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' })
  }
})

// GET USER POSTS
router.get('/user/:id', async (req, res) => {
  try {
    const userPosts = await Post.find({ user: ObjectId(req.params.id) }).sort({ created_at: -1 })
      .populate('user')
    res.status(200).send(userPosts)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' })
  }
})

// DELETE A POST
router.post('/delete/:id', async (req, res) => {
  try {
    await Post.deleteOne({ _id: ObjectId(req.params.id) })
    res.status(200).send({ message: 'post deleted' })
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' }, err)
  }
})

// LIKE A POST
router.post('/like/:id', async (req, res) => {
  const postId = req.params.id
  try {
    const post = await Post.findById({ _id: postId })
    const user = await defineUser(req.session.currentUser)
    const likeIsPresent = await myFunctions.checkIfLike(post, user)
    if (!likeIsPresent) {
      myFunctions.likeAPost(postId, user._id, true)
      myNotifications.notificationLike(user._id, post, 'like', 'had like your post', false)
      res.status(200).send({ message: 'post liked' })
    } else {
      myFunctions.likeAPost(postId, user._id, false)
      res.status(200).send({ message: 'post unliked' })
    }
  } catch (err) {
    console.log('err')
    res.json({ message: 'Something went wrong' })
  }
})

router.post('/:id/comment', async (req, res) => {
  const postId = req.params.id
  const { content } = req.body
  try {
    const user = await defineUser(req.session.currentUser)
    const myPost = await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: { user: user._id, content } } }).populate('user')

    myNotifications.notificationComments(user._id, myPost, 'comment', 'had commented your post')
    res.status(200).send({ myPost })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
