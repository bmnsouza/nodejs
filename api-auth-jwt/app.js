const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

// Middlewares
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

// Connect to Database
dotenv.config()
mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to Database')
)

app.listen(3000, () => {
  console.log('Server Running')
})