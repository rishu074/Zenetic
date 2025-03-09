import { Router } from "express";
import STATUS_HANDLER from "../global-handlers/status";
import LOGIN_HANDLER from "./login/login";
import JOURNALS_ROUTER from "./journals/router";
import Authentication from "../global-handlers/middlewares/Authentication";

const API_ROUTER = Router()

// Status endpoint
API_ROUTER.get("/status", STATUS_HANDLER)

// Login endpoint
API_ROUTER.post("/login", LOGIN_HANDLER)

// Journal endpoint
API_ROUTER.use("/journals", Authentication, JOURNALS_ROUTER)

export default API_ROUTER;