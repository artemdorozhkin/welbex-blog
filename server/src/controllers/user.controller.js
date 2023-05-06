import { Post, User } from "../models/models.js";
import ApiError from "../error/api.error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../common/config.js";
import log from "../common/logging.js";

function generateJwt(id, email, postsId = [{ id: 0 }]) {
  return jwt.sign(
    { id, email, posts: postsId.map((p) => p.id).join(";") },
    config.get("SECRET_KEY"),
    {
      expiresIn: "24h",
    }
  );
}

export default class UserController {
  static async registration(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest("incorrect email or password"));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest(`user with email ${email} already exists`)
        );
      }

      const hash = await bcrypt.hash(password, 5);
      const user = await User.create({ username, email, password: hash });
      const token = generateJwt(user.id, email);

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
      log.error("UserController", error.message);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.badRequest(`user with email ${email} not found`));
      }

      const comparePass = bcrypt.compareSync(password, user.password);

      if (!comparePass) {
        return next(ApiError.badRequest(`incorrect password`));
      }

      const posts = await Post.findAll({
        where: { userId: user.id },
        attributes: ["id"],
        raw: true,
      });
      const token = generateJwt(user.id, email, posts);

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
      log.error("UserController", error.message);
    }
  }

  static async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.posts);
      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
      log.error("UserController", error.message);
    }
  }
}
