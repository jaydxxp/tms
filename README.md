# Task Management System

A full-stack task management system with user roles (admin and student) built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (login/register)
- Role-based access control (admin and student roles)
- Task management (create, read, update, delete)
- User management (admin only)
- Task status tracking
- Progress visualization with charts
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. Install dependencies for all packages:
   ```bash
   npm run install-deps
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

## Running the Application

### Development Mode

To run both the frontend and backend servers in development mode:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Production Mode

To run the application in production mode:

```bash
npm start
```

## API Documentation

### Authentication Endpoints

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user info

### Task Endpoints

- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task
- PATCH `/api/tasks/:id/status` - Update task status

### User Endpoints (Admin Only)

- GET `/api/users` - Get all users
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. # tms
