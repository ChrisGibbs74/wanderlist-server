const express = require('express')
const router = express.Router()
const Visit = require('../models/Visit')

router.get('/', async (req, res) => {
  try {
    const mostVisited = await Visit.aggregate([
      {
        $group: {
          _id: '$country',
          totalVisits: { $sum: '$timesVisited' },
          avgOverall: { $avg: '$overallRating' },
          avgCost: { $avg: '$costRating' },
          avgNightlife: { $avg: '$nightlifeRating' },
          avgSightseeing: { $avg: '$sightseeingRating' }
        }
      },
      { $sort: { totalVisits: -1 } },
      { $limit: 10 }
    ])

    const highestRated = await Visit.aggregate([
      {
        $group: {
          _id: '$country',
          totalVisits: { $sum: '$timesVisited' },
          avgOverall: { $avg: '$overallRating' },
          avgCost: { $avg: '$costRating' },
          avgNightlife: { $avg: '$nightlifeRating' },
          avgSightseeing: { $avg: '$sightseeingRating' }
        }
      },
      { $sort: { avgOverall: -1 } },
      { $limit: 10 }
    ])

    res.json({ mostVisited, highestRated })
  } catch (error) {
    console.error('Error fetching leaderboard:', error.message)
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

module.exports = router