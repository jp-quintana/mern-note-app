import MongooseClass from '../base/MongooseClass.js';
import NoteList from '../../models/NoteList.js';

class NoteListMongooseDao extends MongooseClass {
  constructor() {
    super(NoteList);
  }

  async fetchUserNotes(userId) {
    return await this.collection
      .findOne({ userId })
      .populate({
        path: 'favoriteListOrder',
        select: 'title',
      })
      .populate({
        path: 'normalListOrder',
        select: '-content',
      });
  }

  async addToList(userId, noteId) {
    return await this.collection.findOneAndUpdate(
      { userId },
      { $push: { normalListOrder: noteId } }
    );
  }
}

export default NoteListMongooseDao;
