import express from "express";
import cors from "cors";
import config from "./common/config.js";
import sequelize from "./db.js";
import "./models/models.js";
import log from "./common/logging.js";
import apiRouter from "./routes/index.js";
import errHandler from "./middleware/errorHandling.middleware.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function start() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.static(resolve(__dirname, "static")));
  app.use(fileUpload({}));
  app.use("/api", apiRouter);

  app.use(errHandler);

  const PORT = config.get("PORT");
  app.listen(PORT, () => log.info(`server is running on port: ${PORT}`));
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    log.info(`database is connected`);
  } catch (error) {
    log.error(`database is not connected: ${error}`);
  }
}

start();
