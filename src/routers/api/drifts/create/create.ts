import CreateRequestHandler from "../../../../utils/globals/ReqHandler";
import ServerError from "../../../../utils/globals/error-handlers/ServerError";
import MongoError from "../../../../utils/globals/error-handlers/mongodb";
import MongoDuplicateError from "../../../../utils/globals/error-handlers/mongodbDuplicate";
import DriftBodyValidator, { DriftBody } from "./body_validator";
import DriftModel from "../../../../database/models/drifts";
import ObservationModel from "../../../../database/models/observation";


const CREATE_DRIFT_HANDLER = CreateRequestHandler<DriftBody>(async function () {
    this.local.mongodb_dup_msg = "Drift already exists of the provided date."

    // Create observations first
    const observation_ids = await Promise.all(this.body.observations.map(async (obs) => {
        const new_observation = new ObservationModel({
            feelings: obs.feelings,
            urges: obs.urges,
            sequences: obs.sequences,
            date: obs.date ? new Date(obs.date) : new Date()
        });
        await new_observation.save();
        return new_observation._id;
    }));

    const new_drift = new DriftModel({
        observations: observation_ids,
        topic: this.body.topic,
        date: this.body.date ? new Date(this.body.date) : new Date()
    });

    await new_drift.save();

    this.send_data(new_drift.toJSON({ versionKey: false }), "Successfully created new drift");
}, [MongoError, MongoDuplicateError, ServerError], DriftBodyValidator);

export default CREATE_DRIFT_HANDLER;