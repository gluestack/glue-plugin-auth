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
const commons_1 = require("../controllers/commons");
const queries_1 = require("../controllers/authorization/graphql/queries");
class AuthorisationMiddleware {
    /**
     * Get roles by userID
     */
    static getUserRoles(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, errors } = yield commons_1.default.GQLRequest({
                variables: { user_id },
                query: queries_1.default.GetRolesByID
            });
            if (!data || !data.data || !data.data.user_roles) {
                throw errors || data.errors && { message: data.errors[0].message } || 'something went wrong!';
            }
            if (data.data.user_roles.length === 0) {
                throw ({ message: 'user does not have any roles' });
            }
            return (0, lodash_1.map)(data.data.user_roles, 'role_key');
        });
    }
    /**
     * Check permission against user roles
     */
    static checkPermission(role_keys, permission_key) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, errors } = yield commons_1.default.GQLRequest({
                variables: { role_keys, permission_key },
                query: queries_1.default.CheckPermission
            });
            if (!data || !data.data || !data.data.role_permissions) {
                throw errors || data.errors && { message: data.errors[0].message } || 'something went wrong!';
            }
            if (data.data.role_permissions.length === 0) {
                throw ({ message: 'unauthorized user!' });
            }
        });
    }
    /**
     * mount AuthorisationMiddleware method
     */
    mount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get roles
                const userRoles = yield AuthorisationMiddleware.getUserRoles(req.user_id || 0);
                // here requested url is the permission name
                const permission = req._parsedUrl.pathname.replace(/-/gi, '_').slice(1);
                // check permissions with user roles
                yield AuthorisationMiddleware.checkPermission(userRoles, permission);
                next();
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = new AuthorisationMiddleware;
//# sourceMappingURL=authorisation.js.map