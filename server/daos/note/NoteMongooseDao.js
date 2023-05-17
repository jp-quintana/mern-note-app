import MongooseClass from '../base/MongooseClass.js';
import Note from '../../models/Note.js';

class NoteMongooseDao extends MongooseClass {
  constructor() {
    super(Note);
  }

  async fetchNoteContentById(id) {
    return await this.collection.findById(id).select('content userId');
  }
}

export default NoteMongooseDao;
