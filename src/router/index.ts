import express from 'express';

// To be able to add more routes in the future
import userRouter from './user-routes';

const router = express.Router();

export default (): express.Router => {
  userRouter(router);

  return router;
}