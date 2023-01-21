import * as fs from "fs";
import { PluginInstance as AuthPluginInstance } from "../PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import { replaceSpecialChars } from "./replaceSpecialChars";

export async function constructEnvFromJson(
  authInstance: AuthPluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) {
  const json = await graphqlInstance.getContainerController().getEnv();
  const keys: any = {
    APP_PORT: await authInstance.getContainerController().getPortNumber(),
    APP_ID: replaceSpecialChars(authInstance.getName()),
    AUTH_TOKEN_EXPIRES_IN: "7D",
    REFRESH_TOKEN_SECRET: "refresh-token-secret",
    REFRESH_TOKEN_EXPIRES_IN: "30D",
    //
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE:
      json["HASURA_GRAPHQL_UNAUTHORIZED_ROLE"] || "",
    HASURA_GRAPHQL_URL: graphqlInstance.getGraphqlURL(),
    HASURA_GRAPHQL_ADMIN_SECRET: json["HASURA_GRAPHQL_ADMIN_SECRET"] || "",
    HASURA_GRAPHQL_JWT_SECRET: json["JWT_SECRET"],
    HASURA_GRAPHQL_JWT_KEY: json["JWT_KEY"],
    HASURA_GRAPHQL_USER_ROLE: "user",
    //
    AUTH_GOOGLE_CLIENT_ID: "",
    AUTH_GOOGLE_CLIENT_SECRET: "",
    AUTH_MICROSOFT_CLIENT_ID: "",
    AUTH_MICROSOFT_CLIENT_SECRET: "",
    AUTH_GITHUB_CLIENT_ID: "",
    AUTH_GITHUB_CLIENT_SECRET: "",
  };

  return keys;
}

export async function writeEnv(
  authInstance: AuthPluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) {
  const path = `${authInstance.getInstallationPath()}/.env`;
  let env = "";
  const keys: any = await constructEnvFromJson(authInstance, graphqlInstance);
  Object.keys(keys).map((key) => {
    env += `${key}="${keys[key]}"
`;
  });

  fs.writeFileSync(path, env);
}
