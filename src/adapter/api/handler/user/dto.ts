import { z } from "zod";
import xss from "xss";

export const createUserInput = z.object({
    fullname: z.string().min(2).transform((v) => xss(v).trim()),
    username: z.string().min(8).transform((v) => xss(v).trim()),
    password: z.string()
        .min(8, "Password must be at least 8 chars")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            "Password must contain uppercase, lowercase, symbol, and number",
        ),
});
