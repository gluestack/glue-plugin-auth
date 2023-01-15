import Locals from "./locals";
import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oidc";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Locals.config().googleClientId,
      clientSecret: Locals.config().googleClientSecret,
      callbackURL: "/authentication/signin/google/callback",
      scope: ["email"],
    },
    (req, profile, issuer, done) => {
      return done(null, profile?.emails[0]?.value || null);
    },
  ),
);

passport.use(
  new MicrosoftStrategy(
    {
      clientID: Locals.config().microsoftClientId,
      clientSecret: Locals.config().microsoftClientSecret,
      callbackURL: "/authentication/signin/microsoft/callback",
      scope: ["user.read"],
    },
    (req, issuer, profile, done) => {
      return done(null, profile?.emails[0]?.value || null);
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: Locals.config().githubClientId,
      clientSecret: Locals.config().githubClientSecret,
      callbackURL: "/authentication/signin/github/callback",
      scope: ["user:email"],
    },
    (req, issuer, profile, done) => {
      return done(null, profile?.emails[0]?.value || null);
    },
  ),
);

passport.initialize();

passport.session();

export default passport;
