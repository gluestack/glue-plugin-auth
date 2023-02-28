import { IUser } from "./IUser";
import { ILogin } from "./ILogin";
import { IUserWithToken } from "./IUserWithToken";
import { IAuthProviderEnum } from "./IAuthProviderEnum";
export interface ILoginWithEmailPasswordArgs extends Record<string, string | boolean | number> {
    email: string;
    password: string;
}
export interface ISignupWithEmail extends Record<string, string | boolean | number | undefined> {
    email: string;
    password: string;
    name?: string;
}
export interface IAuthClient {
    authBaseURL: string;
    authToken: string;
    signupWithEmail(args: ISignupWithEmail): Promise<IUserWithToken | null | string>;
    loginWithEmailPassword(args: ILoginWithEmailPasswordArgs): Promise<IUserWithToken | null | string>;
    socialLogin(provider: IAuthProviderEnum): Promise<IUserWithToken | null | string>;
    socialSignup(provider: IAuthProviderEnum): Promise<IUserWithToken | null | string>;
    login(authObject: ILogin): Promise<IUserWithToken | null | string>;
    setAuthToken(token: string): string;
    getAuthToken(): string;
    getUser(): Promise<IUser | null>;
    isLoggedIn(): Promise<boolean>;
}
export interface IAuthServer {
    authToken: string;
    setAuthToken(token: string): string;
    getAuthToken(): string;
    getUser(): Promise<IUser | null>;
    isLoggedIn(): Promise<boolean>;
    login(args: ILoginWithEmailPasswordArgs): Promise<IUser | undefined>;
}
