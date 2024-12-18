const { ObjectId } = require("mongodb");
class UsersDiscountCodeService {
  constructor(client) {
    this.UsersDiscountCode = client.db().collection("usersDiscountCode");
    this.DiscountCodes = client.db().collection("discountCodes");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractUsersDiscountCodeData(payload) {
    const usersDiscountCode = {
        userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
        discountCodeId: ObjectId.isValid(payload.discountCodeId) ? new ObjectId(payload.discountCodeId) : null,
        used: payload.used,
    };
    // Remove undefined fields
    Object.keys(usersDiscountCode).forEach(
      (key) => usersDiscountCode[key] === undefined && delete usersDiscountCode[key]
    );
    return usersDiscountCode;
  }

  async create(payload) {
    const usersDiscountCode = this.extractUsersDiscountCodeData(payload);
    const result = await this.UsersDiscountCode.insertOne(usersDiscountCode);
    return result;
  }

  async findDiscountByUserId(userId) {
    return await this.find({ userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null});
  }

  async update(id) {
    const result = await this.UsersDiscountCode.updateOne(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null},
      [
        { $set: { used: { $not: "$used" } } } // Đảo giá trị của "used"
      ]
    );
    return result;
  }

  async find(filter){
    const cursor = await this.UsersDiscountCode.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

//   async findByName(name){
//       return await this.find({
//           name: {$regex: new RegExp(name), $options: "i",},
//       });
//   }

//   async deleteOne(id){
//     const result = await this.UsersDiscountCode.findOneAndDelete({
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
//     });
//     return result;
//   } 

//   async update(id, payload){
//     const filter = {
//         _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
//     };
//     const update = this.extractUsersDiscountCodeData(payload);
//     const result = await this.UsersDiscountCode.findOneAndUpdate(
//         filter,
//         { $set: update },
//         { returnDocument: "after" }
//     );
//     return result; 
//   }
 }

module.exports = UsersDiscountCodeService;
