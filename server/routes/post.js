const express = require('express')
const router = express.Router()
var ObjectId = require('mongodb').ObjectID
const Post = require('../models/Post')

router.post('/new', async (req, res) => {
  const { content, _id } = req.body
  const newPost = new Post({
    content,
    user: ObjectId(_id)
  })
  try {
    const post = await newPost.save()
    res.send(post)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

module.exports = router
