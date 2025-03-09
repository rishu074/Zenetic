import winston = require("winston");
import RegisterLogger from "./loggers/winston";
import dotenv from "dotenv";
dotenv.config();
RegisterLogger() // Registers winston logger.
import express, { Express, Request, Response } from "express";
import morganMiddleware from "./loggers/morgan";
import compression from 'compression';
import StartApplication from "./utils/startup/function";
import cors from 'cors';


// Create Application
const app: Express = express();

// // Config
app.set('trust-proxy', process.env.TRUST_PROXY === "true");
app.disable("x-powered-by");

// Global express middlewares and loggers


app.use(compression()) // Compress all bodies

// Morgan Logger
app.use(morganMiddleware);

// cors
var corsOptions = {
    credentials: true,
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [''],
    allowedHeaders: ['Cookie', 'Content-Type'],
    optionsSuccessStatus: 200,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    maxAge: 604800
  }
  app.use(cors(corsOptions))

// Host configurations
const port = parseInt(process.env.PORT || "5000");
const host = process.env.HOST || '0.0.0.0'

// Start Application
app.listen(port, host, 500, async () => {
    await StartApplication(app)
    winston.loggers.get("main").info(`The application started listening for connections on ${host}:${port}.`)
})