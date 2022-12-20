"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mutations {
    constructor() {
        /**
         * mutations for Roles tabel
         */
        this.InsertRole = `mutation ($key: String, $value: String){
    insert_roles_one(object: {key: $key, value: $value}) {
      key
      value
      created_at
      updated_at
    }
  }`;
        this.UpdateRole = `mutation ($key: String!, $value: String) {
    update_roles_by_pk(_set: {value: $value}, pk_columns: {key: $key}) {
      key
      value
    }
  }`;
        this.DeleteRole = `mutation ($key: String!) {
    delete_roles_by_pk(key: $key) {
      key
    }
  }`;
        /**
         * mutations for Permissions table
         */
        this.InsertPermission = `mutation ($key: String, $value: String){
    insert_permissions_one(object: {key: $key, value: $value}) {
      key
      value
      created_at
      updated_at
    }
  }`;
        this.UpdatePermission = `mutation ($key: String!, $value: String) {
    update_permissions_by_pk(_set: {value: $value}, pk_columns: {key: $key}) {
      key
      value
    }
  }`;
        this.DeletePermission = `mutation ($key: String!) {
    delete_permissions_by_pk(key: $key) {
      key
    }
  }`;
        /**
         * mutations for user-roles table
         */
        this.DetachUserRole = `mutation ($user_id: Int, $role_key: String) {
    delete_user_roles(where: {user_id: {_eq: $user_id}, _and: {role_key: {_eq: $role_key}}}) {
      affected_rows
    }
  }`;
        this.DetachUserRoles = `mutation ($user_id: Int) {
    delete_user_roles(where: {user_id: {_eq: $user_id}}) {
      affected_rows
    }
  }`;
        this.AttachUserRole = `mutation ($role_key: String, $user_id: Int) {
    insert_user_roles_one(object: {role_key: $role_key, user_id: $user_id}) {
      user_id
      role_key
      created_at
      updated_at
    }
  }`;
        /**
         * mutations for role-permissions table
         */
        this.DetachRolePermission = `mutation ($permission_key: String, $role_key: String) {
    delete_role_permissions(where: {permission_key: {_eq: $permission_key}, _and: {role_key: {_eq: $role_key}}}) {
      affected_rows
    }
  }`;
        this.DetachRolePermissions = `mutation ($role_key: String) {
    delete_role_permissions(where: {role_key: {_eq: $role_key}}) {
      affected_rows
    }
  }`;
        this.AttachRolePermission = `mutation ($role_key: String, $permission_key: String) {
    insert_role_permissions_one(object: {role_key: $role_key, permission_key: $permission_key}) {
      role_key
      permission_key
      created_at
      updated_at
    }
  }`;
    }
}
exports.default = new Mutations;
//# sourceMappingURL=mutations.js.map