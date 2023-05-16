import NoteListMongooseDao from './NoteListMongooseDao.js';

const daoOption = process.env.DAO_OPTION;

let NoteDao;

switch (daoOption) {
  case 'MONGOOSE':
    NoteDao = new NoteListMongooseDao();
    break;
  case 'FIREBASE':
    break;
  default:
    NoteDao = new NoteListMongooseDao();
}

export default NoteDao;
