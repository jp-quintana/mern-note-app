import { Router } from 'express';

import {
  getUser,
  loginUser,
  createUser,
} from '../controllers/userController.js';

import { checkAuth } from '../middlewares/checkAuth.js';
import {
  validateCreateUser,
  validateLoginUser,
} from '../middlewares/validation/user.js';

const router = Router();

router.get('/', checkAuth, getUser);
router.post('/login', validateLoginUser, loginUser);
router.post('/signup', validateCreateUser, createUser);

export default router;
