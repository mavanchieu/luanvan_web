const DiscountCodeService = require("../services/discount_code.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.code) {
    return next(new ApiError(400, "Code can not be empty"));
  }
  try {
    const discountCodeService = new DiscountCodeService(MongoDB.client);
    const document = await discountCodeService.create(req.body);

    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating discountCode")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const discountCodeService = new DiscountCodeService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await discountCodeService.findByName(name);
    } else {
      documents = await discountCodeService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving discountCodes")
    );
  }
  return res.send(documents);
};

exports.deleteOne = async (req, res, next) => {
  try {
    const discountCodeService = new DiscountCodeService(MongoDB.client);
    const document = await discountCodeService.deleteOne(req.params.id);
    if (!document) {
      return next(new ApiError(404, "DiscountCode not found"));
    }
    return res.send({ message: "Bạn đã xóa nhãn hiệu thành công" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not delete discountCode with id=${req.params.id}`
      )
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const discountCodeService = new DiscountCodeService(MongoDB.client);
    const document = await discountCodeService.update(req.params.id, {
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
