import Signin from './signin';
import Signup from './signup';
import ForgotPassword from './forgot-password';

class Authentication {
  public signin(req: any, res: any): any {
    return Signin.handle(req, res);
  }

  public signup(req: any, res: any): any {
    return Signup.handle(req, res);
  }

  public forgotPassword(req: any, res: any): any {
    return ForgotPassword.handle(req, res);
  }
}

export default new Authentication;
