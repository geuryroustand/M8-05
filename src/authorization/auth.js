import express from "express";
import createHttpError from "http-errors";
import UserSchema from "../user/schema.js";
import { JWTAuth } from "./tokenAuth.js";

const authorization = express.Router();

authorization.post("/register", async (req, res, next) => {
  try {
    const user = await UserSchema.find({ email: req.body.email });
    console.log(req.body);
    if (user) {
      const newUser = new UserSchema(req.body);
      const { _id } = await newUser.save();
      res.send({ _id });
    } else {
      next(createHttpError(401, "User already exists"));
    }
  } catch (error) {
    console.log(error);
  }
});
authorization.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserSchema.checkCred(email, password);
  if (user) {
    const { accessToken, refreshToken } = await JWTAuth(user);
    res.send([user, { accessToken, refreshToken }]);
  } else {
    next(createHttpError(404, " Wrong credentials!"));
  }
});

export default authorization;
