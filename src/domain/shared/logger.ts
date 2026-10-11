export default interface Logger {
    info(msg: string, data?: object): void;
    error(msg: string, data?: object): void;
}
