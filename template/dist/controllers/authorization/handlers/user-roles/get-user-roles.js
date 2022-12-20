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
const lodash_1 = require("lodash");
const commons_1 = require("../../../commons");
const queries_1 = require("../../graphql/queries");
class GetUserRoles {
    static perform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.body.input || req.body;
            try {
                // graphql query
                const { data, errors } = yield commons_1.default.GQLRequest({
                    variables: { user_id },
                    query: queries_1.default.GetUserRoles
                });
                if (!data || !data.data || !data.data.user_roles) {
                    const error = errors || data.errors && data.errors[0].message || 'Failed to fetch user-roles';
                    return commons_1.default.Response(res, false, error, null);
                }
                return commons_1.default.Response(res, true, 'User-Roles fetched successfully!', (0, lodash_1.map)(data.data.user_roles, 'role'));
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = GetUserRoles;
//# sourceMappingURL=get-user-roles.js.map