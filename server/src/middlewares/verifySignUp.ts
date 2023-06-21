import { collections } from "../config/database";

export async function checkDuplicateUsernameOrEmail (req:any, res:any, next:any) {
    try {

        const query = { username: req.body.username };
        const user = await collections.users.findOne(query);

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        const checkEmailQuery = { email: req.body.email };
        const checkUser = await collections.users.findOne(checkEmailQuery);

        if (checkUser) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
    
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
}