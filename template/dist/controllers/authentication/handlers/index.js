"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signin_1 = require("./signin");
const signup_1 = require("./signup");
const forgot_password_1 = require("./forgot-password");
class Authentication {
    signin(req, res) {
        return signin_1.default.handle(req, res);
    }
    signup(req, res) {
        return signup_1.default.handle(req, res);
    }
    forgotPassword(req, res) {
        return forgot_password_1.default.handle(req, res);
    }
}
exports.default = new Authentication;
//# sourceMappingURL=index.js.map