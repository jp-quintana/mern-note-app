import { getNoteContent, addNote } from '../services/noteService.js';

export const getNote = async (req, res, next) => {
  try {
    const noteContent = await getNoteContent();

    res.json(noteContent);
  } catch (err) {
    console.error(err.message);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const newNote = await addNote();

    res.json(newNote);
  } catch (err) {
    console.error(err.message);
  }
};
