import { IUser, IUserWithToken } from "./interfaces/IUser";
import { IAuth, ILoginArgs, ISignupWithEmail } from "./interfaces/IAuth";
import { SDK, ISDKPlugin } from "@gluestack/glue-plugin-sdk";
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
export declare class AuthPlugin implements ISDKPlugin, IAuth {
    sdk: SDK | undefined;
    authToken: string;
    register(sdk: SDK): void;
    boot(sdk: SDK): void;
    setAuthToken(token: string): string;
    getAuthToken(): string;
    getUser(): Promise<IUser>;
    isLoggedIn(): Promise<boolean>;
    login(args: ILoginArgs): Promise<any>;
    signup(args: ISignupWithEmail): Promise<string | IUserWithToken>;
}
export default AuthPlugin;
