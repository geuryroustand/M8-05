import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { JWTAuth } from "./tokenAuth.js";
import UserSchema from "../user/schema.js";
//
const googleStrategy = new GoogleStrategy();
// {
//   clientID: process.env.GOOGLE_OAUTH_ID,
//   clientSecret: process.env.GOOGLE_OAUTH_SECRET,
//   callbackURL: `${process.env.B_URL}/auth/redirectGoogle`,
// },
// async function (accessToken, refreshToken, profile, passNext) {
//   const user = await UserSchema.findOne({ googleId: profile.id });
//   if (user) {
//     const tokens = await JWTAuth(user);
//     user.refreshToken = tokens.refreshToken;
//     await user.save();
//     passNext(null, { tokens });
//   } else {
//     try {
//       const newUser = {
//         name: profile.displayName,
//         role: "User",
//         googleId: profile.id,
//         refreshToken: "",
//       };
//       const createdUser = new UserSchema(newUser);
//       const tokens = await JWTAuth(createdUser);
//       createdUser.refreshToken = tokens.refreshToken;
//       await createdUser.save();
//       passNext(null, { tokens });
//     } catch (error) {
//       passNext(null, { error });
//     }
//   }
// }
//
passport.serializeUser(function (data, passNext) {
  passNext(null, data);
});

export default googleStrategy;
