import NoteMongooseDao from './NoteMongooseDao.js';

const daoOption = process.env.DAO_OPTION;

let NoteDAO;

switch (daoOption) {
  case 'MONGOOSE':
    NoteDAO = new NoteMongooseDao();
    break;
  case 'FIREBASE':
    break;
  default:
    NoteDAO = new NoteMongooseDao();
}

export default NoteDAO;
