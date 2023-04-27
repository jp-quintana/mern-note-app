class MongooseClass {
  constructor(collection) {
    this.collection = this;
  }

  async fetchAll() {
    return await this.collection.find();
  }

  async fetchById(id) {
    return await this.collection.findById(id);
  }

  async create(obj) {
    return await this.collection.findById(obj);
  }

  async update(id, obj) {
    return await this.collection.findOneAndUpdate({ _id: id }, obj);
  }
}
