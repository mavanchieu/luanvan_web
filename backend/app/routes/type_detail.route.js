const express = require("express");
const type_detail = require("../controllers/type_detail.controller");

const router = express.Router();

router.route("/")
    .post(type_detail.create)
    .get(type_detail.findAll);
   
router.route("/:id")
    .delete(type_detail.deleteOne);
 
router.route("/updateTypeDetail/:id")
    .put(type_detail.update);

module.exports = router;
