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
const commons_1 = require("../../../commons");
const mutations_1 = require("../../graphql/mutations");
class InsertRole {
    static perform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key, value } = req.body.input || req.body;
            try {
                // graphql query
                const { data, errors } = yield commons_1.default.GQLRequest({
                    variables: { key, value },
                    query: mutations_1.default.InsertRole
                });
                if (!data || !data.data || !data.data.insert_roles_one) {
                    const error = errors || data.errors && data.errors[0].message || 'Failed to insert role';
                    return commons_1.default.Response(res, false, error, null);
                }
                return commons_1.default.Response(res, true, 'Insert role successfully!', null);
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = InsertRole;
//# sourceMappingURL=insert-role.js.map