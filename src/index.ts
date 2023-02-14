//@ts-ignore
import packageJSON from "../package.json";
import { PluginInstance } from "./PluginInstance";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import IManagesInstances from "@gluestack/framework/types/plugin/interface/IManagesInstances";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import { attachGraphqlInstance } from "./attachGraphqlInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import { IHasMigration } from "./interfaces/IHasMigration";
import reWriteFile from "./helpers/reWriteFile";
import { updateWorkspaces } from "./helpers/update-workspaces";

//Do not edit the name of this class
export class GlueStackPlugin
  implements IPlugin, IManagesInstances, ILifeCycle, IHasMigration
{
  app: IApp;
  instances: IInstance[];
  type: "stateless" | "stateful" | "devonly" = "stateless";
  gluePluginStore: IGlueStorePlugin;

  constructor(app: IApp, gluePluginStore: IGlueStorePlugin) {
    this.app = app;
    this.instances = [];
    this.gluePluginStore = gluePluginStore;
  }

  init() {
    //
  }

  destroy() {
    //
  }

  getName(): string {
    return packageJSON.name;
  }

  getVersion(): string {
    return packageJSON.version;
  }

  getType(): "stateless" | "stateful" | "devonly" {
    return this.type;
  }

  getTemplateFolderPath(): string {
    return `${process.cwd()}/node_modules/${this.getName()}/template`;
  }

  getMigrationFolderPath(): string {
    return `${process.cwd()}/node_modules/${this.getName()}/hasura/migrations`;
  }

  getInstallationPath(target: string): string {
    return `./backend/services/${target}`;
  }

  async runPostInstall(instanceName: string, target: string) {
    await this.checkAlreadyInstalled();
    if (instanceName !== "auth") {
      console.log("\x1b[36m");
      console.log(
        `Install auth instance: \`node glue add auth auth\``,
      );
      console.log("\x1b[31m");
      throw new Error(
        "auth supports instance name `auth` only",
      );
    }

    const graphqlPlugin: GlueStackPlugin = this.app.getPluginByName(
      "@gluestack/glue-plugin-graphql",
    );

    // Validation
    if (!graphqlPlugin || !graphqlPlugin.getInstances().length) {
      console.log("\x1b[36m");
      console.log(
        `Install graphql instance: \`node glue add graphql graphql-backend\``,
      );
      console.log("\x1b[31m");
      throw new Error(
        "Graphql instance not installed from `@gluestack/glue-plugin-graphql`",
      );
    }
    const graphqlInstances: GraphqlPluginInstance[] = [];
    graphqlPlugin
      .getInstances()
      .forEach((graphqlInstance: GraphqlPluginInstance) => {
        if (
          !graphqlInstance.gluePluginStore.get("auth_instance")
        ) {
          graphqlInstances.push(graphqlInstance);
        }
      });
    if (!graphqlInstances.length) {
      throw new Error(
        "There is no graphql instance where auth plugin can be installed",
      );
    }

    const authInstance: PluginInstance = await this.app.createPluginInstance(
      this,
      instanceName,
      this.getTemplateFolderPath(),
      target,
    );
    if (authInstance) {
      await attachGraphqlInstance(authInstance, graphqlInstances);
    }

      // update package.json'S name index with the new instance name
      const pluginPackage = `${authInstance.getInstallationPath()}/package.json`;
      await reWriteFile(pluginPackage, instanceName, 'INSTANCENAME');
  
      // update root package.json's workspaces with the new instance name
      const rootPackage = `${process.cwd()}/package.json`;
      await updateWorkspaces(rootPackage, authInstance.getInstallationPath());
  }

  async checkAlreadyInstalled() {
    const authPlugin: GlueStackPlugin = this.app.getPluginByName(
      "@gluestack/glue-plugin-auth",
    );
    //Validation
    if (authPlugin?.getInstances()?.[0]) {
      throw new Error(
        `auth instance already installed as ${authPlugin
          .getInstances()[0]
          .getName()}`,
      );
    }
  }

  createInstance(
    key: string,
    gluePluginStore: IGlueStorePlugin,
    installationPath: string,
  ): IInstance {
    const instance = new PluginInstance(
      this.app,
      this,
      key,
      gluePluginStore,
      installationPath,
    );
    this.instances.push(instance);
    return instance;
  }

  getInstances(): IInstance[] {
    return this.instances;
  }
}
