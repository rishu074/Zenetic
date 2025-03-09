// This part contains the code for globally used ajv instance and its validators.
import Ajv from "ajv";
import ValidateEmail from "../../validators/email";
import ValidatePassword from "../../validators/password";
const ajv = new Ajv({ allErrors: true, strict: true });
require("ajv-errors")(ajv);
require('ajv-formats')(ajv);

// Custom AJV Formats
ajv.addFormat("email", (email) => {
    try {
        ValidateEmail(email)
        return true
    } catch (error) {
        return false
    }
})

ajv.addFormat("password", (password) => {
    try {
        ValidatePassword(password)
        return true
    } catch (error) {
        return false
    }
})


ajv.addFormat("id", (id) => /^[0-9a-fA-F]{24}$/.test(id))


export default ajv;
