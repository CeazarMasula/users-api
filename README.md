# Users API

## Getting Started

#### Prerequisites

- Node.js and npm should be installed on your machine. You can download them [here](https://nodejs.org/).

### How to run users API

1. Clone repository

   ```bash
   git clone https://github.com/CeazarMasula/users_api.git
   ```

2. Install Dependencies

   ```bash
    cd users_api
    npm install
   ```

3. Start the API server

   ```bash
   npm start
   ```

4. Once the server is started succesfully, you will see this notification on the terminal
   ```arduino
   Server running: http://localhost:3000
   ```

- Now the API is running, you can use the routes for performing operations in users

### Routes

- `POST /user` : Create a new user. The fields `username` and `password` are required.

  **Example URL:** http://localhost:3000/user/

  **Example Request Body:**

  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```

- `GET /users` : Retrieve all users.

  **Example URL:** http://localhost:3000/users/

- `GET /users/:id` : Retrieve a specific user by ID.

  **Example URL:** http://localhost:3000/user/id

- `POST /users/:id` : Update a specific user.

  **Example URL:** http://localhost:3000/user/update/id

  **Example Request Body:**

  ```json
  {
    "username": "updatedUsername",
    "password": "newPassword"
  }
  ```

- `POST /users/delete/:id` : Delete a specific user.

  **Example URL:** http://localhost:3000/user/id

### How to run tests

```bash
npm run test
```

## Route for phone combination question

- `GET /phone-combination/:input` : Retrieve result of phone combination.

  **Example URL:** http://localhost:3000/phone-combination/23

  ```

  ```
