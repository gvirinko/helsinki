const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })
    const savedBlog = await blog.save()
    // if (savedBlog) {
    response.json(savedBlog.toJSON())
    // } else {
    //     response.status(400).end()
    // }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

})

// blogsRouter.patch('/:id', async (request, response, next) => {
//     const newLikes = request.body

//     const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newLikes, { new: true })
//     response.send(updatedBlog);
// })

module.exports = blogsRouter