export const getenv = <T = string>(name: string): T => {
    if (process.env[name]) {
        return process.env[name] as T;
    }
    throw new Error(`${name} not set`);
}
