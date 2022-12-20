import * as jwt from 'jsonwebtoken';

import Locals from '../../providers/locals';
import Common from '../commons';
import Mutations from './graphql/mutations';

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
      algorithm: 'HS256',
      expiresIn: expires_in
    });

    return {
      token,
      expires_in
    };
  }

  /**
   * Generate OTP
   */
  public async GenerateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  /**
   * Set OTP against user
   */
  public async SetOTP(id: number, otp: number) {
    // graphql query
    const { data, errors } = await Common.GQLRequest({
      variables: { id, otp },
      query: Mutations.SetOTP
    });

    if (!data || !data.data || !data.data.update_users_by_pk) {
      throw errors || data.errors && { message: data.errors[0].message } || 'failed to send email!';
    }
  }
}

export default new Helpers;
