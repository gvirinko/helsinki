const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("secret", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()
})

test('user without username or password will not be added', async () => {
    const newUser = {
        username: 'kamala',
        name: 'Kamala Harris'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(result.body.error).toContain('Username or password is missing')
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).not.toContain(newUser)
})

test('username duplicate will not be added', async () => {
    const newUser = {
        username: 'root',
        name: 'root shmoot',
        password: 'mooo'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(result.body.error).toContain('Such user already exists')
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).not.toContain(newUser)


})

afterAll(() => {
    mongoose.connection.close()
})