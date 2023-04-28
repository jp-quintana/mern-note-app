import NoteDAO from '../daos/note/index.js';

// TODO: Update User Data
export const getNoteContent = async (id) => {
  try {
    return await NoteDAO.fetchNoteContentById(id);
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

export const eliminateNote = async (noteId, userId) => {
  try {
    const { content } = await getNoteContent(noteId);
    return await addNote(userId, content);
  } catch (err) {
    console.error(err.message);
  }
};
