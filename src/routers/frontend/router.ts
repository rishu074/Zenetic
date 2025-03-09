import { Router } from "express";

const FRONTEND_ROUTER = Router()

FRONTEND_ROUTER.get("/", (req, res, next) => {
    res.render("login.ejs")
})

export default FRONTEND_ROUTER;
