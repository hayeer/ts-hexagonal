import { Kysely, MysqlDialect } from "kysely";
import Database from "./schema";
import dbCollection from "../config/database";
import { getenv } from "../util/common.helper";
import { createPool } from "mysql2";

let databases: Array<{name: string, db: Kysely<Database>}> = [];

export default function KyselyAdapter() {
    if (databases.length === 0) {
        const dbs = dbCollection(getenv('APP_ENV'));
        for (const db of dbs) {
            databases.push({
                name: db.name,
                db: new Kysely<Database>({
                    dialect: new MysqlDialect({
                        pool: createPool({
                            database: db.config.database,
                            host: db.config.host,
                            port: db.config.port,
                            user: db.config.username,
                            password: db.config.password
                        })
                    })
                })
            })
        }
    }

    return {
        getdb: (name: string): Kysely<Database> => {
            const find = databases.find(db => db.name === name);
            if (find) return find.db;
            throw new Error(`Database ${name} not set`);
        },
        close: async () => {
            for (const { db } of databases) {
                await db.destroy();
            }
            databases = [];
        }
    }
}
