import IdGeneratorPort from "../shared/id.gen";
import User from "./entity";
import USERERR from "./error";
import { UserRepositoryPort, UserServicePort } from "./port";

export default function UserService(r: UserRepositoryPort, i: IdGeneratorPort): UserServicePort {
    return {
        find: async function (id: string): Promise<User> {
            const f = await r.findById(id);
            if (!f) throw USERERR.NOTFOUND;
            return f;
        },

        create: async function (
            u: { username: string; password: string; fullname: string },
        ): Promise<User> {
            const id = i.create();
            const user: User = {
                id,
                username: u.username,
                password: u.password,
                realname: u.fullname,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            await r.create(user);
            return user;
        },

        update: async function (id: string, u: User): Promise<void> {
            const find = await r.findById(id);
            if (!find) throw USERERR.NOTFOUND;
            await r.update(id, u);
        },
    };
}
