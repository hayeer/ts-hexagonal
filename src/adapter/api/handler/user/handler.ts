import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createUserInput } from "./dto";
import { ServiceProvider } from "../../../../bootstrap";

export default function UserHandler(sp: ServiceProvider) {
    const app = new Hono();

    app.post("/", zValidator("json", createUserInput), async (c) => {
        const validated = c.req.valid("json");
        const { user } = sp.service;
        const { logger } = sp.shared;

        logger.info("attempt to create new user", validated);
        await user.create({
            username: validated.username,
            password: validated.password,
            fullname: validated.fullname,
        });

        return c.json({
            code: "01",
            message: "new user successfully created",
        });
    });

    return app;
}
