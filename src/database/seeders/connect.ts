import mongoose from "mongoose";
import winston from "winston"; // Assuming that winston has been initialized

export default async function ConnectDatabase() {
    // We currently only support mongoDB and it is the best
    const connectionString = process.env.MONGO_DB // Mongodb connects with the help of this connection string

    const logger = winston.loggers.get("main"); // Initiate logger

    if (!connectionString) throw new Error("Environment variable `MONGO_DB` was not provided and it is required.") // If there is no connection string provided.

    mongoose.connection.on('connected', () => logger.info(`Connected Database to ${mongoose.connection.host}, ${mongoose.connection.name}`));

    mongoose.connection.on("disconnected", () => {
        logger.error(`Disconnected from database! ${mongoose.connection.readyState} ${connectionString}`);
        process.exit(1);
    }) // Throw error if the database fails


    await mongoose.connect(connectionString);

}