const userModel = require('../../models/user.model')
const { captureError } = require('../response')

exports.create = async (
    username,
    firstName,
    lastName,
    email,
    phone,
    password,
    type,
    licence
) => {
    try {
        const user = await userModel.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            type: type,
            licence: licence,
        })

        return user
    } catch (error) {
        throw captureError(
            'Erreur base de données',
            400,
            'Une erreur est survenue durant la manipulation de la base de données'
        )
    }
}

exports.get = async (uid) => {
    try {
        return await userModel.findOne({ _id: uid })
    } catch (error) {
        throw captureError(
            'Erreur base de données',
            400,
            'Une erreur est survenue durant la manipulation de la base de données'
        )
    }
}

exports.getAll = async () => {
    try {
        return await userModel.find({})
    } catch (error) {
        throw captureError(
            'Erreur base de données',
            400,
            'Une erreur est survenue durant la manipulation de la base de données'
        )
    }
}

exports.edit = async (
    uid,
    username,
    firstName,
    lastName,
    email,
    phone,
    password,
    type,
    licence
) => {
    try {
        await userModel.findOneAndUpdate(
            { _id: uid },
            {
                $set: {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: password,
                    type: type,
                    licence: licence,
                },
            }
        )

        return this.get(uid)
    } catch (error) {
        throw captureError(
            'Erreur base de données',
            400,
            'Une erreur est survenue durant la manipulation de la base de données'
        )
    }
}

exports.delete = async (uid) => {
    try {
        await userModel.deleteOne({ _id: uid })

        return
    } catch (error) {
        throw captureError(
            'Erreur base de données',
            400,
            'Une erreur est survenue durant la manipulation de la base de données'
        )
    }
}
