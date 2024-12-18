const { ObjectId } = require("mongodb");
class GenderService {
  constructor(client) {
    this.Gender = client.db().collection("genders");
    this.Products = client.db().collection("products");
    this.TypeDetails = client.db().collection("typeDetails");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractGenderData(payload) {
    const gender = {
      name: payload.name,
      description: payload.description,
    };
    // Remove undefined fields
    Object.keys(gender).forEach(
      (key) => gender[key] === undefined && delete gender[key]
    );
    return gender;
  }

  async create(payload) {
    const gender = this.extractGenderData(payload);

    const result = await this.Gender.insertOne(gender);
    return result;
  }

  async find(filter) {
    const cursor = await this.Gender.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async deleteOne(id) {
    const cursor = await this.Products.findOne({
      genderId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor1 = await this.TypeDetails.findOne({
      genderId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (cursor != null || cursor1 != null) {
      return "Lỗi ràng buộc dữ liệu";
    }
    const result = await this.Gender.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractGenderData(payload);
    const result = await this.Gender.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }
}

module.exports = GenderService;
