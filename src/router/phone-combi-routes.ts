import express from 'express';

import {
  phoneCombinations
} from '../controllers/phone-combi'

// Notes routes
export default (router: express.Router) => {
  router.get('/phone-combination/:input', phoneCombinations)
}