# ASD_WorkShop

A modular REST API built with **Node.js and Express.js**, featuring product CRUD operations, file-based JSON storage, response caching, and API performance monitoring using `apipulse-express`.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing the API](#testing-the-api)
- [Caching](#caching)
- [How the Project Works](#how-the-project-works)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## Overview

ASD_WorkShop is a backend development project demonstrating how to build a structured REST API using Express.js.

The application manages products through standard HTTP methods and separates routing, request handling, business logic, data access, and caching into dedicated modules.

Product data is stored locally in a JSON file, so a separate database server is not required.

## Features

- **RESTful API:** Supports GET, POST, PUT, PATCH, and DELETE requests.
- **Modular architecture:** Separates routes, controllers, services, middleware, and database logic.
- **JSON-based storage:** Reads and writes product data using Node.js file system APIs.
- **Response caching:** Applies caching middleware to product retrieval endpoints.
- **Cache invalidation:** Clears the cache when products are created, updated, or deleted.
- **API monitoring:** Integrates `apipulse-express` for request monitoring.
- **Development workflow:** Uses Nodemon to restart the server automatically when files change.
- **Consistent JSON responses:** Returns product data and error messages as JSON.

## Tech Stack

| Technology       | Purpose                                              |
| ---------------- | ---------------------------------------------------- |
| Node.js          | JavaScript runtime                                   |
| Express.js 5     | HTTP server and REST API                             |
| apipulse-express | API monitoring middleware                            |
| Nodemon          | Automatic server restarts during development         |
| JSON             | Local data storage                                   |
| CommonJS         | Module system using `require()` and `module.exports` |

## Project Structure

```text
ASD_WorkShop/
├── controllers/
│   └── productController.js
├── database/
│   ├── db.json
│   └── productDatabase.js
├── middleware/
│   └── cacheMiddleware.js
├── routes/
│   └── productRoutes.js
├── services/
│   └── productService.js
├── .gitignore
├── package.json
├── package-lock.json
├── output.mjs
├── server.js
└── README.md
```

### Directory Responsibilities

- **`server.js`** — Main entry point. Creates the Express application, registers middleware and routes, and starts the server.
- **`routes/`** — Defines API endpoints and connects them to controller functions.
- **`controllers/`** — Handles HTTP requests and responses, status codes, and errors.
- **`services/`** — Contains the product business logic and CRUD operations.
- **`database/`** — Reads and writes product records to `db.json`.
- **`database/db.json`** — Stores the product data.
- **`middleware/`** — Contains the caching middleware for product retrieval endpoints.
- **`package.json`** — Defines project metadata, dependencies, and npm scripts.
- **`package-lock.json`** — Locks dependency versions for reproducible installations.
- **`output.mjs`** — An additional JavaScript module present in the repository.

## Prerequisites

Before running the project, install the following:

### 1. Node.js and npm

Install a supported Node.js version. **Node.js 18 or newer** is recommended for Express 5 compatibility.

Download Node.js from [nodejs.org](https://nodejs.org/).

npm is included with Node.js.

Verify your installation:

```bash
node --version
npm --version
```

### 2. Git

Git is required to clone the repository.

Download it from [git-scm.com](https://git-scm.com/).

Verify the installation:

```bash
git --version
```

### 3. API testing tool (optional)

You can test the endpoints using any of the following:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- `curl` from your terminal

## also Installation

### Step 1: Clone the repository

Open your terminal and run:

```bash
git clone https://github.com/AmanRajSharma001/ASD_WorkShop.git
```

### Step 2: Navigate to the project directory

```bash
cd ASD_WorkShop
```

**Important:** Run all subsequent commands from the directory containing `package.json` and `server.js`.

### Step 3: Install dependencies

```bash
npm install
```

This installs the dependencies declared in `package.json`, including:

- `express`
- `apipulse-express`
- `nodemon`
- `cjs-to-esm-converter`

You do not need to install Express or Nodemon globally.

### Step 4: Verify the project files

```bash
ls
```

Confirm that `server.js`, `package.json`, and the project directories are present.

Also verify that the product data file exists:

```bash
ls database
```

The directory should contain `db.json` and `productDatabase.js`.

## Running the Server

The main entry point is **`server.js`**, and the application listens on port **3000**.

### Option 1: Start using npm (recommended)

```bash
npm start
```

The `start` script runs:

```bash
nodemon server.js
```

Nodemon automatically restarts the server when it detects relevant file changes.

### Option 2: Start directly with Node.js

```bash
node server.js
```

This starts the server without Nodemon's automatic restart functionality.

### Expected terminal output

```text
Server Running on PORT:3000
```

Once the server is running, keep the terminal open while making API requests.

### Access the API

Open the following URL in your browser or API testing tool:

```text
http://localhost:3000/products
```

To retrieve a product by ID:

```text
http://localhost:3000/products/1
```

The product retrieval service includes a simulated delay of approximately 1.5 seconds before reading the JSON data.

### Stop the server

Press:

```text
Ctrl + C
```

in the terminal where the server is running.

## API Endpoints

All endpoints use the base URL:

```text
http://localhost:3000
```

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/products`     | Retrieve all products              |
| GET    | `/products/:id` | Retrieve a product by ID           |
| POST   | `/products`     | Create a product                   |
| PUT    | `/products/:id` | Replace a product's name and price |
| PATCH  | `/products/:id` | Update selected product fields     |
| DELETE | `/products/:id` | Delete a product                   |

### 1. Get all products

**Request**

```http
GET /products
```

Example using curl:

```bash
curl http://localhost:3000/products
```

**Success response:** `200 OK`

Returns an array of product objects.

### 2. Get a product by ID

**Request**

```http
GET /products/1
```

```bash
curl http://localhost:3000/products/1
```

**Success response:** `200 OK`

Example response:

```json
{
  "id": 1,
  "name": "Updated Keyboard",
  "price": 69.99
}
```

If the product does not exist, the API returns `404 Not Found`.

### 3. Create a product

**Request**

```http
POST /products
```

Example:

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":69.99}'
```

**Success response:** `201 Created`

Example response:

```json
{
  "id": 8,
  "name": "Keyboard",
  "price": 69.99
}
```

The generated ID depends on the current data in `db.json`.

### 4. Update a product using PUT

**Request**

```http
PUT /products/1
```

Example:

```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Mechanical Keyboard","price":89.99}'
```

**Success response:** `200 OK`

PUT updates the product's name and price using the submitted fields.

### 5. Partially update a product using PATCH

**Request**

```http
PATCH /products/1
```

Example:

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":79.99}'
```

**Success response:** `200 OK`

PATCH updates only the provided fields. In this example, the product's name remains unchanged.

### 6. Delete a product

**Request**

```http
DELETE /products/1
```

Example:

```bash
curl -X DELETE http://localhost:3000/products/1
```

**Success response:** `200 OK`

Returns the deleted product.

If the specified product does not exist, the API returns `404 Not Found`.

> **Note:** Creating, updating, and deleting products changes the local `database/db.json` file. Back up the file if you want to preserve your original sample data.

## Testing the API

### Using Postman

1. Start the server with `npm start`.
2. Open Postman and create a new HTTP request.
3. Enter a URL such as `http://localhost:3000/products`.
4. Select the appropriate HTTP method.
5. For POST, PUT, and PATCH requests, select **Body → raw → JSON**.
6. Send the request and inspect the response status and body.

### Quick test sequence

Try the following requests in order:

1. `GET /products` — inspect the initial product list.
2. `GET /products/1` — retrieve a specific product.
3. `POST /products` — create a product.
4. `PATCH /products/1` — change one field.
5. `PUT /products/1` — update the name and price.
6. `DELETE /products/1` — remove a product.

Use a test product ID when experimenting with DELETE so that you do not accidentally remove data you want to keep.

## Caching

The project applies `cacheMiddleware` to:

- `GET /products`
- `GET /products/:id`

The purpose of caching is to avoid repeating expensive work when the same resource is requested repeatedly.

The controller also calls `clearCache()` after successful product creation, updates, and deletion to help prevent stale responses.

The service layer simulates a 1.5-second delay before reading product data, making the effect of caching easier to investigate.

For implementation details, see:

- `middleware/cacheMiddleware.js`
- `routes/productRoutes.js`
- `services/productService.js`
- `controllers/productController.js`

The exact cache duration, cache key strategy, and response headers depend on the current implementation of the caching middleware.

## API Monitoring

The server integrates the `apiPulse` middleware from `apipulse-express`.

It is registered in `server.js`:

```javascript
const { apiPulse } = require("apipulse-express");

app.use(apiPulse);
```

This middleware can be used to monitor API request activity and performance according to the package's implementation.

For more information, visit the [apipulse-express npm package](https://www.npmjs.com/package/apipulse-express).

## How the Project Works

The application follows a layered architecture:

```text
Client / Postman
       |
       v
    server.js
       |
       v
 Product Routes
       |
       v
 Cache Middleware (GET requests)
       |
       v
 Product Controller
       |
       v
  Product Service
       |
       v
 Product Database
       |
       v
 database/db.json
```

### Request lifecycle

1. The client sends an HTTP request to the Express server.
2. `server.js` registers the API monitoring middleware and product routes.
3. The router matches the request to an endpoint.
4. GET requests pass through the caching middleware.
5. The controller handles request parameters, invokes the relevant service, and returns the HTTP response.
6. The service performs the required business operation.
7. The database module reads or writes product data in `db.json`.
8. The response is returned to the client.

This separation keeps HTTP handling, business logic, persistence, and middleware responsibilities independent.

## Data Storage

The project uses a JSON file rather than an external database.

The file is located at:

```text
database/db.json
```

A product has the following structure:

```json
{
  "id": 1,
  "name": "Keyboard",
  "price": 69.99
}
```

The database module uses Node.js's `fs/promises` API to read and write the file.

**Limitations:** JSON file storage is suitable for learning and small demonstrations, but it does not provide database transactions, concurrent-write protection, or the scalability of a dedicated database.

## Troubleshooting

### `npm: command not found`

Node.js and npm may not be installed or may not be available in your terminal's PATH.

Install Node.js and reopen your terminal, then verify:

```bash
node --version
npm --version
```

### `Cannot find module ...`

Make sure you are inside the project root and have installed the dependencies:

```bash
cd ASD_WorkShop
npm install
```

### `EADDRINUSE: address already in use :::3000`

Another process may already be using port 3000.

Stop the other server or update the port in `server.js` and restart the application.

### `Cannot find module './routes/productRoutes'`

Verify that the route file exists at:

```text
routes/productRoutes.js
```

Check the spelling and capitalization of the file and import path.

### `ENOENT` or JSON parsing errors

Verify that `database/db.json` exists and contains valid JSON.

You can validate the file with:

```bash
node -e "JSON.parse(require('fs').readFileSync('database/db.json', 'utf8')); console.log('Valid JSON')"
```

### Changes are not reflected in GET responses

Cached GET responses may still be returned. Check `middleware/cacheMiddleware.js` and confirm that the cache is cleared after successful write operations.

### Server does not restart automatically

If you started the application using `node server.js`, automatic restarting is not enabled. Use:

```bash
npm start
```

## Future Improvements

Potential extensions for this project include:

- Add request validation and consistent error-handling middleware.
- Improve cache expiration, invalidation, and observability.
- Add automated API tests.
- Replace JSON file storage with PostgreSQL or another database.
- Add structured logging and API documentation using Swagger/OpenAPI.
- Introduce environment-based configuration for the server port.
- Add pagination, filtering, and sorting to the product listing endpoint.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test the API.
4. Commit and push your changes.
5. Open a pull request.

## License

The project currently specifies the **ISC License** in `package.json`. Refer to the repository's license file, if present, for the applicable license terms.

---

**Repository:** [AmanRajSharma001/ASD_WorkShop](https://github.com/AmanRajSharma001/ASD_WorkShop)

**Main entry point:** `server.js`

**Local server:** `http://localhost:3000`

**Quick start:**

```bash
git clone https://github.com/AmanRajSharma001/ASD_WorkShop.git
cd ASD_WorkShop
npm install
npm start
```
