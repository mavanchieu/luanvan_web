const { ObjectId } = require("mongodb");
class OrderService {
  constructor(client) {
    this.Order = client.db().collection("orders");
    this.ColorItems = client.db().collection("colorItems");
  }

  // async create(payload) {
  //   console.log("Payload received in create:", payload);

  //   for (const product of payload.products) {
  //     const productInStock = await this.ColorItems.findOne({
  //       _id: product.colorItemId, // Tìm theo colorItemId hoặc productId nếu cần
  //     });

  //     // Kiểm tra xem sản phẩm có tồn kho và đủ số lượng hay không
  //     if (!productInStock) {
  //       throw new ApiError(
  //         400,
  //         `Sản phẩm ${product.productName} không tồn tại trong kho`
  //       );
  //     }

  //     if (productInStock.quantity < product.quantity) {
  //       throw new ApiError(
  //         400,
  //         `Số lượng ${product.productName} trong kho không đủ`
  //       );
  //     }

  //     // Cập nhật lại số lượng trong kho nếu cần
  //     await this.ColorItems.updateOne(
  //       { _id: product.colorItemId },
  //       { $inc: { quantity: -product.quantity } } // Trừ số lượng trong kho
  //     );
  //   }

  //   const order = {
  //     userId: ObjectId.isValid(payload.userId)
  //       ? new ObjectId(payload.userId)
  //       : null,
  //     fullname: payload.fullname,
  //     email: payload.email,
  //     phone: payload.phone,
  //     address: payload.address,
  //     status: payload.status,
  //     date: payload.date,
  //     totalPrice: payload.totalPrice,
  //     fromDate: payload.fromDate,
  //     toDate: payload.toDate,
  //     paymentMethod: payload.paymentMethod,
  //     userDiscountCodeId: ObjectId.isValid(payload.userDiscountCodeId)
  //       ? new ObjectId(payload.userDiscountCodeId)
  //       : null,
  //     code: payload.code,
  //     discount: payload.discount,

  //     products: payload.products || [],
  //   };

  //   const result = await this.Order.insertOne(order);
  //   return result;
  // }
  async create(payload) {
    try {
      console.log("Payload received in create:", payload);

      // Kiểm tra số lượng tồn kho của từng sản phẩm
      for (const product of payload.products) {
        const productInStock = await this.ColorItems.findOne({
          _id: product.colorItemId,
        });

        if (!productInStock) {
          throw new ApiError(
            400,
            `Sản phẩm ${product.productName} không tồn tại trong kho`
          );
        }

        // Tìm size tương ứng trong mảng sizes của product
        const sizeInStock = productInStock.sizes.find(
          (size) => size._id.toString() === product.sizeId.toString()
        );

        // Kiểm tra xem sản phẩm có kích thước tương ứng và đủ số lượng hay không
        if (!sizeInStock) {
          throw new ApiError(
            400,
            `Kích thước ${product.sizeName} cho sản phẩm ${product.productName} không tồn tại trong kho`
          );
        }

        if (sizeInStock.quantity < product.quantity) {
          return "Lỗi số lượng trong kho không đủ";
        }
      }

      // Sau khi kiểm tra tất cả các sản phẩm, tiếp tục tạo đơn hàng
      const order = {
        userId: ObjectId.isValid(payload.userId)
          ? new ObjectId(payload.userId)
          : null,
        fullname: payload.fullname,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        status: payload.status,
        date: payload.date,
        totalPrice: payload.totalPrice,
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        paymentMethod: payload.paymentMethod,
        userDiscountCodeId: ObjectId.isValid(payload.userDiscountCodeId)
          ? new ObjectId(payload.userDiscountCodeId)
          : "",
        code: payload.code,
        discount: payload.discount,
        products: payload.products || [],
      };

      // Lưu đơn hàng vào cơ sở dữ liệu
      const result = await this.Order.insertOne(order);

      // Cập nhật lại số lượng trong kho cho size tương ứng
      for (const product of payload.products) {
        await this.ColorItems.updateOne(
          { _id: product.colorItemId, "sizes._id": product.sizeId },
          { $inc: { "sizes.$.quantity": -product.quantity } }
        );
      }

      return result;
    } catch (error) {
      throw error; // Ném lại lỗi để xử lý ở controller
    }
  }

  async findAll() {
    return await this.Order.find({}).toArray();
  }

  async find(filter) {
    const cursor = await this.Order.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  // fetch tất cả đơn hàng theo userId
  async findByUserId(userId) {
    return await this.find({
      userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
    });
  }

  // fetch order theo id
  async findOneById(id) {
    return await this.find({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // hủy đơn hàng
  async deleteOne(id) {
    const result = await this.Order.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  // xác nhận đơn hàng
  async confirmOrder(id, info) {
    const result = await this.Order.updateOne(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: { fromDate: info.fromDate, toDate: info.toDate, status: "1" } }
    );
    return result;
  }

  // đơn hàng đã được lên
  async confirmCompletedOrder(id) {
    console.log("HAHA", id);
    const result = await this.Order.updateOne(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: { status: "3" } }
    );
    return result;
  }

  async confirmShipping(id) {
    console.log(id);
    const result = await this.Order.updateOne(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: { status: "2" } }
    );
    return result;
  }
}

module.exports = OrderService;
