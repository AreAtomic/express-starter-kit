const { userServices } = require('../../services/data')
const { captureSuccess } = require('../../services/response')

exports.create = async (req, res, next) => {
    const {
        username,
        firstName,
        lastName,
        email,
        phone,
        password,
        type,
        licence,
    } = req.body

    try {
        const user = await userServices.create(
            username,
            firstName,
            lastName,
            email,
            phone,
            password,
            type,
            licence
        )

        next(
            captureSuccess(200, 'Utilisateur créé avec succès', { user: user })
        )
    } catch (error) {
        next(error)
    }
}

exports.edit = async (req, res, next) => {
    const { uid } = req.params
    const {
        username,
        firstName,
        lastName,
        email,
        phone,
        password,
        type,
        licence,
    } = req.body

    try {
        const user = await userServices.edit(
            uid,
            username,
            firstName,
            lastName,
            email,
            phone,
            password,
            type,
            licence
        )

        next(
            captureSuccess(200, 'Utilisateur modifié avec succès', {
                user: user,
            })
        )
    } catch (error) {
        next(error)
    }
}

exports.get = async (req, res, next) => {
    const { uid } = req.params

    try {
        const user = await userServices.get(uid)

        next(captureSuccess(200, null, { user: user }))
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const users = await userServices.getAll()

        next(captureSuccess(200, null, { users: users }))
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    const { uid } = req.params
    try {
        await userServices.delete(uid)

        next(captureSuccess(200, 'Utilisateur supprimé avec succès', null))
    } catch (error) {}
}
