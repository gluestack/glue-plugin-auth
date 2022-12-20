class Queries {
  /**
   * query for Roles table
   */
  public GetRole = `query ($key: String!) {
    roles_by_pk(key: $key) {
      key
      value
      created_at
      updated_at
    }
  }`;

  public GetRoles = `query {
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
  public GetPermission = `query ($key: String!) {
    permissions_by_pk(key: $key) {
      key
      value
      created_at
      updated_at
    }
  }`;

  public GetPermissions = `query {
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
  public GetUserRoles = `query ($user_id: Int){
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
  public GetRolePermissions = `query ($role_key: String){
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
  public CheckPermission = `query ($role_keys: [String!], $permission_key: String) {
    role_permissions(where: {role_key: {_in: $role_keys}, _and: {permission_key: {_eq: $permission_key}}}, distinct_on: permission_key) {
      id
    }
  }`;

  /**
   * query for get role-keys
   */
  public GetRolesByID = `query ($user_id: Int){
    user_roles(where: {user_id: {_eq: $user_id}}) {
      role_key
    }
  }`;
}

export default new Queries;
