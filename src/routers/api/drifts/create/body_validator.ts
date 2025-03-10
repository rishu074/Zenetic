import ajv from "../../../../utils/globals/structures/global_ajv";
import { JSONSchemaType } from "ajv";
import ResponseMessages from "../../../../utils/globals/structures/res-messages";

export interface DriftBody {
    observations: {
        feelings: string[];
        urges: string[];
        sequences: string[];
        date?: string;
    }[];
    topic: string;
    date?: string;
}

const Schema: JSONSchemaType<DriftBody> = {
    type: "object",
    properties: {
        "observations": {
            type: "array",
            items: {
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
                required: ['feelings', 'urges', 'sequences'],
                additionalProperties: false,
                errorMessage: {
                    required: {
                        feelings: ResponseMessages.BODY_REQUIRED_FAILED("feelings"),
                        urges: ResponseMessages.BODY_REQUIRED_FAILED("urges"),
                        sequences: ResponseMessages.BODY_REQUIRED_FAILED("sequences")
                    }
                }
            },
            errorMessage: {
                type: "observations must be an array of observation objects."
            }
        },
        "topic": {
            type: "string",
            errorMessage: {
                type: "topic must be a string."
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
    required: ['observations', 'topic'],
    errorMessage: {
        type: ResponseMessages.INVALID_BODY,
        required: {
            observations: ResponseMessages.BODY_REQUIRED_FAILED("observations"),
            topic: ResponseMessages.BODY_REQUIRED_FAILED("topic")
        },
        additionalProperties: "Provide only observations, topic and date fields."
    }
}

const DriftBodyValidator = ajv.compile(Schema);
export default DriftBodyValidator;