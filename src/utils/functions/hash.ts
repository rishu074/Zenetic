import bcrypt from 'bcrypt'
import winston from 'winston';

const logger = winston.loggers.get("main").child({"location": "utils/functions/hash"})

export const createHash = async (saltRounds: string | number, data: string) => {
    let a;
    try {
        a = bcrypt.hashSync(data, saltRounds)
    } catch (error: any) {
        logger.error(error)
        throw new Error("An unexpected error occurred while hashing the password.")
    }

    return a;
}

export const checkHash = async (data: string, hash: string) => {
    let a;
    try {
        a = bcrypt.compareSync(data, hash)
    } catch (error: any) {
        logger.error(error)
        throw new Error("An unexpected error occurred while unmasking the password.")
    }

    return a;
}