import { Sequelize } from "sequelize";
import config from "./common/config.js";
import log from "./common/logging.js";

const sequelize = new Sequelize(
  config.get("POSTGRES_DB"),
  config.get("POSTGRES_LOGIN"),
  config.get("POSTGRES_PASSWORD"),
  {
    logging: (msg) => log.debug("database", msg),
    dialect: "postgres",
    host: config.get("POSTGRES_HOST"),
    port: config.get("POSTGRES_PORT"),
  }
);

export default sequelize;
