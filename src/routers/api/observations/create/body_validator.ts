import ajv from "../../../../utils/globals/structures/global_ajv";
import { JSONSchemaType } from "ajv";
import ResponseMessages from "../../../../utils/globals/structures/res-messages";

export interface ObservationBody {
    feelings: string[];
    urges: string[];
    sequences: string[];
    date?: string;
}

const Schema: JSONSchemaType<ObservationBody> = {
    type: "object",
    properties: {
        "feelings": {
            type: "array",
            items: {
                type: "string"
            },
            errorMessage: {
                type: "feelings must be an array of strings."
            }
        },
        "urges": {
            type: "array",
            items: {
                type: "string"
            },
            errorMessage: {
                type: "urges must be an array of strings."
            }
        },
        "sequences": {
            type: "array",
            items: {
                type: "string"
            },
            errorMessage: {
                type: "sequences must be an array of strings."
            }
        },
        "date": {
            type: "string",
            format: "date-time",
            nullable: true,
            errorMessage: {
                type: "date must be a valid date string.",
                format: "date must be in ISO format"
            }
        }
    },
    additionalProperties: false,
    required: ['feelings', 'urges', 'sequences'],
    errorMessage: {
        type: ResponseMessages.INVALID_BODY,
        required: {
            feelings: ResponseMessages.BODY_REQUIRED_FAILED("feelings"),
            urges: ResponseMessages.BODY_REQUIRED_FAILED("urges"),
            sequences: ResponseMessages.BODY_REQUIRED_FAILED("sequences")
        },
        additionalProperties: "Provide only feelings, urges, sequences and date fields."
    }
}

const ObservationBodyValidator = ajv.compile(Schema);
export default ObservationBodyValidator;