const TypeDetailService = require("../services/type_detail.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.typeId) {
    return next(new ApiError(400, "TypeId can not be empty"));
  }
  try {
    const type_detailService = new TypeDetailService(MongoDB.client);
    const document = await type_detailService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating type_detail")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const type_detailService = new TypeDetailService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await type_detailService.findByName(name);
    } else {
      documents = await type_detailService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving type_details")
    );
  }
  return res.send(documents);
};

exports.deleteOne = async (req, res, next) => {
  try {
    const type_detailService = new TypeDetailService(MongoDB.client);
    const document = await type_detailService.deleteOne(req.params.id);
    if (document == "Lỗi ràng buộc dữ liệu") {
      return next(new ApiError(404, "Lỗi ràng buộc dữ liệu"));
    }
    if (!document) {
      return next(new ApiError(404, "TypeDetail not found"));
    }
    return res.send({ message: "Bạn đã xóa chi tiết loại thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete type_detail with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const type_detailService = new TypeDetailService(MongoDB.client);
    const result = await type_detailService.deleteAll(req.params.userId);
    if (result && result.deletedCount > 0) {
      return res.send({
        message: "Bạn đã xóa tất cả lịch sử tìm kiếm thành công",
      });
    } else {
      return next(new ApiError(404, "Không có tìm kiếm nào để xóa"));
    }
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete type_detail with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
  }
  try {
    const typeDetailService = new TypeDetailService(MongoDB.client);
    const document = await typeDetailService.update(req.params.id, {
      ...req.body,
      // image: req.file ? req.file.path : null,
    });
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy chi tiết loại sản phẩm"));
    }
    return res.send({ message: "Cập nhật chi tiết loại sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Lỗi cập nhật chi tiết loại sản phẩm với id=${req.params.id}`
      )
    );
  }
};
