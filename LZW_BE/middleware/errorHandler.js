// const {constants} = require('./constants');
// VALIDATION_ERROR: 400,
// UNAUTHORIZED: 401,
// FORBIDDEN: 403,
// NOT_FOUND: 404,
// INTERNAL_SERVER_ERROR: 500
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case 400:
            res.json({
                title: "Validation Failed - Bad Request", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 403:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 404:
            res.json({
                title: "Not Found", 
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 500:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No error found, ALL is good !");
            break;
    }
};
console.log("errorHandler.js");
module.exports = errorHandler;