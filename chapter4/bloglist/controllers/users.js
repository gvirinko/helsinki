const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.username || !body.password) {
        return response.status(400).json({ error: "Username or password is missing" })
    }
    if (body.username.length <= 3 || body.password.length <= 3) {
        return response.status(400).json({ error: "Entered data should be longer than three symbols" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const check = await User.findOne({ username: body.username })
    if (check) {
        return response.status(400).json({ error: "Such user already exists" })
    }

    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
})

module.exports = usersRouter