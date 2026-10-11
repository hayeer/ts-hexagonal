import { Kysely } from "kysely";
import { UserRepository } from "../../domain/user/port";
import Database from "../../infrastructure/kysely/schema";
import User from "../../domain/user/entity";
import { Maybe } from "../../infrastructure/config/types";

export default function UserRepoAdapter(db: Kysely<Database>): UserRepository {
    return {
        findById: async function (id: string): Promise<Maybe<User>> {
            try {
                const find = await db.selectFrom("users")
                    .selectAll()
                    .where("id", "=", id)
                    .executeTakeFirst();

                if (!find) return null;
                return {
                    id: find.id,
                    username: find.username,
                    password: find.password,
                    realname: find.fullname,
                    createdAt: find.created_at,
                    updatedAt: find.updated_at,
                };
            } catch (error) {
                throw error;
            }
        },
        create: function (u: User): Promise<void> {
            throw new Error("Function not implemented.");
        },
        update: function (id: string, u: User): Promise<void> {
            throw new Error("Function not implemented.");
        },
    };
}
