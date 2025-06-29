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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
/**
 * Creates an Express middleware that validates incoming requests against the provided Zod schema.
 *
 * This middleware will asynchronously parse and validate the `body` and `cookies` of the request.
 * If validation succeeds, it calls `next()` to proceed to the next handler. Any validation errors
 * will be thrown and handled by the centralized error handler (via `catchAsync`).
 *
 * @param schema - A Zod schema object defining the expected shape of `req.body` and `req.cookies`.
 * @returns An Express middleware function that performs schema validation.
 */
const validateRequest = (schema) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Parse and validate request data against the schema
        yield schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        // Proceed if validation passed
        next();
    }));
};
exports.default = validateRequest;
