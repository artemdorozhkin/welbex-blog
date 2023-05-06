import jwt from "jsonwebtoken";
import config from "../common/config.js";

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
      return res.status(401).json({ message: "unauthorized user" });
    }

    const decoded = jwt.verify(token, config.get("SECRET_KEY"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized user" });
  }
};
