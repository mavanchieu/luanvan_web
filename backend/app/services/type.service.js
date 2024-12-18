const { ObjectId } = require("mongodb");
class TypeService {
  constructor(client) {
    this.Type = client.db().collection("types");
    this.Products = client.db().collection("products");
    this.TypeDetails = client.db().collection("typeDetails");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractTypeData(payload) {
    const type = {
      name: payload.name,
      description: payload.description,
    };
    // Remove undefined fields
    Object.keys(type).forEach(
      (key) => type[key] === undefined && delete type[key]
    );
    return type;
  }

  async create(payload) {
    const type = this.extractTypeData(payload);

    const result = await this.Type.insertOne(type);
    return result;
  }

  async find(filter) {
    const cursor = await this.Type.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async deleteOne(id) {
    const cursor = await this.Products.findOne({
      typeId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor2 = await this.TypeDetails.findOne({
      typeId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (cursor != null || cursor2 != null) {
      return "Lỗi ràng buộc dữ liệu";
    }
    const result = await this.Type.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractTypeData(payload);
    const result = await this.Type.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }
}

module.exports = TypeService;
