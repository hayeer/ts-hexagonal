import { Hono } from "hono";
import { serve } from "@hono/node-server";
import Provider from "../../infrastructure/config/provider";
import UserHandler from "./handler/user/handler";
import { getenv } from "../../infrastructure/util/common.helper";

const appServer = new Hono();
const userHandler = UserHandler(Provider());

appServer.route("/user", userHandler);

const server = serve(appServer);

console.info(`🚀 ${getenv("APP_NAME")} running on port ${getenv("APP_PORT")}`);

export default server;
