import { Post, User } from "../models/models.js";
import ApiError from "../error/api.error.js";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";
import { __dirname } from "../app.js";
import log from "../common/logging.js";

function generateFileName(file) {
  const fileName = uuidv4() + ".jpg";
  return fileName;
}

function saveFile(file, name) {
  file.mv(resolve(__dirname, "static", name));
}

export default class PostController {
  static async create(req, res, next) {
    try {
      const { userId, message } = req.body;
      let fileName = "";
      if (req.files) {
        const { file } = req.files;
        fileName = generateFileName(file);
        saveFile(file, fileName);
      }

      if (!userId) {
        return next(ApiError.badRequest("user not found"));
      }

      if (!message || message.trim().length === 0) {
        return next(ApiError.badRequest("post message can't be empty"));
      }

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return next(ApiError.badRequest("user not found"));
      }

      const post = await Post.create({ message, userId, file: fileName });
      return res.json(post);
    } catch (error) {
      next(ApiError.badRequest(error.message));
      log.error("PostController", error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const posts = await Post.findAll({ include: User });
      return res.json(posts);
    } catch (error) {
      next(ApiError.badRequest(error.message));
      log.error("PostController", error.message);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id, message } = req.body;
      let fileName = "";
      if (req.files) {
        const { file } = req.files;
        fileName = generateFileName(file);
        saveFile(file, fileName);
      }

      const post = await Post.findOne({ where: { id } });
      if (!post) {
        return next(ApiError.badRequest("post not found"));
      }

      if (post.userId !== req.user.id) {
        return next(
          ApiError.forbidden("this user have not access to edit this post")
        );
      }

      if (!message || message.trim().length === 0) {
        return next(ApiError.badRequest("post message can't be empty"));
      }

      await post.update({ message, file: fileName });
      return res.json(post);
    } catch (error) {
      next(ApiError.badRequest(error.message));
      log.error("PostController", error.message);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        return next(ApiError.badRequest("post not found"));
      }

      if (post.userId !== req.user.id) {
        return next(
          ApiError.forbidden("this user have not access to delete this post")
        );
      }

      await post.destroy();
      return res.json(post);
    } catch (error) {
      next(ApiError.badRequest(error.message));
      log.error("PostController", error.message);
    }
  }
}
