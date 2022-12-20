"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../routes/authentication");
const authorisation_1 = require("../routes/authorisation");
/**
 * Initialize all routes
 */
class Routes {
    authentication(_express) {
        return _express.use('/authentication', authentication_1.default);
    }
    authorization(_express) {
        return _express.use('/authorization', authorisation_1.default);
    }
}
exports.default = new Routes;
//# sourceMappingURL=routes.js.map