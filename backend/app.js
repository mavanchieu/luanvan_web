const express = require("express");
const cors = require("cors");
// const path = require('path');

// const axios = require('axios').default; // npm install axios
// const CryptoJS = require('crypto-js'); // npm install crypto-js
// const moment = require('moment'); // npm install moment

const usersRouter = require("./app/routes/user.route");
const brandsRouter = require("./app/routes/brand.route");
const genderRouter = require("./app/routes/gender.route");
const typeRouter = require("./app/routes/type.route");
const typeDetailRouter = require("./app/routes/type_detail.route");
const searchRouter = require("./app/routes/search.route");
const accessRouter = require("./app/routes/access.route");
const sizeRouter = require("./app/routes/size.route");
const receivingAddressRouter = require("./app/routes/receiving_address.route");
const productRouter = require("./app/routes/product.route");
const colorItemRouter = require("./app/routes/colorItem.route");
const favoriteRouter = require("./app/routes/favoirte.route");
const viewedProductsRouter = require("./app/routes/viewed_products.route");
const cartRouter = require("./app/routes/cart.route");
const orderRouter = require("./app/routes/order.route");
const evaluationRouter = require("./app/routes/evaluation.route");
const discountCode = require("./app/routes/discount_code.route");
const usersDiscountCode = require("./app/routes/userDiscountCode.route");
const helpRouter = require("./app/routes/help.route");
const messageRouter = require("./app/routes/message.route");
const collectionRouter = require("./app/routes/collection.route");

const ApiError = require("./app/api-error");
const e = require("express");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use("/orders", express.static("orders"));
app.use("/evaluations", express.static("evaluations"));
app.use("/imageUsers", express.static("imageUsers"));
app.use("/imageCollections", express.static("imageCollections"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact MC-SHOP." });
});

app.use("/api/users/", usersRouter);
app.use("/api/brands/", brandsRouter);
app.use("/api/genders/", genderRouter);
app.use("/api/types/", typeRouter);
app.use("/api/typeDetails/", typeDetailRouter);
app.use("/api/search/", searchRouter);
app.use("/api/access/", accessRouter);
app.use("/api/size/", sizeRouter);
app.use("/api/receivingAddress/", receivingAddressRouter);
app.use("/api/products/", productRouter);
app.use("/api/colorItems/", colorItemRouter);
app.use("/api/favorites/", favoriteRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/orders/", orderRouter);
app.use("/api/viewedProducts/", viewedProductsRouter);
app.use("/api/evaluations/", evaluationRouter);
app.use("/api/discountCodes/", discountCode);
app.use("/api/usersDiscountCode/", usersDiscountCode);
app.use("/api/helps/", helpRouter);
app.use("/api/message/", messageRouter);
app.use("/api/collections/", collectionRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
