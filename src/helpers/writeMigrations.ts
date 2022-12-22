import { copyToTarget } from "./copyToTarget";
import { PluginInstance as AuthPluginInstance } from "../PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";

export async function writeMigrations(
  authInstance: AuthPluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) {
  await copyToTarget(
    authInstance.callerPlugin.getMigrationFolderPath(),
    graphqlInstance.getMigrationFolderPath(),
  );
}
