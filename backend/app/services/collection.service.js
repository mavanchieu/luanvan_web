const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs-extra");
class CollectionService {
  constructor(client) {
    this.Collection = client.db().collection("collections");
  }

  extractSeasonalColletionData(payload) {
    return {
      ...(payload.productIds && { productIds: payload.productIds }),
      ...(payload.collectionName && { collectionName: payload.collectionName }),
      ...(payload.description && { description: payload.description }),
      ...(payload.images && { images: payload.images }),
    };
  }

  async create(payload) {
    console.log("Payload received in create:", payload);

    const collection = {
      brandId: ObjectId.isValid(payload.brandId)
        ? new ObjectId(payload.brandId)
        : null,
      description: payload.description,
      images: payload.images || [],
    };

    const result = await this.Collection.insertOne(collection);
    return result;
  }

  async createSeasonalCollection(payload) {
    console.log("Payload received in create:", payload);

    const collection = {
      collectionName: payload.collectionName,
      productIds: payload.productIds || [],
      description: payload.description,
      images: payload.images || [],
    };

    const result = await this.Collection.insertOne(collection);
    return result;
  }

  async findAll() {
    return await this.Collection.find({}).toArray();
  }

  async find(filter) {
    if (!filter.productIds) {
      filter.productIds = { $exists: false };
    }
    const cursor = await this.Collection.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findSeasonalCollection(filter) {
    if (!filter.productIds) {
      filter.productIds = { $exists: true, $ne: [] }; // Lọc các document có productIds tồn tại và không phải là mảng rỗng
    }

    // Lọc các document theo điều kiện filter, sắp xếp theo _id giảm dần
    const cursor = await this.Collection.find(filter).sort({ _id: -1 });

    // Chuyển kết quả thành mảng và trả về
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  //   async update(id, payload) {
  //     Object.keys(payload).forEach((key) => {
  //       if (
  //         payload[key] === "" ||
  //         payload[key] === null ||
  //         (Array.isArray(payload[key]) && payload[key].length === 0)
  //       ) {
  //         delete payload[key];
  //       }
  //     });

  //     const existing = await this.Collection.findOne({
  //       _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
  //     });

  //     if (payload.images && payload.images.length != 0) {
  //       // Nếu có ảnh mới trong payload, thực hiện xóa ảnh cũ
  //       if (existing.images.length != 0) {
  //         for (const image of existing.images) {
  //           const newFile = image.split("\\")[1];
  //           const filePath = path.join(process.cwd(), "uploads", newFile);

  //           fs.unlink(filePath, (err) => {
  //             if (err) {
  //               console.error(err);
  //             } else {
  //               console.log("Xóa ảnh trên server thành công: " + newFile);
  //             }
  //           });
  //         }
  //       }
  //     }
  //     const result = await this.Collection.findOneAndUpdate(
  //       { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
  //       { $set: payload },
  //       { returnDocument: "after" }
  //     );

  //     return result;
  //   }

  async deleteOneBrandCollection(id) {
    const cursor = await this.Collection.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    // const cursor1 = await this.Collection.findOne({
    //   _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    // });

    // if (cursor != null) {
    //   return "Lỗi ràng buộc dữ liệu";
    // }
    if (cursor.images && cursor.images.length != 0) {
      for (const image of cursor.images) {
        const newFile = image.split("\\")[1];
        const filePath = path.join(process.cwd(), "imageCollections", newFile);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Xóa ảnh trên server thành công: " + newFile);
          }
        });
      }
    }
    const result = await this.Collection.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteOneSeasonalCollection(id) {
    const cursor = await this.Collection.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    // const cursor1 = await this.Collection.findOne({
    //   _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    // });

    // if (cursor != null) {
    //   return "Lỗi ràng buộc dữ liệu";
    // }
    if (cursor.images && cursor.images.length != 0) {
      for (const image of cursor.images) {
        const newFile = image.split("\\")[1];
        const filePath = path.join(process.cwd(), "imageCollections", newFile);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Xóa ảnh trên server thành công: " + newFile);
          }
        });
      }
    }
    const result = await this.Collection.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async updateSeasonalCollection(id, payload) {
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        (Array.isArray(payload[key]) && payload[key].length === 0)
      ) {
        delete payload[key];
      }
    });
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractSeasonalColletionData(payload);
    const result = await this.Collection.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }
}

module.exports = CollectionService;
