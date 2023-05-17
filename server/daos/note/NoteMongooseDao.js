import MongooseClass from '../base/MongooseClass.js';
import Note from '../../models/Note.js';

import NoteListDao from '../noteList/index.js';
class NoteMongooseDao extends MongooseClass {
  constructor() {
    super(Note);
  }

  // TODO: use session
  async createNote(noteDetails) {
    const createdNote = await this.collection.create(noteDetails);

    await NoteListDao.addToList(createdNote.userId, createdNote._id);

    return createdNote;
  }

  async fetchNoteContentById(id) {
    return await this.collection.findById(id).select('content userId');
  }
}

export default NoteMongooseDao;
