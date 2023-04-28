import NoteDAO from '../daos/note/index.js';

// TODO: Update User Data
export const getNoteContent = async (noteId) => {
  try {
    return await NoteDAO.fetchNoteContentById(noteId);
  } catch (err) {
    console.error(err.message);
  }
};

// TODO: Update User Data
export const addNote = async (userId, content = '') => {
  try {
    const newNote = {
      userId: '1',
      title: '',
      emoji: '',
      content,
      isFavorite: false,
    };
    return await NoteDAO.create(newNote);
  } catch (err) {
    console.error(err.message);
  }
};

export const saveChangesToNote = async (noteId, obj) => {
  try {
    return await NoteDAO.update(noteId, obj);
  } catch (err) {
    console.error(err.message);
  }
};

// TODO: Update User Data
export const duplicateNote = async (noteId, userId) => {
  try {
    const { content } = await getNoteContent(noteId);
    return await addNote(userId, content);
  } catch (err) {
    console.error(err.message);
  }
};

export const removeNote = async (noteId) => {
  try {
    return await await NoteDAO.delete(noteId);
  } catch (err) {
    console.error(err.message);
  }
};
