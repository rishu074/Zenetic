import ajv from "../../../../utils/globals/structures/global_ajv";
import { JSONSchemaType } from "ajv";
import ResponseMessages from "../../../../utils/globals/structures/res-messages";

export interface JournalBody {
    special: string;
    content: string;
    date: string;
}
const Schema: JSONSchemaType<JournalBody> = {
    type: "object",
    properties: {
        "special": {
            type: "string",
            errorMessage: {
                type: "special must be a string."
            }
        },
        "content": {
            type: "string", 
            errorMessage: {
                type: "content must be a string."
            }
        },
        "date": {
            type: "string",
            format: "date-time",
            errorMessage: {
                type: "date must be a valid date string.",
                format: "date must be in ISO format"
            }
        }
    },
    additionalProperties: false,
    required: ['special', 'content', 'date'],
    errorMessage: {
        type: ResponseMessages.INVALID_BODY,
        required: {
            special: ResponseMessages.BODY_REQUIRED_FAILED("special"),
            content: ResponseMessages.BODY_REQUIRED_FAILED("content"), 
            date: ResponseMessages.BODY_REQUIRED_FAILED("date")
        },
        additionalProperties: "Provide only special, content and date fields."
    }
}


const JournalBodyValidator = ajv.compile(Schema);
export default JournalBodyValidator; 