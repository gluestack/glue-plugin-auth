const { SpawnHelper, DockerodeHelper } = require("@gluestack/helpers");
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IContainerController from "@gluestack/framework/types/plugin/interface/IContainerController";
import { constructEnvFromJson } from "./helpers/writeEnv";
import { PluginInstance } from "./PluginInstance";
const { GlobalEnv } = require("@gluestack/helpers");

export class PluginInstanceContainerController implements IContainerController {
  app: IApp;
  status: "up" | "down" = "down";
  portNumber: number;
  containerId: string;
  callerInstance: PluginInstance;

  constructor(app: IApp, callerInstance: PluginInstance) {
    this.app = app;
    this.callerInstance = callerInstance;
    this.setStatus(this.callerInstance.gluePluginStore.get("status"));
    this.setPortNumber(this.callerInstance.gluePluginStore.get("port_number"));
    this.setContainerId(
      this.callerInstance.gluePluginStore.get("container_id"),
    );
  }

  async getFromGlobalEnv(key: string, defaultValue?: string) {
    const value = await GlobalEnv.get(this.callerInstance.getName(), key);
    if (!value) {
      await GlobalEnv.set(this.callerInstance.getName(), key, defaultValue);
      return defaultValue;
    }
    return value;
  }

  getCallerInstance(): PluginInstance {
    return this.callerInstance;
  }

  installScript() {
    return ["npm", "install"];
  }

  runScript() {
    return ["npm", "run", "start:dev", this.getPortNumber()];
  }

  async getEnv() {
    return await constructEnvFromJson(this.callerInstance.getGraphqlInstance());
  }

  getDockerJson() {
    return {};
  }

  getStatus(): "up" | "down" {
    return this.status;
  }

  getPortNumber(returnDefault?: boolean): number {
    if (this.portNumber) {
      return this.portNumber;
    }
    if (returnDefault) {
      return 6510;
    }
  }

  getContainerId(): string {
    return this.containerId;
  }

  setStatus(status: "up" | "down") {
    this.callerInstance.gluePluginStore.set("status", status || "down");
    return (this.status = status || "down");
  }

  setPortNumber(portNumber: number) {
    this.callerInstance.gluePluginStore.set("port_number", portNumber || null);
    return (this.portNumber = portNumber || null);
  }

  setContainerId(containerId: string) {
    this.callerInstance.gluePluginStore.set(
      "container_id",
      containerId || null,
    );
    return (this.containerId = containerId || null);
  }

  getConfig(): any {}

  async up() {
    if (this.getStatus() !== "up") {
      if (!this.callerInstance.getGraphqlInstance()) {
        throw new Error(
          `No graphql  attached with ${this.callerInstance.getName()}`,
        );
      }
      if (!this.callerInstance.getGraphqlInstance()?.getContainerController()) {
        throw new Error(
          `Not a valid graphql instance configured with ${this.callerInstance.getName()}`,
        );
      }
      if (
        this.callerInstance
          .getGraphqlInstance()
          ?.getContainerController()
          ?.getStatus() !== "up"
      ) {
        await this.callerInstance
          .getGraphqlInstance()
          ?.getContainerController()
          ?.up();
      }

      let ports =
        this.callerInstance.callerPlugin.gluePluginStore.get("ports") || [];

      await new Promise(async (resolve, reject) => {
        DockerodeHelper.getPort(this.getPortNumber(true), ports)
          .then((port: number) => {
            this.portNumber = port;
            console.log("\x1b[33m");
            console.log(
              `${this.callerInstance.getName()}: Running "${this.installScript().join(
                " ",
              )}"`,
              "\x1b[0m",
            );
            SpawnHelper.run(
              this.callerInstance.getInstallationPath(),
              this.installScript(),
            )
              .then(() => {
                console.log("\x1b[33m");
                console.log(
                  `${this.callerInstance.getName()}: Running "${this.runScript().join(
                    " ",
                  )}"`,
                  "\x1b[0m",
                );
                SpawnHelper.start(
                  this.callerInstance.getInstallationPath(),
                  this.runScript(),
                )
                  .then(({ processId }: { processId: string }) => {
                    this.setStatus("up");
                    this.setPortNumber(this.portNumber);
                    this.setContainerId(processId);
                    ports.push(this.portNumber);
                    this.callerInstance.callerPlugin.gluePluginStore.set(
                      "ports",
                      ports,
                    );
                    console.log("\x1b[32m");
                    console.log(
                      `You can now use these endpoints for auth, registered with auth instance: ${this.callerInstance
                        .getGraphqlInstance()
                        .getName()}`,
                      "\x1b[0m",
                    );
                    const routes = [
                      {
                        route: `http://localhost:${this.getPortNumber()}/authentication/signup`,
                        method: "POST",
                        params: "name, email, password",
                      },
                      {
                        route: `http://localhost:${this.getPortNumber()}/authentication/signin`,
                        method: "POST",
                        params: "email, password",
                      },
                    ];
                    console.table(routes);
                    return resolve(true);
                  })
                  .catch((e: any) => {
                    return reject(e);
                  });
              })
              .catch((e: any) => {
                return reject(e);
              });
          })
          .catch((e: any) => {
            return reject(e);
          });
      });
    }
  }

  async down() {
    if (this.getStatus() !== "down") {
      let ports =
        this.callerInstance.callerPlugin.gluePluginStore.get("ports") || [];
      await new Promise(async (resolve, reject) => {
        SpawnHelper.stop(this.getContainerId(), this.callerInstance.getName())
          .then(() => {
            this.setStatus("down");
            var index = ports.indexOf(this.getPortNumber());
            if (index !== -1) {
              ports.splice(index, 1);
            }
            this.callerInstance.callerPlugin.gluePluginStore.set(
              "ports",
              ports,
            );

            this.setPortNumber(null);
            this.setContainerId(null);
            return resolve(true);
          })
          .catch((e: any) => {
            return reject(e);
          });
      });
    }
  }

  async build() {
    //
  }
}
