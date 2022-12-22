const prompts = require("prompts");
import { PluginInstance } from "./PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import { writeEnv } from "./helpers/writeEnv";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import { writeMigrations } from "./helpers/writeMigrations";

export const setGraphqlConfig = async (
  authInstance: PluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) => {
  authInstance.gluePluginStore.set(
    "graphql_instance",
    graphqlInstance.getName(),
  );
  graphqlInstance.gluePluginStore.set("auth_instance", authInstance.getName());
  return authInstance.gluePluginStore.get("graphql_instance");
};

async function selectGraphqlInstance(graphqlInstances: IInstance[]) {
  const choices = graphqlInstances.map((graphqlInstance: PluginInstance) => {
    return {
      title: `${graphqlInstance.getName()}`,
      description: `Will attach graphql "${graphqlInstance.getName()}"`,
      value: graphqlInstance,
    };
  });
  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select an graphqlInstance",
    choices: choices,
  });

  return value;
}

export async function attachGraphqlInstance(
  authInstance: PluginInstance,
  graphqlInstances: GraphqlPluginInstance[],
) {
  const graphqlInstance: GraphqlPluginInstance = await selectGraphqlInstance(
    graphqlInstances,
  );
  if (graphqlInstance) {
    await setGraphqlConfig(authInstance, graphqlInstance);
    await writeEnv(authInstance, graphqlInstance);
    await writeMigrations(authInstance, graphqlInstance);
    await graphqlInstance.applyMigration();

    const trackJson = {
      type: "pg_track_table",
      args: {
        source: graphqlInstance.getDbName(),
        table: "users",
      },
    };

    await graphqlInstance.requestMetadata(trackJson);
  }
}
