import { IUser } from "./IUser";

export interface ILoginArgs extends Record<string, any> {
  email: string;
  password: string;
}

export interface IAuth {
  authToken: string;

  setAuthToken(token: string): string;
  getAuthToken(): string;
  getUser(): Promise<IUser>;
  isLoggedIn(): Promise<boolean>;
  login(args: ILoginArgs): Promise<IUser | null>;
}

export interface ISignupWithEmail extends Record<string, string | boolean | number | undefined> {
  email: string;
  password: string;
  name?: string;
}

export interface IAPIResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}
