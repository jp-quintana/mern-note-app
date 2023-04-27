import NoteDAO from '../daos/note/index.js';

export const getNoteContent = async () => {
  // TODO: Add User Data
  try {
    return await NoteDAO.create(newNote);
  } catch (err) {
    console.error(err.message);
  }
};

export const addNote = async () => {
  // TODO: Add User Data
  try {
    const newNote = { title: '', emoji: '', isFavorite: false };
    return await NoteDAO.create(newNote);
  } catch (err) {
    console.error(err.message);
  }
};
