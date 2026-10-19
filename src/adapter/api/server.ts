import { Hono } from "hono";
import { serve } from "@hono/node-server";
import UserHandler from "./handler/user/handler";
import { getenv } from "../../infrastructure/util/common.helper";
import { secureHeaders } from "hono/secure-headers";
import { ServiceProvider } from "../../bootstrap";

export default function CreateServer(p: ServiceProvider) {
    const app = new Hono();
    const userHandler = UserHandler(p);

    app.use(secureHeaders());

    app.get("/health", (c) => c.text("OK"));
    app.route("/user", userHandler);

    const server = serve({
        fetch: app.fetch,
        port: getenv("APP_PORT"),
    });

    console.info(
        `🚀 ${getenv("APP_NAME")} running on port ${getenv("APP_PORT")}`,
    );

    return server;
}
