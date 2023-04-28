import {
  getNoteContent,
  addNote,
  saveChangesToNote,
  duplicateNote,
  removeNote,
} from '../services/noteService.js';

// TODO: Add User Data
export const getNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const noteContent = await getNoteContent(noteId);

    res.json(noteContent);
  } catch (err) {
    return next(err);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const newNote = await addNote();

    res.json(newNote);
  } catch (err) {
    return next(err);
  }
};

export const editNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    await saveChangesToNote(noteId, req.body);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};

export const createDuplicateNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const newNote = await duplicateNote(noteId);
    res.json(newNote);
  } catch (err) {
    return next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    await removeNote(noteId);
    res.json({ message: 'Success' });
  } catch (err) {
    return next(err);
  }
};
