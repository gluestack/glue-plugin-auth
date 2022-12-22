"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.UserByEmail = `query ($email: String) {
    users(where: {email: {_eq: $email}}) {
      id
      name
      email
      password
      created_at
      updated_at
    }
  }`;
    }
}
exports.default = new Queries();
//# sourceMappingURL=queries.js.map