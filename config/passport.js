import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import ViaGoogleUser from "../models/viagogoleusers.js";

dotenv.config();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in the backend .env file."
  );
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await ViaGoogleUser.findOne({ googleId: profile.id });
        if (!user) {
            user = await ViaGoogleUser.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                profilePicture: profile.photos[0].value
            });
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await ViaGoogleUser.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
