import { Sequelize } from "sequelize";
import config from "./common/config.js";
import log from "./common/logging.js";

const sequelize = new Sequelize(
  config.get("MYSQL_DB"),
  config.get("MYSQL_LOGIN"),
  config.get("MYSQL_PASSWORD"),
  {
    logging: (msg) => log.debug("database", msg),
    dialect: "mysql",
    host: config.get("MYSQL_HOST"),
    port: config.get("MYSQL_PORT"),
  }
);

export default sequelize;
