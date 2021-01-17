const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('comment', { text: 1, blogId: 1 })
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  const comment = new Comment({
    text: body.text,
    blogId: body.blogId
  })
  const savedComment = await comment.save()
  response.json(savedComment.toJSON())
})

module.exports = commentsRouter