const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs-extra");
class ColorItemService {
  constructor(client) {
    this.ColorItem = client.db().collection("colorItems");
    this.Carts = client.db().collection("carts");
    this.Order = client.db().collection("orders");
  }

  async create(payload) {
    console.log("Payload received in create:", payload);

    const colorItem = {
      productId: ObjectId.isValid(payload.productId)
        ? new ObjectId(payload.productId)
        : null,
      name: payload.name,
      color: payload.color,
      price: payload.price,
      images: payload.images || [],
      sizes: payload.sizes || [],
    };

    const result = await this.ColorItem.insertOne(colorItem);
    return result;
  }

  async findAll() {
    return await this.ColorItem.find({}).toArray();
  }

  async find(filter) {
    const cursor = await this.ColorItem.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async updateQuantity(colorItemId, sizeId, quantity) {
    const result = await this.ColorItem.updateOne(
      {
        _id: ObjectId.isValid(colorItemId) ? new ObjectId(colorItemId) : null,
        "sizes._id": ObjectId.isValid(sizeId) ? new ObjectId(sizeId) : null,
      },
      { $inc: { "sizes.$.quantity": -quantity } }
    );
    return result;
  }

  async updateInscreaseQuantity(colorItemId, sizeId, quantity) {
    const result = await this.ColorItem.updateOne(
      {
        _id: ObjectId.isValid(colorItemId) ? new ObjectId(colorItemId) : null,
        "sizes._id": ObjectId.isValid(sizeId) ? new ObjectId(sizeId) : null,
      },
      { $inc: { "sizes.$.quantity": +quantity } }
    );
    return result;
  }

  async update(id, payload) {
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        (Array.isArray(payload[key]) && payload[key].length === 0)
      ) {
        delete payload[key];
      }
    });

    const existing = await this.ColorItem.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (payload.images && payload.images.length != 0) {
      // Nếu có ảnh mới trong payload, thực hiện xóa ảnh cũ
      if (existing.images.length != 0) {
        for (const image of existing.images) {
          const newFile = image.split("\\")[1];
          const filePath = path.join(process.cwd(), "uploads", newFile);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Xóa ảnh trên server thành công: " + newFile);
            }
          });
        }
      }
    }
    const result = await this.ColorItem.findOneAndUpdate(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: payload },
      { returnDocument: "after" }
    );

    return result;
  }

  async deleteOne(id) {
    const cursor = await this.Carts.findOne({
      colorItemId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor2 = await this.Order.findOne({
      "products.colorItemId": ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (cursor != null || cursor2 != null) {
      return "Lỗi ràng buộc dữ liệu";
    }

    const cursor1 = await this.ColorItem.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    if (cursor1.images && cursor1.images.length != 0) {
      for (const image of cursor1.images) {
        const newFile = image.split("\\")[1];
        const filePath = path.join(process.cwd(), "uploads", newFile);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Xóa ảnh trên server thành công: " + newFile);
          }
        });
      }
    }
    const result = await this.ColorItem.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }
}

module.exports = ColorItemService;
