import ObservationModel from "../../../../database/models/observation";
import CreateRequestHandler from "../../../../utils/globals/ReqHandler";
import ServerError from "../../../../utils/globals/error-handlers/ServerError";
import MongoError from "../../../../utils/globals/error-handlers/mongodb";
import MongoDuplicateError from "../../../../utils/globals/error-handlers/mongodbDuplicate";
import ObservationBodyValidator, { ObservationBody } from "./body_validator";



const CREATE_OBSERVATION_HANDLER = CreateRequestHandler<ObservationBody>(async function () {
    this.local.mongodb_dup_msg = "Observation already exists of the provided date."

    const new_observation = new ObservationModel({
        feelings: this.body.feelings,
        urges: this.body.urges,
        sequences: this.body.sequences,
        date: this.body.date ? new Date(this.body.date) : new Date()
    });

    await new_observation.save();

    this.send_data(new_observation.toJSON({ versionKey: false }), "Successfully created new observation");
}, [MongoError, MongoDuplicateError, ServerError], ObservationBodyValidator);

export default CREATE_OBSERVATION_HANDLER;