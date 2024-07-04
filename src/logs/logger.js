import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:dd-mmm-yyyy HH:mm:ss',
            ignore: 'pid,hostname'
        }
    }
});
export default logger;