const { SpawnHelper, DockerodeHelper } = require("@gluestack/helpers");
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IContainerController from "@gluestack/framework/types/plugin/interface/IContainerController";
import { generateDockerfile } from "./create-dockerfile";
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
    return ["npm", "run", "dev"];
  }

  async getEnv() {
    return await constructEnvFromJson(
      this.callerInstance,
      this.callerInstance.getGraphqlInstance(),
    );
  }

  getDockerJson() {
    return {};
  }

  getStatus(): "up" | "down" {
    return this.status;
  }

  //@ts-ignore
  async getPortNumber(returnDefault?: boolean) {
    return new Promise((resolve, reject) => {
      if (this.portNumber) {
        return resolve(this.portNumber);
      }
      const port = 9000;
      this.setPortNumber(port);
      return resolve(this.portNumber);

      /*
      let ports =
        this.callerInstance.callerPlugin.gluePluginStore.get("ports") || [];
      DockerodeHelper.getPort(9000, ports)
        .then((port: number) => {
          this.setPortNumber(port);
          ports.push(port);
          this.callerInstance.callerPlugin.gluePluginStore.set("ports", ports);
          return resolve(this.portNumber);
        })
        .catch((e: any) => {
          reject(e);
        });
        */
    });
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
    return;
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

      await new Promise(async (resolve, reject) => {
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
              .then(async ({ processId }: { processId: string }) => {
                this.setStatus("up");
                this.setContainerId(processId);
                await this.print();
                return resolve(true);
              })
              .catch((e: any) => {
                return reject(e);
              });
          })
          .catch((e: any) => {
            return reject(e);
          });
      });
    } else await this.print();
  }

  async print() {
    console.log("\x1b[32m");
    console.log(
      `You can now use these endpoints for auth, registered with auth instance: ${this.callerInstance
        .getGraphqlInstance()
        .getName()}`,
      "\x1b[0m",
    );
    const routes = [
      {
        route: `http://localhost:${await this.getPortNumber()}/authentication/signup`,
        method: "POST",
        params: "name, email, password",
      },
      {
        route: `http://localhost:${await this.getPortNumber()}/authentication/signin`,
        method: "POST",
        params: "email, password",
      },
    ];
    console.table(routes);
  }

  async down() {
    return;
    if (this.getStatus() !== "down") {
      await new Promise(async (resolve, reject) => {
        SpawnHelper.stop(this.getContainerId(), this.callerInstance.getName())
          .then(() => {
            this.setStatus("down");
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
    await generateDockerfile(this.callerInstance.getInstallationPath());
  }
}
