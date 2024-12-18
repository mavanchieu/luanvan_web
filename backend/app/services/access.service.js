const { ObjectId } = require("mongodb");
class AccessService {
  constructor(client) {
    this.Access = client.db().collection("access");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractAccessData(payload) {
    const access = {
        userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
        date: payload.date,
    };
    // Remove undefined fields
    Object.keys(access).forEach(
      (key) => access[key] === undefined && delete access[key]
    );
    return access;
  }

  async create(payload) {
    const access = this.extractAccessData(payload);
  
    const result = await this.Access.insertOne(access);
    return result;
  }

  async find(filter){
    const cursor = await this.Access.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

//   async deleteOne(id){
//     const result = await this.Access.findOneAndDelete({
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
//     });
//     return result;
//   } 

//   async update(id, payload){
//     const filter = {
//         _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
//     };
//     const update = this.extractAccessData(payload);
//     const result = await this.Access.findOneAndUpdate(
//         filter,
//         { $set: update },
//         { returnDocument: "after" }
//     );
//     return result; 
//   }
}

module.exports = AccessService;
