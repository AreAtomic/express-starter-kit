const express = require('express')
const router = express.Router()

/**
 * @route http://localhost:5000/api/v1
 * @description The page that show the API is Running
 */
router.get('/', async (req, res) => {
    res.send('<h1>API of Areatomic</h1>')
})

const {
    authRoutes,
    userRoutes,
} = require('./routes')

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

module.exports = router
