"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.AuthPluginServer = exports.HttpMethod = exports.AuthPluginClient = void 0;
var auth_client_1 = require("./auth.client");
__createBinding(exports, auth_client_1, "AuthPlugin", "AuthPluginClient");
var auth_server_1 = require("./auth.server");
__createBinding(exports, auth_server_1, "HttpMethod");
__createBinding(exports, auth_server_1, "AuthPlugin", "AuthPluginServer");
//# sourceMappingURL=index.js.map