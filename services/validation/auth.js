const { userModel } = require('../../models')
const utils = require('./utils')
const { captureError } = require('../response')

exports.email = async (email) => {
    if (!utils.isEmail(email)) {
        throw captureError(
            'Email invalide',
            400,
            'Veuillez rentrer un email valide'
        )
    }

    const user = await userModel.findOne({ email: email })
    if (!user) {
        throw captureError(
            'Utilisateur introuvable',
            400,
            'Veuillez rentrer un email valide'
        )
    }
}

exports.account = async (id) => {
    const user = await userModel.findOne({ _id: id }, { password: 0 })

    if (!user)
        throw captureError(
            'Utilisateur introuvable',
            400,
            'Veuillez rentrer un email valide'
        )

    return user
}

exports.noEmailDuplication = async (email) => {
    if (!utils.isEmail(email)) {
        throw captureError(
            'Email invalide',
            400,
            'Veuillez rentrer un email valide'
        )
    }

    const user = await userModel.findOne({ email: email })
    if (user) {
        throw captureError(
            "L'email est déjà utilisé.",
            400,
            'Veuillez utiliser un autre email'
        )
    }
}

exports.password = (password) => {
    if (!utils.isPasswordHashed(password)) {
        throw captureError(
            'Mot de passe invalide',
            400,
            'Veuillez rentrer un mot de passe'
        )
    }
}

exports.type = (type) => {
    if (!utils.isEnumValid(type, ['admin', 'vendor', 'user'])) {
        throw captureError(
            'Type de compte invalide',
            400,
            'Veuillez choisir si vous êtes un admin, un vendor ou un user.'
        )
    }
}

exports.name = (username, firstName, lastName) => {
    if (!utils.isStringValid(username)) {
        throw new Error(
            "Nom d'utilisateur invalide",
            400,
            "Veuillez entrer un nom d'utilisateur d'au moins 2 charactères"
        )
    }

    if (!utils.isStringValid(firstName)) {
        throw captureError(
            'Prénom invalide',
            400,
            "Veuillez entrer un prénom d'au moins 2 charactères"
        )
    }

    if (!utils.isStringValid(lastName)) {
        throw captureError(
            'Nom invalide',
            400,
            "Veuillez entrer un nom d'au moins 2 charactères"
        )
    }
}

exports.authorizationAdmin = (user) => {
    if (user.type !== 'admin') {
        throw captureError(
            "Vous n'êtes pas habilité",
            401,
            'Veuillez contacter votre administrateur pour en savoir plus'
        )
    }
}

exports.authorizationVendor = (user) => {
    if (user.type !== 'admin') {
        if (user.type !== 'bureau') {
            throw captureError(
                "Vous n'êtes pas habilité",
                401,
                'Veuillez contacter votre administrateur pour en savoir plus'
            )
        }
    }
}

const jwt = require('jsonwebtoken')
const config = require('config')
const secretToken = config.get('jwtSecret')

exports.generateToken = (id, firstName, lastName, username, email, type) => {
    return jwt.sign(
        {
            id: id,
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            type: type,
        },
        secretToken,
        {
            expiresIn: '10d',
        }
    )
}

exports.verifyToken = (token) => {
    try {
        let decoded = jwt.verify(token, secretToken)

        return { ...decoded, expired: false }
    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                let decoded = jwt.decode(token)

                if (decoded) {
                    return { ...decoded, expired: true }
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    }
}
