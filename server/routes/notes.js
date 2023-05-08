import { Router } from 'express';

import {
  getUserNotes,
  getNote,
  createNote,
  editNote,
  createDuplicateNote,
  deleteNote,
} from '../controllers/noteController.js';

import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.get('/', checkAuth, getUserNotes);
router.get('/:noteId', checkAuth, getNote);
router.post('/', checkAuth, createNote);
router.put('/:noteId', checkAuth, editNote);
router.put('/:noteId/favorite', checkAuth, editNote);
router.post('/:noteId/duplicate', checkAuth, createDuplicateNote);
router.delete('/:noteId', checkAuth, deleteNote);

export default router;
