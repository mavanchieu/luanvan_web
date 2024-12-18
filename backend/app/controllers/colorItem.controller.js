const ColorItemService = require("../services/colorItem.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");
const { emitEvent } = require("../../socket.io");

exports.create = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Received files:", req.files);

    if (!req.body.name) {
      throw new ApiError(400, "Tên màu không được để trống");
    }

    const name = req.body.name;
    const productId = req.body.productId;
    const price = Number(req.body.price);
    const color = req.body.color;
    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];
    const sizes = JSON.parse(req.body.sizes || "[]").map((size) => ({
      ...size,
      _id: new ObjectId(),
    }));

    // Log
    console.log("Color Name:", name);
    console.log("Images:", images);
    console.log("id", productId);
    console.log("size", sizes);
    console.log("price", price);

    const colorItem = {
      name,
      productId,
      price,
      color,
      images,
      sizes,
    };

    const colorItemService = new ColorItemService(MongoDB.client);
    console.log("ColorItem data to be saved:", colorItem);

    const document = await colorItemService.create(colorItem);
    res.status(201).send(document);
  } catch (error) {
    console.error("Lỗi trong bộ điều khiển tạo:", error);
    next(new ApiError(500, "Đã xảy ra lỗi khi tạo colorItem"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const colorItemService = new ColorItemService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await colorItemService.findByName(name);
    } else {
      documents = await colorItemService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi trong quá trình lấy danh sách dữ liệu colorItem"
      )
    );
  }
  return res.send(documents);
};

exports.deleteOne = async (req, res, next) => {
  try {
    const colorItemService = new ColorItemService(MongoDB.client);
    const document = await colorItemService.deleteOne(req.params.id);
    if (!document) {
      return next(new ApiError(404, "ColorItem không được tìm thấy"));
    }
    if (document == "Lỗi ràng buộc dữ liệu") {
      return next(new ApiError(404, "Lỗi ràng buộc dữ liệu"));
    }
    return res.send({ message: "Bạn đã xóa màu sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa colorItem với id=${req.params.id}`)
    );
  }
};

// cập nhật số lượng sản phẩm trong kho khi người dùng thanh toán đơn hàng thành công
exports.updateQuantity = async (req, res, next) => {
  try {
    const colorItemService = new ColorItemService(MongoDB.client);
    const document = await colorItemService.updateQuantity(
      req.params.colorItemId,
      req.params.sizeId,
      req.params.quantity
    );
    if (!document) {
      return next(new ApiError(404, "Cập nhật không thành công "));
    }
    emitEvent("updateDescreaseQuantity", {
      colorItemId: req.params.colorItemId,
    });
    return res.send({ message: "Cập nhật số lượng sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Lỗi cập nhật số lượng sản phẩm với id=${req.params.colorItemId}`
      )
    );
  }
};

exports.updateInscreaseQuantity = async (req, res, next) => {
  try {
    const colorItemService = new ColorItemService(MongoDB.client);
    const document = await colorItemService.updateInscreaseQuantity(
      req.params.colorItemId,
      req.params.sizeId,
      req.params.quantity
    );
    if (!document) {
      return next(new ApiError(404, "Cập nhật không thành công "));
    }
    emitEvent("updateInscreaseQuantity", {
      colorItemId: req.params.colorItemId,
      sizeId: req.params.sizeId,
      quantity: req.params.quantity,
    });
    return res.send(201, { message: "Cập nhật số lượng sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Lỗi cập nhật số lượng sản phẩm với id=${req.params.colorItemId}`
      )
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const name = req.body.name;
    const productId = req.body.productId;
    const price = Number(req.body.price);
    const color = req.body.color;
    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];
    const sizes = JSON.parse(req.body.sizes || "[]").map((size) => ({
      name: size.name,
      quantity: size.quantity,
      _id: ObjectId.isValid(size._id) ? new ObjectId(size._id) : null,
    }));

    // Log the data before creating the color item
    console.log("ColorId", req.params.colorItemId);
    console.log("Color Name:", name);
    console.log("Images:", images);
    console.log("id", productId);
    console.log("size", sizes);
    console.log("price", price);

    const colorItem = {
      name,
      productId: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
      price,
      color,
      images,
      sizes,
    };
    const colorItemService = new ColorItemService(MongoDB.client);
    const document = await colorItemService.update(
      req.params.colorItemId,
      colorItem
    );
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy loại sản phẩm"));
    }
    emitEvent("updateProduct", { colorItemId: req.params.colorItemId });
    return res.send({ message: "Cập nhật loại sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật loại sản phẩm với id=${req.params.id}`)
    );
  }
};
