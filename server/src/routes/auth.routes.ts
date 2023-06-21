import * as express from "express";
import * as auth from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignUp"

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/signup", checkDuplicateUsernameOrEmail, auth.signup);
authRouter.post("/signin", auth.signin);
authRouter.post("/signout", auth.signout);
