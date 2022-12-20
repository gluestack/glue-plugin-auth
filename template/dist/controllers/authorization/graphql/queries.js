"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        /**
         * query for Roles table
         */
        this.GetRole = `query ($key: String!) {
    roles_by_pk(key: $key) {
      key
      value
      created_at
      updated_at
    }
  }`;
        this.GetRoles = `query {
    roles {
      key
      value
      created_at
      updated_at
    }
  }`;
        /**
         * query for Permission table
         */
        this.GetPermission = `query ($key: String!) {
    permissions_by_pk(key: $key) {
      key
      value
      created_at
      updated_at
    }
  }`;
        this.GetPermissions = `query {
    permissions {
      key
      value
      created_at
      updated_at
    }
  }`;
        /**
         * query for user-roles table
         */
        this.GetUserRoles = `query ($user_id: Int){
    user_roles(where: {user_id: {_eq: $user_id}}) {
      role {
        key
        value
        created_at
        updated_at
      }
    }
  }`;
        /**
         * query for user-roles table
         */
        this.GetRolePermissions = `query ($role_key: String){
    role_permissions(where: {role_key: {_eq: $role_key}}) {
      permission {
        key
        value
        created_at
        updated_at
      }
    }
  }`;
        /**
         * Check Permission against role
         */
        this.CheckPermission = `query ($role_keys: [String!], $permission_key: String) {
    role_permissions(where: {role_key: {_in: $role_keys}, _and: {permission_key: {_eq: $permission_key}}}, distinct_on: permission_key) {
      id
    }
  }`;
        /**
         * query for get role-keys
         */
        this.GetRolesByID = `query ($user_id: Int){
    user_roles(where: {user_id: {_eq: $user_id}}) {
      role_key
    }
  }`;
    }
}
exports.default = new Queries;
//# sourceMappingURL=queries.js.map