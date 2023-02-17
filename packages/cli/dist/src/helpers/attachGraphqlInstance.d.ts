import { PluginInstance } from "../PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
export declare const setGraphqlConfig: (authInstance: PluginInstance, graphqlInstance: GraphqlPluginInstance) => Promise<any>;
export declare function attachGraphqlInstance(authInstance: PluginInstance, graphqlInstances: GraphqlPluginInstance[]): Promise<void>;
