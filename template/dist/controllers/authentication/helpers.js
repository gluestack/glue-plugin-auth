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
const commons_1 = require("../commons");
const mutations_1 = require("./graphql/mutations");
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
                algorithm: 'HS256',
                expiresIn: expires_in
            });
            return {
                token,
                expires_in
            };
        });
    }
    /**
     * Generate OTP
     */
    GenerateOTP() {
        return __awaiter(this, void 0, void 0, function* () {
            return Math.floor(100000 + Math.random() * 900000);
        });
    }
    /**
     * Set OTP against user
     */
    SetOTP(id, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            // graphql query
            const { data, errors } = yield commons_1.default.GQLRequest({
                variables: { id, otp },
                query: mutations_1.default.SetOTP
            });
            if (!data || !data.data || !data.data.update_users_by_pk) {
                throw errors || data.errors && { message: data.errors[0].message } || 'failed to send email!';
            }
        });
    }
}
exports.default = new Helpers;
//# sourceMappingURL=helpers.js.map