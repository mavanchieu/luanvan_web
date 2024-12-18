const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { emitEvent } = require("../../socket.io");

// tạo cart mới
exports.create = async (req, res, next) => {
  if (!req.body?.productId) {
    return next(new ApiError(400, "Phải tồn tại sản phẩm"));
  }
  try {
    const cartService = new CartService(MongoDB.client);
    const document = await cartService.create(req.body);
    emitEvent("createCart", { cartId: document.insertedId });
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi trong quá trình tạo cart mới"));
  }
};

// lấy tất cả cart
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const cartService = new CartService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await cartService.findByName(name);
    } else {
      documents = await cartService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
    );
  }
  return res.send(documents);
};

// lấy cart theo userId
exports.findByUserId = async (req, res, next) => {
  let documents = [];

  try {
    const cartService = new CartService(MongoDB.client);
    const userId = req.params.userId;
    // console.log(userId);
    if (userId) {
      documents = await cartService.findByUserId(userId);
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
    );
  }
  return res.send(documents);
};

// xóa 1 cart theo id cart
exports.deleteOne = async (req, res, next) => {
  try {
    const cartService = new CartService(MongoDB.client);
    const document = await cartService.deleteOne(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Cart không được tìm thấy"));
    }
    emitEvent("deleteOneCart", { cartId: req.params.id });
    return res.send({ message: "Bạn đã xóa cart thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa cart với id=${req.params.id}`)
    );
  }
};

// xóa tất cả cart của userId
exports.deleteAll = async (req, res, next) => {
  try {
    const cartService = new CartService(MongoDB.client);
    const document = await cartService.deleteAll(req.params.userId);
    if (!document) {
      return next(new ApiError(404, "Cart không được tìm thấy"));
    }
    emitEvent("deleteAllCart", { userId: req.params.userId });
    return res.send({ message: "Bạn đã xóa cart thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa cart với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
  }
  try {
    const cartService = new CartService(MongoDB.client);
    const document = await cartService.update(req.params.id, {
      ...req.body,
      // image: req.file ? req.file.path : null,
    });
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy loại sản phẩm"));
    }
    emitEvent("updateCart", { cartId: req.params.id });
    return res.send({ message: "Cập nhật sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật  sản phẩm với id=${req.params.id}`)
    );
  }
};
