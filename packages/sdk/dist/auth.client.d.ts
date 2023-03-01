import { SDK, ISDKPlugin } from "@gluestack/glue-plugin-sdk";
import { ILogin } from "./interfaces/ILogin";
import { IUserWithToken } from "./interfaces";
import { IAuthProviderEnum } from "./interfaces/IAuthProviderEnum";
import { IAuthClient, ISignupWithEmail, ILoginWithEmailPasswordArgs } from "./interfaces/IAuth";
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
export declare class AuthPlugin implements ISDKPlugin, IAuthClient {
    sdk: SDK | undefined;
    authToken: string;
    authBaseURL: string;
    constructor(authBaseURL: string);
    register(sdk: SDK): void;
    boot(sdk: SDK): void;
    setAuthToken(token: string): string;
    getAuthToken(): string;
    getUser(): Promise<any>;
    isLoggedIn(): Promise<boolean>;
    login(authObject: ILogin): Promise<string | IUserWithToken>;
    loginWithEmailPassword(args: ILoginWithEmailPasswordArgs): Promise<string | IUserWithToken>;
    socialLogin(provider: IAuthProviderEnum): Promise<string | IUserWithToken>;
    signupWithEmail(args: ISignupWithEmail): Promise<string | IUserWithToken>;
    socialSignup(provider: IAuthProviderEnum): Promise<string | IUserWithToken>;
}
export default AuthPlugin;
