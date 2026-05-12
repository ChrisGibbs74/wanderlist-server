const express = require('express')
const router = express.Router()
const Visit = require('../models/Visit')
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, async (req, res) => {
  try {
    const visits = await Visit.find({ userId: req.user.userId }).sort({ createdAt: -1 })
    res.json(visits)
  } catch (error) {
    console.error('Error fetching visits:', error.message)
    res.status(500).json({ error: 'Failed to fetch visits' })
  }
})

router.post('/', verifyToken, async (req, res) => {
  const { country, timesVisited, overallRating, costRating, nightlifeRating, sightseeingRating, notes, dateVisited } = req.body

  if (!country || !overallRating || !costRating || !nightlifeRating || !sightseeingRating || !dateVisited) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const visit = await Visit.create({
      userId: req.user.userId,
      country,
      timesVisited: timesVisited || 1,
      overallRating,
      costRating,
      nightlifeRating,
      sightseeingRating,
      notes,
      dateVisited
    })
    res.status(201).json(visit)
  } catch (error) {
    console.error('Error creating visit:', error.message)
    res.status(500).json({ error: 'Failed to create visit' })
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const visit = await Visit.findOne({ _id: req.params.id, userId: req.user.userId })
    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' })
    }

    const updated = await Visit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (error) {
    console.error('Error updating visit:', error.message)
    res.status(500).json({ error: 'Failed to update visit' })
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const visit = await Visit.findOne({ _id: req.params.id, userId: req.user.userId })
    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' })
    }

    await Visit.findByIdAndDelete(req.params.id)
    res.json({ message: 'Visit deleted successfully' })
  } catch (error) {
    console.error('Error deleting visit:', error.message)
    res.status(500).json({ error: 'Failed to delete visit' })
  }
})

module.exports = router