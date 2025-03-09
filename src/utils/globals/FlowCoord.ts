import { Request, Response, NextFunction } from "express";
import { Response as Res } from "./Response";
import ResponseMessages from "./structures/res-messages";

export enum FlowCoordInternalErrorCodes {
    RESPONSE_LOCKED = "RESPONSE_LOCKED"
}

export class FlowCoordError extends Error {
    error_code: FlowCoordInternalErrorCodes
    constructor(message: string, code: FlowCoordInternalErrorCodes) {
        super(message)

        this.error_code = code;
    }
}

export default class FlowCoord<Body = any> {
    req: Request;
    res: Response;
    next: NextFunction;
    locked: boolean = false;

    body: Body;

    // Local data
    readonly local: { [key: string]: any }


    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;

        this.body = req.body;
        this.local = {}
    }


    /**
     * Fn to send the response within the flow coord.
     * 
     * @param response Response to send
     */
    send(response: Res) {
        // Throw an error if the response is locked
        if (this.locked) throw new FlowCoordError("Error: Response is locked.", FlowCoordInternalErrorCodes.RESPONSE_LOCKED);

        // Send response
        this.res.status(response.status).json(response);

        // Lock the response
        this.locked = true;
    }

    /**
     * Send data within the flow coord.
     * 
     * @param data Data to send (JSON, string, array, any)
     * @param message Optional message (Defaults to ResponseMessages.SUCCESSFUL)
     */
    send_data(data?: any, message?: string) {
        this.send({
            status: 200,
            message: message || ResponseMessages.SUCCESSFUL,
            data
        })
    }
}