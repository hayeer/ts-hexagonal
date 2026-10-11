import IdGeneratorPort from "../shared/id.gen";
import User from "./entity";
import USERERR from "./error";
import { UserRepository } from "./port";

export default function UserService(r: UserRepository, i: IdGeneratorPort) {
    return {
        find: async function (id: string): Promise<User> {
            const f = await r.findById(id);
            if (!f) throw USERERR.NOTFOUND;
            return f;
        },

        create: async function (
            u: { username: string; password: string; fullname: string },
        ): Promise<void> {
            const id = i.create();
            await r.create({
                id,
                username: u.username,
                password: u.password,
                realname: u.fullname,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        },

        update: async function (id: string, u: User): Promise<void> {
            const find = await r.findById(id);
            if (!find) throw USERERR.NOTFOUND;
            await r.update(id, u);
        },
    };
}
