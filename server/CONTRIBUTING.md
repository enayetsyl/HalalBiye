# Contributing to Halal Biye Server

First off, thank you for considering contributing to this project! Your help is greatly appreciated.

The following is a set of guidelines for contributing to the Halal Biye server. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it are governed by the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project owner.

## How Can I Contribute?

### Reporting Bugs

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/enayetsyl/HalalBiye.git/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/enayetsyl/HalalBiye.git/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

- Open a new issue to discuss your enhancement.
- Clearly describe the enhancement and the motivation for it.

### Pull Requests

- Fork the repo and create your branch from `main`.
- If you've added code that should be tested, add tests.
- Ensure the test suite passes.
- Make sure your code lints.
- Issue that pull request!

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.

### TypeScript Styleguide

- **Follow the existing coding style.**
- **`prettier` and `eslint` are used for formatting and linting.** Run `npm run prettier:fix` and `npm run lint:fix` before committing.
- **File and Folder Structure:**
    - `src/config`: Configuration files.
    - `src/app/routes`: API routes.
    - `src/app/middlewares`: Express middlewares.
    - `src/app/module`: Contains the different modules of the application.
    - `src/app/utils`: Utility functions.
- **Naming Conventions:**
    - Use PascalCase for class names and interfaces (e.g., `MyClass`, `MyInterface`).
    - Use camelCase for variables and functions (e.g., `myVariable`, `myFunction`).
- **Error Handling:**
    - Use the `catchAsync` higher-order function to wrap asynchronous route handlers. This ensures that any uncaught errors are passed to the global error handler.
    - Use the `globalErrorHandler` for handling all errors.
    - Use the `AppError` class for creating custom errors.
- **API:**
    - All API endpoints should be versioned (e.g., `/api/v1/...`).
    - Use the `sendResponse` utility for sending consistent API responses.

## Project Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/enayetsyl/HalalBiye.git
    ```
2.  **Install dependencies:**
    ```bash
    cd HalalBiye
    cd server
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables.
4.  **Run the development server:**
    ```bash
    npm run start:dev
    ```

## Scripts

- `npm run build`: Compiles the TypeScript code.
- `npm run start:prod`: Starts the server in production mode.
- `npm run start:dev`: Starts the server in development mode with auto-reloading.
- `npm run lint`: Lints the codebase.
- `npm run lint:fix`: Fixes linting errors.
- `npm run prettier`: Checks for formatting errors.
- `npm run prettier:fix`: Fixes formatting errors.

## Module Structure

A module encapsulates all the necessary components for a specific feature. When creating a new module, follow this structure:

```
src/app/module/<<ModuleName>>/
├── <<moduleName>>.controller.ts
├── <<moduleName>>.model.ts
├── <<moduleName>>.route.ts
├── <<moduleName>>.service.ts
├── <<moduleName>>.types.ts
└── <<moduleName>>.validation.ts
```

### 1. `<<moduleName>>.types.ts`

Define the TypeScript types for the module. This includes interfaces for the data structures used within the module.

**Example:**

```typescript
export type Gender = 'Male' | 'Female' | 'Other';

export interface User {
  _id: string;
  email: string;
  password: string;
  name?: string;
  age?: number;
  gender?: Gender;
  // ... other fields
}
```

### 2. `<<moduleName>>.model.ts`

Define the Mongoose schema and model for the module. This file is responsible for the database schema, including any pre-save hooks or methods.

**Example:**

```typescript
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.types';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ... other fields
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
```

### 3. `<<moduleName>>.validation.ts`

Define the Zod validation schemas for the module. These schemas are used to validate incoming request bodies.

**Example:**

```typescript
import { z } from 'zod';

const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  body: loginBody,
});

export const UserValidation = {
  loginSchema,
};
```

### 4. `<<moduleName>>.service.ts`

The service layer contains the business logic for the module. It interacts with the database and performs any necessary operations.

**Example:**

```typescript
import AppError from '../../errors/AppError';
import { User } from './user.model';

const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(409, 'Email already registered');
  }
  const result = await User.create({ email, password });
  return result;
};

export const UserServices = {
  registerUser,
};
```

### 5. `<<moduleName>>.controller.ts`

The controller layer handles the incoming requests and sends the responses. It uses the service layer to perform the business logic.

**Example:**

```typescript
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await UserServices.registerUser(email, password);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
};
```

### 6. `<<moduleName>>.route.ts`

Define the API routes for the module. Use the `validateRequest` middleware to validate incoming requests against the Zod schemas.

**Example:**

```typescript
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  validateRequest(UserValidation.loginSchema),
  UserControllers.registerUser,
);

export const UserRoutes = router;
```

## Error Handling

- **`catchAsync`:** Use the `catchAsync` higher-order function to wrap all asynchronous route handlers. This ensures that any uncaught errors are passed to the global error handler.

- **`AppError`:** Use the `AppError` class to create custom errors with a status code and message.

  ```typescript
  throw new AppError(409, 'Email already registered');
  ```

## API Response

- **`sendResponse`:** Use the `sendResponse` utility to send consistent API responses. This utility takes the response object and an object with the status code, success status, message, and data.

  ```typescript
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
  ```

