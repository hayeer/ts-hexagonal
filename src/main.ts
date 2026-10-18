import "dotenv/config";
import server from "./adapter/api/server";
import KyselyAdapter from "./infrastructure/kysely/connection";
import UserRepoAdapter from "./adapter/repository/user";
import UserService from "./domain/user/services";
import UUIDGen from "./adapter/shared/uuid";
import PinoLogger from "./adapter/shared/pino.logger";

function Provider() {
    const database = KyselyAdapter();
    const userRepo = UserRepoAdapter(database.getdb("default"));

    return {
        repo: {
            user: userRepo,
        },
        service: {
            user: UserService(userRepo, UUIDGen()),
        },
        shared: {
            idGenerator: UUIDGen(),
            logger: PinoLogger(),
        },
    };
}

const Server = server(Provider());

export type ServiceProvider = ReturnType<typeof Provider>;

process.on("SIGINT", () => {
    Server.close();
    process.exit(0);
});

process.on("SIGTERM", () => {
    Server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
});
