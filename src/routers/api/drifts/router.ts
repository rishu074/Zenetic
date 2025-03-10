import { Router } from "express";
import READ_DRIFTS_HANDLER from "./read";
import CREATE_DRIFT_HANDLER from "./create/create";

const DRIFTS_ROUTER = Router();

DRIFTS_ROUTER.get("/", READ_DRIFTS_HANDLER)
DRIFTS_ROUTER.post("/", CREATE_DRIFT_HANDLER)   

export default DRIFTS_ROUTER;
