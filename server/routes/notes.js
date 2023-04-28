import { Router } from 'express';

import {
  getNote,
  createNote,
  editNote,
  createDuplicateNote,
  deleteNote,
} from '../controllers/noteController.js';

const router = Router();

router.get('/:noteId', getNote);
router.post('/', createNote);
router.put('/:noteId', editNote);
router.put('/:noteId/favorite', editNote);
router.post('/:noteId/duplicate', createDuplicateNote);
router.delete('/:noteId', deleteNote);

export default router;
