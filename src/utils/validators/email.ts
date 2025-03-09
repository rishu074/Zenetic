import ResponseMessages from "../globals/structures/res-messages"

export default function ValidateEmail(email: string) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) != true) {
        throw new Error(ResponseMessages.REGISTER.INVALID_EMAIL);
    }
    return true
}