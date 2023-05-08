import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const postRouter = new Router();

/**
 * @openapi
 * '/api/posts':
 *  post:
 *     tags:
 *      - Posts
 *     summary: Создает пост
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *      400:
 *        description: Bad request
 */
postRouter.post("/", authMiddleware, PostController.create);

/**
 * @openapi
 * '/api/posts':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Возвращает массив постов
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *      400:
 *        description: Bad request
 */
postRouter.get("/", PostController.getAll);

/**
 * @openapi
 * '/api/posts':
 *  put:
 *     tags:
 *     - Posts
 *     summary: Вносит изменение в сообщение выбранного поста
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *      400:
 *        description: Bad request
 */
postRouter.put("/", authMiddleware, PostController.edit);

/**
 * @openapi
 * '/api/posts':
 *  delete:
 *     tags:
 *     - Posts
 *     summary: Удаляет выбранный пост
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *      400:
 *        description: Bad request
 */
postRouter.delete("/:id", authMiddleware, PostController.delete);

export default postRouter;
