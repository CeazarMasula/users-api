import express from 'express';

// To be able to add more routes in the future
import userRouter from './user-routes';
import phoneCombiRouter from './phone-combi-routes';

const router = express.Router();

export default (): express.Router => {
  userRouter(router);
  phoneCombiRouter(router)

  return router;
}