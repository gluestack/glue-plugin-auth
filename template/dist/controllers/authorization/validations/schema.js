"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
class Schema {
    constructor() {
        this.schema = {
            user_id: Joi.number().required(),
            key: Joi.string().min(3).max(30).required().custom(this.IsLowerCase).message('Key must be a lowercase string!'),
            value: Joi.string().min(3).max(30).required()
        };
        this.keySchema = Joi.object().keys({
            key: this.schema.key
        });
        this.keyValueSchema = Joi.object().keys({
            key: this.schema.key,
            value: this.schema.value
        });
        // role permissions schema
        this.roleKeySchema = Joi.object().keys({
            role_key: this.schema.key
        });
        this.rolePermissionKeySchema = Joi.object().keys({
            role_key: this.schema.key,
            permission_key: this.schema.key
        });
        // user roles schema
        this.userIdSchema = Joi.object().keys({
            user_id: this.schema.user_id
        });
        this.userIdRoleSchema = Joi.object().keys({
            user_id: this.schema.user_id,
            role_key: this.schema.key
        });
    }
    IsLowerCase(value, helpers) {
        if (value !== value.toLowerCase()) {
            return helpers.error('any.invalid');
        }
    }
}
exports.default = new Schema;
//# sourceMappingURL=schema.js.map