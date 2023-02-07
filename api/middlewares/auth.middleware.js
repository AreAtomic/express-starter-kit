const { authValidation } = require('../../services/validation')
const { captureError } = require('../../services/response')

exports.signup = async (req, res, next) => {
    const { username, firstName, lastName, email, password, type } = req.body

    try {
        await authValidation.noEmailDuplication(email)
        authValidation.password(password)
        authValidation.type(type)
        authValidation.name(username, firstName, lastName)

        next()
    } catch (error) {
        next(error)
    }
}

exports.getPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        await authValidation.email(email)
        next()
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const { userId } = req.params

    try {
        const user = await authValidation.account(userId)

        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}

exports.token = async (req, res, next) => {
    const token = req.headers['x-access-token']

    try {
        const decodedToken = authValidation.verifyToken(token)

        if (decodedToken) {
            let refreshToken = token

            if (decodedToken.expired) {
                refreshToken = authValidation.generateToken(
                    decodedToken.id,
                    decodedToken.firstName,
                    decodedToken.lastName,
                    decodedToken.username,
                    decodedToken.email
                )
            }

            req.user = {
                ...decodedToken,
                token: refreshToken,
                expired: false,
            }

            next()
        } else {
            throw captureError('Aucun token', 401, "Vous n'êtes pas connecté")
        }
    } catch (error) {
        next(error)
    }
}

exports.admin = async (req, res, next) => {
    try {
        authValidation.authorizationAdmin(req.user)

        next()
    } catch (error) {
        next(error)
    }
}

exports.vendor = async (req, res, next) => {
    try {
        authValidation.authorizationVendor(req.user)

        next()
    } catch (error) {
        next(error)
    }
}
