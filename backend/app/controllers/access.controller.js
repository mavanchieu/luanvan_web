const AccessService = require("../services/access.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// thêm truy cập mới
exports.create = async (req, res, next) => {
  if (!req.body?.userId) {
    return next(new ApiError(400, "Tên không đươc trống"));
  }
  try {
    const accessService = new AccessService(MongoDB.client);
    const document = await accessService.create(req.body);

    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi trong quá trình tạo access mới"));
  }
};

// lấy tất cả truy cập
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const accessService = new AccessService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await accessService.findByName(name);
    } else {
      documents = await accessService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu type")
    );
  }
  return res.send(documents);
};
