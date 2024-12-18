const { ObjectId } = require("mongodb");
class LikeService {
  constructor(client) {
    this.Like = client.db().collection("like");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractLikeData(payload) {
    const like = {
        productId: ObjectId.isValid(payload.productId) ? new ObjectId(payload.productId) : null,
        userId:ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
        like: payload.like,
        dislike: payload.dislike,
    };
    // Remove undefined fields
    Object.keys(like).forEach(
      (key) => like[key] === undefined && delete like[key]
    );
    return like;
  }

  async create(payload) {
    const like = this.extractLikeData(payload);
  
    const result = await this.Like.insertOne(like);
    return result;
  }

  async find(filter){
    const cursor = await this.Like.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

  async deleteOne(id){
    const result = await this.Like.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async update(id, payload){
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    };
    const update = this.extractLikeData(payload);
    const result = await this.Like.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result; 
  }
}

module.exports = LikeService;
