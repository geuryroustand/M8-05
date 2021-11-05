import express from "express";
import createHttpError from "http-errors";
import passport from "passport";
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
    const user = await UserSchema.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new UserSchema(req.body);
      const { accessToken, refreshToken } = await JWTAuth(newUser);
      newUser.refreshToken = refreshToken;
      const nUser = await newUser.save();
      //
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: (process.env.NODE_ENV = "production" ? true : false),
        sameSite: "none",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: (process.env.NODE_ENV = "production" ? true : false),
        sameSite: "none",
      });
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
authorizRoute.get(
  "/loginGoogle",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authorizRoute.get(
  "/redirectGoogle",
  passport.authenticate("google"),
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
      //   console.log(error);
      next(createHttpError(500));
    }
  }
);
s;
export default authorizRoute;
