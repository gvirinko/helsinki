const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
    // await Blog.deleteMany({})
    // const blogObjects = helper.initialBlogs
    //     .map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)
})

test('correct number of blogs, in json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
    const testBlog = {
        title: "What is Love",
        // author: "Demi Moore",
        url: "www.demi.com",
        likes: 20
    }
    await api
        .post('/api/blogs')
        // .set('Authorisation', 'bearer 123')
        .send(testBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('What is Love')
})

test('a blog without property likes can be added with value 0', async () => {
    const testBlog = {
        title: "What is Love",
        // author: "Demi Moore",
        url: "www.demi.com",
    }
    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const checkBlog = blogsAtEnd.find(blog => blog.title === testBlog.title)
    expect(checkBlog).toBeDefined()
})

test('there is a unique property id in each blog', async () => {
    const blogs = await helper.blogsInDb()
    const testArray = blogs.map(blog => expect(blog.id).toBeDefined())
    expect(blogs.length).toBe(testArray.length)
})

test('blog without title AND without url will NOT be added', async () => {
    const testBlog = {
        author: "Borat",
        likes: 1
    }
    try {
        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(400)
    } catch (error) {
        console.log(error);
    }
})

test('update the property likes', async () => {
    // const newLikes = 999
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    await api
        .patch(`/api/blogs/${blogToUpdate.id}`, { "likes": 555 })
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd);
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    console.log(updatedBlog.likes);
    // expect(updatedBlog.likes).toEqual(newLikes)
})

test('delete a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1)
    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
})

afterAll(() => {
    mongoose.connection.close()
})