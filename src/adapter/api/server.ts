import { Hono } from "hono";
import { serve } from "@hono/node-server";
import Provider from "../../infrastructure/config/provider";
import UserHandler from "./handler/user/handler";
import { getenv } from "../../infrastructure/util/common.helper";
import { secureHeaders } from "hono/secure-headers";

const app = new Hono();
const userHandler = UserHandler(Provider());

app.use(secureHeaders());

app.get('/health', c => c.text("OK"));
app.route("/user", userHandler);

const server = serve({
    fetch: app.fetch,
    port: getenv('APP_PORT')
});

console.info(`🚀 ${getenv("APP_NAME")} running on port ${getenv("APP_PORT")}`);

export default server;
