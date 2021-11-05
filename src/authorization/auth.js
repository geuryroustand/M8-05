import express from "express";
import createHttpError from "http-errors";
import passport from "passport";
import UserSchema from "../user/schema.js";
import { JWTAuth } from "./tokenAuth.js";

const authorizRoute = express.Router();

authorizRoute.post("/register", async (req, res, next) => {
  try {
    const user = await UserSchema.find({ email: req.body.email });
    console.log(user);
    console.log(req.body);
    if (user.length === 0) {
      const newUser = new UserSchema(req.body);
      const nUser = await newUser.save();
      const { accessToken, refreshToken } = await JWTAuth(nUser);
      res.send({ nUser, accessToken, refreshToken });
    } else {
      next(createHttpError(401, "User already exists"));
    }
  } catch (error) {
    next(createHttpError(500));
  }
});
authorizRoute.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.checkCred(email, password);
    if (user) {
      const { accessToken, refreshToken } = await JWTAuth(user);
      res.send({ user, accessToken, refreshToken });
    } else {
      next(createHttpError(404, " Wrong credentials!"));
    }
  } catch (error) {
    next(createHttpError(500));
  }
});
authorizRoute.get(
  "/loginFB",
  passport.authenticate("facebook", { scope: "email" })
);
authorizRoute.get(
  "/redirectFB",
  passport.authenticate("facebook"),
  async (req, res, next) => {
    try {
      res.cookie("accessToken", req.user.tokens.accessToken, {
        httpOnly: true,
        secure: (process.env.NODE_ENV = "production" ? true : false),
        sameSite: "none",
      });
      res.cookie("refreshToken", req.user.tokens.refreshToken, {
        httpOnly: true,
        secure: (process.env.NODE_ENV = "production" ? true : false),
        sameSite: "none",
      });
      res.redirect("http://localhost:3000");
    } catch (error) {
      next(createHttpError(500));
    }
  }
);

export default authorizRoute;
