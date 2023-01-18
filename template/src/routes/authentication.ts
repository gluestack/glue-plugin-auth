import { Router } from "express";
import passport from "../providers/passport";

// Others
import Controller from "../controllers/authentication/handlers";
import Locals from "../providers/locals";

const router = Router();

/**
 * Authentication routes
 */
router.post("/signin", Controller.signin);
router.post("/signup", Controller.signup);
router.get("/me", Controller.user);
router.post("/refresh-jwt-token", Controller.refreshJWTToken);

for (const provider of Locals.config().providers) {
  router.get(`/signin/${provider}`, passport.authenticate(provider));
  router.get(
    `/signin/${provider}/callback`,
    passport.authenticate(provider, {
      successRedirect: `/backend/${
        Locals.config().appId
      }/authentication/signin/${provider}/callback/success`,
      failureRedirect: `/backend/${
        Locals.config().appId
      }/authentication/signin/${provider}/callback/failure`,
    }),
  );
  router.get(
    `/signin/${provider}/callback/success`,
    Controller.socialSigninSuccess,
  );
  router.get(
    `/signin/${provider}/callback/failure`,
    Controller.socialSigninFailure,
  );
}

export default router;
