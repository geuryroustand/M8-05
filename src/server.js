import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import mongoose from "mongoose";
import authorization from "./authorization/auth.js";
import { catchAllHandler, forbiddenHandler, unauthorizedHandler } from "./errorHadlers.js";

const server = express();

const port = process.env.PORT;

//***********MIDDLEWARES ********************** */

server.use(cors());
server.use(express.json());

//************Router ****************
server.use("/auth", authorization);

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
