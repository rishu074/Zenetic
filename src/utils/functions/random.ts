import crypto from 'crypto';
import winston from 'winston';

const logger = winston.loggers.get("main").child({"location": "utils/functions/random"});

/**
 * Generates a cryptographically secure random string of specified length
 * @param length Length of the random string to generate
 * @returns Random string containing alphanumeric characters
 */
export const generate = (length: number): string => {
    try {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    } catch (error: any) {
        logger.error(error);
        throw new Error("Failed to generate random string");
    }
}; 