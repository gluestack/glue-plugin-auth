import IApp from "@gluestack/framework/types/app/interface/IApp";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import IManagesInstances from "@gluestack/framework/types/plugin/interface/IManagesInstances";
import { IHasMigration } from "./interfaces/IHasMigration";
export declare class GlueStackPlugin implements IPlugin, IManagesInstances, ILifeCycle, IHasMigration {
    app: IApp;
    instances: IInstance[];
    type: "stateless" | "stateful" | "devonly";
    gluePluginStore: IGlueStorePlugin;
    constructor(app: IApp, gluePluginStore: IGlueStorePlugin);
    init(): void;
    destroy(): void;
    getName(): string;
    getVersion(): string;
    getType(): "stateless" | "stateful" | "devonly";
    getTemplateFolderPath(): string;
    getMigrationFolderPath(): string;
    getInstallationPath(target: string): string;
    runPostInstall(instanceName: string, target: string): Promise<void>;
    checkAlreadyInstalled(): Promise<void>;
    createInstance(key: string, gluePluginStore: IGlueStorePlugin, installationPath: string): IInstance;
    getInstances(): IInstance[];
}
