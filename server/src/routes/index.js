import { Router } from "express";
import usersRouter from "./users.router.js";
import postsRouter from "./posts.router.js";

const apiRouter = new Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);

export default apiRouter;
