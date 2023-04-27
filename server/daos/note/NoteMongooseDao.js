import MongooseClass from '../base/MongooseClass.js';
import Note from '../../models/Note.js';

class NoteMongooseDao extends MongooseClass {
  constructor() {
    super(Note);
  }
}

export default NoteMongooseDao;
