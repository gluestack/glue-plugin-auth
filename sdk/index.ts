import axios from "axios";

import {
  IUser, IUserWithToken
} from "./interfaces/IUser";

import {
  IAuth, ILoginArgs, ISignupWithEmail, IAPIResponse
} from "./interfaces/IAuth";

import {
  SDK, ISDKPlugin
} from "@gluestack/glue-plugin-sdk";

import { EnginePlugin } from "@gluestack/glue-plugin-backend-engine/dist/sdk";

export enum HttpMethod {
	GET = "GET",
	POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export class AuthPlugin implements ISDKPlugin, IAuth {
  sdk: SDK | undefined;
  authToken: string;
  authServiceID: string;

  constructor(authServiceID: string = 'auth') {
    this.authServiceID = authServiceID;
  }

  register(sdk: SDK) {
    this.sdk = sdk;
  }

  boot(sdk: SDK) {
    // this.sdk = sdk;
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

    const engine = this.sdk?.getPluginInstance(EnginePlugin);

    try {
      const user: IUser = await engine?.invoke(
        this.authServiceID,
        "authentication/me",
        {},
        { "x-hasura-user-token": this.authToken },
        HttpMethod.GET
      );

      return user;
    } catch (e) {
      return null;
    }
  }

  async isLoggedIn() {
    if (await this.getUser()) {
      return true;
    }
    return false;
  }

  async login(args: ILoginArgs) {
    try {
      const engine = this.sdk.getPluginInstance(EnginePlugin);

      const { data } = await axios.post(
        `${engine?.baseURL}/backend/${this.authServiceID}/authentication/signin`,
        args
      );

      if (data?.success && data?.data) {
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

  async signup(args: ISignupWithEmail) {
    try {
      const engine = this.sdk.getPluginInstance(EnginePlugin);

      const { data } = await axios.post<IAPIResponse<IUserWithToken>>(
        `${engine.baseURL}/backend/${this.authServiceID}/authentication/signup`,
        { ...args }
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
}

export default AuthPlugin;
