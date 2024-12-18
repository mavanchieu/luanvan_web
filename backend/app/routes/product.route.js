const express = require('express');
const productController = require("../controllers/product.controller");

const router = express.Router();

router.route("/findAllByProductId")
        .get(productController.findAllByProductId);

router.route("/findAllProducts")
        .get(productController.findAllProducts);

router.route("/findAllNotHiddenProducts")
        .get(productController.findAllNotHiddenProduct);

router.route("/")
            .post(productController.create)
            .get(productController.findAll);

router.route("/deleteOne/:id")
            .delete(productController.deleteOne);


router.route("/hiddenProduct/:id")
            .put(productController.hiddenProduct);

module.exports = router;

