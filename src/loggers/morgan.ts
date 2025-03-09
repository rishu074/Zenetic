import morgan from 'morgan';
import winston from 'winston';

const morganMiddleware = morgan(
    ':method :remote-addr :url :status :res[content-length] - :response-time ms Cookies -> :req[cookie]',
    {
        stream: {
            write: (message) => winston.loggers.get("main").http(message.trim()),
        },
    }
);

export default morganMiddleware;