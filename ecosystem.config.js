require("dotenv").config();

module.exports = {
    apps: [
        {
            name: process.env.APP_ALIAS,
            script: "./dist/main.js",
            instances: "max",
            watch: false,
            exec_mode: "cluster",
            max_memory_restart: "800M",
            wait_ready: true,
            listen_timeout: 10000,
            kill_timeout: 5000,
        },
    ],
};
