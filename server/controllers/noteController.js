import {
  getNoteContent,
  fetchUserNotes,
  addNote,
  saveChangesToNote,
  favoriteNote,
  unfavoriteNote,
  duplicateNote,
  removeNote,
} from '../services/noteService.js';

export const getNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const noteContent = await getNoteContent(req.user.id, noteId);

    res.json(noteContent);
  } catch (err) {
    return next(err);
  }
};

export const getUserNotes = async (req, res, next) => {
  try {
    const notes = await fetchUserNotes(req.user.id);
    res.json(notes);
  } catch (err) {
    return next(err);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { id } = req.body;

    const newNote = await addNote({ userId: req.user.id, noteId: id });

    res.json(newNote);
  } catch (err) {
    return next(err);
  }
};

export const editNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    await saveChangesToNote(req.user.id, noteId, req.body);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};

export const addNoteToFavorites = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    await favoriteNote(req.user.id, noteId);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};

export const removeNoteFromFavorites = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    await unfavoriteNote(req.user.id, noteId);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};

export const createDuplicateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { id: newNoteId, ...noteDetails } = req.body;

    const newNote = await duplicateNote({
      userId: req.user.id,
      existingNoteId: noteId,
      newNoteId,
      noteDetails,
    });

    res.json(newNote);
  } catch (err) {
    return next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    await removeNote(req.user.id, noteId);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};
