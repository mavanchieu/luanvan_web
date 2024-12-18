const TypeService = require("../services/type.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Tên không đươc trống"));
  }
  try {
    const typeService = new TypeService(MongoDB.client);
    const document = await typeService.create(req.body);

    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi trong quá trình tạo type mới"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const typeService = new TypeService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await typeService.findByName(name);
    } else {
      documents = await typeService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu type")
    );
  }
  return res.send(documents);
};

exports.deleteOne = async (req, res, next) => {
  try {
    const typeService = new TypeService(MongoDB.client);
    const document = await typeService.deleteOne(req.params.id);
    if (document == "Lỗi ràng buộc dữ liệu") {
      return next(new ApiError(404, "Lỗi ràng buộc dữ liệu"));
    }
    if (!document) {
      return next(new ApiError(404, "Type không được tìm thấy"));
    }
    return res.send({ message: "Bạn đã xóa loại sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa type với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
  }
  try {
    const typeService = new TypeService(MongoDB.client);
    const document = await typeService.update(req.params.id, {
      ...req.body,
      // image: req.file ? req.file.path : null,
    });
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy loại sản phẩm"));
    }
    return res.send({ message: "Cập nhật loại sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật loại sản phẩm với id=${req.params.id}`)
    );
  }
};
