import { randomUUIDv7 } from "node:crypto";
import IdGeneratorPort from "../../domain/shared/id.gen";

export default function UUIDGen(): IdGeneratorPort {
    return {
        create: function (): string {
            return randomUUIDv7();
        },
    };
}
