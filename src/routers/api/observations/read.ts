import ObservationModel from "../../../database/models/observation";
import CreateRequestHandler from "../../../utils/globals/ReqHandler";
import ServerError from "../../../utils/globals/error-handlers/ServerError";
import GetReadQueryValidator from "../../../utils/validators/custom/read_query";

const READ_OBSERVATION_HANDLER = CreateRequestHandler(async function () {
    this.send_data({
        observations: await ObservationModel.find(this.local.filters, { __v: false }, { limit: this.local.limit, skip: this.local.limit * (this.local.page-1) }).sort({ date: -1 }),
        total: await ObservationModel.countDocuments(this.local.filters),
    }, "Successfully fetched data.");
}, [ServerError], undefined, [GetReadQueryValidator([10, 200])]);
export default READ_OBSERVATION_HANDLER;