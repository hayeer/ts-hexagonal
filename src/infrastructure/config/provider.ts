import UserRepoAdapter from "../../adapter/repository/user";
import PinoLogger from "../../adapter/shared/pino.logger";
import UUIDGen from "../../adapter/shared/uuid";
import UserService from "../../domain/user/services";
import KyselyAdapter from "../kysely/connection";

export default function Provider() {
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

export type ServiceProvider = ReturnType<typeof Provider>;
