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
        case 'order':
            handleOrder(errCode, response);
            break;
        default:
            response.reason = "Internal error";
    }
    return response; //return the error response
}


const handleAuth = (errCode, response) => {
    switch (errCode) {
        case '01':
            response.reason = "email and password are required.";
            break;
        case '02':
            response.reason = "Admin does not exist";
            break;
        case '03':
            response.reason = "Passwords do not match";
            break;
        case '04':
            response.reason = "JWT token Not Found";
            break;
        case '05':
            response.reason = "Error Occurred in Token";
            break;
            case '06':
                response.reason = "Admin already exist";
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
        case '02':
            response.reason = "Name and rate are required";
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
const handleOrder = (errCode, response) => {
    switch (errCode) {
        case '01':
            response.reason = "Missing required fields.";
            break;
        case '02':
            response.reason = "Some products not found.";
            break;
        case '03':
            response.reason = "Order ID is required";
            break;
        case '04':
            response.reason = "Order not found";
            break;
        case '05':
            response.reason = "Product list is empty";
            break;
        case '06':
            response.reason = "Order ID and image are required.";
            break;
        case '07':
            response.reason = "Payment proof already exists for this order.";
            break;
        case '08':
            response.reason = "Payment proof does not exist for this order.";
            break;
        case '09':
            response.reason = "Failed to update this order.";
            break;
            case '10':
                response.reason = "Wrong status value provided.";
                break;


    }
}