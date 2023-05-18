import MongooseClass from '../base/MongooseClass.js';
import Note from '../../models/Note.js';

import NoteListDao from '../noteList/index.js';
class NoteMongooseDao extends MongooseClass {
  constructor() {
    super(Note);
  }

  // TODO: use session or cascading middleware
  async createNote(noteDetails) {
    const createdNote = await this.collection.create(noteDetails);

    await NoteListDao.addNoteToNormalList(createdNote.userId, createdNote._id);

    return createdNote;
  }

  async fetchNoteContentById(id) {
    return await this.collection.findOne({ id }).select('content userId');
  }

  // TODO: use session or cascading middleware
  async deleteNote(noteId, isFavorite) {
    const _id = await this.collection.findOneAndDelete({ id: noteId });

    console.log(_id);
  }
}

export default NoteMongooseDao;
