import { Application } from 'express';

import authentication from '../routes/authentication';
import authorisation from '../routes/authorisation';

/**
 * Initialize all routes
 */
class Routes {
  public authentication(_express: Application): Application {
    return _express.use('/authentication', authentication);
  }

  public authorization(_express: Application): Application {
    return _express.use('/authorization', authorisation);
  }
}

export default new Routes;
