class Mutations {
  public InsertUser = `mutation ($name: String, $email: String, $password: String) {
    insert_users_one(object: {name: $name, email: $email, password: $password}) {
      id
      name
      email
      created_at
      updated_at
    }
  }`;

  public SetOTP = `mutation ($id: Int!, $otp: Int) {
    update_users_by_pk(pk_columns: {id: $id}, _set: {otp: $otp}) {
      otp
    }
  }`;

  public ResetPassword = `mutation ($otp: Int, $password: String) {
    update_users(where: {otp: {_eq: $otp}}, _set: {otp: null, password: $password}) {
      affected_rows
    }
  }`;
}

export default new Mutations;
