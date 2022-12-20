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
const commons_1 = require("../../commons");
const helpers_1 = require("../helpers");
const queries_1 = require("../graphql/queries");
class ForgotPassword {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body.input || req.body;
            try {
                // graphql query
                const { data, errors } = yield commons_1.default.GQLRequest({
                    variables: { email: email.toLowerCase() },
                    query: queries_1.default.UserByEmail
                });
                if (!data || !data.data || !data.data.users) {
                    const error = errors || data.errors && data.errors[0].message || "Something went wrong!";
                    return commons_1.default.Response(res, false, error, null);
                }
                // check if users response is empty
                if (data.data.users.length === 0) {
                    return commons_1.default.Response(res, false, "No user registered with this email address", null);
                }
                // generate OTP
                const otp = yield helpers_1.default.GenerateOTP();
                // set OTP against user
                yield helpers_1.default.SetOTP(data.data.users[0].id, otp);
                return commons_1.default.Response(res, true, "Email send successfully", { otp });
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = ForgotPassword;
//# sourceMappingURL=forgot-password.js.map