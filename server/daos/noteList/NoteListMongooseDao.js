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

  async addNoteToNormalList(userId, noteId) {
    return await this.collection.findOneAndUpdate(
      { userId },
      { $push: { normalListOrder: noteId } }
    );
  }

  async favoriteNote(userId, noteId) {
    const noteList = await this.collection.findOne({ userId }).populate({
      path: 'normalListOrder',
      select: 'id _id',
    });

    const { _id } = noteList.normalListOrder.find((note) => note.id === noteId);
    noteList.favoriteListOrder.push(_id);

    return await noteList.save();
  }

  async unfavoriteNote(userId, noteId) {
    const noteList = await this.collection.findOne({ userId }).populate({
      path: 'favoriteListOrder',
      select: 'id',
    });

    noteList.favoriteListOrder = noteList.favoriteListOrder.filter(
      (note) => note.id !== noteId
    );

    return await noteList.save();
  }

  async deleteNote(userId, noteId) {
    return await this.collection.findOneAndUpdate(
      { userId },
      { $pull: { normalListOrder: noteId, favoriteListOrder: noteId } }
    );
  }

  // async deleteFavoriteNote(userId, noteId) {
  //   return await this.collection.findOneAndUpdate(
  //     { userId },
  //     { $pull: { normalListOrder: noteId, favoriteListOrder: noteId } }
  //   );
  // }

  // async deleteNote(userId, noteId) {
  //   return await this.collection.findOneAndUpdate(
  //     { userId },
  //     { $pull: { normalListOrder: noteId } }
  //   );
  // }
}

export default NoteListMongooseDao;
