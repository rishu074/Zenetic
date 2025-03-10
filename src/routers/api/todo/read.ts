import CreateRequestHandler from "../../../utils/globals/ReqHandler";
import ServerError from "../../../utils/globals/error-handlers/ServerError";
import GetReadQueryValidator from "../../../utils/validators/custom/read_query";
import TodoModel from "../../../database/models/todo";


const READ_TODO_HANDLER = CreateRequestHandler(async function () {

    const projection = this.req.query.projection ? { __v: false, ...JSON.parse(String(this.req?.query?.projection)) } : { __v: false };

    console.dir(this.local.filters, { depth: null, colors: true });

    this.send_data({
        todos: await TodoModel.find(this.local.filters, projection, { limit: this.local.limit, skip: this.local.limit * (this.local.page-1) }).sort({ date: -1 }),
        total: await TodoModel.countDocuments(this.local.filters),
    }, "Successfully fetched data.");
}, [ServerError], undefined, [GetReadQueryValidator([10, 200])]);
export default READ_TODO_HANDLER;