
const express = require('express');
const orderController = require("../controllers/order.controller");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) { 
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});


const upload = multer({ storage: storage });

const router = express.Router();

router.route("/").post(orderController.create)
                .get(orderController.findAll);

router.route("/payment").post(orderController.payment);
router.route("/callback").post(orderController.callback);
router.route("/orderStatus/:app_trans_id").post(orderController.orderStatus);

router.route("/confirmOrder/:id")
            .put(orderController.confirmOrder);

router.route("/confirmCompletedOrder/:id")
            .put(orderController.confirmCompletedOrder);

router.route("/confirmShipping/:id")
            .put(orderController.confirmShipping);

router.route("/findByUserId/:userId")
    .get(orderController.findByUserId);

router.route("/findOneById/:id")
    .get(orderController.findOneById);


router.route("/:id")
    .delete(orderController.deleteOne);
module.exports = router;

