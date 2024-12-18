const GenderService = require("../services/gender.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Tên không đươc trống"));
  }
  try {
    const genderService = new GenderService(MongoDB.client);
    const document = await genderService.create(req.body);

    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi trong quá trình tạo gender mới"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const genderService = new GenderService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await genderService.findByName(name);
    } else {
      documents = await genderService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu gender")
    );
  }
  return res.send(documents);
};

exports.deleteOne = async (req, res, next) => {
  try {
    const genderService = new GenderService(MongoDB.client);
    const document = await genderService.deleteOne(req.params.id);
    if (document == "Lỗi ràng buộc dữ liệu") {
      return next(new ApiError(404, "Lỗi ràng buộc dữ liệu"));
    }
    if (!document) {
      return next(new ApiError(404, "Gender không được tìm thấy"));
    }
    return res.send({ message: "Bạn đã xóa giới tính thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa gender với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
  }
  try {
    const genderService = new GenderService(MongoDB.client);
    const document = await genderService.update(req.params.id, {
      ...req.body,
      // image: req.file ? req.file.path : null,
    });
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy giới tính"));
    }
    return res.send({ message: "Cập nhật giới tính thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật giới tính với id=${req.params.id}`)
    );
  }
};
