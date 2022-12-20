"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_role_1 = require("./roles/get-role");
const get_roles_1 = require("./roles/get-roles");
const insert_role_1 = require("./roles/insert-role");
const update_role_1 = require("./roles/update-role");
const delete_role_1 = require("./roles/delete-role");
const get_permission_1 = require("./permissions/get-permission");
const get_permissions_1 = require("./permissions/get-permissions");
const insert_permission_1 = require("./permissions/insert-permission");
const update_permission_1 = require("./permissions/update-permission");
const delete_permission_1 = require("./permissions/delete-permission");
const attach_user_role_1 = require("./user-roles/attach-user-role");
const get_user_roles_1 = require("./user-roles/get-user-roles");
const detach_user_role_1 = require("./user-roles/detach-user-role");
const detach_user_roles_1 = require("./user-roles/detach-user-roles");
const attach_role_permission_1 = require("./role-permissions/attach-role-permission");
const get_role_permissions_1 = require("./role-permissions/get-role-permissions");
const detach_role_permission_1 = require("./role-permissions/detach-role-permission");
const detach_role_permissions_1 = require("./role-permissions/detach-role-permissions");
class Authorization {
    /**
     * Roles CRUD methods
     */
    getRole(req, res) {
        return get_role_1.default.perform(req, res);
    }
    getRoles(req, res) {
        return get_roles_1.default.perform(req, res);
    }
    insertRole(req, res) {
        return insert_role_1.default.perform(req, res);
    }
    updateRole(req, res) {
        return update_role_1.default.perform(req, res);
    }
    deleteRole(req, res) {
        return delete_role_1.default.perform(req, res);
    }
    /**
     * Permissions CRUD methods
     */
    getPermission(req, res) {
        return get_permission_1.default.perform(req, res);
    }
    getPermissions(req, res) {
        return get_permissions_1.default.perform(req, res);
    }
    insertPermission(req, res) {
        return insert_permission_1.default.perform(req, res);
    }
    updatePermission(req, res) {
        return update_permission_1.default.perform(req, res);
    }
    deletePermission(req, res) {
        return delete_permission_1.default.perform(req, res);
    }
    /**
     * User-Roles CRUD methods
     */
    attachUserRole(req, res) {
        return attach_user_role_1.default.perform(req, res);
    }
    getUserRoles(req, res) {
        return get_user_roles_1.default.perform(req, res);
    }
    detachUserRole(req, res) {
        return detach_user_role_1.default.perform(req, res);
    }
    detachUserRoles(req, res) {
        return detach_user_roles_1.default.perform(req, res);
    }
    /**
     * Role-permissions CRUD methods
     */
    attachRolePermission(req, res) {
        return attach_role_permission_1.default.perform(req, res);
    }
    getRolePermissions(req, res) {
        return get_role_permissions_1.default.perform(req, res);
    }
    detachRolePermission(req, res) {
        return detach_role_permission_1.default.perform(req, res);
    }
    detachRolePermissions(req, res) {
        return detach_role_permissions_1.default.perform(req, res);
    }
}
exports.default = new Authorization;
//# sourceMappingURL=index.js.map