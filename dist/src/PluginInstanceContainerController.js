"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PluginInstanceContainerController = void 0;
var writeEnv_1 = require("./helpers/writeEnv");
var _a = require("@gluestack/helpers"), GlobalEnv = _a.GlobalEnv, SpawnHelper = _a.SpawnHelper;
var PluginInstanceContainerController = (function () {
    function PluginInstanceContainerController(app, callerInstance) {
        this.status = "down";
        this.app = app;
        this.callerInstance = callerInstance;
        this.setStatus(this.callerInstance.gluePluginStore.get("status"));
        this.setPortNumber(this.callerInstance.gluePluginStore.get("port_number"));
        this.setContainerId(this.callerInstance.gluePluginStore.get("container_id"));
    }
    PluginInstanceContainerController.prototype.getFromGlobalEnv = function (key, defaultValue) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, GlobalEnv.get(this.callerInstance.getName(), key)];
                    case 1:
                        value = _a.sent();
                        if (!!value) return [3, 3];
                        return [4, GlobalEnv.set(this.callerInstance.getName(), key, defaultValue)];
                    case 2:
                        _a.sent();
                        return [2, defaultValue];
                    case 3: return [2, value];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.getCallerInstance = function () {
        return this.callerInstance;
    };
    PluginInstanceContainerController.prototype.installScript = function () {
        return ["npm", "install"];
    };
    PluginInstanceContainerController.prototype.runScript = function () {
        return ["npm", "run", "dev"];
    };
    PluginInstanceContainerController.prototype.buildScript = function () {
        return ["npm", "run", "build"];
    };
    PluginInstanceContainerController.prototype.getEnv = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, writeEnv_1.constructEnvFromJson)(this.callerInstance, this.callerInstance.getGraphqlInstance())];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.getDockerJson = function () {
        return {};
    };
    PluginInstanceContainerController.prototype.getStatus = function () {
        return this.status;
    };
    PluginInstanceContainerController.prototype.getPortNumber = function (returnDefault) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        if (_this.portNumber) {
                            return resolve(_this.portNumber);
                        }
                        var port = 9090;
                        _this.setPortNumber(port);
                        return resolve(_this.portNumber);
                    })];
            });
        });
    };
    PluginInstanceContainerController.prototype.getContainerId = function () {
        return this.containerId;
    };
    PluginInstanceContainerController.prototype.setStatus = function (status) {
        this.callerInstance.gluePluginStore.set("status", status || "down");
        return (this.status = status || "down");
    };
    PluginInstanceContainerController.prototype.setPortNumber = function (portNumber) {
        this.callerInstance.gluePluginStore.set("port_number", portNumber || null);
        return (this.portNumber = portNumber || null);
    };
    PluginInstanceContainerController.prototype.setContainerId = function (containerId) {
        this.callerInstance.gluePluginStore.set("container_id", containerId || null);
        return (this.containerId = containerId || null);
    };
    PluginInstanceContainerController.prototype.getConfig = function () { };
    PluginInstanceContainerController.prototype.up = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    PluginInstanceContainerController.prototype.down = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    PluginInstanceContainerController.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, SpawnHelper.start(this.callerInstance.getInstallationPath(), this.installScript()).then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, SpawnHelper.start(this.callerInstance.getInstallationPath(), this.buildScript())];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.getRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var routes;
            return __generator(this, function (_a) {
                routes = [
                    { method: "POST", path: "/signin" },
                    { method: "POST", path: "/signup" },
                    { method: "GET", path: "/me" },
                    { method: "POST", path: "/refresh-jwt-token" },
                    { method: "GET", path: "/signin/google" },
                    { method: "GET", path: "/signup/google" },
                    { method: "GET", path: "/signin/google/callback" },
                    { method: "GET", path: "/signin/google/callback/success" },
                    { method: "GET", path: "/signin/google/callback/failure" },
                    { method: "GET", path: "/signin/microsoft" },
                    { method: "GET", path: "/signup/microsoft" },
                    { method: "GET", path: "/signin/microsoft/callback" },
                    { method: "GET", path: "/signin/microsoft/callback/success" },
                    { method: "GET", path: "/signin/microsoft/callback/failure" },
                    { method: "GET", path: "/signin/github" },
                    { method: "GET", path: "/signup/github" },
                    { method: "GET", path: "/signin/github/callback" },
                    { method: "GET", path: "/signin/github/callback/success" },
                    { method: "GET", path: "/signin/github/callback/failure" },
                ];
                return [2, Promise.resolve(routes)];
            });
        });
    };
    return PluginInstanceContainerController;
}());
exports.PluginInstanceContainerController = PluginInstanceContainerController;
//# sourceMappingURL=PluginInstanceContainerController.js.map