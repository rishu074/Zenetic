import DriftsModel from "../../../database/models/drifts";
import CreateRequestHandler from "../../../utils/globals/ReqHandler";
import ServerError from "../../../utils/globals/error-handlers/ServerError";
import GetReadQueryValidator from "../../../utils/validators/custom/read_query";

const READ_DRIFTS_HANDLER = CreateRequestHandler(async function () {

    const projection = this.req.query.projection ? { __v: false, ...JSON.parse(String(this.req?.query?.projection)) } : { __v: false };


    this.send_data({
        drifts: await DriftsModel.find(this.local.filters, projection, { limit: this.local.limit, skip: this.local.limit * (this.local.page - 1) }).sort({ date: -1 }),
        total: await DriftsModel.countDocuments(this.local.filters),
    }, "Successfully fetched data.");
}, [ServerError], undefined, [GetReadQueryValidator([10, 200])]);
export default READ_DRIFTS_HANDLER;

