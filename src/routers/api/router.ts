import { Router } from "express";
import STATUS_HANDLER from "../global-handlers/status";
import LOGIN_HANDLER from "./login/login";

const API_ROUTER = Router()

// Status endpoint
API_ROUTER.get("/status", STATUS_HANDLER)

// Login endpoint
API_ROUTER.post("/login", LOGIN_HANDLER)

export default API_ROUTER;