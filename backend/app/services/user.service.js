const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs-extra");
class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
    this.Cart = client.db().collection("carts");
    this.Favorite = client.db().collection("favorites");
    this.ViewedProducts = client.db().collection("viewedProducts");
    this.Help = client.db().collection("helps");
    this.Evaluation = client.db().collection("evaluations");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractUserData(payload) {
    const user = {
      fullname: payload.fullname ? payload.fullname : "",
      username: payload.username ? payload.username : "",
      password: payload.password ? payload.password : "",
      address: payload.address ? payload.address : "",
      phone: payload.phone ? payload.phone : "",
      gender: payload.gender ? payload.gender : "",
      birth: payload.birth ? payload.birth : "",
      email: payload.email ? payload.email : "",
      role: payload.role || "client",
      image: payload.image ? payload.image : "",
      date: payload.date ? payload.date : "",
    };
    // Remove undefined fields
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async create(payload) {
    const user = this.extractUserData(payload);

    const result = await this.User.insertOne(user);
    return result;
  }

  async find(filter) {
    const cursor = await this.User.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findOne(filter) {
    return await this.User.findOne(filter);
  }

  async findById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractUserData(payload);

    // duyệt qua các trường bị null hoặc chuỗi rỗng
    Object.keys(update).forEach((key) => {
      if (update[key] === "" || update[key] === null) {
        delete update[key];
      }
    });

    const result = await this.User.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async updateImage(userId, image) {
    const existing = await this.User.findOne({
      _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
    });

    if (existing.image === "") {
      const result = await this.User.updateOne(
        { _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null },
        { $set: { image: image } }
      );
      return result;
    } else {
      const newFile = existing.image.split("\\")[1];
      // const filePath = path.join(__dirname, 'imageUsers',newFile); // Đường dẫn đến thư mục chứa ảnh
      const filePath = path.join(process.cwd(), "imageUsers", newFile);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("Xóa ảnh trên server thành công");
      });
      const result1 = await this.User.updateOne(
        { _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null },
        { $set: { image: image } }
      );
      return result1;
    }
  }

  async deleteOne(id) {
    const cursor = await this.Cart.findOne({
      userId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor1 = await this.Favorite.findOne({
      userId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor2 = await this.ViewedProducts.findOne({
      userId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor3 = await this.Help.findOne({
      userId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor4 = await this.Evaluation.findOne({
      userId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (
      cursor != null ||
      cursor1 != null ||
      cursor2 != null ||
      cursor3 != null ||
      cursor4 != null
    ) {
      return "Lỗi ràng buộc dữ liệu";
    }
    const result = await this.User.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }
}
module.exports = UserService;
