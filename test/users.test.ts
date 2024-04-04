import request from 'supertest';
import { faker } from '@faker-js/faker';

// Import the express app
import app from '../index';

describe('User Library API', () => {
  // Define new user, use faker to generate random data
  const newUser = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };

  test('POST /user creates a new user', async () => {
    // Send request
    const response = await request(app)
      .post('/user')
      .send({
        username: newUser.username,
        password: newUser.password
      })
      .set('Accept', 'application/json');

    // Check if the responses are correct and user is added
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', "User has been added");
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty("username", newUser.username)
    expect(response.body.user).toHaveProperty("password", newUser.password)
  });

  test('GET /users retrieves all users', async () => {
    // Send request
    const response = await request(app)
      .get('/users');

    // Check if the responses are correct
    expect(response.statusCode).toBe(200);
    // Check if the added user is in the result
    expect(response.body).toHaveProperty("users");
    expect(response.body.users[0]).toHaveProperty("username", newUser.username)
    expect(response.body.users[0]).toHaveProperty("password", newUser.password)
  });

  test('GET /user/:id retrieves single user', async () => {
    // Send request
    const users = await request(app)
      .get('/users');

    const userId = users.body.users[0].id;

    const response = await request(app)
      .get(`/user/${userId}`);

    // Check if the responses are correct
    expect(response.statusCode).toBe(200);
    // Check if the user is retrieved
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("username", newUser.username)
    expect(response.body).toHaveProperty("password", newUser.password)
  });

  test('GET /user/:nonexistentid retrieves non existent user', async () => {
    // Send request
    const response = await request(app)
      .get(`/user/randomid`);

    // Check if the responses are correct
    expect(response.statusCode).toBe(404);
    // Check if the user is in the result
    expect(response.body).toEqual({ message: `User doesn't exist.` });
  });

  test('POST /user/update/:id update single user', async () => {
    // Send request
    const users = await request(app)
      .get('/users');

    const userId = users.body.users[0].id;
    const updatedUsername = faker.internet.userName();

    const response = await request(app)
      .post(`/user/update/${userId}`)
      .send({
        username: updatedUsername,
      })
      .set('Accept', 'application/json');

    // Check if the responses are correct
    expect(response.statusCode).toBe(200);
    // Check if the user is updated
    expect(response.body).toHaveProperty("message", "User has been updated.");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("username", updatedUsername)
    expect(response.body.user).toHaveProperty("password", newUser.password)
  });

  test('POST /user/update/:nonexistentid update non existent user', async () => {
    // Send request
    const updatedUsername = faker.internet.userName();

    const response = await request(app)
      .post(`/user/update/randomid`)
      .send({
        username: updatedUsername,
      })
      .set('Accept', 'application/json');

    // Check if the responses are correct
    expect(response.statusCode).toBe(404);
    // Check if the user is in the result
    expect(response.body).toEqual({ message: `User doesn't exist.` });
  });

  test('POST /user/delete/:id delete single user', async () => {
    // Send request
    const users = await request(app)
      .get('/users');

    const userId = users.body.users[0].id;
    const updatedUsername = faker.internet.userName();

    const response = await request(app)
      .post(`/user/delete/${userId}`)
      .send({
        username: updatedUsername,
      })
      .set('Accept', 'application/json');

    // Check if the responses are correct
    expect(response.statusCode).toBe(200);
    // Check if the user is updated
    expect(response.body).toHaveProperty("message", "User has been deleted.");
  });

  test('POST /user/delete/:nonexistentid delete non existent user', async () => {
    // Send request
    const response = await request(app)
      .post(`/user/delete/randomid`)
      .set('Accept', 'application/json');

    // Check if the responses are correct
    expect(response.statusCode).toBe(404);
    // Check if the user is in the result
    expect(response.body).toEqual({ message: `User doesn't exist.` });
  });
});
