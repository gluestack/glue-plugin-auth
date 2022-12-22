"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
class Locals {
    /**
     * Initialize all env variables
     */
    static config() {
        dotenv.config({ path: path.join(__dirname, "../../.env") });
        const port = process.env.APP_PORT || "";
        const authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || "7D";
        const resetPasswordExpiresIn = process.env.RESET_PASSWORD_EXPIRES_IN || "24H";
        const hasuraGraphqlUnauthorizedRole = process.env.HASURA_GRAPHQL_UNAUTHORIZED_ROLE || "";
        const hasuraGraphqlURL = process.env.HASURA_GRAPHQL_URL || "";
        const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || "";
        const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET || "";
        const jwtKey = process.env.HASURA_GRAPHQL_JWT_KEY || "";
        return {
            port,
            authTokenExpiresIn,
            resetPasswordExpiresIn,
            hasuraGraphqlUnauthorizedRole,
            hasuraAdminSecret,
            hasuraGraphqlURL,
            jwtSecret,
            jwtKey,
        };
    }
    /**
     * Injects config in app's locals
     */
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
//# sourceMappingURL=locals.js.map