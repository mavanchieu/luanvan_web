const { ObjectId } = require("mongodb");
class BrandService {
  constructor(client) {
    this.Brand = client.db().collection("brands");
    this.Products = client.db().collection("products");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractBrandData(payload) {
    const brand = {
      name: payload.name,
      description: payload.description,
    };
    // Remove undefined fields
    Object.keys(brand).forEach(
      (key) => brand[key] === undefined && delete brand[key]
    );
    return brand;
  }

  async create(payload) {
    const brand = this.extractBrandData(payload);

    const result = await this.Brand.insertOne(brand);
    return result;
  }

  async find(filter) {
    const cursor = await this.Brand.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async deleteOne(id) {
    const cursor = await this.Products.findOne({
      brandId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (cursor != null) {
      return "Lỗi ràng buộc dữ liệu";
    }
    const result = await this.Brand.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractBrandData(payload);
    const result = await this.Brand.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }
}

module.exports = BrandService;
