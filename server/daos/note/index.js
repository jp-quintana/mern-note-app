import NoteMongooseDao from './NoteMongooseDao.js';

const daoOption = process.env.DAO_OPTION;

let NoteDao;

switch (daoOption) {
  case 'MONGOOSE':
    NoteDao = new NoteMongooseDao();
    break;
  case 'FIREBASE':
    break;
  default:
    NoteDao = new NoteMongooseDao();
}

export default NoteDao;
