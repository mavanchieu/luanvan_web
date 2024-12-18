const express = require("express");
const discountCode = require("../controllers/discount_code.controller");

const router = express.Router();

router.route("/")
    .post(discountCode.create)
    .get(discountCode.findAll);
    

router.route("/:id")
    .delete(discountCode.deleteOne);


router.route("/updateDiscountCode/:id")
    .put(discountCode.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
