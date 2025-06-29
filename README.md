# HalalBiye - A Matrimonial App

This is a full-stack matrimonial web application designed to help users find their life partners in a way that aligns with Islamic values. The project is built with a modern tech stack, featuring a Next.js client and a Node.js/Express server.

## Live Site

The application is deployed and accessible at [https://halal-biye.vercel.app](https://halal-biye.vercel.app). Anyone can create an account and start using the site.

## Features

*   **User Authentication:** Secure user registration and login with JWT-based authentication.
*   **User Profiles:** Users can create and manage their profiles with details like age, location, occupation, and more.
*   **Browse Profiles:** Users can browse through other user profiles to find a suitable match.
*   **Connection Requests:** Users can send, receive, accept, and decline connection requests.
*   **Protected Routes:** Ensures that only authenticated users can access certain parts of the application.

## Tech Stack

### Client (Frontend)

*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/)
*   **Schema Validation:** [Zod](https://zod.dev/)

### Server (Backend)

*   **Framework:** [Express.js](https://expressjs.com/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Database:** [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
*   **Authentication:** [JWT](https://jwt.io/)
*   **API Validation:** [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v20 or later)
*   [npm](https://www.npmjs.com/)
*   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/enayetsyl/HalalBiye.git
    cd HalalBiye
    ```

2.  **Setup the Server:**

    *   Navigate to the `server` directory:
        ```bash
        cd server
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `server` directory and add the following environment variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=j
        JWT_EXPIRES_IN= 
        JWT_COOKIE_EXPIRES_MS= 
        ```
    *   Build the server:
        ```bash
        npm run build
        ```

3.  **Setup the Client:**

    *   Navigate to the `client` directory:
        ```bash
        cd ../client
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env.local` file in the `client` directory and add the following environment variable:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:5000
        ```

### Running the Application

1.  **Start the Server:**

    *   From the `server` directory, run:
        ```bash
        npm run start:prod
        ```
    *   For development with auto-reloading:
        ```bash
        npm run start:dev
        ```

2.  **Start the Client:**

    *   From the `client` directory, run:
        ```bash
        npm run dev
        ```

The application should now be running at `http://localhost:3000`.

## API Endpoints

The server exposes the following RESTful API endpoints under the `/api/v1` prefix:

### User Routes (`/users`)

*   `POST /register`: Register a new user.
*   `POST /login`: Log in a user.
*   `POST /logout`: Log out a user.
*   `GET /me`: Get the current user's profile.
*   `PUT /me`: Update the current user's profile.
*   `GET /`: Browse other users' profiles.

### Request Routes (`/requests`)

*   `POST /`: Send a connection request.
*   `GET /incoming`: Get all incoming connection requests.
*   `GET /outgoing`: Get all outgoing connection requests.
*   `POST /accept`: Accept a connection request.
*   `POST /decline`: Decline a connection request.
