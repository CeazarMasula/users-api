import express from 'express';

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/users'

import validateRequest from '../middlewares/validate-request'

// Notes routes
export default (router: express.Router) => {
  router.get('/users', getUsers)
  router.post('/user', validateRequest, createUser)
  router.get('/user/:id', getUser)
  router.post('/user/update/:id', validateRequest, updateUser)
  router.post('/user/delete/:id', deleteUser)
}