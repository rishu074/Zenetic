import CreateRequestHandler from "../../../utils/globals/ReqHandler";
import ServerError from "../../../utils/globals/error-handlers/ServerError";
import TodoModel from "../../../database/models/todo";
import CustomValidatorError from "../../../utils/globals/structures/custom_validator_error";
import mongoose from "mongoose";
import ControllerError from "../../../utils/globals/structures/controller_error";
import ControllerErrorHandler from "../../../utils/globals/error-handlers/ControllerError";

const COMPLETE_TODO_HANDLER = CreateRequestHandler(async function () {

    const todo = await TodoModel.findById(this.req.query.id);

    if (!todo) {
        throw new ControllerError("Invalid Todo ID", { key: "id", value: this.req.query.id, in: "QueryParams", message: "Invalid Todo ID" });
    } else if (todo.completed.length > 0 && todo.type === "onetime") {
        throw new ControllerError("Todo already completed", { key: "id", value: this.req.query.id, in: "QueryParams", message: "Todo already completed" });
    }

    todo.completed.push(new Date());
    await todo.save();

    this.send_data(todo.toJSON({ versionKey: false }), "Successfully completed todo");
    
    


}, [ControllerErrorHandler, ServerError], undefined, [function() {
    if (!this.req.query?.id || !mongoose.Types.ObjectId.isValid(String(this.req.query.id))) {
        throw new CustomValidatorError("id is required", { key: "id", value: this.req.query.id, in: "QueryParams", message: "id is required" });
    }
}]);
export default COMPLETE_TODO_HANDLER;