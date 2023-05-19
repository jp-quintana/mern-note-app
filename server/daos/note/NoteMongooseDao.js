import MongooseClass from '../base/MongooseClass.js';
import Note from '../../models/Note.js';

import NoteListDao from '../noteList/index.js';
class NoteMongooseDao extends MongooseClass {
  constructor() {
    super(Note);
  }

  async fetchNoteById(id) {
    return await this.collection.findOne({ id });
  }

  async fetchNoteContentById(id) {
    return await this.collection.findOne({ id }).select('content userId');
  }

  // TODO: use session or cascading middleware
  async createNote(noteDetails) {
    const createdNote = await this.collection.create(noteDetails);

    await NoteListDao.addNoteToNormalList(createdNote.userId, createdNote._id);

    return createdNote;
  }

  async createDuplicate({ existingNoteId, ...noteDetails }) {
    const createdNote = await this.collection.create(noteDetails);

    await NoteListDao.addDuplicateToNormalList({
      userId: createdNote.userId,
      existingNoteId,
      noteId: createdNote._id,
    });

    return createdNote;
  }

  async updateNote(id, obj) {
    return await this.collection.findOneAndUpdate({ id }, obj);
  }

  // TODO: use session or cascading middleware
  async deleteNote(userId, noteId) {
    const { _id } = await this.collection.findOneAndDelete({ id: noteId });

    await NoteListDao.deleteNote(userId, _id);
  }
}

export default NoteMongooseDao;
