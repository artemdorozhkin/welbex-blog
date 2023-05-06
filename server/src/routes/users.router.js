import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const usersRouter = new Router();

usersRouter.post("/registration", UserController.registration);
usersRouter.post("/login", UserController.login);
usersRouter.get("/auth", authMiddleware, UserController.check);

export default usersRouter;
