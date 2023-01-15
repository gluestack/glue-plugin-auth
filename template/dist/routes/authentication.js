"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../providers/passport");
// Others
const handlers_1 = require("../controllers/authentication/handlers");
const locals_1 = require("../providers/locals");
const router = (0, express_1.Router)();
/**
 * Authentication routes
 */
router.post("/signin", handlers_1.default.signin);
router.post("/signup", handlers_1.default.signup);
router.get("/me", handlers_1.default.user);
for (const provider of locals_1.default.config().providers) {
    router.get(`/signin/${provider}`, passport_1.default.authenticate(provider));
    router.get(`/signin/${provider}/callback`, passport_1.default.authenticate(provider, {
        successRedirect: `/authentication/signin/${provider}/callback/success`,
        failureRedirect: `/authentication/signin/${provider}/callback/failure`,
    }));
    router.get(`/signin/${provider}/callback/success`, handlers_1.default.socialSigninSuccess);
    router.get(`/signin/${provider}/callback/failure`, handlers_1.default.socialSigninFailure);
}
exports.default = router;
//# sourceMappingURL=authentication.js.map