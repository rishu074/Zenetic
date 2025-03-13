import TodoModel from "../../../../database/models/todo";
import CreateRequestHandler from "../../../../utils/globals/ReqHandler";
import ServerError from "../../../../utils/globals/error-handlers/ServerError";
import MongoError from "../../../../utils/globals/error-handlers/mongodb";
import MongoDuplicateError from "../../../../utils/globals/error-handlers/mongodbDuplicate";
import TodoCreateBodyValidator, { TodoCreateBody } from "./body_validator";

const CREATE_TODO_HANDLER = CreateRequestHandler<TodoCreateBody>(async function () {
    this.local.mongodb_dup_msg = "Todo already exists of the provided date."
    
    const new_todo = new TodoModel({
        type: this.body.type,
        every: this.body.every,
        work: this.body.work,
        createdAt: this.body.createdAt
    });

    await new_todo.save();

    this.send_data(new_todo.toJSON({ versionKey: false }), "Successfully created new todo");
}, [MongoError, MongoDuplicateError, ServerError], TodoCreateBodyValidator);

export default CREATE_TODO_HANDLER;