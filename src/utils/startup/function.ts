import { Express } from "express";
import ConnectDatabase from "../../database/seeders/connect";
import ParentCat from "../../routers/router";

export default async function StartApplication(app: Express) {
    await ConnectDatabase() // Connect database at first

    // Global router
    app.use(ParentCat);
}