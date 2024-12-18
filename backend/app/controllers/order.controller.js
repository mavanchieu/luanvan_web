const fs = require("fs-extra");
const path = require("path");
const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const { json } = require("express");
const qs = require("qs");
const { toASCII } = require("punycode");
const { emitEvent } = require("../../socket.io");

const sourceDir = path.join(process.cwd(), "uploads");

const destDir = path.join(process.cwd(), "orders");

async function copyFiles(fileNames) {
  try {
    await fs.ensureDir(destDir);

    for (const fileName of fileNames) {
      const srcPath = path.join(sourceDir, fileName);
      const destPath = path.join(destDir, fileName);

      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath);
        console.log(`Copied ${fileName} to ${destDir}`);
      } else {
        console.warn(`File ${fileName} does not exist in ${sourceDir}`);
      }
    }
  } catch (error) {
    console.error("Error copying files:", error);
  }
}

exports.create = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);

    if (!req.body.userId) {
      throw new ApiError(400, "Người dùng phải tồn tại");
    }

    const userId = req.body.userId;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const status = req.body.status;
    const totalPrice = req.body.totalPrice;
    const date = req.body.date;
    const fromDate = "";
    const toDate = "";
    const paymentMethod = req.body.paymentMethod;

    const userDiscountCodeId = req.body.userDiscountCodeId;
    const code = req.body.code;
    const discount = req.body.discount;

    const type =
      typeof req.body.products === "string"
        ? JSON.parse(req.body.products)
        : req.body.products;

    const products = type.map((pro) => ({
      productId: ObjectId.isValid(pro.productId)
        ? new ObjectId(pro.productId)
        : null,
      productName: pro.productName,
      discount: pro.discount,
      colorItemId: ObjectId.isValid(pro.colorItemId)
        ? new ObjectId(pro.colorItemId)
        : null,
      colorItemName: pro.colorItemName,
      sizeId: ObjectId.isValid(pro.sizeId) ? new ObjectId(pro.sizeId) : null,
      sizeName: pro.sizeName,
      quantity: pro.quantity,
      price: pro.price,
      image: pro.image,
      _id: new ObjectId(),
    }));

    // Create the order object
    const order = {
      userId,
      fullname,
      email,
      phone,
      address,
      status,
      totalPrice,
      date,
      fromDate,
      toDate,
      discount,
      userDiscountCodeId,
      code,
      products,
      paymentMethod,
    };

    // Log the data before creating the order
    console.log("Order data to be saved:", order);

    // Initialize the order service and create the order in the database
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.create(order);
    if (document != "Lỗi số lượng trong kho không đủ") {
      const fileNames = products.map((pro) => pro.image.trim());

      await copyFiles(fileNames); // Call the copyFiles function

      // Send a success response
      emitEvent("createOrder", { orderId: document.insertedId });
      res.status(201).send(document);
    } else {
      return next(new ApiError(404, "Lỗi số lượng trong kho không đủ"));
    }

    // Copy the image files associated with the order to the new directory
  } catch (error) {
    console.error("Lỗi trong bộ điều khiển tạo:", error);
    next(new ApiError(500, "Đã xảy ra lỗi khi tạo order"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const orderService = new OrderService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await orderService.findByName(name);
    } else {
      documents = await orderService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu order")
    );
  }
  return res.send(documents);
};

exports.findByUserId = async (req, res, next) => {
  let documents = [];

  try {
    const orderService = new OrderService(MongoDB.client);
    const userId = req.params.userId;

    if (userId) {
      documents = await orderService.findByUserId(userId);
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
    );
  }
  return res.send(documents);
};

// tìm kiếm theo id của đơn hàng
exports.findOneById = async (req, res, next) => {
  let documents = [];

  try {
    const orderService = new OrderService(MongoDB.client);
    const id = req.params.id;
    if (id) {
      documents = await orderService.findOneById(id);
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
    );
  }
  return res.send(documents);
};

// Hủy đơn hàng
exports.deleteOne = async (req, res, next) => {
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.deleteOne(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Order không được tìm thấy"));
    }
    emitEvent("deleteOneOrder", { orderId: req.params.id });
    return res.status(201).send("Bạn đã xóa thành công");
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa order với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
  }
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.update(req.params.id, {
      ...req.body,
      // image: req.file ? req.file.path : null,
    });
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy đơn hàng"));
    }
    emitEvent("update"), { updateStatusOrder: req.params.id };
    return res.send({ message: "Cập nhật đơn hàng thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật nhật đơn hàng với id=${req.params.id}`)
    );
  }
};

// Xác nhận đơn hàng ở status "Chưa xác nhận"
exports.confirmOrder = async (req, res, next) => {
  console.log(req.body);

  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.confirmOrder(req.params.id, {
      ...req.body,
    });
    if (!document) {
      return next(new ApiError(404, "Cập nhật không thành công "));
    }
    emitEvent("confirmOrder", { userId: req.body.userId });
    return res.send({ message: "Xác nhận đơn hàng thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật đơn hàng với id=${req.params.id}`)
    );
  }
};

exports.confirmCompletedOrder = async (req, res, next) => {
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.confirmCompletedOrder(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Cập nhật không thành công "));
    }
    emitEvent("confirmCompletedOrder", { orderId: req.params.id });
    return res.send({ message: "Đơn hàng đã được lên" });
  } catch (error) {
    return next(
      new ApiError(500, `Đơn hàng chưa được lên với id=${req.params.id}`)
    );
  }
};

exports.confirmShipping = async (req, res, next) => {
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.confirmShipping(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Cập nhật không thành công "));
    }
    emitEvent("confirmShipping", { orderId: req.params.id });
    return res.send({ message: "Đơn hàng đã được vận chuyển" });
  } catch (error) {
    return next(
      new ApiError(500, `Đơn hàng chưa được vận chuyển với id=${req.params.id}`)
    );
  }
};

exports.payment = async (req, res, next) => {
  // console.log(req.params.totalPrice);
  const totalPrice = req.body.totalPrice;

  console.log(totalPrice);
  const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
  };

  const embed_data = {
    redirecturl: "localhost:3005/cart",
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: totalPrice,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: "https://7678-113-161-210-40.ngrok-free.app/callback",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    console.log(result.data);
    return res.send({ ...result.data, app_trans_id: order.app_trans_id });
  } catch (error) {
    console.log(error.message);
    return next(new ApiError(404, "Resource not found"));
  }
};

exports.callback = async (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0;
    result.return_message = ex.message;
  }
  res.json(result);
};

exports.orderStatus = async (req, res) => {
  const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
  };
  console.log(req.params.app_trans_id);
  let postData = {
    app_id: config.app_id,
    app_trans_id: req.params.app_trans_id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    console.log(result.data.return_code);
    if (result.data.return_code == 1) {
      emitEvent("orderStatus", { return_code: result.data.return_code });
    }
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
  }
};
