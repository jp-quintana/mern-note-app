import NoteDao from '../daos/note/index.js';
import CustomError from '../models/CustomError.js';

// TODO: Update User Data
export const getNoteContent = async (noteId) => {
  const noteContent = await NoteDao.fetchNoteContentById(noteId);

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

  return await NoteDao.create(newNote);
};

export const saveChangesToNote = async (noteId, noteDetails) => {
  const updatedNote = await NoteDao.update(noteId, noteDetails);

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
  const deletedNote = await NoteDao.delete(noteId);

  if (!deletedNote) {
    throw new CustomError('A note with that id does not exist', 404);
  }

  return deletedNote;
};
