import "dotenv/config";
import server from "./adapter/api/server";
import KyselyAdapter from "./infrastructure/kysely/connection";
import Provider from "./bootstrap";

const Server = server(Provider());

process.on("SIGINT", () => {
    Server.close();
    process.exit(0);
});

process.on("SIGTERM", () => {
    Server.close(async (err) => {
        await KyselyAdapter().close();
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
});
