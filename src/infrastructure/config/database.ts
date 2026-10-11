import { getenv } from "../util/common.helper";
import { DBCollection, DBConfig, Environment } from "./types";

const dbCollection: DBCollection = (e: Environment) => {
    const dbs: Record<Environment, Array<DBConfig>> = {
        [Environment.DEV]: [
            {
                name: 'default',
                driver: 'mysql',
                config: {
                    host: getenv('DB_HOST'),
                    port: getenv('DB_PORT'),
                    username: getenv('DB_USER'),
                    password: getenv('DB_PASS'),
                    database: getenv('DB_NAME')
                }
            }
        ],
        [Environment.STG]: [
            {
                name: 'default',
                driver: 'mysql',
                config: {
                    host: getenv('DB_HOST'),
                    port: getenv('DB_PORT'),
                    username: getenv('DB_USER'),
                    password: getenv('DB_PASS'),
                    database: getenv('DB_NAME')
                }
            }
        ],
        [Environment.PRD]: [
            {
                name: 'default',
                driver: 'mysql',
                config: {
                    host: getenv('DB_HOST'),
                    port: getenv('DB_PORT'),
                    username: getenv('DB_USER'),
                    password: getenv('DB_PASS'),
                    database: getenv('DB_NAME')
                }
            }
        ]
    }
    return dbs[e];
}

export default dbCollection;
