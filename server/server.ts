import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import router from "./routers";
// let session = require('express-session');
// session = session();

dotenv.config();

const prisma = new PrismaClient();

const app = express();

const DIST_PATH = path.resolve(__dirname, "../dist");

const PORT = 3000;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

app.use(
  session({ secret: "your-secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      prisma.user
        .findUnique({ where: { googleId: profile.id } })
        .then((user) => {
          if (!user) {
            return prisma.user.create({
              data: {
                googleId: profile.id,
                name: profile.displayName,
                username: "",
                location: "",
                bio: "",
                image: String(profile._json.picture)
              },
            });
          }
          return user;
        })
        .then((user) => {
          done(null, user);
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

passport.serializeUser(function (user: any, done: any) {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  prisma.user
    .findUnique({ where: { id: id } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

app.use(bodyParser.json());

app.use(express.static(DIST_PATH));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send(req.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});
