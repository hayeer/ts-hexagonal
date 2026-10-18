import Logger from "../../domain/shared/logger";
import pino from "pino";

const logger = pino({
    redact: ["password"],
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
    },
});

export default function PinoLogger(): Logger {
    return {
        info: function (msg: string, data?: object): void {
            data ? logger.info(data, msg) : logger.info(msg);
        },
        error: function (msg: string, data?: object): void {
            data ? logger.error(data, msg) : logger.error(msg);
        },
    };
}
