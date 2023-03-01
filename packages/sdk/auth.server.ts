import axios from "axios";

import {
  IUser, IUserWithToken
} from "./interfaces/IUser";

import {
  IAuthServer, ILoginWithEmailPasswordArgs, ISignupWithEmail
} from "./interfaces/IAuth";

import { IAPIResponse } from "./interfaces/IAPIResponse";

import { SDK, ISDKPlugin } from "@gluestack/glue-plugin-sdk";
import { EnginePlugin } from "@gluestack/glue-plugin-backend-engine-sdk";

export enum HttpMethod {
	GET = "GET",
	POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export class AuthPlugin implements ISDKPlugin, IAuthServer {
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

  async login(args: ILoginWithEmailPasswordArgs) {
    try {
      // const engine = this.sdk.getPluginInstance(EnginePlugin);

      // @ts-ignore
      const response = await this.sdk?.engine.invoke(
        this.authServiceID,
        "authentication/signin",
        args
      );

      if (response?.success && response?.data) {
        this.setAuthToken(response.data.token);
        return response?.data;
      }

      return response?.message;
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
      // const engine = this.sdk.getPluginInstance(EnginePlugin);

      // @ts-ignore
      const response = await this.sdk?.engine.invoke(
        this.authServiceID,
        "authentication/signup",
        args
      );

      if (response?.success && response?.data) {
        // SET THE TOKEN
        this.setAuthToken(response.data.token);
        return response?.data;
      }

      // RESPONSE
      return response?.message;
    } catch (error) {
      let message = "Something went wrong";
      console.log(error);

      if (axios.isAxiosError(error)) {
        message = error.message;
      }

      return message;
    }
  }
}

export default AuthPlugin;
