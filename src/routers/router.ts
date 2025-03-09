import { Router } from "express";
import NOT_FOUND_HANDLER from "./global-handlers/404";
import express from 'express';
import path from "path";
import STATUS_HANDLER from "./global-handlers/status";
import GLOBAL_ERROR_HANDLER from "./global-handlers/Error";

const ParentCat = Router()
ParentCat.use(express.json()) // Only parse json body's

/**
 * Status 
 */
ParentCat.get("/", STATUS_HANDLER)

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