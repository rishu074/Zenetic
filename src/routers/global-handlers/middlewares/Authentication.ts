import { NextFunction, Request, Response } from "express";
import FlowCoord from "../../../utils/globals/FlowCoord";
import cookie from 'cookie';
import { checkHash } from "../../../utils/functions/hash";

export default async function Authentication(req: Request, res: Response, next: NextFunction) {
    const flow_instance = new FlowCoord(req, res, next);

    const cookies = cookie.parse(req.headers.cookie || '');
    const password = cookies.password;

    if(!password || !(await checkHash(password, process.env.PASSWORD_HASH || 'default_password'))) {
        res.clearCookie('password');
        return res.redirect("/")
    }
    next();
}