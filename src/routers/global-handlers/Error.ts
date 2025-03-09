import { NextFunction, Request, Response } from "express";
import winston from "winston";
import FlowCoord from "../../utils/globals/FlowCoord";
import ServerError from "../../utils/globals/error-handlers/ServerError";

const GLOBAL_ERROR_HANDLER = (err: Error, req: Request, res: Response, next: NextFunction) => {
    winston.loggers.get('main').child({"location": "Global_Handlers/Error"}).error(err);

    const flow_instance = new FlowCoord(req, res, next);
    ServerError.call(flow_instance, err);
};

export default GLOBAL_ERROR_HANDLER