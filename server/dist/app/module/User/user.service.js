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
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
/**
 * Service to register a new user
 * @param email    – user's email
 * @param password – user's password (will get hashed by the model pre-save hook)
 * @param profileData – any additional profile fields
 */
const registerUser = (email, password, profileData) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Check if a user with this email already exists
    const existingUser = yield user_model_1.User.findOne({ email });
    if (existingUser) {
        // 409 Conflict – email is already taken
        throw new AppError_1.default(409, 'Email already registered');
    }
    // 2) If not, create the new user
    const result = yield user_model_1.User.create(Object.assign({ email, password }, profileData));
    return result;
});
exports.UserServices = {
    registerUser,
};
