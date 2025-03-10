import ajv from "../../../../utils/globals/structures/global_ajv";
import { JSONSchemaType } from "ajv";
import ResponseMessages from "../../../../utils/globals/structures/res-messages";

export interface TodoCreateBody {
    type: 'onetime' | 'every';
    every?: {
        amount: number;
        unit: 'day' | 'week' | 'month';
    };
    work: string;
}

const Schema: JSONSchemaType<TodoCreateBody> = {
    type: "object",
    properties: {
        "type": {
            type: "string",
            enum: ['onetime', 'every'],
            errorMessage: {
                type: "type must be either 'onetime' or 'every'",
                enum: "type must be either 'onetime' or 'every'"
            }
        },
        "every": {
            type: "object",
            nullable: true,
            properties: {
                "amount": {
                    type: "number",
                    errorMessage: {
                        type: "every.amount must be a number"
                    }
                },
                "unit": {
                    type: "string",
                    enum: ['day', 'week', 'month'],
                    errorMessage: {
                        type: "every.unit must be a string",
                        enum: "every.unit must be either 'day', 'week' or 'month'"
                    }
                }
            },
            required: ['amount', 'unit'],
            errorMessage: {
                required: {
                    amount: ResponseMessages.BODY_REQUIRED_FAILED("every.amount"),
                    unit: ResponseMessages.BODY_REQUIRED_FAILED("every.unit")
                }
            }
        },
        "work": {
            type: "string",
            errorMessage: {
                type: "work must be a string"
            }
        }
    },
    required: ['type', 'work'],
    additionalProperties: false,
    dependencies: {
        type: {
            oneOf: [
                {
                    properties: {
                        type: { const: "onetime" }
                    }
                },
                {
                    properties: {
                        type: { const: "every" },
                        every: { type: "object" }
                    },
                    required: ["every"]
                }
            ]
        }
    },
    errorMessage: {
        type: ResponseMessages.INVALID_BODY,
        required: {
            type: ResponseMessages.BODY_REQUIRED_FAILED("type"),
            work: ResponseMessages.BODY_REQUIRED_FAILED("work")
        },
        additionalProperties: "Provide only type, every and work fields.",
        dependencies: {
            type: "every property is required when type is 'every'"
        }
    }
}

const TodoCreateBodyValidator = ajv.compile(Schema);
export default TodoCreateBodyValidator;