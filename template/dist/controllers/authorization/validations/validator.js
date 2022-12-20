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
const schema_1 = require("./schema");
const commons_1 = require("../../commons");
class Validator {
    constructor() {
        this.keyValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = schema_1.default.keySchema.validate(req.body.input || req.body);
            yield commons_1.default.CheckError(error, res, next);
        });
        this.keyValueValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = schema_1.default.keyValueSchema.validate(req.body.input || req.body);
            yield commons_1.default.CheckError(error, res, next);
        });
        // role permissions validations
        this.roleKeyValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = schema_1.default.roleKeySchema.validate(req.body.input || req.body);
            yield commons_1.default.CheckError(error, res, next);
        });
        this.rolePermissionKeyValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = schema_1.default.rolePermissionKeySchema.validate(req.body.input || req.body);
            yield commons_1.default.CheckError(error, res, next);
        });
        // user roles validations
        this.userIdRoleValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = schema_1.default.userIdRoleSchema.validate(req.body.input || req.body);
            yield commons_1.default.CheckError(error, res, next);
        });
        this.userIdValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = schema_1.default.userIdSchema.validate(req.body.input || req.body);
            yield commons_1.default.CheckError(error, res, next);
        });
    }
}
exports.default = new Validator;
//# sourceMappingURL=validator.js.map