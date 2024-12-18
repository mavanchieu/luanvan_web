const express = require("express");
const message = require("../controllers/message.controller");

const router = express.Router();

router.route("/")
    .post(message.create)
    .get(message.findAll);

// router.route("/:userId")
//         .get(search.findByUserId);
   
// router.route("/:id")
//     .delete(search.deleteOne);

// router.route("/deleteAll/:userId")
//     .delete(search.deleteAll);
 

module.exports = router;
