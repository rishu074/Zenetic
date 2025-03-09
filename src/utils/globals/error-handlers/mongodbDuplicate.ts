import FlowCoord from "../FlowCoord";
import ResponseMessages from "../structures/res-messages";

export default function MongoDuplicateError(this: FlowCoord, error: any): boolean {
    // Duplicate error
    if (error && error.code && error.code === 11000) {
        const field = Object.keys(error.keyValue);

        this.send({
            status: 409, // Represents Conflict
            message: this.local?.mongodb_dup_msg || ResponseMessages.CONFLICT, // The handler can provide the error message.
            error: field
        })

        
        return true
    } else {
        return false
    }
}

export function ProduceMongoDuplicateError(key: string, value: any) {
    const err: any = new Error()
    err.code = 11000; // for dup err

    err.keyValue={};
    err.keyValue[key] = value;

    throw err;
}