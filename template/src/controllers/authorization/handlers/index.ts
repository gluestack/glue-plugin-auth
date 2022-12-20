import GetRole from './roles/get-role';
import GetRoles from './roles/get-roles';
import InsertRole from './roles/insert-role';
import UpdateRole from './roles/update-role';
import DeleteRole from './roles/delete-role';
import GetPermission from './permissions/get-permission';
import GetPermissions from './permissions/get-permissions';
import InsertPermission from './permissions/insert-permission';
import UpdatePermission from './permissions/update-permission';
import DeletePermission from './permissions/delete-permission';
import AttachUserRole from './user-roles/attach-user-role';
import GetUserRoles from './user-roles/get-user-roles';
import DetachUserRole from './user-roles/detach-user-role';
import DetachUserRoles from './user-roles/detach-user-roles';
import AttachRolePermission from './role-permissions/attach-role-permission';
import GetRolePermissions from './role-permissions/get-role-permissions';
import DetachRolePermission from './role-permissions/detach-role-permission';
import DetachRolePermissions from './role-permissions/detach-role-permissions';

class Authorization {
  /**
   * Roles CRUD methods
   */
  public getRole(req: any, res: any): any {
    return GetRole.perform(req, res);
  }

  public getRoles(req: any, res: any): any {
    return GetRoles.perform(req, res);
  }

  public insertRole(req: any, res: any): any {
    return InsertRole.perform(req, res);
  }

  public updateRole(req: any, res: any): any {
    return UpdateRole.perform(req, res);
  }

  public deleteRole(req: any, res: any): any {
    return DeleteRole.perform(req, res);
  }

  /**
   * Permissions CRUD methods
   */
  public getPermission(req: any, res: any): any {
    return GetPermission.perform(req, res);
  }

  public getPermissions(req: any, res: any): any {
    return GetPermissions.perform(req, res);
  }

  public insertPermission(req: any, res: any): any {
    return InsertPermission.perform(req, res);
  }

  public updatePermission(req: any, res: any): any {
    return UpdatePermission.perform(req, res);
  }

  public deletePermission(req: any, res: any): any {
    return DeletePermission.perform(req, res);
  }

  /**
   * User-Roles CRUD methods
   */
  public attachUserRole(req: any, res: any): any {
    return AttachUserRole.perform(req, res);
  }

  public getUserRoles(req: any, res: any): any {
    return GetUserRoles.perform(req, res);
  }

  public detachUserRole(req: any, res: any): any {
    return DetachUserRole.perform(req, res);
  }

  public detachUserRoles(req: any, res: any): any {
    return DetachUserRoles.perform(req, res);
  }

  /**
   * Role-permissions CRUD methods
   */
  public attachRolePermission(req: any, res: any): any {
    return AttachRolePermission.perform(req, res);
  }

  public getRolePermissions(req: any, res: any): any {
    return GetRolePermissions.perform(req, res);
  }

  public detachRolePermission(req: any, res: any): any {
    return DetachRolePermission.perform(req, res);
  }

  public detachRolePermissions(req: any, res: any): any {
    return DetachRolePermissions.perform(req, res);
  }
}

export default new Authorization;
