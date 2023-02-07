const express = require('express')
const router = express.Router()

const { authMiddlewares } = require('../middlewares')

const { authControllers } = require('../controllers')

router.post('/signup', authMiddlewares.signup, authControllers.signup)
router.post('/', authMiddlewares.getPassword, authControllers.getUser)
router.get('/:userId', authMiddlewares.login, authControllers.login)

module.exports = router
