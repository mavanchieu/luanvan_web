const { ObjectId } = require("mongodb");
class SearchService {
  constructor(client) {
    this.Search = client.db().collection("search");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractSearchData(payload) {
    const search = {
      userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
      searchName: payload.searchName,
    };
    // Remove undefined fields
    Object.keys(search).forEach(
      (key) => search[key] === undefined && delete search[key]
    );
    return search;
  }

  async create(payload) {
    const search = this.extractSearchData(payload);
  
    const result = await this.Search.insertOne(search);
    return result;
  }

  async find(filter){
    const cursor = await this.Search.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

  async findByUserId(userId) {
    return await this.find({ userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null});
  }
  
  async deleteOne(id){
    const result = await this.Search.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async deleteAll(userId){
    const result = await this.Search.deleteMany({ userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null });
    return result;
  } 

  async update(id, payload){
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    };
    const update = this.extractSearchData(payload);
    const result = await this.Search.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result; 
  }
}

module.exports = SearchService;
