var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var routes = require("./routes");

const app = express();
var passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GA_CLIENT_ID,
      clientSecret: process.env.GA_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(routes);

module.exports = app;
