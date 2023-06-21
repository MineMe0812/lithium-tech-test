import { authRouter } from "./auth.routes";
import { userRouter } from "./user.routes";
import { verifyToken } from "../middlewares/authJwt";

export const indexRouter = (app : any) => {
    app.use("/api/auth", authRouter);
    app.use("/api/auth", verifyToken, userRouter);
}
