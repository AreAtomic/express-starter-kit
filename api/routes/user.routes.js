const express = require('express')
const router = express.Router()

const { authMiddlewares } = require('../middlewares')

const { userControllers } = require('../controllers')

router.post(
    '/',
    [authMiddlewares.token, authMiddlewares.admin, authMiddlewares.signup],
    userControllers.create
)
router.get(
    '/:uid',
    [authMiddlewares.token, authMiddlewares.admin],
    userControllers.get
)
router.put(
    '/:uid',
    [authMiddlewares.token, authMiddlewares.admin, authMiddlewares.signup],
    userControllers.edit
)
router.delete(
    '/:uid',
    [authMiddlewares.token, authMiddlewares.admin],
    userControllers.delete
)
router.get('/', [authMiddlewares.token], userControllers.getAll)

module.exports = router
