import { Maybe } from "../../infrastructure/config/types";
import User from "./entity";

export interface UserRepository {
    findById(id: string): Promise<Maybe<User>>
    create(u: User): Promise<void>;
    update(id: string, u: User): Promise<void>;
}
