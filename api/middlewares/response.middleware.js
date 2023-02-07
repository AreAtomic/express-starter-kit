module.exports = responseHandler = (json, req, res, next) => {
    console.log(json)
    if (json.status > 299) {
        res.status(json.status).json({
            message: json.message,
            error: json.cause,
        })
    } else {
        res.status(json.status).json({
            message: json.message,
            ...json.body,
        })
    }
}
