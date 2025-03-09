const ResponseMessages = {
    "SERVER_ERROR": "There was an error on the server side, please contact admin.",
    "SUCCESSFUL": "Successfully completed the request.",
    "INVALID_BODY": "Invalid body provided.",
    "REGISTER": {
        "INVALID_EMAIL": "Email provided is not valid.",
        "INVALID_PASSWORD": "Password is not valid.",
        "WEAK_PASSWORD": "Please choose a strong password."
    },
    "BODY_REQUIRED_FAILED": (failed: string) => `\`${failed}\` was required but not provided.`,
    "BAD_REQUEST": "The request was failed with bad request, Kindly check the request and resend.",
    "CONFLICT": "A resource with that property already exists.",
    "UNAUTHORIZED": "You are not allowed to perform this action.",
    "LOGIN": {
        "INVALID_CREDENTIALS": "Invalid email or password provided.",
        "SESSION_EXPIRED": "Your session has expired. Please login again."
    },
    "DATABASE": {
        "INVALID_ID": "Invalid id provided."
    }
}

export default ResponseMessages;