const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')


// Submits a user
router.post('/register', async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) {
    return res.status(400).send('Email already exists')
  }

  // Hash the passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  
  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})


// Login
router.post('/login', async (req, res) => {
  // Validate the data
  const { error } = loginValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Checking if the email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Email is not found')
  }

  // Checking if the password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Password is not valid')
  }

  // Create and assingn a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router