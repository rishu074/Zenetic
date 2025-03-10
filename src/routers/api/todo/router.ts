import { Router } from "express";
import CREATE_TODO_HANDLER from "./create/create";
import READ_TODO_HANDLER from "./read";
import COMPLETE_TODO_HANDLER from "./complete";
const TODO_ROUTER = Router();

TODO_ROUTER.post("/", CREATE_TODO_HANDLER);

TODO_ROUTER.get("/", READ_TODO_HANDLER);    

TODO_ROUTER.put("/", COMPLETE_TODO_HANDLER);

export default TODO_ROUTER;
