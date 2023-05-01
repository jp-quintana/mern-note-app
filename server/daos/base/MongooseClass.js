class MongooseClass {
  constructor(collection) {
    this.collection = collection;
  }

  async fetchAll() {
    return await this.collection.find();
  }

  async fetchById(id) {
    return await this.collection.findById(id).select('-password');
  }

  async create(obj) {
    return await this.collection.create(obj);
  }

  async update(id, obj) {
    return await this.collection.findOneAndUpdate({ _id: id }, obj);
  }

  async delete(id) {
    return await this.collection.findByIdAndRemove(id);
  }
}

export default MongooseClass;
