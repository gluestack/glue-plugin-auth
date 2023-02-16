import IApp from "@gluestack/framework/types/app/interface/IApp";
import { IHasGraphqlInstance } from "./interfaces/IHasGraphqlInstance";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import { PluginInstanceContainerController } from "./PluginInstanceContainerController";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import IManagesInstances from "@gluestack/framework/types/plugin/interface/IManagesInstances";
import IContainerController from "@gluestack/framework/types/plugin/interface/IContainerController";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import { GlueStackPlugin } from "./";

export class PluginInstance
  implements
    IInstance,
    IHasContainerController,
    ILifeCycle,
    IHasGraphqlInstance
{
  app: IApp;
  name: string;
  callerPlugin: GlueStackPlugin;
  containerController: IContainerController;
  isOfTypeInstance: boolean = false;
  gluePluginStore: IGlueStorePlugin;
  installationPath: string;

  constructor(
    app: IApp,
    callerPlugin: GlueStackPlugin,
    name: string,
    gluePluginStore: IGlueStorePlugin,
    installationPath: string,
  ) {
    this.app = app;
    this.name = name;
    this.callerPlugin = callerPlugin;
    this.gluePluginStore = gluePluginStore;
    this.installationPath = installationPath;
    //@ts-ignore
    this.containerController = new PluginInstanceContainerController(app, this);
  }

  init() {
    //
  }

  destroy() {
    //
  }

  getName(): string {
    return this.name;
  }

  getCallerPlugin(): GlueStackPlugin {
    return this.callerPlugin;
  }

  getInstallationPath(): string {
    return this.installationPath;
  }

  getContainerController(): IContainerController {
    return this.containerController;
  }

  getGraphqlInstance(): GraphqlPluginInstance {
    let graphqlInstance = null;
    const graphql_instance = this.gluePluginStore.get("graphql_instance");
    if (graphql_instance) {
      const plugin: IPlugin & IManagesInstances = this.app.getPluginByName(
        "@gluestack/glue-plugin-graphql",
      );
      if (plugin) {
        plugin.getInstances().forEach((instance: GraphqlPluginInstance) => {
          if (instance.getName() === graphql_instance) {
            graphqlInstance = instance;
          }
        });
      }
      return graphqlInstance;
    }
  }
}
