const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


// Get back all the posts
router.get('/', async (req, res) => {
  try {
    const postFind = await Post.find()
    res.json(postFind)
  } catch (err) {
    res.json({ message: err })
  }
})


// Submits a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  try {
    const postSave = await post.save()
    res.json(postSave)
  } catch (err) {
    res.json({ message: err })
  }
})


// Specific post
router.get('/:postId', async (req, res) => {
  try {
    const postFindById = await Post.findById(req.params.postId)
    res.json(postFindById)
  } catch (err) {
    res.json({ message: err })
  }
})


// Delete a post
router.delete('/:postId', async (req, res) => {
  try {
    const postDeleteOne = await Post.deleteOne({ _id: req.params.postId })
    res.json(postDeleteOne)
  } catch (err) {
    res.json({ message: err })
  }
})


// Update a post
router.patch('/:postId', async (req, res) => {
  try {
    const postUpdateOne = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { 
        title: req.body.title, 
        description: req.body.description 
        } 
      }
    )
    res.json(postUpdateOne)
  } catch (err) {
    res.json({ message: err })
  }
})


module.exports = router