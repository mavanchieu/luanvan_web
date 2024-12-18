const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs-extra");
const { platform } = require("os");
class EvaluationService {
  constructor(client) {
    this.Evaluation = client.db().collection("evaluations");
  }

  async create(payload) {
    console.log("Payload received in create:", payload);

    const toRate = {
      userId: ObjectId.isValid(payload.userId)
        ? new ObjectId(payload.userId)
        : null,
      fullname: payload.fullname,
      productId: ObjectId.isValid(payload.productId)
        ? new ObjectId(payload.productId)
        : null,
      productOrderId: ObjectId.isValid(payload.productOrderId)
        ? new ObjectId(payload.productOrderId)
        : null,
      content: payload.content,
      incognito: payload.incognito,

      sizeName: payload.sizeName,
      colorItemName: payload.colorItemName,
      date: payload.date,
      rate: payload.rate,
      like: payload.like || [],

      images: payload.images || [],
    };

    const result = await this.Evaluation.insertOne(toRate);
    return result;
  }

  async findAll() {
    return await this.Evaluation.find({}).toArray();
  }

  async find(filter) {
    const cursor = await this.Evaluation.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findEvaByProId(productId) {
    return await this.find({
      productId: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
    });
  }

  async deleteOne(id) {
    const eva = await this.Evaluation.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    console.log(eva);
    if (eva) {
      for (const e of eva.images) {
        const newFile = e.split("\\")[1];
        console.log(newFile);
        // const filePath = path.join(__dirname, 'imageUsers',newFile); // Đường dẫn đến thư mục chứa ảnh
        const filePath = path.join(process.cwd(), "evaluations", newFile);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          }
          console.log("Xóa ảnh trên server thành công");
        });
      }
    }
    const result = await this.Evaluation.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async updateLike(userId, evaId) {
    const evaluation = await this.Evaluation.findOne({
      _id: ObjectId.isValid(evaId) ? new ObjectId(evaId) : null,
    });

    if (!evaluation) {
      throw new Error("Evaluation not found");
    }

    // Kiểm tra userId đã có trong mảng like hay chưa
    const alreadyLiked = evaluation.like.includes(userId);

    let updateOperation;
    if (alreadyLiked) {
      // Nếu đã có thì xóa userId khỏi mảng like
      updateOperation = { $pull: { like: userId } };
    } else {
      // Nếu chưa có thì thêm userId vào mảng like
      updateOperation = { $push: { like: userId } };
    }

    const result = await this.Evaluation.updateOne(
      { _id: new ObjectId(evaId) },
      updateOperation
    );

    return result;
  }
}

module.exports = EvaluationService;
