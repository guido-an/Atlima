const express = require('express')
const router = express.Router()
var ObjectId = require('mongodb').ObjectID
const Post = require('../models/Post')

// NEW POST
router.post('/new', async (req, res) => {
  const { content, _id, media } = req.body
  const newPost = new Post({
    content,
    user: ObjectId(_id),
    media
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
    res.status(200).send(posts)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' })
  }
})

// GET USER POSTS
router.get('/user/:id', async (req, res) => {
  try {
    const userPosts = await Post.find({ user: ObjectId(req.params.id) }).sort({ created_at: -1 })
    res.status(200).send(userPosts)
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' })
  }
})

// DELETE A POST
router.post('/delete/:id', async (req, res) => {
  try {
    await Post.deleteOne({ _id: ObjectId(req.params.id) })
    console.log('post deleted')
    res.status(200).send({message: 'post deleted'})
  } catch (err) {
    res.status(400).send({ message: 'Something went wrong' }, err)
  }
})


module.exports = router
