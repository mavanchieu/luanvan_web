const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { emitEvent } = require("../../socket.io");
// exports.create = async (req, res, next) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("Received files:", req.files);

//         if (!req.body.name) {
//             throw new ApiError(400, "Tên không được để trống");
//         }

//         // Xử lý colorItems
//         const colorItems = [];
//         const colorItemKeys = Object.keys(req.body).filter(key => key.startsWith('colorItems'));

//         colorItemKeys.forEach((key, index) => {
//             const colorName = req.body[`colorItems[${index}].colorName`];

//             // Lấy đường dẫn hình ảnh cho từng màu
//             const images = req.files.images ? req.files.images.map(file => file.path) : [];

//             colorItems.push({
//                 colorName,
//                 images,
//             });
//         });

//         const productService = new ProductService(MongoDB.client);
//         const productData = {
//             name: req.body.name,
//             colorItems,
//         };

//         console.log("Product data to be saved:", productData); // Ghi lại dữ liệu sẽ được lưu

//         const document = await productService.create(productData);
//         res.status(201).send(document);
//     } catch (error) {
//         console.error("Lỗi trong bộ điều khiển tạo:", error);
//         next(new ApiError(500, "Đã xảy ra lỗi khi tạo sản phẩm"));
//     }
// };

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    console.log(req.body);
    return next(new ApiError(400, "Tên không đươc trống"));
  }
  try {
    const typeService = new ProductService(MongoDB.client);
    const document = await typeService.create(req.body);
    if (document) {
      emitEvent("createProduct", { data: document.insertedId });
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi trong quá trình thêm mới sản phẩm"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const productService = new ProductService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await productService.findByName(name);
    } else {
      documents = await productService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu product")
    );
  }
  return res.send(documents);
};

exports.findAllNotHiddenProduct = async (req, res, next) => {
  let documents = [];

  try {
    const productService = new ProductService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await productService.findByName(name);
    } else {
      documents = await productService.findAll({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu product")
    );
  }
  return res.send(documents);
};

exports.findAllByProductId = async (req, res, next) => {
  let documents = [];

  try {
    const productService = new ProductService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await productService.findByName(name);
    } else {
      documents = await productService.findAllByProductId();
    }
  } catch (error) {
    return next(
      new ApiError(
        500,
        error +
          "Có lỗi trong quá trình lấy danh sách dữ liệu product (findAllByProductId)"
      )
    );
  }
  return res.send(documents);
};
exports.findAllProducts = async (req, res, next) => {
  let documents = [];

  try {
    const productService = new ProductService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await productService.findByName(name);
    } else {
      documents = await productService.findAllProducts();
    }
  } catch (error) {
    return next(
      new ApiError(
        500,
        error +
          "Có lỗi trong quá trình lấy danh sách dữ liệu product (findAllByProductId)"
      )
    );
  }
  return res.send(documents);
};

exports.hiddenProduct = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const productService = new ProductService(MongoDB.client);
    const document = await productService.hiddenProduct(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Lỗi cập nhật trạng thái"));
    }
    emitEvent("productHidden", { productId: req.params.id });
    return res.send({ message: "Cập nhật trang thái sản phẩm thành công" });
  } catch (error) {
    return next(new ApiError(500, error + "Có lỗi trong quá trình cập nhật"));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const productService = new ProductService(MongoDB.client);
    const document = await productService.deleteOne(req.params.id);
    if (document == "Lỗi ràng buộc dữ liệu") {
      return next(new ApiError(404, "Lỗi ràng buộc dữ liệu"));
    }
    if (!document) {
      return next(new ApiError(404, "Product không được tìm thấy"));
    }
    return res.send({ message: "Bạn đã xóa loại sản phẩm thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa product với id=${req.params.id}`)
    );
  }
};

// exports.update = async(req, res, next) => {
//     if(Object.keys(req.body).length === 0){
//         return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
//     }
//     try {
//         const  productService = new ProductService(MongoDB.client);
//         const document = await productService.update(req.params.id, {
//             ...req.body,
//             // image: req.file ? req.file.path : null,
//         });
//         if(!document){
//             return next(new ApiError(404, "Không tìm thấy loại sản phẩm"));
//         }
//         return res.send({message: "Cập nhật loại sản phẩm thành công"});
//     } catch(error){
//         return next(
//             new ApiError(500, `Lỗi cập nhật loại sản phẩm với id=${req.params.id}`)
//         );
//     }
// }
