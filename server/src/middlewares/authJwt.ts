import { collections } from "../config/database";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

dotenv.config();
const { COOKIE_SECRET } = process.env;

export function verifyToken (req:any, res:any, next:any) {
    let token = req.session.token;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, COOKIE_SECRET, (err:any, decoded:any) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
}



  