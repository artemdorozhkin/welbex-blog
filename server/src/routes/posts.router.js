import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const postRouter = new Router();

postRouter.post("/", authMiddleware, PostController.create);
postRouter.get("/", authMiddleware, PostController.getAll);
postRouter.put("/", authMiddleware, PostController.edit);
postRouter.delete("/:id", authMiddleware, PostController.delete);

export default postRouter;
