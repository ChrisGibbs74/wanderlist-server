require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const visitsRoutes = require('./routes/visits')
const leaderboardRoutes = require('./routes/leaderboard')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'WanderList server is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/visits', visitsRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running at http://localhost:3000')
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })