import { collections } from "../config/database";
import * as mongodb from "mongodb";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";


dotenv.config();
const { COOKIE_SECRET } = process.env;

export async function signup(req:any, res:any) {
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        };
        
        const result = await collections.users.insertOne(user);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new user: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new user.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export async function signin (req:any, res:any) {
    try {

        const query = { username: req.body.username };
        const user = await collections.users.findOne(query);

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
    
        var token = jwt.sign({ id: user._id }, COOKIE_SECRET, {
            expiresIn: 86400, // 24 hours
        });
  
        req.session.token = token;
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
    
}

export async function signout (req:any, res:any) {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (error) {
        res.status(400).send(error.message);
    }
}