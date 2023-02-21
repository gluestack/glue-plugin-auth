"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AuthPlugin = exports.HttpMethod = void 0;
var axios_1 = __importDefault(require("axios"));
var glue_plugin_backend_engine_sdk_1 = require("@gluestack/glue-plugin-backend-engine-sdk");
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PATCH"] = "PATCH";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var AuthPlugin = (function () {
    function AuthPlugin(authServiceID) {
        if (authServiceID === void 0) { authServiceID = 'auth'; }
        this.authServiceID = authServiceID;
    }
    AuthPlugin.prototype.register = function (sdk) {
        this.sdk = sdk;
    };
    AuthPlugin.prototype.boot = function (sdk) {
    };
    AuthPlugin.prototype.setAuthToken = function (token) {
        this.authToken = token;
        return this.authToken;
    };
    AuthPlugin.prototype.getAuthToken = function () {
        return this.authToken;
    };
    AuthPlugin.prototype.getUser = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var engine, user, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.authToken) {
                            return [2, null];
                        }
                        engine = (_a = this.sdk) === null || _a === void 0 ? void 0 : _a.getPluginInstance(glue_plugin_backend_engine_sdk_1.EnginePlugin);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, (engine === null || engine === void 0 ? void 0 : engine.invoke(this.authServiceID, "authentication/me", {}, { "x-hasura-user-token": this.authToken }, HttpMethod.GET))];
                    case 2:
                        user = _b.sent();
                        return [2, user];
                    case 3:
                        e_1 = _b.sent();
                        return [2, null];
                    case 4: return [2];
                }
            });
        });
    };
    AuthPlugin.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getUser()];
                    case 1:
                        if (_a.sent()) {
                            return [2, true];
                        }
                        return [2, false];
                }
            });
        });
    };
    AuthPlugin.prototype.login = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var engine, data, error_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        engine = this.sdk.getPluginInstance(glue_plugin_backend_engine_sdk_1.EnginePlugin);
                        return [4, axios_1["default"].post("".concat(engine === null || engine === void 0 ? void 0 : engine.baseURL, "/backend/").concat(this.authServiceID, "/authentication/signin"), args)];
                    case 1:
                        data = (_a.sent()).data;
                        if ((data === null || data === void 0 ? void 0 : data.success) && (data === null || data === void 0 ? void 0 : data.data)) {
                            this.setAuthToken(data.data.token);
                            return [2, data === null || data === void 0 ? void 0 : data.data];
                        }
                        return [2, data === null || data === void 0 ? void 0 : data.message];
                    case 2:
                        error_1 = _a.sent();
                        message = "Something went wrong";
                        if (axios_1["default"].isAxiosError(error_1)) {
                            message = error_1.message;
                        }
                        return [2, message];
                    case 3: return [2];
                }
            });
        });
    };
    AuthPlugin.prototype.signup = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var engine, data, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        engine = this.sdk.getPluginInstance(glue_plugin_backend_engine_sdk_1.EnginePlugin);
                        return [4, axios_1["default"].post("".concat(engine.baseURL, "/backend/").concat(this.authServiceID, "/authentication/signup"), __assign({}, args))];
                    case 1:
                        data = (_a.sent()).data;
                        if ((data === null || data === void 0 ? void 0 : data.success) && (data === null || data === void 0 ? void 0 : data.data)) {
                            this.setAuthToken(data.data.token);
                            return [2, data === null || data === void 0 ? void 0 : data.data];
                        }
                        return [2, data === null || data === void 0 ? void 0 : data.message];
                    case 2:
                        error_2 = _a.sent();
                        message = "Something went wrong";
                        if (axios_1["default"].isAxiosError(error_2)) {
                            message = error_2.message;
                        }
                        return [2, message];
                    case 3: return [2];
                }
            });
        });
    };
    return AuthPlugin;
}());
exports.AuthPlugin = AuthPlugin;
exports["default"] = AuthPlugin;
//# sourceMappingURL=index.js.map