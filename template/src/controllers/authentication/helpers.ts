import * as jwt from "jsonwebtoken";
import Locals from "../../providers/locals";

class Helpers {
  /**
   * Create Token
   */
  public async CreateToken(_payload: { id: any; role: string }) {
    const expires_in = Locals.config().authTokenExpiresIn;

    const tokenContents = {
      id: _payload.id.toString(),
      role: _payload.role,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": [_payload.role],
        "x-hasura-default-role": _payload.role,
        "x-hasura-user-id": _payload.id.toString()
      }
    };

    const token = jwt.sign(tokenContents, Locals.config().jwtSecret, {
      algorithm: Locals.config().jwtKey,
      expiresIn: expires_in,
    });
    console.log(token);

    return {
      token,
      expires_in,
    };
  }
}

export default new Helpers();
