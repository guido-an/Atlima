const express = require('express')
const router = express.Router()
var ObjectId = require('mongodb').ObjectID
const Post = require('../models/Post')
const User = require('../models/User')
const defineUser = require('../helpers/defineUser')

// NEW POST
router.post('/new', async (req, res) => {
  const { content, _id, mediaArray } = req.body
  const newPost = new Post({
    content,
    user: ObjectId(_id),
    mediaArray
  })
  try {
    const post = await newPost.save()
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.json('something went wrong: ' + err)
  }
})

// GET ALL POSTS
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_at: -1 })
      .populate('user')
    res.status(200).send(posts)
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
  let likeExists
  try {
    const user = await defineUser(req.session.currentUser)
    const post = await Post.findById({ _id: req.params.id })

    post.likes.forEach(element => {
      if (user._id == element.likedBy.toString()) {
        likeExists = 'HERE!!!'
      } else {
        console.log('not here')
        likeExists = 'NOT HERE'
      }
    })

    console.log(likeExists, 'likeExists')

    const filterPost = { _id: req.params.id }
    const updatePost = { $addToSet: { likes: { likedBy: user._id } } }
    const newPost = await Post.findOneAndUpdate(filterPost, updatePost, {
      new: true
    })

    const filterUser = { _id: user._id }
    const updateUser = { $addToSet: { likedPosts: newPost._id } }
    await User.findOneAndUpdate(filterUser, updateUser, {
      new: true
    })

    res.status(200).send({ message: 'post liked' })
  } catch (err) {
    console.log(err)
    res.json({ message: 'Something went wrong' })
  }
})
// router.post('/like/:id', async (req, res) => {
//   try {
//     const user = await defineUser(req.session.currentUser)

//     const filterPost = { _id: req.params.id }
//     const updatePost = { $addToSet: { likes: { likedBy: user._id } } }
//     const newPost = await Post.findOneAndUpdate(filterPost, updatePost, {
//       new: true
//     })

//     const filterUser = { _id: user._id }
//     const updateUser = { $addToSet: { likedPosts: newPost._id } }
//     await User.findOneAndUpdate(filterUser, updateUser, {
//       new: true
//     })

//     res.status(200).send({ message: 'post liked' })
//   } catch (err) {
//     console.log(err)
//     res.json({ message: 'Something went wrong' })
//   }
// })

module.exports = router
