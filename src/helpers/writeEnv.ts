import * as fs from "fs";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";

export async function constructEnvFromJson(
  graphqlInstance: GraphqlPluginInstance,
) {
  const json = await graphqlInstance.getContainerController().getEnv();
  let jwt_config = {
    type: "",
    key: "",
  };

  try {
    jwt_config = JSON.parse(json["HASURA_GRAPHQL_JWT_SECRET"]);
  } catch (e) {
    //
  }

  const keys: any = {
    AUTH_TOKEN_EXPIRES_IN: "7D",
    RESET_PASSWORD_EXPIRES_IN: "24H",
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE:
      json["HASURA_GRAPHQL_UNAUTHORIZED_ROLE"] || "",
    HASURA_GRAPHQL_URL: graphqlInstance.getGraphqlURL(),
    HASURA_GRAPHQL_ADMIN_SECRET: json["HASURA_GRAPHQL_ADMIN_SECRET"] || "",
    HASURA_GRAPHQL_JWT_SECRET: jwt_config.key,
    HASURA_GRAPHQL_JWT_KEY: jwt_config.type,
  };

  return keys;
}

export async function writeEnv(
  authInstance: IInstance,
  graphqlInstance: GraphqlPluginInstance,
) {
  const path = `${authInstance.getInstallationPath()}/.env`;
  let env = "";
  const keys: any = await constructEnvFromJson(graphqlInstance);
  Object.keys(keys).map((key) => {
    env += `${key}="${keys[key]}"
`;
  });

  fs.writeFileSync(path, env);
}
