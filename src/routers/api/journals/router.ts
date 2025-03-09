import { Router } from "express";
import READ_JOURNAL_HANDLER from "./read";
import CREATE_JOURNAL_HANDLER from "./create/create";
const JOURNALS_ROUTER = Router();

JOURNALS_ROUTER.get("/", READ_JOURNAL_HANDLER)
JOURNALS_ROUTER.post("/", CREATE_JOURNAL_HANDLER)

export default JOURNALS_ROUTER;
