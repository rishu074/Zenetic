import winston from "winston";
import FlowCoord from "../FlowCoord";
import ResponseMessages from "../structures/res-messages";
import mongoose from "mongoose";

export default function MongoError(this: FlowCoord, error: Error): boolean {
    // Also log the error
    if (error instanceof mongoose.Error.ValidationError) {
        this.send({
            status: 400, // Represents Bad Request
            message: ResponseMessages.BAD_REQUEST,
            error: {
                msg: Object.values(error.errors).map((el: any) => el.message).join(" "),
                data: Object.values(error.errors).map((el: any) => el.path)
            }
        })

        winston.loggers.get("main").child({ "location": "ErrorHandlers/MongoError/Validation" }).warn(error);
        return true
    } else if (error instanceof  mongoose.Error.CastError) {
        this.send({
            status: 400, // Represents Bad Request
            message: ResponseMessages.BAD_REQUEST,
            error: {
                msg: error?.message || "undefined",
                data: [error?.path || ""]
            }
        })

        winston.loggers.get("main").child({ "location": "ErrorHandlers/MongoError/Cast" }).warn(error);
        return true
    } else {
        return false
    }
}