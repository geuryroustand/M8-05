import express from "express";
import createHttpError from "http-errors";
import accommodationSchema from "../accommodation/accommodationSchema.js";
import UserSchema from "../user/schema.js";
import { hostOnlyMiddleware } from "./hostMiddleware.js";
import { JWTAuthMiddleware } from "./token.js";
import { JWTAuth } from "./tokenAuth.js";

const authorizRoute = express.Router();

authorizRoute.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

authorizRoute.get(
  "/me/accommodation",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const getAccommodations = await accommodationSchema.find();

      res.send(getAccommodations);
    } catch (error) {
      next(error);
    }
  }
);

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
authorizRoute.get("/loginFB", async (req, res, next) => {
  try {
  } catch (error) {
    next(createHttpError(500));
  }
});
authorizRoute.get("/redirectFB", async (req, res, next) => {
  try {
  } catch (error) {
    next(createHttpError(500));
  }
});

export default authorizRoute;
