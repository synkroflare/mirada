import express from "express"
import "reflect-metadata"
import { router } from "./infra/routes"
import fs from "fs"
import https from "https"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import { container } from "tsyringe"

const prisma = new PrismaClient()
container.registerInstance<PrismaClient>("PrismaClient", prisma)
const app = express()

const allowedOrigins = ["http://localhost:3000", "https://javelyn.vercel.app"] // Substitua pelos seus valores
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE", "PROPFIND"],
}
app.use(cors(corsOptions))
app.use(express.json({ limit: "25mb" }))
app.use(express.urlencoded({ limit: "25mb", extended: true }))
app.on("uncaughtException", (e) => {
  console.log(e)
})

app.use(router)

const dev = true
if (dev) {
  app.listen(50431, () =>
    console.log("ACRAPP online and using node version " + process.version)
  )
} else {
  const options = {
    key: fs.readFileSync(
      "../../../etc/letsencrypt/live/javelyn.link/privkey.pem"
    ),
    cert: fs.readFileSync(
      "../../../etc/letsencrypt/live/javelyn.link/fullchain.pem"
    ),
  }
  https
    .createServer(options, app)
    .listen(8080, () =>
      console.log(
        "Javelyn v0.0.4 https server online on 8080 and using node version " +
          process.version
      )
    )
}
