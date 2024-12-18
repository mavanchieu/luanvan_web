const express = require("express");
const receiving_address = require("../controllers/receiving_address.controller");

const router = express.Router();

router.route("/")
    .post(receiving_address.create)
    .get(receiving_address.findAll);
   
router.route("/:id")
    .delete(receiving_address.deleteOne);
 
router.route("/updateAddress/:id")
    .put(receiving_address.update);

module.exports = router;
