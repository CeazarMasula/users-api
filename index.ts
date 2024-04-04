import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './src/router';

const app = express();
const port = 3000;

// Enable CORS policy to prevent non-standard requests
app.use(cors());

// For parsing JSON request body
app.use(bodyParser.json());

const server = http.createServer(app)

// Start the server on port defined
server.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`)
})

app.use('/', router())