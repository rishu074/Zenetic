import ResponseMessages from "../globals/structures/res-messages";

export default function ValidatePassword(password: string) {
    if(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/g.test(password) != true) {
        throw new Error(ResponseMessages.REGISTER.WEAK_PASSWORD);
    }
    return true
}