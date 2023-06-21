import * as express from "express";
import * as user from "../controllers/user.controller";


export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/all", user.allAccess);
userRouter.get("/user", user.userBoard);
userRouter.get("/mod", user.adminBoard);
userRouter.get("/admin", user.moderatorBoard);

