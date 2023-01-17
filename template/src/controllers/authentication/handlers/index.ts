import Signin from './signin';
import Signup from './signup';
import User from './user';
import SocialSignin from './socialSignin';

class Authentication {
  public signin(req: any, res: any): any {
    return Signin.handle(req, res);
  }

  public signup(req: any, res: any): any {
    return Signup.handle(req, res);
  }

  public user(req: any, res: any): any {
    return User.handle(req, res);
  }

  public socialSigninSuccess(req: any, res: any): any {
    return SocialSignin.success(req, res);
  }

  public socialSigninFailure(req: any, res: any): any {
    return SocialSignin.failure(req, res);
  }
}

export default new Authentication;
