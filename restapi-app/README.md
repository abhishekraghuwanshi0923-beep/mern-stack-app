# Node.js REST API with CRUD Operations

This is a sample Node.js application that provides a REST API with CRUD (Create, Read, Update, Delete) operations for managing items.

## Features

- RESTful API endpoints for items
- Local JSON storage in `data/items.json`
- Unit tests with Jest and Supertest
- Proper error handling

## API Endpoints

### Items

- **GET /api/items** - Retrieve all items
- **GET /api/items/:id** - Retrieve a single item by ID
- **POST /api/items** - Create a new item
- **PUT /api/items/:id** - Update an existing item by ID
- **DELETE /api/items/:id** - Delete an item by ID

### Request/Response Examples

#### Create an Item
```bash
POST /api/items
Content-Type: application/json

{
  "name": "Sample Item",
  "description": "This is a sample item"
}
```

Response:
```json
{
  "id": 1,
  "name": "Sample Item",
  "description": "This is a sample item"
}
```

#### Get All Items
```bash
GET /api/items
```

Response:
```json
[
  {
    "id": 1,
    "name": "Sample Item",
    "description": "This is a sample item"
  }
]
```

#### Update an Item
```bash
PUT /api/items/1
Content-Type: application/json

{
  "name": "Updated Item",
  "description": "Updated description"
}
```

#### Delete an Item
```bash
DELETE /api/items/1
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the server:
```bash
npm start
```

Run in development mode with hot reload:
```bash
npm run dev
```

Open Swagger docs automatically in your browser:
```bash
npm run docs
```

The server will run on `http://localhost:3000`

### Swagger API Documentation

After starting the app, open the Swagger UI at:

```bash
http://localhost:3000/api-docs
```

To access the raw OpenAPI JSON spec directly, use:

```bash
http://localhost:3000/swagger.json
```

This page displays the available API endpoints, request bodies, and response schemas.

## Running Tests

Run the test suite:
```bash
npm test
```

## Project Structure

```
.
├── app.js              # Main application file
├── routes/
│   └── index.js        # API routes
├── tests/
│   └── app.test.js     # Unit tests
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Technologies Used

- Node.js
- Express.js
- Jest (for testing)
- Supertest (for API testing)

## License

This project is licensed under the MIT License.