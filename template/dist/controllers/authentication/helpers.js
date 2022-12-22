"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const locals_1 = require("../../providers/locals");
class Helpers {
    /**
     * Create Token
     */
    CreateToken(_payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const expires_in = locals_1.default.config().authTokenExpiresIn;
            const tokenContents = {
                id: _payload.id.toString(),
                role: _payload.role,
            };
            const token = jwt.sign(tokenContents, locals_1.default.config().jwtSecret, {
                algorithm: locals_1.default.config().jwtKey,
                expiresIn: expires_in,
            });
            return {
                token,
                expires_in
            };
        });
    }
}
exports.default = new Helpers;
//# sourceMappingURL=helpers.js.map