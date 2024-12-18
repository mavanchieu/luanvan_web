const { ObjectId } = require("mongodb");
class FavoriteService {
  constructor(client) {
    this.Favorite = client.db().collection("favorites");
  }

  extractFavoriteData(payload) {
    const favorite = {
        userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
        productId: ObjectId.isValid(payload.productId) ? new ObjectId(payload.productId) : null,
        date: payload.date,
    };
    
    Object.keys(favorite).forEach(
      (key) => favorite[key] === undefined && delete favorite[key]
    );
    return favorite;
  }

  // Them favorite
  async create(payload) {
    const favorite = this.extractFavoriteData(payload);
    const result = await this.Favorite.insertOne(favorite);
    return result;
  }

  // Lấy danh sách borrow
  async find(filter){
    const cursor = await this.Favorite.find(filter);
    return await cursor.toArray();
  }

  async findByMdg(userId){
      return await this.find({
          userId: {$regex: new RegExp(userId)},
      });
  }

  async deleteOne(id){
    const result = await this.Favorite.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async deleteAll(userId){
    const result = await this.Favorite.deleteMany({
      userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null, 
    });
    return result;
  } 

  async findByUserId(userId) {
    return await this.find({ userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null});
  }

}
module.exports = FavoriteService;
