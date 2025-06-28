"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Application configuration loaded from environment variables.
 * @namespace config
 */
exports.default = {
    /**
     * The port on which the server will listen.
     * @type {string | undefined}
     */
    port: process.env.PORT,
    /**
     * MongoDB connection URI.
     * @type {string | undefined}
     */
    database_url: process.env.MONGO_URI,
    /**
     * Current Node environment (e.g., "development", "production").
     * @type {string | undefined}
     */
    NODE_ENV: process.env.NODE_ENV,
    /**
     * Cloudinary cloud name for image hosting.
     * @type {string | undefined}
     */
    cloudinary_cloud_name: process.env.cloudinary_cloud_name,
    /**
     * Cloudinary API key.
     * @type {string | undefined}
     */
    cloudinary_api_key: process.env.cloudinary_api_key,
    /**
     * Cloudinary API secret.
     * @type {string | undefined}
     */
    cloudinary_api_secret: process.env.cloudinary_api_secret,
    /**
     * Number of salt rounds for bcrypt password hashing.
     * @type {string | undefined}
     */
    bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
    /**
     * Secret key used to sign JWTs.
     * @type {string | undefined}
     */
    jwt_secret: process.env.JWT_SECRET,
    /**
     * JWT expiration time in seconds.
     * @type {number}
     */
    jwt_expires_in: Number(process.env.JWT_EXPIRES_IN),
    /**
     * Cookie expiration time for JWT, in milliseconds.
     * @type {number}
     */
    jwt_cookie_expires_ms: Number(process.env.JWT_COOKIE_EXPIRES_MS),
};
