import { PluginInstance } from "./PluginInstance";
import { constructEnvFromJson } from "./helpers/writeEnv";
import { GlobalEnv, SpawnHelper } from "@gluestack/helpers";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IContainerController, {
	IRoutes
} from "@gluestack/framework/types/plugin/interface/IContainerController";

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
			this.callerInstance.gluePluginStore.get("container_id")
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

	buildScript() {
		return ["npm", "run", "build"];
	}

	async getEnv() {
		return await constructEnvFromJson(
			this.callerInstance,
			this.callerInstance.getGraphqlInstance()
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
			containerId || null
		);
		return (this.containerId = containerId || null);
	}

	getConfig(): any { }

	async up() {
		//
	}

	async down() {
		//
	}

	async build() {
		await SpawnHelper.run(
			this.callerInstance.getInstallationPath(),
			this.installScript()
		);
		await SpawnHelper.run(
			this.callerInstance.getInstallationPath(),
			this.buildScript()
		);
	}

	async getRoutes(): Promise<IRoutes[]> {
		const routes: IRoutes[] = [
			{ method: "POST", path: "/authentication/signin" },
			{ method: "POST", path: "/authentication/signup" },
			{ method: "GET", path: "/authentication/me" },
			{ method: "POST", path: "/authentication/refresh-jwt-token" },
			{ method: "GET", path: "/authentication/signin/google" },
			{ method: "GET", path: "/authentication/signup/google" },
			{ method: "GET", path: "/authentication/signin/google/callback" },
			{ method: "GET", path: "/authentication/signin/google/callback/success" },
			{ method: "GET", path: "/authentication/signin/google/callback/failure" },
			{ method: "GET", path: "/authentication/signin/microsoft" },
			{ method: "GET", path: "/authentication/signup/microsoft" },
			{ method: "GET", path: "/authentication/signin/microsoft/callback" },
			{ method: "GET", path: "/authentication/signin/microsoft/callback/success" },
			{ method: "GET", path: "/authentication/signin/microsoft/callback/failure" },
			{ method: "GET", path: "/authentication/signin/github" },
			{ method: "GET", path: "/authentication/signup/github" },
			{ method: "GET", path: "/authentication/signin/github/callback" },
			{ method: "GET", path: "/authentication/signin/github/callback/success" },
			{ method: "GET", path: "/authentication/signin/github/callback/failure" },
		];

		return Promise.resolve(routes);
	}
}
