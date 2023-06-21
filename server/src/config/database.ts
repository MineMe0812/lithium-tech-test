import * as mongodb from "mongodb";
import { User } from "../models/user";
 
export const collections: {
   users?: mongodb.Collection<User>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("meanStackExample");
   await applySchemaValidation(db);
 
   const usersCollection = db.collection<User>("users");


   collections.users = usersCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our product model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "price", "description", "size"],
           additionalProperties: false,
           properties: {
               _id: {},
               name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               price: {
                   bsonType: "number",
                   description: "'price' is required and is a number",
                   maxLength: 5
               },
               description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                    maxLength: 255
                },
                size: {
                   bsonType: "string",
                   description: "'size' is required and is one of 'M', 'L', or 'XL'",
                   enum: ["M", "L", "XL"],
               },
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "products",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("products", {validator: jsonSchema});
       }
   });
}