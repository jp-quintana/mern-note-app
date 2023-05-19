import { Router } from 'express';

import {
  getUserNotes,
  getNote,
  createNote,
  editNote,
  addNoteToFavorites,
  removeNoteFromFavorites,
  createDuplicateNote,
  deleteNote,
  reorderNormalList,
  reorderFavoriteList,
} from '../controllers/noteController.js';

import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.get('/', checkAuth, getUserNotes);
router.get('/:noteId', checkAuth, getNote);
router.put('/sortNormalList', checkAuth, reorderNormalList);
router.put('/sortFavoriteList', checkAuth, reorderFavoriteList);
router.put('/:noteId', checkAuth, editNote);
router.put('/:noteId/favorite', checkAuth, addNoteToFavorites);
router.put('/:noteId/unfavorite', checkAuth, removeNoteFromFavorites);
router.post('/', checkAuth, createNote);
router.post('/:noteId/duplicate', checkAuth, createDuplicateNote);
router.delete('/:noteId', checkAuth, deleteNote);

export default router;
