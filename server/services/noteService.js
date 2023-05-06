import NoteDao from '../daos/note/index.js';
import CustomError from '../models/CustomError.js';

const checkForExistingNoteAndPermission = async (userId, noteId) => {
  const existingNote = await NoteDao.fetchById(noteId);

  if (!existingNote) {
    throw new CustomError('', 404);
  }

  if (existingNote.userId.toString() !== userId) {
    throw new CustomError('Not authorized to access this resource', 403);
  }

  return existingNote;
};

export const getNoteContent = async (userId, noteId) => {
  const note = await NoteDao.fetchNoteContentById(noteId);

  if (!note) {
    throw new CustomError('A note with that id does not exist', 404);
  }

  if (note.userId.toString() !== userId) {
    throw new CustomError('Not authorized to access this resource', 403);
  }

  return { content: note.content };
};

export const fetchUserNotes = async (userId) => {
  const notes = await NoteDao.fetchUserNotes(userId);

  // if (!note) {
  //   throw new CustomError('A note with that id does not exist', 404);
  // }

  // if (note.userId.toString() !== userId) {
  //   throw new CustomError('Not authorized to access this resource', 403);
  // }

  return notes;
};

export const addNote = async (userId, noteId, content = '') => {
  const newNote = {
    id: noteId,
    userId,
    title: '',
    emoji: '',
    content,
    isFavorite: false,
  };

  return await NoteDao.create(newNote);
};

export const saveChangesToNote = async (userId, noteId, noteDetails) => {
  await checkForExistingNoteAndPermission(userId, noteId);
  return await NoteDao.update(noteId, noteDetails);
};

export const duplicateNote = async (userId, noteId) => {
  const { content } = await getNoteContent(userId, noteId);
  return await addNote(userId, content);
};

export const removeNote = async (userId, noteId) => {
  await checkForExistingNoteAndPermission(userId, noteId);

  const deletedNote = await NoteDao.delete(noteId);

  return deletedNote;
};
