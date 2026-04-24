# Full-Stack Application

A modern full-stack application with Node.js backend and React frontend, demonstrating MVC architecture, reusable components, and clean code principles.

## Features

### Backend (Node.js)
- **MVC Architecture**: Clean separation of concerns with Models, Controllers, and Routes
- **CORS Support**: Configured for secure cross-origin requests
- **Middleware System**: Request logging and error handling
- **REST API**: Full CRUD operations for todos
- **Clean Code**: Well-organized, modular codebase
- **Error Handling**: Centralized error management

### Frontend (React)
- **Reusable Components**: Modular React components
- **State Management**: React hooks for state handling
- **API Integration**: Axios for backend communication
- **Responsive Design**: Mobile-friendly UI
- **Clean Architecture**: Organized folder structure

## Project Structure

```
fullstack-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   ├── utils/            # Helper functions
│   │   └── index.js          # Server entry point
│   ├── data/                 # Data storage
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/       # Reusable React components
    │   ├── pages/            # Page components
    │   ├── services/         # API services
    │   ├── hooks/            # Custom hooks
    │   └── App.js
    ├── public/
    └── package.json
```

## Backend Setup

```bash
cd backend
npm install
npm run dev          # Development mode with hot reload
npm start            # Production mode
npm test             # Run tests
```

Backend runs on: `http://localhost:5000`

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `DELETE /api/todos` - Delete all todos

### API Documentation

The API documentation is available via Swagger UI:

![API Documentation](swagger-docs.png)

*Screenshot of the Swagger API documentation interface*

## Frontend Setup

```bash
cd frontend
npm install
npm start            # Development server
npm run build        # Production build
npm test             # Run tests
```

Frontend runs on: `http://localhost:3000`

## CORS Configuration

Backend is configured to accept requests from:
- Default: `http://localhost:3000`
- Custom: Set `FRONTEND_URL` environment variable

## Key Technologies

### Backend
- Express.js - Web framework
- CORS - Cross-origin resource sharing
- UUID - Unique ID generation
- Nodemon - Auto-reload development server

### Frontend
- React - UI library
- Axios - HTTP client
- React Hooks - State management

## Architecture Principles

1. **MVC Pattern**: Clear separation between data models, business logic, and routing
2. **Reusable Components**: Modular, self-contained React components
3. **Clean Code**: Proper naming, single responsibility, DRY principles
4. **Error Handling**: Centralized error management in middleware
5. **Middleware Pattern**: Modular, chainable middleware for cross-cutting concerns

## Environment Variables

Backend (.env):
```
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## License

MIT