import mongoose from 'mongoose';
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
      { userId: new mongoose.Types.ObjectId(userId) },
      { $push: { normalListOrder: new mongoose.Types.ObjectId(noteId) } }
    );
  }
}

export default NoteListMongooseDao;
