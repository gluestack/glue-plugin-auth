class Mutations {
  /**
   * mutations for Roles tabel
   */
  public InsertRole = `mutation ($key: String, $value: String){
    insert_roles_one(object: {key: $key, value: $value}) {
      key
      value
      created_at
      updated_at
    }
  }`;

  public UpdateRole = `mutation ($key: String!, $value: String) {
    update_roles_by_pk(_set: {value: $value}, pk_columns: {key: $key}) {
      key
      value
    }
  }`;

  public DeleteRole = `mutation ($key: String!) {
    delete_roles_by_pk(key: $key) {
      key
    }
  }`;

  /**
   * mutations for Permissions table
   */
  public InsertPermission = `mutation ($key: String, $value: String){
    insert_permissions_one(object: {key: $key, value: $value}) {
      key
      value
      created_at
      updated_at
    }
  }`;

  public UpdatePermission = `mutation ($key: String!, $value: String) {
    update_permissions_by_pk(_set: {value: $value}, pk_columns: {key: $key}) {
      key
      value
    }
  }`;

  public DeletePermission = `mutation ($key: String!) {
    delete_permissions_by_pk(key: $key) {
      key
    }
  }`;

  /**
   * mutations for user-roles table
   */
  public DetachUserRole = `mutation ($user_id: Int, $role_key: String) {
    delete_user_roles(where: {user_id: {_eq: $user_id}, _and: {role_key: {_eq: $role_key}}}) {
      affected_rows
    }
  }`;

  public DetachUserRoles = `mutation ($user_id: Int) {
    delete_user_roles(where: {user_id: {_eq: $user_id}}) {
      affected_rows
    }
  }`;

  public AttachUserRole = `mutation ($role_key: String, $user_id: Int) {
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
  public DetachRolePermission = `mutation ($permission_key: String, $role_key: String) {
    delete_role_permissions(where: {permission_key: {_eq: $permission_key}, _and: {role_key: {_eq: $role_key}}}) {
      affected_rows
    }
  }`;

  public DetachRolePermissions = `mutation ($role_key: String) {
    delete_role_permissions(where: {role_key: {_eq: $role_key}}) {
      affected_rows
    }
  }`;

  public AttachRolePermission = `mutation ($role_key: String, $permission_key: String) {
    insert_role_permissions_one(object: {role_key: $role_key, permission_key: $permission_key}) {
      role_key
      permission_key
      created_at
      updated_at
    }
  }`;
}

export default new Mutations;
