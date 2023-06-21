import * as mongodb from "mongodb";
 
export interface User {
    username: string;
    email: string;
    password: string;
    _id?: mongodb.ObjectId;
}