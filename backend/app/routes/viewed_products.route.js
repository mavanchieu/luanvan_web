const express = require("express");
const viewedProducts = require("../controllers/viewed_products.controller");

const router = express.Router();

router.route("/")
    .post(viewedProducts.create)
    .get(viewedProducts.findAll);
    

router.route("/:id")
    .delete(viewedProducts.deleteOne);

router.route("/findByUserId/:userId")
    .get(viewedProducts.findByUserId);

router.route("/deleteAll/:userId")
    .delete(viewedProducts.deleteAll);

router.route("/updateType/:id")
    .put(viewedProducts.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
