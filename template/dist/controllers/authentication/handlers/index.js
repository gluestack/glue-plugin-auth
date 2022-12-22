"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signin_1 = require("./signin");
const signup_1 = require("./signup");
class Authentication {
    signin(req, res) {
        return signin_1.default.handle(req, res);
    }
    signup(req, res) {
        return signup_1.default.handle(req, res);
    }
}
exports.default = new Authentication;
//# sourceMappingURL=index.js.map