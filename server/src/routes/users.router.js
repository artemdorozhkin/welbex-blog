import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const usersRouter = new Router();

/**
 * @openapi
 * '/api/users/registration':
 *  post:
 *     tags:
 *      - Users
 *     summary: Создает пользователя
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */
usersRouter.post("/registration", UserController.registration);

/**
 * @openapi
 * '/api/users/login':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Осуществляет вход пользователя
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *      400:
 *        description: Bad request
 */
usersRouter.post("/login", UserController.login);

/**
 * @openapi
 * '/api/users/auth':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Аутентификация пользователя
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *      400:
 *        description: Bad request
 */
usersRouter.get("/auth", authMiddleware, UserController.check);

export default usersRouter;
