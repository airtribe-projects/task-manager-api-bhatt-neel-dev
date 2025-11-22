# Task Manager API

## Description
A RESTful API for managing tasks built with Node.js and Express. This API provides full CRUD (Create, Read, Update, Delete) operations for task management with proper validation and error handling.

## Technologies Used
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Supertest** - HTTP testing library
- **Tap** - Testing framework

## Setup Instructions

### Prerequisites
- Node.js version 18 or higher

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server with:
```bash
node app.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. GET /tasks
Get all tasks

**Response:**
- Status: `200 OK`
- Body: Array of task objects

**Example:**
```bash
curl http://localhost:3000/tasks
```

**Response Body:**
```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  },
  {
    "id": 2,
    "title": "Create a new project",
    "description": "Create a new project using the Express application generator",
    "completed": true
  }
]
```

### 2. GET /tasks/:id
Get a single task by ID

**Parameters:**
- `id` - Task ID (integer)

**Response:**
- Status: `200 OK` if task exists
- Status: `404 Not Found` if task doesn't exist
- Body: Task object

**Example:**
```bash
curl http://localhost:3000/tasks/1
```

**Response Body:**
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

### 3. POST /tasks
Create a new task

**Request Body:**
- `title` (string, required) - Task title
- `description` (string, required) - Task description
- `completed` (boolean, required) - Task completion status

**Response:**
- Status: `201 Created` if successful
- Status: `400 Bad Request` if validation fails
- Body: Created task object

**Example:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "completed": false
  }'
```

**Response Body:**
```json
{
  "id": 16,
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```

**Validation Rules:**
- `title` must be a string and is required
- `description` must be a string and is required
- `completed` must be a boolean (not a string "true" or "false")

### 4. PUT /tasks/:id
Update an existing task

**Parameters:**
- `id` - Task ID (integer)

**Request Body:**
- `title` (string, required) - Updated task title
- `description` (string, required) - Updated task description
- `completed` (boolean, required) - Updated completion status

**Response:**
- Status: `200 OK` if successful
- Status: `404 Not Found` if task doesn't exist
- Status: `400 Bad Request` if validation fails
- Body: Updated task object

**Example:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true
  }'
```

**Response Body:**
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

### 5. DELETE /tasks/:id
Delete a task

**Parameters:**
- `id` - Task ID (integer)

**Response:**
- Status: `200 OK` if successful
- Status: `404 Not Found` if task doesn't exist
- Body: Success message

**Example:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Response Body:**
```json
{
  "message": "Task deleted successfully"
}
```

## Testing

Run the test suite:
```bash
npm test
```

All tests should pass with output showing 10 test cases covering:
- Creating tasks with valid and invalid data
- Retrieving all tasks
- Retrieving single tasks by ID (valid and invalid IDs)
- Updating tasks (valid data, invalid data, and non-existent tasks)
- Deleting tasks (valid and invalid IDs)

## HTTP Status Codes

The API uses the following status codes:
- `200 OK` - Successful GET, PUT, or DELETE request
- `201 Created` - Successful POST request (resource created)
- `400 Bad Request` - Validation error (missing fields or wrong data types)
- `404 Not Found` - Resource not found

## Data Validation

All POST and PUT requests validate:
1. `title` - Must be present and a string
2. `description` - Must be present and a string
3. `completed` - Must be a boolean value (not string)

If validation fails, the API returns a `400` status with an error message.

## Project Structure

```
task-manager-api/
├── app.js              # Main application file with API endpoints
├── task.json           # Initial task data
├── package.json        # Project dependencies and scripts
├── test/
│   └── server.test.js  # Test suite
└── README.md           # Project documentation
```

## Features

- In-memory data storage using task.json
- Full CRUD operations
- Input validation with detailed error messages
- RESTful API design
- Comprehensive test coverage
- Proper HTTP status codes