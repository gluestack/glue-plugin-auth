import IApp from "@gluestack/framework/types/app/interface/IApp";
import { IHasGraphqlInstance } from "./interfaces/IHasGraphqlInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import IContainerController from "@gluestack/framework/types/plugin/interface/IContainerController";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import { GlueStackPlugin } from "./";
export declare class PluginInstance implements IInstance, IHasContainerController, ILifeCycle, IHasGraphqlInstance {
    app: IApp;
    name: string;
    callerPlugin: GlueStackPlugin;
    containerController: IContainerController;
    isOfTypeInstance: boolean;
    gluePluginStore: IGlueStorePlugin;
    installationPath: string;
    constructor(app: IApp, callerPlugin: GlueStackPlugin, name: string, gluePluginStore: IGlueStorePlugin, installationPath: string);
    init(): void;
    destroy(): void;
    getName(): string;
    getCallerPlugin(): GlueStackPlugin;
    getInstallationPath(): string;
    getContainerController(): IContainerController;
    getGraphqlInstance(): GraphqlPluginInstance;
}
