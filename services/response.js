exports.captureError = (message, status, cause) => {
    const error = new Error(message)
    error.status = status
    error.cause = cause

    return error
}

exports.captureSuccess = (status, message, body) => {
    return { status: status, message: message, body: body }
}
