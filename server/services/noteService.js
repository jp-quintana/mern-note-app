import NoteDAO from '../daos/note/index.js';
import CustomError from '../models/CustomError.js';

// TODO: Update User Data
export const getNoteContent = async (noteId) => {
  const noteContent = await NoteDAO.fetchNoteContentById(noteId);

  if (!noteContent) {
    throw new CustomError('A note with that id does not exist', 404);
  }

  return noteContent;
};

// TODO: Update User Data
export const addNote = async (userId, content = '') => {
  const newNote = {
    userId: '1',
    title: '',
    emoji: '',
    content,
    isFavorite: false,
  };

  return await NoteDAO.create(newNote);
};

export const saveChangesToNote = async (noteId, obj) => {
  const updatedNote = await NoteDAO.update(noteId, obj);

  if (!updatedNote) {
    throw new CustomError('A note with that id does not exist', 404);
  }

  return updatedNote;
};

// TODO: Update User Data
export const duplicateNote = async (noteId, userId) => {
  const { content } = await getNoteContent(noteId);
  return await addNote(userId, content);
};

export const removeNote = async (noteId) => {
  const deletedNote = await NoteDAO.delete(noteId);

  if (!deletedNote) {
    throw new CustomError('A note with that id does not exist', 404);
  }

  return deletedNote;
};
