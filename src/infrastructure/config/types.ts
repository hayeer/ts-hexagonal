export enum Environment {
    DEV = "development",
    STG = "staging",
    PRD = "production",
}

export type DBConfig = {
    name: string;
    driver: string;
    config: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
};

export type DBCollection = (e: Environment) => Array<DBConfig>;
