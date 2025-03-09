import { Router } from "express";
import STATUS_HANDLER from "../global-handlers/status";

const API_ROUTER = Router()

API_ROUTER.get("/status", STATUS_HANDLER)

export default API_ROUTER;