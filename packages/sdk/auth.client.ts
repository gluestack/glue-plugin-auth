import axios from "axios";
import { SDK, ISDKPlugin } from "@gluestack/glue-plugin-sdk";

import { ILogin } from "./interfaces/ILogin";
import { IUserWithToken } from "./interfaces";
import { IAPIResponse } from "./interfaces/IAPIResponse";
import { IAuthProviderEnum } from "./interfaces/IAuthProviderEnum";
import { IAuthClient, ISignupWithEmail, ILoginWithEmailPasswordArgs } from "./interfaces/IAuth";

export enum HttpMethod {
	GET = "GET",
	POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export class AuthPlugin implements ISDKPlugin, IAuthClient {
  sdk: SDK | undefined;
  authToken: string;
  authBaseURL: string;

  constructor(authBaseURL: string) {
    this.authBaseURL = authBaseURL;
  }

  register(sdk: SDK) {
    this.sdk = sdk;
  }

  boot(sdk: SDK) {
    this.sdk = sdk;
  }

  setAuthToken(token: string) {
    this.authToken = token;
    return this.authToken;
  }

  getAuthToken() {
    return this.authToken;
  }

  async getUser() {
    if (!this.authToken) {
      return null;
    }

    try {
      const { data } = await axios.get(
        `${this.authBaseURL}/authentication/me`,
        {
          headers: {
            "x-hasura-user-token": this.authToken,
          },
        }
      );
      return data;
    } catch (e) {
      return null;
    }
  }

  async isLoggedIn() {
    if (await this.getUser()) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async login(authObject: ILogin) {
    if ("args" in authObject) {
      return await this.loginWithEmailPassword({
        ...authObject.args,
      });
    }

    return await this.socialLogin(authObject.provider);
  }

  async loginWithEmailPassword(args: ILoginWithEmailPasswordArgs) {
    try {
      const { data } = await axios.post<IAPIResponse<IUserWithToken>>(
        `${this.authBaseURL}/authentication/signin`,
        { ...args }
      );

      if (data?.success && data?.data) {
        // SET THE TOKEN
        this.setAuthToken(data.data.token);
        return data?.data;
      }

      return data?.message;
    } catch (error) {
      let message = "Something went wrong";
      if (axios.isAxiosError(error)) {
        message = error.message;
      }
      return message;
    }
  }

  async socialLogin(provider: IAuthProviderEnum) {
    return new Promise<IUserWithToken | string | null>(
      async (resolve, reject) => {
        window.onmessage = async (event: any) => {
          if (event.data && typeof event.data === "string") {
            const data = JSON.parse(event?.data);

            if ("token" in data) {
              this.setAuthToken(data.token);
              try {
                const userWithToken = await this.getUser();

                if (userWithToken) {
                  resolve(userWithToken);
                  return;
                }
              } catch (error) {
                resolve(null);
              }
            }
          }
        };

        window.open(
          `${this.authBaseURL}/authentication/signin/${provider}`,
          "_blank",
          "location=yes,height=570,width=520,scrollbars=yes,status=yes"
        );
      }
    );
  }

  async signupWithEmail(args: ISignupWithEmail) {
    try {
      const { data } = await axios.post<IAPIResponse<IUserWithToken>>(
        `${this.authBaseURL}/authentication/signup`,
        {
          ...args,
        }
      );

      if (data?.success && data?.data) {
        // SET THE TOKEN
        this.setAuthToken(data.data.token);

        return data?.data;
      }

      // RESPONSE
      return data?.message;
    } catch (error) {
      let message = "Something went wrong";

      if (axios.isAxiosError(error)) {
        message = error.message;
      }

      return message;
    }
  }

  async socialSignup(provider: IAuthProviderEnum) {
    return new Promise<IUserWithToken | string | null>(
      async (resolve, reject) => {
        window.onmessage = async (event: any) => {
          if (event.data && typeof event.data === "string") {
            const data = JSON.parse(event?.data);

            if ("token" in data) {
              this.setAuthToken(data.token);
              try {
                const userWithToken = await this.getUser();

                if (userWithToken) {
                  resolve(userWithToken);
                  return;
                }
              } catch (error) {
                resolve(null);
              }
            }
          }
        };

        window.open(
          `${this.authBaseURL}/authentication/signup/${provider}`,
          "_blank",
          "location=yes,height=570,width=520,scrollbars=yes,status=yes"
        );
      }
    );
  }
}

export default AuthPlugin;
