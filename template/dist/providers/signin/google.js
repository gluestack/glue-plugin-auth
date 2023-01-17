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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { google } = require("googleapis");
const locals_1 = require("../locals");
const scopes = ["https://www.googleapis.com/auth/userinfo.email "];
class Google {
    constructor() {
        this.client = null;
    }
    setClient(redirectUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const client_id = locals_1.default.config().googleClientId;
            const client_secret = locals_1.default.config().googleClientSecret;
            const redirect_uris = redirectUrl;
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
            this.client = oAuth2Client;
        });
    }
    getAuthUrl(state, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUrl = yield this.client.generateAuthUrl({
                access_type: "offline",
                scope: scopes,
                prompt: "consent",
                state: state,
            });
            callback(authUrl);
        });
    }
    getToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokens } = yield this.client.getToken(code);
            const oauth2Client = new google.auth.OAuth2();
            oauth2Client.setCredentials({
                access_token: tokens.access_token,
            });
            const oauth2 = google.oauth2({
                auth: oauth2Client,
                version: "v2",
            });
            const { data } = yield oauth2.userinfo.get();
            return {
                token: tokens,
                email: data.email,
            };
        });
    }
}
exports.default = Google;
//# sourceMappingURL=google.js.map