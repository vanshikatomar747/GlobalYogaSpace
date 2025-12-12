import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "PLACEHOLDER_GOOGLE_CLIENT_ID",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "PLACEHOLDER_GOOGLE_CLIENT_SECRET",
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: "oauth_login_no_password_" + Date.now(),
                        phone: "0000000000",
                        place: "Unknown",
                        role: "user",
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID || "PLACEHOLDER_FACEBOOK_APP_ID",
            clientSecret: process.env.FACEBOOK_APP_SECRET || "PLACEHOLDER_FACEBOOK_APP_SECRET",
            callbackURL: "/api/auth/facebook/callback",
            profileFields: ["id", "emails", "name"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails ? profile.emails[0].value : `fb_${profile.id}@noemail.com`;
                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        name: `${profile.name.givenName} ${profile.name.familyName}`,
                        email: email,
                        password: "oauth_login_no_password_" + Date.now(),
                        phone: "0000000000",
                        place: "Unknown",
                        role: "user",
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
