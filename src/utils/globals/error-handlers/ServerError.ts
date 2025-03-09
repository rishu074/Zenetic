import winston from "winston";
import FlowCoord from "../FlowCoord";
import ResponseMessages from "../structures/res-messages";

export default function ServerError(this: FlowCoord, error?: Error): boolean {
    // Also log the error
    winston.loggers.get("main").child({ "location": "ErrorHandlers/ServerError" }).error(error);


    this.send({
        status: 500,
        message: ResponseMessages.SERVER_ERROR,
        error: error?.message
    })

    // All the error handlers must return a boolean specifying if the error was handled or not.
    return true
}