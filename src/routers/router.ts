import { Router } from "express";
import NOT_FOUND_HANDLER from "./global-handlers/404";
import express from 'express';
import path from "path";
import GLOBAL_ERROR_HANDLER from "./global-handlers/Error";
import API_ROUTER from "./api/router";
import FRONTEND_ROUTER from "./frontend/router";
const ParentCat = Router()
ParentCat.use(express.json()) // Parse json body's
ParentCat.use(express.urlencoded({ extended: true })) // Parse urlencoded body's

/**
 * API Routes 
 */
ParentCat.use("/api", API_ROUTER)

/**
 * Frontend Routes
 */
ParentCat.use("/", FRONTEND_ROUTER)

/**
 * Global Handlers area
 * - Public files serving
 * - 404
 * - error handler
 */
ParentCat.use(express.static(path.join(process.cwd(), 'src/public')))
ParentCat.use(NOT_FOUND_HANDLER);
ParentCat.use(GLOBAL_ERROR_HANDLER)

export default ParentCat