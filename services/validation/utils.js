const bcrypt = require('bcrypt')
const dayjs = require('dayjs')
const { captureError } = require('../response')

exports. isEmail = (email) => {
    const charSchema = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    return email.match(charSchema)
}

exports. isStringValid = (value) => {
    return typeof value === 'string' && value.length >= 2
}

exports. isEnumValid = (type, allowed) => {
    const typeLowerCase = type.toString().toLowerCase()
    const allowedLowerCase = allowed.map((allow) => {
        return allow.toString().toLowerCase()
    })

    return allowedLowerCase.indexOf(typeLowerCase) !== -1
}

exports. isPasswordHashed = (password) => {
    const rounds = bcrypt.getRounds(password)
    console.log(rounds)

    return rounds === 10
}

exports. numberValidation = (name, value, min, max) => {
    if (max >= value > min) {
        return `${value > 9 ? value : `0${value}`}`
    } else {
        throw captureError(
            `${name} invalide`,
            400,
            `Veuillez entrer une valeur pour ${name} comprise entre ${min} et ${max}`
        )
    }
}

exports. isFloatValid = (value) => {
    if (value.indexOf('.') !== -1) {
        const splited = value.split('.')

        if (splited.length === 2) {
            if (splited[1].length === 2) {
                return true
            }
        }
    }
    return false
}

exports. nameValidation = async (firstName, lastName) => {
    return isStringValid(firstName) && isStringValid(lastName)
}

exports. isDateValid = (date) => {
    return dayjs(date).isValid()
}

exports. isDateAfter = (start, end) => {
    return dayjs(end).isAfter(start)
}

exports. isUrlValid = (url) => {
    const charSchema = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    return url.match(charSchema)
}
