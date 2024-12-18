const { ObjectId } = require("mongodb");
class ViewedProductsService {
  constructor(client) {
    this.ViewedProducts = client.db().collection("viewedProducts");
  }

  extractViewedProductsData(payload) {
    const viewedProducts = {
        userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
        productId: ObjectId.isValid(payload.productId) ? new ObjectId(payload.productId) : null,
        date: payload.date,
    };
    
    Object.keys(viewedProducts).forEach(
      (key) => viewedProducts[key] === undefined && delete viewedProducts[key]
    );
    return viewedProducts;
  }

  // Them viewedProducts
  async create(payload) {
    // Lấy dữ liệu về sản phẩm đã xem từ payload
    const viewedProducts = this.extractViewedProductsData(payload);

    // Lấy tất cả các sản phẩm đã xem hiện tại, sắp xếp theo thời gian (tăng dần, sản phẩm cũ nhất ở đầu)
    const existingViewedProducts = await this.ViewedProducts.find().sort({ createdAt: -1 }).toArray();

    // Kiểm tra xem số lượng sản phẩm đã xem có lớn hơn 5 không
    if (existingViewedProducts.length >= 5) {
        // Xóa sản phẩm cũ nhất (theo thời gian)
        const oldestProduct = existingViewedProducts[0]; // Sản phẩm cũ nhất (theo `createdAt`)

        // Xóa sản phẩm cũ nhất khỏi cơ sở dữ liệu
        await this.ViewedProducts.deleteOne({ _id: oldestProduct._id });
    }

    // Thêm sản phẩm mới vào cơ sở dữ liệu
    const result = await this.ViewedProducts.insertOne(viewedProducts);
    return result;
}
  // Lấy danh sách borrow
  async find(filter){
    const cursor = await this.ViewedProducts.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByMdg(userId){
      return await this.find({
          userId: {$regex: new RegExp(userId)},
      });
  }

  // lấy tất cả các dữ liệu của người dùng thông qua userId
  async findByUserId(userId) {
    return await this.find({ 
        userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null 
    });;  // Sắp xếp giảm dần theo trường `date`
  }


  async deleteOne(id){
    const result = await this.ViewedProducts.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async deleteAll(userId){
    const result = await this.ViewedProducts.deleteMany({
      userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null, 
    });
    return result;
  } 

}
module.exports = ViewedProductsService;
