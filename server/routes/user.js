import { Router } from 'express';

import {
  getUser,
  loginUser,
  createUser,
} from '../controllers/userController.js';

import { validateCreateUser } from '../middlewares/validation/user.js';

const router = Router();

router.get('/', getUser);
router.post('/login', loginUser);
router.post('/signup', validateCreateUser, createUser);

export default router;
