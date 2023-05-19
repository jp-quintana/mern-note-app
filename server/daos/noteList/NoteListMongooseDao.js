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
        select: 'id title emoji',
      })
      .populate({
        path: 'normalListOrder',
        select: '-content -userId',
      })
      .lean();
  }

  async addNoteToNormalList(userId, noteId) {
    return await this.collection.findOneAndUpdate(
      { userId },
      { $push: { normalListOrder: noteId } }
    );
  }

  async addDuplicateToNormalList({ userId, existingNoteId, noteId }) {
    const noteList = await this.collection.findOne({ userId }).populate({
      path: 'normalListOrder',
      select: 'id _id',
    });
    const updatedNormalListOrder = [...noteList.normalListOrder];

    const existingNoteIndex = noteList.normalListOrder.findIndex(
      (note) => note.id === existingNoteId
    );

    updatedNormalListOrder.splice(existingNoteIndex + 1, 0, noteId);

    noteList.normalListOrder = updatedNormalListOrder;

    noteList.save();
  }

  async favoriteNote(userId, noteId) {
    const noteList = await this.collection
      .findOne({ userId })
      .populate({
        path: 'normalListOrder',
        select: 'id _id',
      })
      .populate({
        path: 'favoriteListOrder',
        select: 'id',
      });

    const { _id } = noteList.normalListOrder.find((note) => note.id === noteId);

    if (!noteList.favoriteListOrder.find((note) => note.id === noteId)) {
      noteList.favoriteListOrder.push(_id);
    }

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

  async sortNormalList(userId, newOrder) {
    const noteList = await this.collection.findOne({ userId }).populate({
      path: 'normalListOrder',
      select: 'id',
    });

    const updatedList = newOrder.map((id) =>
      noteList.normalListOrder.find((note) => note.id === id)
    );

    noteList.normalListOrder = updatedList;

    await noteList.save();
  }

  async sortFavoriteList(userId, newOrder) {
    const noteList = await this.collection.findOne({ userId }).populate({
      path: 'favoriteListOrder',
      select: 'id',
    });

    const updatedList = newOrder.map((id) =>
      noteList.favoriteListOrder.find((note) => note.id === id)
    );
    noteList.favoriteListOrder = updatedList;

    await noteList.save();
  }
}

export default NoteListMongooseDao;
