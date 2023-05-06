import { Logger } from "tslog";
import config from "./config.js";

const log = new Logger({
    minLevel: config.get("LOGLEVEL"),
    prettyLogTemplate: "{{dd}}-{{mm}}-{{yyyy}}T{{hh}}:{{mm}}:{{ss}} [{{logLevelName}}] "
});

export default log;
