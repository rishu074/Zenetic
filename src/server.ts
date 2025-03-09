import winston = require("winston");
import RegisterLogger from "./loggers/winston";
import dotenv from "dotenv";
dotenv.config();
RegisterLogger() // Registers winston logger.
import express, { Express, Request, Response } from "express";
import morganMiddleware from "./loggers/morgan";
import compression from 'compression';
import StartApplication from "./utils/startup/function";
import path = require("path");


// Create Application
const app: Express = express();

// // Config
app.disable("x-powered-by");

// Global express middlewares and loggers


app.use(compression()) // Compress all bodies

// Morgan Logger
app.use(morganMiddleware);

// Frontend Files
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src/frontend'));


// Host configurations
const port = parseInt(process.env.PORT || "5000");
const host = process.env.HOST || '0.0.0.0'

// Start Application
app.listen(port, host, 500, async () => {
    await StartApplication(app)
    winston.loggers.get("main").info(`The application started listening for connections on ${host}:${port}.`)
})