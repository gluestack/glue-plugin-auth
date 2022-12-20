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
const commons_1 = require("../controllers/commons");
class AuthMiddleware {
    /**
     * mount AuthMiddleware
     */
    mount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let _payload: any;
                // check that request is from Hasura Action
                // if (req.body.session_variables) {
                //   _payload.id = req.body.session_variables['x-hasura-user-id'];
                // } else {
                //   // verify authorization token
                //   _payload = await Commons.ValidateToken(req.headers['authorization'] || '');
                // }
                // // set user in req object
                // req.user_id = _payload.id;
                next();
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = new AuthMiddleware;
//# sourceMappingURL=authentication.js.map