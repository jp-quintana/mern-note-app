import MongooseClass from '../base/MongooseClass.js';
import User from '../../models/User.js';

class UserMongooseDao extends MongooseClass {
  constructor() {
    super(User);
  }
}

export default UserMongooseDao;
