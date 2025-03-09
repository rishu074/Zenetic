import { Router } from "express";
import Authentication from "../global-handlers/middlewares/Authentication";
import cookie from 'cookie';
const FRONTEND_ROUTER = Router()

FRONTEND_ROUTER.get("/", (req, res, next) => {
    if (cookie.parse(req.headers.cookie || '').password) { 
        return res.redirect("/dashboard")
    }
    res.render("login.ejs")
})

FRONTEND_ROUTER.get("/dashboard", Authentication, (req, res, next) => {
    res.render("dashboard.ejs")
})

FRONTEND_ROUTER.get("/logout", (req, res, next) => {
    res.clearCookie('password');
    res.redirect("/")
})

export default FRONTEND_ROUTER;
