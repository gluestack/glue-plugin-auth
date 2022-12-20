"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Others
const handlers_1 = require("../controllers/authorization/handlers");
const router = (0, express_1.Router)();
/**
 * Roles routes
 */
router.post('/get-roles', handlers_1.default.getRoles);
router.post('/get-role', handlers_1.default.getRole);
router.post('/insert-role', handlers_1.default.insertRole);
router.put('/update-role', handlers_1.default.updateRole);
router.delete('/delete-role', handlers_1.default.deleteRole);
/**
 * Permissions routes
 */
router.post('/get-permissions', handlers_1.default.getPermissions);
router.post('/get-permission', handlers_1.default.getPermission);
router.post('/insert-permission', handlers_1.default.insertPermission);
router.put('/update-permission', handlers_1.default.updatePermission);
router.delete('/delete-permission', handlers_1.default.deletePermission);
/**
 * User User-Roles routes
 */
router.post('/attach-user-role', handlers_1.default.attachUserRole);
router.post('/get-user-roles', handlers_1.default.getUserRoles);
router.delete('/detach-user-role', handlers_1.default.detachUserRole);
router.delete('/detach-user-roles', handlers_1.default.detachUserRoles);
/**
 * User Role-Permissions routes
 */
router.post('/attach-role-permission', handlers_1.default.attachRolePermission);
router.post('/get-role-permissions', handlers_1.default.getRolePermissions);
router.delete('/detach-role-permission', handlers_1.default.detachRolePermission);
router.delete('/detach-role-permissions', handlers_1.default.detachRolePermissions);
exports.default = router;
//# sourceMappingURL=authorisation.js.map