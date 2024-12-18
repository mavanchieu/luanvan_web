const { ObjectId } = require("mongodb");
class CartService {
  constructor(client) {
    this.Cart = client.db().collection("carts");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractCartData(payload) {
    const cart = {
        productId: ObjectId.isValid(payload.productId) ? new ObjectId(payload.productId) : null,
        // productName: payload.productName,
        colorItemId: ObjectId.isValid(payload.colorItemId) ? new ObjectId(payload.colorItemId) : null,
        // colorItemName: payload.colorItemName,
        sizeId: ObjectId.isValid(payload.sizeId) ? new ObjectId(payload.sizeId) : null,
        // sizeName: payload.sizeName,
        userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
        quantity: payload.quantity,
        // price: payload.price,
    };
    // Remove undefined fields
    Object.keys(cart).forEach(
      (key) => cart[key] === undefined && delete cart[key]
    );
    return cart;
  }

  async create(payload) {
    const cart = this.extractCartData(payload);
  
    const result = await this.Cart.insertOne(cart);
    return result;
  }

  async find(filter){
    const cursor = await this.Cart.find(filter).sort({_id: -1});
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
    const result = await this.Cart.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async deleteAll(userId){
    const result = await this.Cart.deleteMany({
      userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null, 
    });
    return result;
  } 

  async update(id, payload){
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    };
    const update = this.extractCartData(payload);

    Object.keys(update).forEach((key) => {
      if (update[key] === "" || update[key] === null) {
          delete update[key];
      }
    });
    const result = await this.Cart.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result; 
  }
}

module.exports = CartService;
