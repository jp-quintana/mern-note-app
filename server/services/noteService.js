import NoteDao from '../daos/note/index.js';
import NoteListDao from '../daos/noteList/index.js';
import CustomError from '../models/CustomError.js';

const checkForExistingNoteAndPermission = async (userId, noteId) => {
  const existingNote = await NoteDao.fetchById(noteId);

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

  return notes;
};

export const getNoteContent = async (userId, noteId) => {
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
  console.log(NoteListDao);
  const newNote = {
    id: noteId,
    userId,
    title,
    emoji,
    content,
    isFavorite: false,
  };

  const createdNote = await NoteDao.create(newNote);

  console.log('createdNote', createdNote);
  await NoteListDao.addToList(userId, noteId);

  return;
};

export const saveChangesToNote = async (userId, noteId, noteDetails) => {
  await checkForExistingNoteAndPermission(userId, noteId);
  return await NoteDao.update(noteId, noteDetails);
};

export const duplicateNote = async ({
  userId,
  existingNoteId,
  newNoteId,
  noteDetails,
}) => {
  const { content } = await getNoteContent(userId, existingNoteId);
  return await addNote({
    userId,
    noteId: newNoteId,
    content,
    ...noteDetails,
  });
};

export const removeNote = async (userId, noteId) => {
  await checkForExistingNoteAndPermission(userId, noteId);

  const deletedNote = await NoteDao.delete(noteId);

  return deletedNote;
};
