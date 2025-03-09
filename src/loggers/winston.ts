import winston from "winston";
import 'winston-daily-rotate-file';
import path from 'path';

export default function RegisterLogger() {
    winston.loggers.add("main", {
        level: 'debug',
        format: winston.format.simple(),
        transports: [
          new winston.transports.Console({
            level: process.env.CONSOLE_LOG_LEVEL || "info",
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
          }),
          new winston.transports.DailyRotateFile({
            filename: path.join(process.env.APP_LOGS || path.join(process.cwd(), 'logs'), "%DATE%.log"),
            level: 'debug',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            maxFiles: 15,
            maxSize: "30m",
            zippedArchive: true
          })
        ],
        exceptionHandlers: [
          new winston.transports.File({ filename: path.join(process.env.APP_LOGS || path.join(process.cwd(), 'logs'), "exceptions.log") }),
        ],
        rejectionHandlers: [
          new winston.transports.File({ filename: path.join(process.env.APP_LOGS || path.join(process.cwd(), 'logs'), "rejections.log") }),
        ],
      })
}