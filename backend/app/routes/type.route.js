const express = require("express");
const type = require("../controllers/type.controller");

const router = express.Router();

router.route("/")
    .post(type.create)
    .get(type.findAll);
    

router.route("/:id")
    .delete(type.deleteOne);


router.route("/updateType/:id")
    .put(type.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
