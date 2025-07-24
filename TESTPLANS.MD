# Testify tasks - Test Plans

### 1. What is being tested

* **UI Functional Tests**
  Validate the user interface and user experience of the Todo app:

  * Login functionality (valid, invalid, and empty credentials)
  * Todo CRUD operations (create, edit, cancel edit, delete)
  * UI behavior (error messages, redirect on login, input trimming, cancel edit restoring original value)
* **API Integration Tests**
  Validate the backend REST API endpoints for:

  * Authentication (`POST /login`)
  * Todos CRUD (`GET /todos`, `POST /todos`, `PUT /todos/:id`, `DELETE /todos/:id`)

---

### 2. Test Coverage Areas

| Area               | Coverage Description                                  | Covered by     |
| ------------------ | ----------------------------------------------------- | -------------- |
| **Authentication** | Valid and invalid login attempts, error handling      | UI + API tests |
| **Todo Creation**  | Adding new todos, input trimming                      | UI + API tests |
| **Todo Editing**   | Updating todo text, canceling edits restores original | UI tests       |
| **Todo Deletion**  | Deleting todos and verifying removal                  | UI + API tests |
| **Error Handling** | Displaying error messages for login and invalid data  | UI + API tests |
| **API Edge Cases** | Missing fields, non-existent IDs                      | API tests      |
| **UI Elements**    | Presence and visibility of key UI components          | UI tests       |

---

### 3. Tools Used and Why

| Tool           | Purpose                              | Reason for Choice                                                                                                          |
| -------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Playwright** | UI end-to-end testing                | Cross-browser support, powerful selectors, easy async handling, supports headless & headed runs, stable for UI flow tests. |
| **Jest**       | JavaScript testing framework for API | Familiar syntax, built-in assertions, good integration with Node.js projects.                                              |
| **Supertest**  | HTTP assertions for API endpoints    | Simplifies testing REST APIs, integrates with Jest smoothly.                                                               |

---

### 4. How to Run the Tests

* **UI Tests (Playwright):**

  1. Start the Todo app locally at `http://localhost:3000`
  2. Run:

     ```bash
     npm run test:ui
     ```
  3. Tests will automatically launch a browser, run the scenarios, and report results.

* **API Tests (Jest + Supertest):**

  1. Ensure the backend server is running and accessible.
  2. Run:

     ```bash
     npm run test
     ```
  3. Jest will execute the API tests and output pass/fail summary.

---

### 5. Assumptions and Limitations

* The backend server is assumed to be running locally and reachable at default ports.
* The UI tests assume the app uses placeholders and test IDs as defined (`Username`, `Password`, `new-todo-input`, etc).
* User credentials used in tests (`testuser` / `test123`) must exist in the backend database or mocked environment.
* Tests are not currently covering:

  * Authentication token expiry or refresh flows.
  * Performance or load testing.
* API tests assumes a clean or consistent state, race conditions or parallel test runs may cause conflicts if tests are run concurrently.
* Security testing (e.g., injection, XSS) is outside the scope of this test plan.

