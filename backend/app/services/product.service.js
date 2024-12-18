const { ObjectId } = require("mongodb");
class ProductService {
  constructor(client) {
    this.Product = client.db().collection("products");
    this.ColorItems = client.db().collection("colorItems");
    this.Carts = client.db().collection("carts");
    this.Order = client.db().collection("orders");
  }

  extractProductData(payload) {
    const product = {
      name: payload.name,
      description: payload.description,
      material: payload.material,
      typeId: ObjectId.isValid(payload.typeId)
        ? new ObjectId(payload.typeId)
        : null,
      typeDetailsId: ObjectId.isValid(payload.typeDetailsId)
        ? new ObjectId(payload.typeDetailsId)
        : null,
      brandId: ObjectId.isValid(payload.brandId)
        ? new ObjectId(payload.brandId)
        : null,
      genderId: ObjectId.isValid(payload.genderId)
        ? new ObjectId(payload.genderId)
        : null,
      discount: Number(payload.discount),
      hidden: payload.hidden !== undefined ? payload.hidden : false,
    };

    Object.keys(product).forEach(
      (key) => product[key] === undefined && delete product[key]
    );
    return product;
  }

  // Thêm sản phẩm
  async create(payload) {
    const product = this.extractProductData(payload);

    const result = await this.Product.insertOne(product);
    return result;
  }

  // Lấy tất cả sản phẩm
  async findAll() {
    return await this.Product.find({}).toArray();
  }

  // lấy sản phẩm bên client
  async find(filter) {
    filter.hidden = false;
    const cursor = await this.Product.find({ ...filter, hidden: false }).sort({
      _id: -1,
    });
    return await cursor.toArray();
  }

  // lấy sản phẩm bên admin
  async findAll(filter) {
    const cursor = await this.Product.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  // Chỉ lấy các sản phẩm có hidden là false
  async findAllByProductId() {
    const cursor = await this.Product.aggregate([
      {
        $match: { hidden: false },
      },
      {
        $lookup: {
          from: "colorItems",
          localField: "_id",
          foreignField: "productId",
          as: "colors",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          material: 1,
          brandId: 1,
          genderId: 1,
          discount: 1,
          colors: 1,
          typeDetailsId: 1,
          hidden: 1,
        },
      },
      {
        $sort: { _id: -1 }, // Sắp xếp kết quả theo _id giảm dần
      },
      {
        $addFields: {
          colors: {
            $sortArray: {
              input: "$colors", // Sort the colorItems array
              sortBy: { _id: -1 }, // Sort by colorItem._id (ascending order)
            },
          },
        },
      },
    ]);

    return await cursor.toArray();
  }

  async findAllProducts() {
    const cursor = await this.Product.aggregate([
      {
        $lookup: {
          from: "colorItems", // Bảng phụ (typeDetails)
          localField: "_id", // Khóa từ bảng chính (types)
          foreignField: "productId", // Khóa từ bảng phụ (typeDetails)
          as: "colors", // Tên cho mảng chứa thông tin bảng phụ
        },
      },
      {
        $project: {
          _id: 1, // Giữ lại các trường cần thiết từ bảng chính
          name: 1,
          description: 1,
          material: 1,
          brandId: 1,
          genderId: 1,
          discount: 1,
          colors: 1,
          typeDetailsId: 1,
          hidden: 1,
        },
      },
      {
        $sort: { _id: -1 }, // Sắp xếp kết quả theo _id giảm dần
      },
    ]);

    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  // Ẩn sản phẩm
  async hiddenProduct(id) {
    const result = await this.Product.updateOne(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      [
        { $set: { hidden: { $not: "$hidden" } } }, // Đảo giá trị của "used"
      ]
    );
    return result;
  }

  // Xóa 1 sản phẩm
  async deleteOne(id) {
    const cursor = await this.ColorItems.findOne({
      productId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor1 = await this.Carts.findOne({
      productId: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    const cursor2 = await this.Order.findOne({
      "products.productId": ObjectId.isValid(id) ? new ObjectId(id) : null,
    });

    if (cursor != null || cursor1 != null || cursor2) {
      return "Lỗi ràng buộc dữ liệu";
    }
    const result = await this.Product.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }
}

module.exports = ProductService;
