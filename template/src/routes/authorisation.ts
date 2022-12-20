import { Router } from 'express';

// Others
import Handler from '../controllers/authorization/handlers';

const router = Router();

/**
 * Roles routes
 */
router.post('/get-roles', Handler.getRoles);
router.post('/get-role', Handler.getRole);
router.post('/insert-role', Handler.insertRole);
router.put('/update-role', Handler.updateRole);
router.delete('/delete-role', Handler.deleteRole);

/**
 * Permissions routes
 */
router.post('/get-permissions', Handler.getPermissions);
router.post('/get-permission', Handler.getPermission);
router.post('/insert-permission', Handler.insertPermission);
router.put('/update-permission', Handler.updatePermission);
router.delete('/delete-permission', Handler.deletePermission);

/**
 * User User-Roles routes
 */
router.post('/attach-user-role', Handler.attachUserRole);
router.post('/get-user-roles', Handler.getUserRoles);
router.delete('/detach-user-role', Handler.detachUserRole);
router.delete('/detach-user-roles', Handler.detachUserRoles);

/**
 * User Role-Permissions routes
 */
router.post('/attach-role-permission', Handler.attachRolePermission);
router.post('/get-role-permissions', Handler.getRolePermissions);
router.delete('/detach-role-permission', Handler.detachRolePermission);
router.delete('/detach-role-permissions', Handler.detachRolePermissions);

export default router;
