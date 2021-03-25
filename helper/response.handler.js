/**
response handler for manage all response 
**/
exports.responseHandler = function (response, statusCode, data, status, message) {
    return response.status(statusCode).send({
        data: data,
        message: message,
        status: status
    })
}