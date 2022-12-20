"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Others
const handlers_1 = require("../controllers/authentication/handlers");
const router = (0, express_1.Router)();
/**
 * Authentication routes
 */
router.post('/signin', handlers_1.default.signin);
router.post('/signup', handlers_1.default.signup);
router.post('/forgot-password', handlers_1.default.forgotPassword);
exports.default = router;
//# sourceMappingURL=authentication.js.map