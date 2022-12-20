import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
  /**
   * Initialize all env variables
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') });

    const port = process.env.AUTH_APP_PORT || 9010;
    const appURL = process.env.AUTH_APP_URL || 'http://localhost:9010';
    const authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || '7D';
    const resetPasswordExpiresIn = process.env.RESET_PASSWORD_EXPIRES_IN || '24H';

    const hasuraGraphqlUnauthorizedRole = process.env.HASURA_GRAPHQL_UNAUTHORIZED_ROLE || 'guest';
    const hasuraGraphqlURL = process.env.HASURA_GRAPHQL_URL || 'http://localhost:1337/_admin/hasura';
    const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'backend-productised-services';

    const jwtSecret = process.env.JWT_SECRET || 'backend-productised-services--JWT';
    const jwtKey = process.env.JWT_KEY || 'BPS-auth-key';

    return {
      port,
      appURL,
      authTokenExpiresIn,
      resetPasswordExpiresIn,
      hasuraGraphqlUnauthorizedRole,
      hasuraAdminSecret,
      hasuraGraphqlURL,
      jwtSecret,
      jwtKey
    };
  }

  /**
   * Injects config in app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
