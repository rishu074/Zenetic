import { RequestHandler } from "express";
import FlowCoord from "./FlowCoord";
import { ValidateFunction } from "ajv";
import InvalidBodyError from "./error-handlers/InvalidBody";
import ServerError from "./error-handlers/ServerError";
import CustomValidatorError from "./structures/custom_validator_error";

export default function CreateRequestHandler<Body=any>(
    handler: (this: FlowCoord<Body>) => any,
    error_handlers: Array<(this: FlowCoord<Body>, error: Error)=> boolean>,
    body_validator?: ValidateFunction,
    custom_validators?: Array<(this: FlowCoord<Body>) => void>
): RequestHandler {
    return async (req, res, next) => {
        var flow_instance = new FlowCoord<Body>(req, res, next);

        /**
         * Body validator
         * 
         * Standard AJV Body validator.
         */
        if(body_validator && !body_validator(req.body)) {
            // validate the body
            await InvalidBodyError.call(flow_instance, body_validator.errors)

            return
        }

        /**
         * Custom validators part
         * 
         * These validators allow custom logic.
         */
        try {
            // Call all custom_body_validators
            if(custom_validators) {
                for (let i = 0; i < custom_validators.length; i++) {
                    const element = custom_validators[i];
                    
                    await element.call(flow_instance);
                }
            }
        } catch (error: any) {
            if(error instanceof CustomValidatorError) {
                await flow_instance.send({
                    status: 400,
                    message: error?.message,
                    error: error?.data
                })
            } else {
                await ServerError.call(flow_instance, error)
            }

            return // do not execute the request handler.
        }

        /**
         * The request handler
         */
        try {
            // Call the request handler
            await handler.call(flow_instance);
        } catch (error) {
            /**
             * Error handlers
             */
            let is_handled = false;
            for (let i = 0; i < error_handlers.length; i++) {
                const res = await error_handlers[i].call(flow_instance, error as any);
                if(res) {
                    is_handled = true;
                    break;
                }
            }

            if (!is_handled) flow_instance.next(error)
        }
    }
}