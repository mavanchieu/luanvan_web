const CollectionService = require("../services/collection.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");
const { emitEvent } = require("../../socket.io");

exports.create = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Received files:", req.files);

    const brandId = req.body.brandId;
    const description = req.body.description;

    if (!req.body.brandId) {
      throw new ApiError(400, "Nhãn hiệu không được trống");
    }

    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];

    // Log
    console.log("brandId:", brandId);
    console.log("Images:", images);
    console.log("description", description);

    const collection = {
      brandId,
      description,
      images,
    };

    const collectionService = new CollectionService(MongoDB.client);

    const document = await collectionService.create(collection);
    res.status(201).send(document);
  } catch (error) {
    console.error("Lỗi trong bộ điều khiển tạo:", error);
    next(new ApiError(500, "Đã xảy ra lỗi khi tạo collection"));
  }
};

exports.createSeasonalCollection = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Received files:", req.files);

    const collectionName = req.body.collectionName;
    const description = req.body.description;
    const productIds = JSON.parse(req.body.productIds);

    if (!req.body.collectionName) {
      throw new ApiError(400, "Nhãn hiệu không được trống");
    }

    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];

    // Log
    // console.log("brandId:", brandId);
    // console.log("Images:", images);
    // console.log("description", description);

    const collection = {
      collectionName,
      description,
      productIds,
      images,
    };

    const collectionService = new CollectionService(MongoDB.client);

    const document = await collectionService.createSeasonalCollection(
      collection
    );
    res.status(201).send(document);
  } catch (error) {
    console.error("Lỗi trong bộ điều khiển tạo:", error);
    next(new ApiError(500, "Đã xảy ra lỗi khi tạo collection"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const collectionService = new CollectionService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await collectionService.findByName(name);
    } else {
      documents = await collectionService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi trong quá trình lấy danh sách dữ liệu collection"
      )
    );
  }
  return res.send(documents);
};

exports.findAllSeasonalCollection = async (req, res, next) => {
  let documents = [];

  try {
    const collectionService = new CollectionService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await collectionService.findByName(name);
    } else {
      documents = await collectionService.findSeasonalCollection({});
    }
  } catch (error) {
    return next(
      new ApiError(
        500,
        "Có lỗi trong quá trình lấy danh sách dữ liệu collection"
      )
    );
  }
  return res.send(documents);
};

exports.deleteOneBrandCollection = async (req, res, next) => {
  try {
    const collectionService = new CollectionService(MongoDB.client);
    const document = await collectionService.deleteOneBrandCollection(
      req.params.id
    );
    if (!document) {
      return next(new ApiError(404, "Brand không được tìm thấy"));
    }
    return res.send({ message: "Bạn đã xóa bộ sưu tập thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa collection với id=${req.params.id}`)
    );
  }
};

exports.deleteOneSeasonalCollection = async (req, res, next) => {
  try {
    const collectionService = new CollectionService(MongoDB.client);
    const document = await collectionService.deleteOneSeasonalCollection(
      req.params.id
    );
    if (!document) {
      return next(new ApiError(404, "Brand không được tìm thấy"));
    }
    return res.send({ message: "Bạn đã xóa bộ sưu tập thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa collection với id=${req.params.id}`)
    );
  }
};

exports.updateSeasonalCollection = async (req, res, next) => {
  try {
    const collectionService = new CollectionService(MongoDB.client);
    const document = await collectionService.updateSeasonalCollection(
      req.params.id,
      {
        ...req.body,
      }
    );
    if (!document) {
      return next(new ApiError(404, "Like không thành công "));
    }
    return res.send({ message: "Like thành công" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi like với id=${req.params.evaId}`));
  }
};
