import * as jwt from 'jsonwebtoken';
import Locals from '../../providers/locals';

class Helpers {
  /**
   * Create Token
   */
  public async CreateToken(_payload: { id: any; role: string }) {
    const expires_in = Locals.config().authTokenExpiresIn;

    const tokenContents = {
      id: _payload.id.toString(),
      role: _payload.role,
    };

    const token = jwt.sign(tokenContents, Locals.config().jwtSecret, {
      algorithm: Locals.config().jwtKey,
      expiresIn: expires_in,
    });

    return {
      token,
      expires_in
    };
  }
}

export default new Helpers;
