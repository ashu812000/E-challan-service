/**
 * handle returning the error response
 * @param errCode {string}
 * @param req
 * */
module.exports.errorHandler = (errCode, req) => {
    let path = req.originalUrl; // get path of the request
    let errRes = handleErrorByApi(errCode, path); //return the error object to return
    // req.log.error("Error at ", path, " :: ", errRes) //logging of the error message
    return errRes; //return the error response
}

/**
 * handle the error codes by api
 * @param errCode {string} error code
 * @param path
 */
const handleErrorByApi = (errCode, path) => {
    const pathArray = path.split('/')
    const api = pathArray[1].split('?')[0]; // to retrieve the value of api if params are also passed

    //the response to be returned on complication of function
    const response = {
        code: errCode,
        reason: "An Application Error has occurred"
    }

    //handle the cases based on api
    switch (api) {
        case '':
            break;
        case 'auth' :
            handleAuth(errCode, response);
            break;
        case 'shops' :
            handleShops(errCode, response);
            break
        case 'products':
            handleProducts(errCode, response);
            break
        case 'otp' :
            handleOtp(errCode, response);
            break;
        default:
            response.reason = "Internal error";
    }
    return response; //return the error response
}


const handleAuth = (errCode, response) => {
    switch (errCode) {
        case '01':
            response.reason = "Error Occurred";
            break;
    }
}

const handleShops = (errCode, response) => {
    switch (errCode) {
        case '01':
            response.reason = "Please provide shop number";
            break;
        case '02':
            response.reason = "Shop not found";
            break;
    }
}

const handleProducts = (errCode, response) => {
    switch (errCode) {
        case '01':
            response.reason = "Internal server error";
            break;
    }
}
const handleOtp = (errCode, response) => {
    switch (errCode) {
        case '01':
            response.reason = "Internal server error";
            break;
        case '02':
            response.reason = "Phone number is required";
            break;
        case '03':
            response.reason = "Phone number is invalid";
            break;
        case '04':
            response.reason = "No OTP found or expired";
            break;
        case '05':
            response.reason = "OTP has expired";
            break;
        case '06':
            response.reason = "Invalid OTP";
            break;

    }
}