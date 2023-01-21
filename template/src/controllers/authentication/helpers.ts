import * as jwt from "jsonwebtoken";
import Locals from "../../providers/locals";

class Helpers {
  /**
   * Create Token
   */
  public async CreateToken(_payload: {
    id: any;
    allowed_roles: string[];
    default_role: string;
  }) {
    const expires_in = Locals.config().authTokenExpiresIn;

    const tokenContents = {
      id: _payload.id.toString(),
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": _payload.allowed_roles,
        "x-hasura-default-role": _payload.default_role,
        "x-hasura-user-id": _payload.id.toString(),
      },
    };

    const token = jwt.sign(tokenContents, Locals.config().jwtSecret, {
      algorithm: Locals.config().jwtKey,
      expiresIn: expires_in,
    });

    const refreshToken = await this.CreateRefreshToken(_payload);

    return {
      token,
      refreshToken,
    };
  }

  /**
   * Create Refresh Token
   */
  public async CreateRefreshToken(_payload: any) {
    const refresh_token = jwt.sign(
      _payload,
      Locals.config().refreshTokenSecret,
      {
        expiresIn: Locals.config().refreshTokenExpiresIn,
      },
    );

    return refresh_token;
  }

  /**
   * Verify JWT Token
   */
  public verifyJWTToken(token: any) {
    try {
      const verifiedToken = jwt.verify(token, Locals.config().jwtSecret);
      return { success: true, token: verifiedToken };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  /**
   * Verify Refresh Token
   */
  public verifyRefreshToken(token: any) {
    try {
      const verifiedToken = jwt.verify(
        token,
        Locals.config().refreshTokenSecret,
      );
      return { success: true, token: verifiedToken };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  /**
   * Verify Token
   */
  public getAllowedAndDefaultRoles() {
    return {
      allowedRoles: [Locals.config().hasuraGraphqlUserRole],
      defaultRole: Locals.config().hasuraGraphqlUserRole,
    };
  }
}

export default new Helpers();
