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
const google_1 = require("./google");
class SigninDriver {
    constructor(driverType) {
        this.adapter = null;
        switch (driverType) {
            case "google":
                this.adapter = new google_1.default();
                break;
            default:
                this.adapter = null;
        }
    }
    setClient(redirectUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.adapter.setClient(redirectUrl);
            return client;
        });
    }
    getAuthUrl(state, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.adapter.getAuthUrl(state, callback);
        });
    }
    getToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adapter.getToken(code);
            return token;
        });
    }
}
exports.default = SigninDriver;
//# sourceMappingURL=driver.js.map