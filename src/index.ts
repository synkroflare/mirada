import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import fs from "fs";
import https from "https";
import "reflect-metadata";
import { container } from "tsyringe";
import { router } from "./infra/routes";

const prisma = new PrismaClient();
container.registerInstance<PrismaClient>("PrismaClient", prisma);
const app = express();

const allowedOrigins = "*"; // Substitua pelos seus valores
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE", "PROPFIND"],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.on("uncaughtException", (e) => {
  console.log(e);
});

app.use(router);

const dev = false;
if (dev) {
  app.listen(50431, () =>
    console.log("ACRAPP online and using node version " + process.version)
  );
} else {
  const options = {
    key: fs.readFileSync(
      "../../../etc/letsencrypt/live/alabarda.link/privkey.pem"
    ),
    cert: fs.readFileSync(
      "../../../etc/letsencrypt/live/alabarda.link/fullchain.pem"
    ),
  };
  https
    .createServer(options, app)
    .listen(8080, () =>
      console.log(
        "Luneta https server online on 8080 and using node version " +
          process.version
      )
    );
}
