
const express = require('express');
const evaluationController = require("../controllers/evaluation.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "evaluations/"); 
    },
    filename: function (req, file, cb) { 
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});


const upload = multer({ storage: storage });

const router = express.Router();

router.route("/findEvaByProId/:productId")
            .get(evaluationController.findEvaByProId);

router.route("/")
            .post(upload.fields([
                { name: 'images', maxCount: 10 }, 
            ]), evaluationController.create)
            .get(evaluationController.findAll);

router.route("/:id")
        .delete(evaluationController.deleteOne);


router.route("/updateLike/:userId/:evaId")
        .put(evaluationController.updateLike);
module.exports = router;

