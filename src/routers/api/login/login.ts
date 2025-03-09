import CreateRequestHandler from "../../../utils/globals/ReqHandler";
import ServerError from "../../../utils/globals/error-handlers/ServerError";
import { checkHash, createHash } from "../../../utils/functions/hash";
import ControllerError from "../../../utils/globals/structures/controller_error";
import ControllerErrorHandler from "../../../utils/globals/error-handlers/ControllerError";

const LOGIN_HANDLER = CreateRequestHandler(async function () {
    const { password } = this.body;

    if (!password) {
        throw new ControllerError("Password is required");
    }

    // Get stored password hash from environment variable
    const storedHash = process.env.PASSWORD_HASH;
    
    if (!storedHash) {
        throw new ControllerError("Server configuration error");
    }



    // Compare password with stored hash using the utility function
    const isMatch = await checkHash(password, storedHash);

    if (!isMatch) {
        throw new ControllerError("Invalid password");
    }

    // Send success response
    this.res.cookie('password', password, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.HTTPS === "true",
        path: "/",
        expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)) // 7 days
    })

    this.send({ status: 200, message: "Successfully logged in.", data: { redirect: "/dashboard" } })

}, [ControllerErrorHandler, ServerError]);

export default LOGIN_HANDLER;