import { Maybe } from "../shared/types";
import User from "./entity";

export interface UserServicePort {
    find(id: string): Promise<User>;
    create(args: { username: string, password: string, fullname: string }): Promise<User>;
    update(id: string, u: User): Promise<void>;
}

export interface UserRepositoryPort {
    findById(id: string): Promise<Maybe<User>>;
    create(u: User): Promise<void>;
    update(id: string, u: User): Promise<void>;
}
