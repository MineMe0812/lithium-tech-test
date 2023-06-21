import { authRouter } from "./auth.routes";
import { verifyToken } from "../middlewares/authJwt";

export const indexRouter = (app : any) => {
    app.use("/api/auth", authRouter);
}
