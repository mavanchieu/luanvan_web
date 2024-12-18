const EvaluationService = require("../services/evaluation.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");
const { emitEvent } = require("../../socket.io");

exports.create = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Received files:", req.files);

    if (!req.body.userId) {
      throw new ApiError(400, "Phải tồn tại người dùng");
    }

    const userId = req.body.userId;
    const fullname = req.body.fullname;
    const productId = req.body.productId;
    const productOrderId = req.body.productOrderId;

    const content = req.body.content;
    const incognito = req.body.incognito === "true";
    const sizeName = req.body.sizeName;
    const colorItemName = req.body.colorItemName;
    const date = req.body.date;
    const rate = req.body.rate;

    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];
    const toRate = {
      userId,
      fullname,
      productId,
      productOrderId,
      content,
      incognito,
      sizeName,
      colorItemName,
      date,
      rate,
      images,
    };

    const toRateService = new EvaluationService(MongoDB.client);
    console.log("Evaluation data to be saved:", toRate);

    const document = await toRateService.create(toRate);
    emitEvent("createEvaluation", { evalId: document.insertedId });
    res.status(201).send(document);
  } catch (error) {
    console.error("Lỗi trong bộ điều khiển tạo:", error);
    next(new ApiError(500, "Đã xảy ra lỗi khi tạo toRate"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const toRateService = new EvaluationService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await toRateService.findByName(name);
    } else {
      documents = await toRateService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu toRate")
    );
  }
  return res.send(documents);
};

exports.findEvaByProId = async (req, res, next) => {
  let documents = [];
  try {
    const evaluationService = new EvaluationService(MongoDB.client);
    const productId = req.params.productId;
    console.log(productId);
    if (productId) {
      documents = await evaluationService.findEvaByProId(productId);
    } else {
      console.log(productId);
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
    );
  }
  return res.send(documents);
};

exports.deleteOne = async (req, res, next) => {
  try {
    const toRateService = new EvaluationService(MongoDB.client);
    const document = await toRateService.deleteOne(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Evaluation không được tìm thấy"));
    }
    return res.send({ message: "Bạn đã xóa loại sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa toRate với id=${req.params.id}`)
    );
  }
};

exports.updateLike = async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const evaluationService = new EvaluationService(MongoDB.client);
    const document = await evaluationService.updateLike(
      req.params.userId,
      req.params.evaId
    );
    if (!document) {
      return next(new ApiError(404, "Like không thành công "));
    }
    return res.send({ message: "Like thành công" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi like với id=${req.params.evaId}`));
  }
};
