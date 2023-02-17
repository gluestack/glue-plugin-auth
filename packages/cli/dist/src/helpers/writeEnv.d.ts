import { PluginInstance as AuthPluginInstance } from "../PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
export declare function constructEnvFromJson(authInstance: AuthPluginInstance, graphqlInstance: GraphqlPluginInstance): Promise<any>;
export declare function writeEnv(authInstance: AuthPluginInstance, graphqlInstance: GraphqlPluginInstance): Promise<void>;
