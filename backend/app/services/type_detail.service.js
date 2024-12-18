const { ObjectId } = require("mongodb");
class TypeDetailService {
  constructor(client) {
    this.TypeDetail = client.db().collection("typeDetails");
    this.Types = client.db().collection("types");
    this.Products = client.db().collection("products");
  }
  extractTypeDetailData(payload) {
    const type_detail = {
      typeId: ObjectId.isValid(payload.typeId)
        ? new ObjectId(payload.typeId)
        : null,
      genderId: ObjectId.isValid(payload.genderId)
        ? new ObjectId(payload.genderId)
        : null,
      name: payload.name,
      description: payload.description,
    };

    // Remove fields that are not set
    Object.keys(type_detail).forEach((key) =>
      type_detail[key] === undefined || type_detail[key] === null
        ? delete type_detail[key]
        : null
    );

    return type_detail;
  }

  async create(payload) {
    const type_detail = this.extractTypeDetailData(payload);

    const result = await this.TypeDetail.insertOne(type_detail);
    return result;
  }

  async find(filter) {
    const cursor = await this.TypeDetail.find(filter).sort({ name: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async deleteOne(id) {
    console.log(id);
    const cursor = await this.Products.findOne({
      typeDetailsId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (cursor != null) {
      return "Lỗi ràng buộc dữ liệu";
    }
    const result = await this.TypeDetail.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async deleteAll(userId) {
    const result = await this.TypeDetail.deleteMany({ userId: userId });
    return result;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractTypeDetailData(payload);
    const result = await this.TypeDetail.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }
}

module.exports = TypeDetailService;
