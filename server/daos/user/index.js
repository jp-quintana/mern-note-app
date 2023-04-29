import UserMongooseDao from './UserMongooseDao.js';

const daoOption = process.env.DAO_OPTION;

let UserDao;

switch (daoOption) {
  case 'MONGOOSE':
    UserDao = new UserMongooseDao();
    break;
  case 'FIREBASE':
    break;
  default:
    UserDao = new UserMongooseDao();
}

export default UserDao;
