import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './src/router';

const app = express();
const port = 3000;

// Enable CORS policy
app.use(cors());

// For parsing JSON request body
app.use(bodyParser.json());

app.use('/', router())

// Export the app for testing purposes
export default app;

if (process.env.NODE_ENV !== 'test') {
  // Start the server on port defined when not on test env
  app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`)
  });
}