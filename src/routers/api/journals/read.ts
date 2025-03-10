import JournalModel from "../../../database/models/journal";
import CreateRequestHandler from "../../../utils/globals/ReqHandler";
import ServerError from "../../../utils/globals/error-handlers/ServerError";
import GetReadQueryValidator from "../../../utils/validators/custom/read_query";

const READ_JOURNAL_HANDLER = CreateRequestHandler(async function () {
    // this.send_data(await GetJournal({
    //     ...this.local.filters,
    //     BO: this.res.locals.bo._id,
    // }, { __v: false }, { limit: this.local.limit, skip: this.local.limit * (this.local.page-1) }), "Successfully fetched data.");


    this.send_data({
        journals: await JournalModel.find(this.local.filters, { __v: false }, { limit: this.local.limit, skip: this.local.limit * (this.local.page-1) }).sort({ date: -1 }),
        total: await JournalModel.countDocuments(this.local.filters),
    }, "Successfully fetched data.");
}, [ServerError], undefined, [GetReadQueryValidator([10, 200])]);
export default READ_JOURNAL_HANDLER;