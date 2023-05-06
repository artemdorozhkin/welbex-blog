import { config } from "dotenv";

class Config {
  config;

  constructor() {
    const { error, parsed } = config({
      path: `.${process.env.NODE_ENV}.env`,
    });
    if (error) {
      throw new Error("cant't find configuration file (.env)");
    }

    if (!parsed) {
      throw new Error("configuration file (.env) is empty");
    }

    this.config = parsed;
  }

  get(key) {
    const value = this.config[key];
    if (!value) {
      throw new Error(`can't find key: ${key}`);
    }

    return value;
  }
}

export default new Config();
