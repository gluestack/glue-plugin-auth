import { IUser } from "./interfaces/IUser";
import { IAuthServer, ILoginWithEmailPasswordArgs, ISignupWithEmail } from "./interfaces/IAuth";
import { SDK, ISDKPlugin } from "@gluestack/glue-plugin-sdk";
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
export declare class AuthPlugin implements ISDKPlugin, IAuthServer {
    sdk: SDK | undefined;
    authToken: string;
    authServiceID: string;
    constructor(authServiceID?: string);
    register(sdk: SDK): void;
    boot(sdk: SDK): void;
    setAuthToken(token: string): string;
    getAuthToken(): string;
    getUser(): Promise<IUser>;
    isLoggedIn(): Promise<boolean>;
    login(args: ILoginWithEmailPasswordArgs): Promise<any>;
    signup(args: ISignupWithEmail): Promise<any>;
}
export default AuthPlugin;
