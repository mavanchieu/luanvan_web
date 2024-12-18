const { ObjectId } = require("mongodb");
class DiscountCodeService {
  constructor(client) {
    this.DiscountCode = client.db().collection("discountCodes");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractDiscountCodeData(payload) {
    const discountCode = {
        code: payload.code,
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        discount: payload.discount,
        description: payload.description,
        price: payload.price,
    };
    // Remove undefined fields
    Object.keys(discountCode).forEach(
      (key) => discountCode[key] === undefined && delete discountCode[key]
    );
    return discountCode;
  }

  async create(payload) {
    const discountCode = this.extractDiscountCodeData(payload);
  
    const result = await this.DiscountCode.insertOne(discountCode);
    return result;
  }

  async find(filter){
    const cursor = await this.DiscountCode.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

  async deleteOne(id){
    const result = await this.DiscountCode.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async update(id, payload){
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    };
    const update = this.extractDiscountCodeData(payload);
    const result = await this.DiscountCode.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result; 
  }
}

module.exports = DiscountCodeService;
