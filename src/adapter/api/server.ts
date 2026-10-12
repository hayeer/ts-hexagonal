import { Hono } from "hono";
import { serve } from "@hono/node-server";
import Provider from "../../infrastructure/config/provider";
import UserHandler from "./handler/user/handler";
import { getenv } from "../../infrastructure/util/common.helper";

const appServer = new Hono();
const userHandler = UserHandler(Provider());

appServer.get('/health', c => c.text("OK"));
appServer.route("/user", userHandler);

const server = serve({
    fetch: appServer.fetch,
    port: getenv('APP_PORT')
});

console.info(`🚀 ${getenv("APP_NAME")} running on port ${getenv("APP_PORT")}`);

export default server;
