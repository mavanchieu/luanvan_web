
const express = require('express');
const colorItemController = require("../controllers/colorItem.controller");
const multer = require("multer");
const path = require("path");

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


router.route("/")
            .post(upload.fields([
                { name: 'images', maxCount: 10 }, 
            ]), colorItemController.create)
            .get(colorItemController.findAll);


router.route("/updateColorItem/:colorItemId")
            .put(upload.fields([
                { name: 'images', maxCount: 10 }, 
            ]), colorItemController.update);

router.route("/updateQuantity/:colorItemId/:sizeId/:quantity")
            .put(colorItemController.updateQuantity);

router.route("/deleteOne/:id")
            .delete(colorItemController.deleteOne);

router.route("/updateInscreaseQuantity/:colorItemId/:sizeId/:quantity")
            .put(colorItemController.updateInscreaseQuantity);
module.exports = router;

