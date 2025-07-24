# Todo App – Full Stack Project

A simple full-stack **Todo application** with user login, CRUD functionality, and automated tests.

- **Backend**: Node.js with Express  
- **Frontend**: React with Vite  
- **Testing**: Jest (API), Playwright (UI)

---

## Project Structure

```

/project-root
│
├── backend/     # Express API
└── frontend/    # React application

````
---

## Features

### Backend (Express.js)
- RESTful API for managing todo items
- CORS support
- JSON parsing
- Automated tests using **Jest** and **Supertest**

### Frontend (React)
- User login screen (mock)
- Add, edit, delete, and view todos
- React Router for navigation
- API interaction using **axios**
- UI test coverage using **Playwright**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone "https://github.com/shruthy1494/testifytasks"
cd todo-app
````

---

## Backend Setup

### Navigate to the backend directory:

```bash
cd backend
```

### Install dependencies:

```bash
npm install
```

### Run the server:

```bash
npm start
```

By default, the backend runs on:
`http://localhost:3000`

### Run API Tests:

```bash
npm test
```

---

## Frontend Setup

### Navigate to the frontend directory:

```bash
cd ../frontend
```

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```

By default, the frontend runs on:
`http://localhost:3001`

### Run UI Tests:

```bash
npx playwright install
npm run test:ui
```

---

## Build Frontend for Production

```bash
npm run build
```

Serve the production build locally with:

```bash
npm run preview
```

---

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React, Vite, Axios          |
| Backend  | Node.js, Express            |
| Testing  | Jest, Supertest, Playwright |
| Routing  | React Router DOM            |

---

## Author

**Shruthy Sridharan**

