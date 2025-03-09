import JournalModel from "../../../../database/models/journal";
import CreateRequestHandler from "../../../../utils/globals/ReqHandler";
import ServerError from "../../../../utils/globals/error-handlers/ServerError";
import MongoError from "../../../../utils/globals/error-handlers/mongodb";
import MongoDuplicateError from "../../../../utils/globals/error-handlers/mongodbDuplicate";
import JournalBodyValidator, { JournalBody } from "./body_validator";

const CREATE_JOURNAL_HANDLER = CreateRequestHandler<JournalBody>(async function () {
    this.local.mongodb_dup_msg = "Journal already exists of the provided date."
    
    const new_journal = new JournalModel({
        special: this.body.special,
        content: this.body.content,
        date: new Date(this.body.date)
    });

    await new_journal.save();

    this.send_data(new_journal.toJSON({ versionKey: false }), "Successfully created new journal");
}, [MongoError, MongoDuplicateError, ServerError], JournalBodyValidator);

export default CREATE_JOURNAL_HANDLER;