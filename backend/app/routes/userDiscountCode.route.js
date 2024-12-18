const express = require("express");
const usersDiscountCode = require("../controllers/usersDiscountCode.controller");

const router = express.Router();

router.route("/").post(usersDiscountCode.create);

router.route("/:id").put(usersDiscountCode.update);

// router.route("/updateUsersDiscountCode/:id")
//     .put(usersDiscountCode.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

router
  .route("/findDiscountByUserId/:userId")
  .get(usersDiscountCode.findDiscountByUserId);

// router.route("/:id")
//     .put(users.update);

module.exports = router;
