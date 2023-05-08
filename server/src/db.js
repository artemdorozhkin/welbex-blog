import { Sequelize } from "sequelize";
import config from "./common/config.js";
import log from "./common/logging.js";

const isProduction = process.env.NODE_ENV === "production";

const sequelize = isProduction
  ? new Sequelize(process.env.DB_LINK, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {}, //removed ssl
    })
  : new Sequelize(
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
