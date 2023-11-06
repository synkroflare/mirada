"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const routes_1 = require("./infra/routes");
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const tsyringe_1 = require("tsyringe");
const prisma = new client_1.PrismaClient();
tsyringe_1.container.registerInstance("PrismaClient", prisma);
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000", "https://javelyn.vercel.app"]; // Substitua pelos seus valores
const corsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE", "PROPFIND"],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "25mb" }));
app.use(express_1.default.urlencoded({ limit: "25mb", extended: true }));
app.on("uncaughtException", (e) => {
    console.log(e);
});
app.use(routes_1.router);
const dev = true;
if (dev) {
    app.listen(50431, () => console.log("ACRAPP online and using node version " + process.version));
}
else {
    const options = {
        key: fs_1.default.readFileSync("../../../etc/letsencrypt/live/javelyn.link/privkey.pem"),
        cert: fs_1.default.readFileSync("../../../etc/letsencrypt/live/javelyn.link/fullchain.pem"),
    };
    https_1.default
        .createServer(options, app)
        .listen(8080, () => console.log("Javelyn v0.0.4 https server online on 8080 and using node version " +
        process.version));
}
