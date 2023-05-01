import MongooseClass from '../base/MongooseClass.js';
import Note from '../../models/Note.js';

class NoteMongooseDao extends MongooseClass {
  constructor() {
    super(Note);
  }

  async fetchNoteContentById(id) {
    return await this.collection.findById(id).select('content userId');
  }

  async fetchNotesByUserId(userId) {
    // return await this.collection.findById(id).select('content');
  }
}

export default NoteMongooseDao;
