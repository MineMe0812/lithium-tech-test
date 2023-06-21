import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieSession from "cookie-session";
import path from "path";

import { connectToDatabase } from "./config/database";
import { indexRouter } from "./routes/index";
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI, SERVER_URL, PROT, COOKIE_SECRET, CLIENT_PROT } = process.env;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       //app.use(cors());
       app.use(
        cors({
          credentials: true,
          origin: [`${SERVER_URL}:${CLIENT_PROT}`],
        })
      );

      app.use(express.static(path.join(__dirname, '../client')));

       app.use(express.json());
       app.use(express.urlencoded({ extended: true }));
       
       app.use(
        cookieSession({
          name: "julian-session",
          secret: COOKIE_SECRET,
          httpOnly: true
        })
       );
       
       // define all router
       indexRouter(app);

       app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });

  
       
       // start the Express server
       app.listen(PROT, () => {
           console.log(`Server running at ${SERVER_URL}:${PROT}...`);
       });
 
   })
   .catch(error => console.error(error));