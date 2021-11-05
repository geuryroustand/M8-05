import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import passport from "passport";

import mongoose from "mongoose";
import authorizRoute from "./authorization/auth.js";
import {
  catchAllHandler,
  forbiddenHandler,
  unauthorizedHandler,
} from "./errorHadlers.js";

const server = express();

const port = process.env.PORT;

//***********MIDDLEWARES ********************** */
// passport.use("facebook", FBStrategy);

server.use(cors());
server.use(express.json());
server.use(passport.initialize());

//************Router ****************
server.use("/auth", authorizRoute);

server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);
//
mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to mongoDB");

  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log("server connected", port);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Mongo ERROR", err);
});

server.on("error", (err) => {
  console.error("Server crashed due to ", err);
});
