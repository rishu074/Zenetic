import FlowCoord from "../FlowCoord";
import ControllerError from "../structures/controller_error";
import ResponseMessages from "../structures/res-messages";

export default function ControllerErrorHandler(this: FlowCoord, error: any): boolean {
    // Duplicate error
    if (error && error instanceof ControllerError) {

        this.send({
            status: 400, // Represents Invalid Body error
            message: error.message, // The handler can provide the error message.
            error: error.error
        })
        return true
    } else {
        return false
    }
}