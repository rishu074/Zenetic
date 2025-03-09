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
    res.render("dashboard/index.ejs")
})

// Journal route
FRONTEND_ROUTER.get("/dashboard/journal", Authentication, (req, res, next) => {
    res.render("dashboard/journal.ejs")
})

// Thought route
FRONTEND_ROUTER.get("/dashboard/thought", Authentication, (req, res, next) => {
    res.render("dashboard/thought.ejs")
})

// Todo route
FRONTEND_ROUTER.get("/dashboard/todo", Authentication, (req, res, next) => {
    res.render("dashboard/todo.ejs")
})

// Drifts route
FRONTEND_ROUTER.get("/dashboard/drifts", Authentication, (req, res, next) => {
    res.render("dashboard/drifts.ejs")
})

FRONTEND_ROUTER.get("/logout", (req, res, next) => {
    res.clearCookie('password');
    res.redirect("/")
})

export default FRONTEND_ROUTER;
