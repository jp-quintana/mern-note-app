import NoteListMongooseDao from './NoteListMongooseDao.js';

const daoOption = process.env.DAO_OPTION;

let NoteListDao;

switch (daoOption) {
  case 'MONGOOSE':
    NoteListDao = new NoteListMongooseDao();
    break;
  case 'FIREBASE':
    break;
  default:
    NoteListDao = new NoteListMongooseDao();
}

export default NoteListDao;
