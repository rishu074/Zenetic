import ObservationModel from "../../../database/models/observation";
import CreateRequestHandler from "../../../utils/globals/ReqHandler";
import ServerError from "../../../utils/globals/error-handlers/ServerError";
import GetReadQueryValidator from "../../../utils/validators/custom/read_query";

const READ_OBSERVATION_HANDLER = CreateRequestHandler(async function () {
    const projection = this.req.query.projection ? { __v: false, ...JSON.parse(String(this.req?.query?.projection)) } : { __v: false };


    this.send_data({
        observations: await ObservationModel.find(this.local.filters, projection, { limit: this.local.limit, skip: this.local.limit * (this.local.page-1) }).sort({ date: -1 }),
        total: await ObservationModel.countDocuments(this.local.filters),
    }, "Successfully fetched data.");
}, [ServerError], undefined, [GetReadQueryValidator([1, 99999])]);
export default READ_OBSERVATION_HANDLER;