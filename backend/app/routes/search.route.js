const express = require("express");
const search = require("../controllers/search.controller");

const router = express.Router();

router.route("/")
    .post(search.create)
    .get(search.findAll);

router.route("/:userId")
        .get(search.findByUserId);
   
router.route("/:id")
    .delete(search.deleteOne);

router.route("/deleteAll/:userId")
    .delete(search.deleteAll);
 

module.exports = router;
