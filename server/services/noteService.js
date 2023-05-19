import NoteDao from '../daos/note/index.js';
import NoteListDao from '../daos/noteList/index.js';
import CustomError from '../models/CustomError.js';

const checkForExistingNoteAndPermission = async (userId, noteId) => {
  const existingNote = await NoteDao.fetchNoteById(noteId);

  if (!existingNote) {
    throw new CustomError('A note with that id does not exist.', 404);
  }

  if (existingNote.userId.toString() !== userId) {
    throw new CustomError('Not authorized to access this resource.', 403);
  }

  return existingNote;
};

export const fetchUserNotes = async (userId) => {
  const notes = await NoteListDao.fetchUserNotes(userId);

  for (let i = 0; i < notes.normalListOrder.length; i++) {
    notes.normalListOrder[i].isFavorite = notes.favoriteListOrder.some(
      (favoriteNote) => favoriteNote.id === notes.normalListOrder[i].id
    );
  }

  return notes;
};

export const fetchNoteContent = async (userId, noteId) => {
  const note = await NoteDao.fetchNoteContentById(noteId);

  if (!note) {
    throw new CustomError('A note with that id does not exist.', 404);
  }

  if (note.userId.toString() !== userId) {
    throw new CustomError('Not authorized to access this resource.', 403);
  }

  return { content: note.content };
};

export const addNote = async ({
  userId,
  noteId,
  title = '',
  emoji = '',
  content = '',
}) => {
  const newNote = {
    id: noteId,
    userId,
    title,
    emoji,
    content,
    // isFavorite: false,
  };

  return await NoteDao.createNote(newNote);
};

export const duplicateNote = async ({
  userId,
  existingNoteId,
  newNoteId,
  noteDetails,
}) => {
  const { content } = await fetchNoteContent(userId, existingNoteId);

  return await NoteDao.createDuplicate({
    existingNoteId,
    userId,
    id: newNoteId,
    content,
    ...noteDetails,
  });
};

export const saveChangesToNote = async (userId, noteId, noteDetails) => {
  await checkForExistingNoteAndPermission(userId, noteId);
  return await NoteDao.updateNote(noteId, noteDetails);
};

export const favoriteNote = async (userId, noteId) => {
  return await NoteListDao.favoriteNote(userId, noteId);
};

export const unfavoriteNote = async (userId, noteId) => {
  return await NoteListDao.unfavoriteNote(userId, noteId);
};

export const removeNote = async (userId, noteId) => {
  await checkForExistingNoteAndPermission(userId, noteId);

  const deletedNote = await NoteDao.deleteNote(userId, noteId);

  return deletedNote;
};

export const sortNormalList = async (userId, newOrder) => {
  await NoteListDao.sortNormalList(userId, newOrder);
};

export const sortFavoriteList = async (userId, newOrder) => {
  await NoteListDao.sortFavoriteList(userId, newOrder);
};
