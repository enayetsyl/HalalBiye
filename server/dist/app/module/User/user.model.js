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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/** Number of salt rounds for bcrypt hashing */
const SALT_ROUNDS = 10;
/**
 * Mongoose schema defining the shape of User documents.
 * Includes email, password, and various optional profile fields.
 */
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    age: Number,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    religion: String,
    location: String,
    height: Number,
    education: String,
    occupation: String,
}, { timestamps: true } // Automatically add createdAt and updatedAt
);
/**
 * Remove the password field when converting a document to JSON.
 */
UserSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.password;
        return ret;
    }
});
/**
 * Remove the password field when converting a document to a plain object.
 */
UserSchema.set('toObject', {
    transform(doc, ret) {
        delete ret.password;
        return ret;
    }
});
// ——— HASH PASSWORD BEFORE SAVE ———
/**
 * Pre-save hook: hashes the password if it has been modified.
 */
UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return;
        this.password = yield bcrypt_1.default.hash(this.password, SALT_ROUNDS);
    });
});
// ——— INSTANCE HELPER TO COMPARE PASSWORDS ———
/**
 * Compare a candidate password to the stored hash.
 * This is available on IUser instances.
 */
UserSchema.methods.comparePassword = function (candidate) {
    return bcrypt_1.default.compare(candidate, this.password);
};
/** Mongoose Model for interacting with User documents */
exports.User = mongoose_1.default.model('User', UserSchema);
exports.default = exports.User;
