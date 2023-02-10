const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'Password required must have at least 3 characters' }).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name, 
        passwordHash
    })
    savedUser = await user.save()
    response.status(201).json(savedUser)
})



module.exports = userRouter