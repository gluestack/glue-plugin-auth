import Signin from './signin';
import Signup from './signup';

class Authentication {
  public signin(req: any, res: any): any {
    return Signin.handle(req, res);
  }

  public signup(req: any, res: any): any {
    return Signup.handle(req, res);
  }
}

export default new Authentication;
