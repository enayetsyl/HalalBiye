"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
/**
 * @description
 * A Zod enum schema for user gender, allowing only 'Male', 'Female', or 'Other'.
 * Provides a custom error message if the value is not one of the allowed options.
 */
const genderEnum = zod_1.z.enum(['Male', 'Female', 'Other'], {
    invalid_type_error: 'Gender must be one of Male, Female, Other',
});
/**
 * @description
 * Schema for validating the request body of the login endpoint.
 * - `email`: required string, must be a valid email format.
 * - `password`: required string, 8–20 characters.
 *
 * @example
 * // Valid payload
 * {
 *   email: "user@example.com",
 *   password: "secret123"
 * }
 */
const loginBody = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email('Invalid email format'),
    password: zod_1.z
        .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password can not be more than 20 characters'),
});
/**
 * @description
 * Schema for validating the request body of the registration endpoint.
 * Fields:
 * - `email`, `password`: required and validated as in loginBody.
 * - `name`: optional string, up to 50 chars.
 * - `age`: optional integer ≥ 0.
 * - `gender`: optional enum using `genderEnum`.
 * - `religion`, `location`, `education`, `occupation`: optional strings with max length constraints.
 * - `height`: optional positive number.
 *
 * @example
 * // Valid payload
 * {
 *   email: "newuser@example.com",
 *   password: "mypassword",
 *   name: "Jane Doe",
 *   age: 28,
 *   gender: "Female",
 *   religion: "Islam",
 *   location: "Dhaka, Bangladesh",
 *   height: 165,
 *   education: "Bachelor's Degree",
 *   occupation: "Engineer"
 * }
 */
const registerBody = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email('Invalid email format'),
    password: zod_1.z
        .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password can not be more than 20 characters'),
    name: zod_1.z
        .string({ invalid_type_error: 'Name must be a string' })
        .max(50, 'Name can not be more than 50 characters')
        .optional(),
    age: zod_1.z
        .number({ invalid_type_error: 'Age must be a number' })
        .int('Age must be an integer')
        .min(0, 'Age must be positive')
        .optional(),
    gender: genderEnum.optional(),
    religion: zod_1.z
        .string({ invalid_type_error: 'Religion must be a string' })
        .max(30, 'Religion can not be more than 30 characters')
        .optional(),
    location: zod_1.z
        .string({ invalid_type_error: 'Location must be a string' })
        .max(100, 'Location can not be more than 100 characters')
        .optional(),
    height: zod_1.z
        .number({ invalid_type_error: 'Height must be a number' })
        .positive('Height must be positive')
        .optional(),
    education: zod_1.z
        .string({ invalid_type_error: 'Education must be a string' })
        .max(50, 'Education can not be more than 50 characters')
        .optional(),
    occupation: zod_1.z
        .string({ invalid_type_error: 'Occupation must be a string' })
        .max(50, 'Occupation can not be more than 50 characters')
        .optional(),
});
/**
 * @description
 * Top-level schema for the login route, wrapping the validated body under `body`.
 * Allows an optional `cookies` object for future extensibility.
 *
 * @property {typeof loginBody} body - The validated login request body.
 * @property {any} [cookies] - Optional cookies object.
 */
const loginSchema = zod_1.z.object({
    body: loginBody,
    cookies: zod_1.z.any().optional(),
});
/**
 * @description
 * Top-level schema for the registration route, wrapping the validated body under `body`.
 * Allows an optional `cookies` object for future extensibility.
 *
 * @property {typeof registerBody} body - The validated registration request body.
 * @property {any} [cookies] - Optional cookies object.
 */
const registerSchema = zod_1.z.object({
    body: registerBody,
    cookies: zod_1.z.any().optional(),
});
/**
 * @description
 * Schema for updating user data. Reuses `registerBody` but makes all fields optional,
 * so clients can send partial updates.
 *
 * @property {Partial<registerBody>} body - Partial user fields for update.
 * @property {any} [cookies] - Optional cookies object.
 */
const updateUserSchema = zod_1.z.object({
    body: registerBody.partial(),
    cookies: zod_1.z.any().optional(),
});
/**
 * @description
 * A collection of all user-related validation schemas,
 * to be used in request validation middleware.
 */
exports.UserValidation = {
    loginSchema,
    registerSchema,
    updateUserSchema,
};
