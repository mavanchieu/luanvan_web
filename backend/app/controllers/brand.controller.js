const BrandService = require("../services/brand.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// thêm brand mới
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const brandService = new BrandService(MongoDB.client);
    const document = await brandService.create(req.body);

    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating brand"));
  }
};

//  lấy tất cả brand
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const brandService = new BrandService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await brandService.findByName(name);
    } else {
      documents = await brandService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving brands"));
  }
  return res.send(documents);
};

// xóa 1 brand
exports.deleteOne = async (req, res, next) => {
  try {
    const brandService = new BrandService(MongoDB.client);
    const document = await brandService.deleteOne(req.params.id);
    if (document == "Lỗi ràng buộc dữ liệu") {
      return next(new ApiError(404, "Lỗi ràng buộc dữ liệu"));
    }
    if (!document) {
      return next(new ApiError(404, "Brand not found"));
    }
    return res.send({ message: "Bạn đã xóa nhãn hiệu thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete brand with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const brandService = new BrandService(MongoDB.client);
    const document = await brandService.update(req.params.id, {
      ...req.body,
      // image: req.file ? req.file.path : null,
    });
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhãn hiệu"));
    }
    return res.send({ message: "Cập nhật nhãn hiệu thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật nhãn hiệu với id=${req.params.id}`)
    );
  }
};
