const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

// Import Routes
const postRoute = require('./routes/post')

// Middlewares
app.use(cors())
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('We are on home')
})
app.use('/post', postRoute)

// Connect to Database
dotenv.config()
mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to Database')
)

// Listening to the server
app.listen(3000, () => {
  console.log('Server Running')
})