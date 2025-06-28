import { z } from 'zod';

// Reusable primitives
const genderEnum = z.enum(['Male', 'Female', 'Other'], {
  invalid_type_error: 'Gender must be one of Male, Female, Other',
});

// 1) Define the “body” schemas exactly as before
const loginBody = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password can not be more than 20 characters'),
});

const registerBody = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password can not be more than 20 characters'),
  name: z
    .string({ invalid_type_error: 'Name must be a string' })
    .max(50, 'Name can not be more than 50 characters')
    .optional(),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be an integer')
    .min(0, 'Age must be positive')
    .optional(),
  gender: genderEnum.optional(),
  religion: z
    .string({ invalid_type_error: 'Religion must be a string' })
    .max(30, 'Religion can not be more than 30 characters')
    .optional(),
  location: z
    .string({ invalid_type_error: 'Location must be a string' })
    .max(100, 'Location can not be more than 100 characters')
    .optional(),
  height: z
    .number({ invalid_type_error: 'Height must be a number' })
    .positive('Height must be positive')
    .optional(),
  education: z
    .string({ invalid_type_error: 'Education must be a string' })
    .max(50, 'Education can not be more than 50 characters')
    .optional(),
  occupation: z
    .string({ invalid_type_error: 'Occupation must be a string' })
    .max(50, 'Occupation can not be more than 50 characters')
    .optional(),
});

// 2) Wrap each in a top-level object with `body` (and allow `cookies` if you ever need it)
const loginSchema = z.object({
  body: loginBody,
  cookies: z.any().optional(),
});

const registerSchema = z.object({
  body: registerBody,
  cookies: z.any().optional(),
});

// For updates: reuse registerBody but make all fields optional
const updateUserSchema = z.object({
  body: registerBody.partial(),
  cookies: z.any().optional(),
});

export const UserValidation = {
  loginSchema,
  registerSchema,
  updateUserSchema,
};
